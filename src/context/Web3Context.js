'use client';

import { ethers } from "ethers";
import { createContext, useEffect, useState } from "react";
import { contractABI, contractAddress } from '../components/utils/Constant'; // Update the correct path
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Check if window.ethereum exists
const { ethereum } = typeof window !== 'undefined' ? window : {};

// Create the Web3Context
export const Web3Context = createContext();

export const Web3ContextProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [isActive, setIsActive] = useState(false); // Track active status
    const [userRole, setUserRole] = useState(""); // Track user's role
    const [loading, setLoading] = useState(false); // Loading state for contract interaction
    const [crops, setCrops] = useState([]); // Store list of crops
    const [foodItems, setFoodItems] = useState([]); // Store list of food items
    const [distributions, setDistributions] = useState([]); // Store list of distributions
    const [foodTrace, setFoodTrace] = useState(null); // Store food trace data
    const router = useRouter();
    const [signupLoading, setSignupLoading] = useState(false);
    const [allUsers, setAllUsers] = useState();
    const [approveLoading, setApproveLoading] = useState(false);
    const [isRetailerAdded, setIsRetailerAdded] = useState(false);
    const [retails, setRetails] = useState([]);

    // Create a connection to the smart contract
    const createEthereumContract = () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        return contract;
    };

    // Connect wallet
    const connectWallet = async () => {
        try {
            if (!ethereum) return toast.info('Please install MetaMask', {
                description: 'To use this application install metamsk.'
            });
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentAccount(accounts[0]);
            await checkUserStatus(accounts[0]); // Check active status and role
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    };

    // Check if the wallet is connected and if the user is active
    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return toast.info('Please install MetaMask', {
                description: 'To use this application install metamsk.'
            });
            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                await checkUserStatus(accounts[0]); // Check active status and role
                currentAccount && router.push('/dashboard');
                !currentAccount
            }
        } catch (error) {
            console.error("Error checking wallet connection:", error);
            toast.error('Connect your wallet first', {
                description: 'Connect your wallet to proceed.',
            })
        }
    };

    // Check the user's active status and role from the contract
    const checkUserStatus = async (address) => {
        try {
            setLoading(true);
            const contract = createEthereumContract();
            const user = await contract.users(address);

            if (user.isActive) {
                setIsActive(true);
                setUserRole(mapRole(user.role));
            } else {
                setIsActive(false);
                setUserRole(null);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error checking user status:", error);
            setLoading(false);
        }
    };

    // Map role number to role string
    const mapRole = (role) => {
        switch (role) {
            case 0: return "Admin";
            case 1: return "Farmer";
            case 2: return "Producer";
            case 3: return "Distributor";
            case 4: return "Retailer";
            default: return "Unknown";
        }
    };

    // Register a user in the smart contract
    const registerUser = async (name, role) => {
        try {
            setSignupLoading(true);
            const contract = createEthereumContract();
            const transaction = await contract.signUp(name, role);
            await transaction.wait();
            console.log("User registered:", transaction);
            setSignupLoading(false);
            router.push('/');
            toast.success('Account Created! 🎉, Wait for Approval', {
                description: 'Your account creation request is successful. Wait for approval.'
            })

        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    // Admin fetches pending users for approval
    // const fetchPendingUsers = async () => {
    //     try {
    //         setLoading(true);
    //         const contract = createEthereumContract();
    //         const users = await contract.getPendingUsers();
    //         console.log('pending users', users);
    //         setPendingUsers(users);
    //         setLoading(false);
    //     } catch (error) {
    //         console.error("Error fetching pending users:", error);
    //         setLoading(false);
    //     }
    // };

    // Admin approves a user
    const approveUser = async (userAddress) => {
        try {
            setApproveLoading(true);
            const contract = createEthereumContract();
            const transaction = await contract.approveUser(userAddress);
            await transaction.wait();
            await getAllUsers();
            setApproveLoading(false);
            console.log("User approved:", transaction);
            toast.success('Account Approved! 🎉', {
                description: 'This account approval successful'
            })
        } catch (error) {
            console.error("Error approving user:", error);
        }
    };

    // Farmer adds a crop
    const addCrop = async (cropName, location, startDate, endDate, price, quantity, _producer) => {
        try {
            setLoading(true);
            const contract = createEthereumContract();
            const transaction = await contract.addCrop(cropName, location, startDate, endDate, price, quantity, _producer);
            await transaction.wait();
            console.log("Crop added:", transaction);
            setLoading(false);
            toast.success('Crop Added Successfully! 🎉', {
                description: 'Thank for adding your crops.'
            })
            router.push('/my-crops')
        } catch (error) {
            console.error("Error adding crop:", error);
        }
    };

    // Fetch all crops
    const fetchAllCrops = async () => {
        try {
            setLoading(true);
            const contract = createEthereumContract();
            const crops = await contract.getAllCrops();
            setCrops(crops);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching crops:", error);
            setLoading(false);
        }
    };

    // Producer adds a food item
    const addFoodItem = async (foodName, cropIds, location, startDate, endDate, price, quantity, expireDate, distributor) => {
        try {
            setLoading(true);
            const contract = createEthereumContract();
            const transaction = await contract.addFoodItem(foodName, cropIds, location, startDate, endDate, price, quantity, expireDate, distributor);
            await transaction.wait();
            console.log("Food item added:", transaction);
            setLoading(false);
            router.push('/my-foods');
            toast.success('Food Created! 🎉', {
                description: 'Your food item successfully created.'
            })
        } catch (error) {
            console.error("Error adding food item:", error);
        }
    };

    // Fetch all food items
    const fetchAllFoodItems = async () => {
        try {
            setLoading(true);
            const contract = createEthereumContract();
            const items = await contract.getAllFoodItems();
            setFoodItems(items);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching food items:", error);
            setLoading(false);
        }
    };

    // Distributor adds distribution details
    const addDistribution = async (foodId, receivedDate, sendDate, price, quantity, retailer) => {
        try {
            setLoading(true);
            const contract = createEthereumContract();
            const transaction = await contract.addDistribution(foodId, receivedDate, sendDate, price, quantity, retailer);
            await transaction.wait();
            setLoading(false);
            console.log("Distribution added:", transaction);
            toast.success('Food distributed success! 🎉', {
                description: 'Food successfully distributed.'
            })
            router.push('/my-distributions');
        } catch (error) {
            console.error("Error adding distribution:", error);
        }
    };

    // Fetch all distributions
    const fetchAllDistributions = async () => {
        try {
            setLoading(true);
            const contract = createEthereumContract();
            const distributions = await contract.getAllDistributions();
            setDistributions(distributions);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching distributions:", error);
            setLoading(false);
        }
    };

     // Fetch all distributions
     const getAllRetails = async () => {
        try {
            setLoading(true);
            const contract = createEthereumContract();
            const distributions = await contract.getAllRetails();
            setRetails(distributions);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching distributions:", error);
            setLoading(false);
        }
    };

    // Retailer adds retail entry
    const addRetailEntry = async (retailId, foodId, distributorId, location, receivedDate, sellDate, price, quantity) => {
        try {
            setLoading(true);
            const contract = createEthereumContract();
            const transaction = await contract.addRetailEntry(retailId, foodId, distributorId, location, receivedDate, sellDate, price, quantity);
            await transaction.wait();
            console.log("Retail entry added:", transaction);
            setLoading(false);
            if (transaction.hash) {
                setIsRetailerAdded(true);
            }

            console.log("transaction", transaction);
            console.log('transaction hash:', transaction.hash);
        } catch (error) {
            console.error("Error adding retail entry:", error);
        }
    };

    // Function to trace food items
    const getFoodTrace = async (foodId) => {
        try {
            setLoading(true);
            const contract = createEthereumContract();
            const traceData = await contract.getFoodTrace(foodId);

            if (traceData && traceData.length > 0) {
                setFoodTrace(traceData);
            } else {
                // Set to null or empty array when no data
                setFoodTrace(null);  // Can also use setFoodTrace([]) for clarity
            }

            setLoading(false);
            console.log('trace data:', traceData);
        } catch (error) {
            console.error("Error getting food trace:", error);
            setLoading(false);
            setFoodTrace(null);  // Ensure to reset foodTrace on error as well
        }
    };


    // Function to trace food items
    const getAllUsers = async (foodId) => {
        try {
            setLoading(true);
            const contract = createEthereumContract();
            const userData = await contract.getAllUsers();
            console.log("userdata", userData)
            setAllUsers(userData);
            setLoading(false);
        } catch (error) {
            console.error("Error getting food trace:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
        fetchAllDistributions(); // Fetch all distributions on load
        getAllUsers();
    }, []);

    return (
        <Web3Context.Provider
            value={{
                currentAccount,
                connectWallet,
                checkIfWalletIsConnected,
                isActive,
                userRole,
                registerUser,
                approveUser,
                addCrop,
                fetchAllCrops,
                crops,
                addFoodItem,
                fetchAllFoodItems,
                foodItems,
                addDistribution,
                fetchAllDistributions,
                distributions,
                addRetailEntry,
                getFoodTrace,
                foodTrace,
                loading,
                signupLoading,
                getAllUsers,
                allUsers,
                approveLoading,
                fetchAllCrops,
                isRetailerAdded,
                setIsRetailerAdded,
                getAllRetails,
                retails
            }}
        >
            {children}
        </Web3Context.Provider>
    );
};
