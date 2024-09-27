'use client';

import { ethers } from "ethers";
import { createContext, useEffect, useState } from "react";
import { contractABI, contractAddress } from '../components/utils/Constant'; // Update the correct path

// Check if window.ethereum exists
const { ethereum } = typeof window !== 'undefined' ? window : {};

// Create the Web3Context
export const Web3Context = createContext();

export const Web3ContextProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [isActive, setIsActive] = useState(false); // Track active status
    const [userRole, setUserRole] = useState(""); // Track user's role
    const [loading, setLoading] = useState(false); // Loading state for contract interaction
    const [pendingUsers, setPendingUsers] = useState([]); // Track pending users
    const [crops, setCrops] = useState([]); // Store list of crops

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
            if (!ethereum) return alert("Please install MetaMask.");
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
            if (!ethereum) return swal("MetaMask Not Installed!", "Please install MetaMask to use this application!", "error");
            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                await checkUserStatus(accounts[0]); // Check active status and role
            }
        } catch (error) {
            console.error("Error checking wallet connection:", error);
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
            const contract = createEthereumContract();
            const transaction = await contract.signUp(name, role);
            await transaction.wait();
            console.log("User registered:", transaction);
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    // Admin fetches pending users for approval
    const fetchPendingUsers = async () => {
        try {
            setLoading(true);
            const contract = createEthereumContract();
            const users = await contract.getPendingUsers();
            setPendingUsers(users);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching pending users:", error);
            setLoading(false);
        }
    };

    // Admin approves a user
    const approveUser = async (userAddress) => {
        try {
            const contract = createEthereumContract();
            const transaction = await contract.approveUser(userAddress);
            await transaction.wait();
            await fetchPendingUsers(); // Update pending users list after approval
            console.log("User approved:", transaction);
        } catch (error) {
            console.error("Error approving user:", error);
        }
    };

    // Farmer adds a crop
    const addCrop = async (cropName, location, startDate, endDate, price, quantity) => {
        try {
            const contract = createEthereumContract();
            const transaction = await contract.addCrop(cropName, location, startDate, endDate, price, quantity);
            await transaction.wait();
            console.log("Crop added:", transaction);
        } catch (error) {
            console.error("Error adding crop:", error);
        }
    };

    // Fetch all crops (for Admin view)
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
    const addFoodItem = async (foodName, cropIds, location, startDate, endDate, price, quantity, expireDate) => {
        try {
            const contract = createEthereumContract();
            const transaction = await contract.addFoodItem(foodName, cropIds, location, startDate, endDate, price, quantity, expireDate);
            await transaction.wait();
            console.log("Food item added:", transaction);
        } catch (error) {
            console.error("Error adding food item:", error);
        }
    };

    // Distributor adds distribution details
    const addDistribution = async (foodId, distributorName, cropIds, location, receivedDate, sendDate, price, quantity, expireDate) => {
        try {
            const contract = createEthereumContract();
            const transaction = await contract.addDistribution(foodId, distributorName, cropIds, location, receivedDate, sendDate, price, quantity, expireDate);
            await transaction.wait();
            console.log("Distribution added:", transaction);
        } catch (error) {
            console.error("Error adding distribution:", error);
        }
    };

    // Retailer adds retail entry
    const addRetailEntry = async (foodId, distributorId, location, receivedDate, sellDate, price, quantity, expireDate) => {
        try {
            const contract = createEthereumContract();
            const transaction = await contract.addRetailEntry(foodId, distributorId, location, receivedDate, sellDate, price, quantity, expireDate);
            await transaction.wait();
            console.log("Retail entry added:", transaction);
        } catch (error) {
            console.error("Error adding retail entry:", error);
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <Web3Context.Provider
            value={{
                currentAccount,
                connectWallet,
                checkIfWalletIsConnected,
                isActive,
                userRole,
                pendingUsers,
                registerUser,
                approveUser,
                addCrop,
                addFoodItem,
                addDistribution,
                addRetailEntry,
                fetchPendingUsers,
                fetchAllCrops,
                crops,
                loading,
            }}
        >
            {children}
        </Web3Context.Provider>
    );
};
