// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FoodTraceabilitySystem {

    // Roles
    enum Role { Admin, Farmer, Producer, Distributor, Retailer }

    // User structure
    struct User {
        address wallet;
        string name;
        Role role;
        bool isActive;
    }

    struct PendingUser {
        address wallet;
        string name;
        Role role;
    }

    struct Crop {
        uint256 cropId;
        string cropName;
        string location;
        string farmingStartDate;  // Changed to string
        string farmingEndDate;    // Changed to string
        uint256 price;
        uint256 quantity;
        address farmer;
    }

    struct FoodItem {
        uint256 foodId;
        string foodName;
        uint256[] cropIds; // Multiple crops used to create this food
        address producer;
        string location;
        string startDate;  // Changed to string
        string endDate;    // Changed to string
        uint256 price;
        uint256 quantity;
        string expireDate; // Changed to string
    }

    struct Distribution {
        uint256 distributorId;
        string distributorName;
        uint256 foodId;
        string foodName;
        uint256[] cropIds;
        string location;
        string receivedDate;  // Changed to string
        string sendDate;      // Changed to string
        uint256 price;
        uint256 quantity;
        string expireDate;    // Changed to string
    }

    struct Retail {
        uint256 retailerId;
        string retailerName;
        uint256 foodId;
        string foodName;
        uint256 distributorId;
        string distributorName;
        string location;
        string receivedDate;  // Changed to string
        string sellDate;      // Changed to string
        uint256 price;
        uint256 quantity;
        string expireDate;    // Changed to string
    }

    // Admin
    address public systemAdmin;

    // Mappings
    mapping(address => User) public users; // Registered users
    mapping(uint256 => Crop) public crops;
    mapping(uint256 => FoodItem) public foodItems;
    mapping(uint256 => Distribution) public distributions;
    mapping(uint256 => Retail) public retailers;

    // Track users' status
    address[] public pendingUsers;  // List of users waiting for approval
    uint256 public cropCounter;
    uint256 public foodItemCounter;
    uint256 public distributionCounter;
    uint256 public retailerCounter;

    // Events
    event UserRegistered(address user, string name, Role role);
    event UserApproved(address user, string name);
    event CropAdded(uint256 cropId, string cropName, address farmer);
    event FoodItemAdded(uint256 foodId, string foodName, address producer);
    event DistributionAdded(uint256 distributionId, string foodName, address distributor);
    event RetailerEntryAdded(uint256 retailerId, string foodName, address retailer);

    // Modifiers
    modifier onlyAdmin() {
        require(users[msg.sender].role == Role.Admin, "Only Admin can perform this action");
        _;
    }

    modifier onlyActiveUser() {
        require(users[msg.sender].isActive, "User not active");
        _;
    }

    modifier onlyFarmer() {
        require(users[msg.sender].role == Role.Farmer, "Only Farmer can perform this action");
        _;
    }

    modifier onlyProducer() {
        require(users[msg.sender].role == Role.Producer, "Only Producer can perform this action");
        _;
    }

    modifier onlyDistributor() {
        require(users[msg.sender].role == Role.Distributor, "Only Distributor can perform this action");
        _;
    }

    modifier onlyRetailer() {
        require(users[msg.sender].role == Role.Retailer, "Only Retailer can perform this action");
        _;
    }

    constructor() {
        systemAdmin = msg.sender;
        users[systemAdmin] = User(systemAdmin, "System Admin", Role.Admin, true);
    }

    // Sign up function - User signs up with role and waits for admin approval
    function signUp(string memory _name, Role _role) public {
        require(users[msg.sender].wallet == address(0), "User already exists");
        users[msg.sender] = User(msg.sender, _name, _role, false);
        pendingUsers.push(msg.sender); // Add to pending user list
        emit UserRegistered(msg.sender, _name, _role);
    }

    // Admin retrieves list of pending users for approval, along with their name and role
    function getPendingUsers() public view onlyAdmin returns (PendingUser[] memory) {
        PendingUser[] memory pendingUserList = new PendingUser[](pendingUsers.length);

        for (uint256 i = 0; i < pendingUsers.length; i++) {
            address userAddress = pendingUsers[i];
            User memory user = users[userAddress];
            pendingUserList[i] = PendingUser(user.wallet, user.name, user.role);
        }

        return pendingUserList;
    }

    // Admin approves user
    function approveUser(address _user) public onlyAdmin {
        require(users[_user].wallet != address(0), "User does not exist");
        require(!users[_user].isActive, "User already active");

        users[_user].isActive = true;

        // Remove user from pending list
        for (uint256 i = 0; i < pendingUsers.length; i++) {
            if (pendingUsers[i] == _user) {
                pendingUsers[i] = pendingUsers[pendingUsers.length - 1];
                pendingUsers.pop();
                break;
            }
        }

        emit UserApproved(_user, users[_user].name);
    }

    // Farmer adds crops
    function addCrop(string memory _cropName, string memory _location, string memory _farmingStartDate, string memory _farmingEndDate, uint256 _price, uint256 _quantity) public onlyActiveUser onlyFarmer {
        cropCounter++;
        crops[cropCounter] = Crop(cropCounter, _cropName, _location, _farmingStartDate, _farmingEndDate, _price, _quantity, msg.sender);
        emit CropAdded(cropCounter, _cropName, msg.sender);
    }

    // Producer adds a food item using crops
    function addFoodItem(string memory _foodName, uint256[] memory _cropIds, string memory _location, string memory _startDate, string memory _endDate, uint256 _price, uint256 _quantity, string memory _expireDate) public onlyActiveUser onlyProducer {
        foodItemCounter++;
        foodItems[foodItemCounter] = FoodItem(foodItemCounter, _foodName, _cropIds, msg.sender, _location, _startDate, _endDate, _price, _quantity, _expireDate);
        emit FoodItemAdded(foodItemCounter, _foodName, msg.sender);
    }

    // Distributor receives food and adds distribution details
    function addDistribution(uint256 _foodId, string memory _distributorName, uint256[] memory _cropIds, string memory _location, string memory _receivedDate, string memory _sendDate, uint256 _price, uint256 _quantity, string memory _expireDate) public onlyActiveUser onlyDistributor {
        distributionCounter++;
        distributions[distributionCounter] = Distribution(distributionCounter, _distributorName, _foodId, foodItems[_foodId].foodName, _cropIds, _location, _receivedDate, _sendDate, _price, _quantity, _expireDate);
        emit DistributionAdded(distributionCounter, foodItems[_foodId].foodName, msg.sender);
    }

    // Retailer receives food and adds sale details
    function addRetailEntry(uint256 _foodId, uint256 _distributorId, string memory _location, string memory _receivedDate, string memory _sellDate, uint256 _price, uint256 _quantity, string memory _expireDate) public onlyActiveUser onlyRetailer {
        retailerCounter++;
        retailers[retailerCounter] = Retail(retailerCounter, users[msg.sender].name, _foodId, foodItems[_foodId].foodName, _distributorId, distributions[_distributorId].distributorName, _location, _receivedDate, _sellDate, _price, _quantity, _expireDate);
        emit RetailerEntryAdded(retailerCounter, foodItems[_foodId].foodName, msg.sender);
    }

    // Admin retrieves list of all crops added by farmers
    function getAllCrops() public view onlyAdmin returns (Crop[] memory) {
        Crop[] memory cropList = new Crop[](cropCounter);
        for (uint256 i = 1; i <= cropCounter; i++) {
            cropList[i - 1] = crops[i];
        }
        return cropList;
    }

    // Function to view a food trace (example function to use with frontend to generate QR code)
    function getFoodTrace(uint256 _foodId) public view returns (FoodItem memory, Distribution memory, Retail memory) {
        FoodItem memory foodItem = foodItems[_foodId];
        Distribution memory distribution = distributions[_foodId];
        Retail memory retail = retailers[_foodId];
        return (foodItem, distribution, retail);
    }
}
