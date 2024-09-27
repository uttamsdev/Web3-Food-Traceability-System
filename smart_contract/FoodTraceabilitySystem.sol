// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FoodTraceabilitySystem {

    // Roles
    enum Role { Admin, Farmer, Producer, Distributor, Retailer }

    // User structure
    struct User {
        address wallet;
        string name;
        uint8 role; // Using uint8 for smaller size
        bool isActive;
    }

    struct Crop {
        uint256 cropId;
        string cropName;
        string location;
        string farmingStartDate; // String for date
        string farmingEndDate;   // String for date
        uint256 price;
        string quantity;         // Numeric quantity
        address farmer;
    }

    struct FoodItem {
        uint256 foodId;
        string foodName;
        uint256[] cropIds; // Multiple crops used to create this food
        address producer;
        string location;
        string startDate;        // String for date
        string endDate;          // String for date
        uint256 price;
        uint256 quantity;         // Numeric quantity
        string expireDate;       // String for date
    }

    struct Distribution {
        uint256 distributorId;
        uint256 foodId;
        string location;
        string receivedDate;     // String for date
        string sendDate;         // String for date
        uint256 price;
        uint256 quantity;         // Numeric quantity
        string expireDate;       // String for date
    }

    struct Retail {
        uint256 retailerId;
        uint256 foodId;
        uint256 distributorId;
        string location;
        string receivedDate;     // String for date
        string sellDate;         // String for date
        uint256 price;
        uint256 quantity;         // Numeric quantity
        string expireDate;       // String for date
    }

    // Admin
    address public systemAdmin;

    // Mappings
    mapping(address => User) public users; // Registered users
    address[] public userAddresses; // To keep track of all user addresses

    // Store all crops, food items, distributions, and retailers
    Crop[] public allCrops;
    FoodItem[] public allFoodItems;
    Distribution[] public allDistributions;
    Retail[] public allRetailEntries;

    // Pending users
    address[] public pendingUsers;  // List of users waiting for approval

    // Events
    event UserRegistered(address user, string name, Role role);
    event UserApproved(address user, string name);
    event CropAdded(uint256 cropId, string cropName, address farmer);
    event FoodItemAdded(uint256 foodId, string foodName, address producer);
    event DistributionAdded(uint256 distributionId, uint256 foodId, address distributor);
    event RetailerEntryAdded(uint256 retailerId, uint256 foodId, address retailer);

    // Modifiers
    modifier onlyAdmin() {
        require(users[msg.sender].role == uint8(Role.Admin), "Only Admin can perform this action");
        _;
    }

    modifier onlyActiveUser() {
        require(users[msg.sender].isActive, "User not active");
        _;
    }

    modifier onlyRole(Role _role) {
        require(users[msg.sender].role == uint8(_role), "Invalid role for this action");
        _;
    }

    constructor() {
        systemAdmin = msg.sender;
        users[systemAdmin] = User(systemAdmin, "System Admin", uint8(Role.Admin), true);
        userAddresses.push(systemAdmin); // Store admin address
    }

    // Sign up function - User signs up with role and waits for admin approval
    function signUp(string memory _name, Role _role) public {
        require(users[msg.sender].wallet == address(0), "User already exists");
        users[msg.sender] = User(msg.sender, _name, uint8(_role), false);
        userAddresses.push(msg.sender); // Add to user addresses
        pendingUsers.push(msg.sender); // Add to pending user list
        emit UserRegistered(msg.sender, _name, _role);
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

    // Get the list of pending users with address, name, and role
    function getPendingUsers() public view returns (User[] memory) {
        User[] memory pendingUserList = new User[](pendingUsers.length);

        for (uint256 i = 0; i < pendingUsers.length; i++) {
            pendingUserList[i] = users[pendingUsers[i]];
        }

        return pendingUserList;
    }

    // Get a list of all users with their details
    function getAllUsers() public view returns (User[] memory) {
        User[] memory allUsers = new User[](userAddresses.length);

        for (uint256 i = 0; i < userAddresses.length; i++) {
            allUsers[i] = users[userAddresses[i]];
        }

        return allUsers;
    }

    // Farmer adds crops
    function addCrop(
        string memory _cropName,
        string memory _location,
        string memory _farmingStartDate,
        string memory _farmingEndDate,
        uint256 _price,
        string memory _quantity
    ) public onlyActiveUser onlyRole(Role.Farmer) {
        uint256 cropId = allCrops.length + 1;
        Crop memory newCrop = Crop(cropId, _cropName, _location, _farmingStartDate, _farmingEndDate, _price, _quantity, msg.sender);
        allCrops.push(newCrop);
        emit CropAdded(cropId, _cropName, msg.sender);
    }

    // Producer adds a food item using crops
    function addFoodItem(
        string memory _foodName,
        uint256[] memory _cropIds,
        string memory _location,
        string memory _startDate,
        string memory _endDate,
        uint256 _price,
        uint256 _quantity,
        string memory _expireDate
    ) public onlyActiveUser onlyRole(Role.Producer) {
        uint256 foodId = allFoodItems.length + 1;
        FoodItem memory newFoodItem = FoodItem(foodId, _foodName, _cropIds, msg.sender, _location, _startDate, _endDate, _price, _quantity, _expireDate);
        allFoodItems.push(newFoodItem);
        emit FoodItemAdded(foodId, _foodName, msg.sender);
    }

    // Distributor receives food and adds distribution details
    function addDistribution(
        uint256 _foodId,
        string memory _location,
        string memory _receivedDate,
        string memory _sendDate,
        uint256 _price,
        uint256 _quantity,
        string memory _expireDate
    ) public onlyActiveUser onlyRole(Role.Distributor) {
        uint256 distributionId = allDistributions.length + 1;
        Distribution memory newDistribution = Distribution(distributionId, _foodId, _location, _receivedDate, _sendDate, _price, _quantity, _expireDate);
        allDistributions.push(newDistribution);
        emit DistributionAdded(distributionId, _foodId, msg.sender);
    }

    // Retailer receives food and adds sale details
    function addRetailEntry(
        uint256 _foodId,
        uint256 _distributorId,
        string memory _location,
        string memory _receivedDate,
        string memory _sellDate,
        uint256 _price,
        uint256 _quantity,
        string memory _expireDate
    ) public onlyActiveUser onlyRole(Role.Retailer) {
        uint256 retailerId = allRetailEntries.length + 1;
        Retail memory newRetailEntry = Retail(retailerId, _foodId, _distributorId, _location, _receivedDate, _sellDate, _price, _quantity, _expireDate);
        allRetailEntries.push(newRetailEntry);
        emit RetailerEntryAdded(retailerId, _foodId, msg.sender);
    }

    // Function to view a food trace
    function getFoodTrace(uint256 _foodId) public view returns (FoodItem memory, Distribution memory, Retail memory, Crop[] memory) {
        FoodItem memory foodItem = allFoodItems[_foodId - 1];
        Distribution memory distribution = allDistributions[_foodId - 1];
        Retail memory retail = allRetailEntries[_foodId - 1];
        
        // Get crops related to this food item
        Crop[] memory associatedCrops = new Crop[](foodItem.cropIds.length);
        for (uint256 i = 0; i < foodItem.cropIds.length; i++) {
            associatedCrops[i] = allCrops[foodItem.cropIds[i] - 1];
        }

        return (foodItem, distribution, retail, associatedCrops);
    }

    // Get all crops
    function getAllCrops() public view returns (Crop[] memory) {
        return allCrops;
    }

    // Get all food items
    function getAllFoodItems() public view returns (FoodItem[] memory) {
        return allFoodItems;
    }

    // Get all distributions
    function getAllDistributions() public view returns (Distribution[] memory) {
        return allDistributions;
    }
}
