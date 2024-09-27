'use client'
import { ethers } from "ethers";
import { createContext, useEffect, useState } from "react";
import { contractABI, contractAddress } from '../components/utils/Constant';
const { ethereum } = window;

export const Web3Context = createContext();

export const Web3ContextProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(null);
    const [createUsrData, setCreateUserData] = useState({ address: '', username: '', password: '', role: '' });
    const [addCourseData, setAddCourseData] = useState({ facultyAddress: '', facultyName: '', courseCode: '', courseTitle: '' });

    const test = "hi me";

    //getting form input data
    const createAccountHandleChange = (e, name) => {
        setCreateUserData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    const courseAddHandleChange = (e, name) => {
        setAddCourseData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }


    const createEthereumContract = () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

        return transactionsContract;
    };

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return swal("MetaMask Not Installed!", "Please install MetaMask to use this application.!", "error");
            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) { //if accounted connected
                setCurrentAccount(accounts[0]);
                // getAllTransactions();
            } else {
                console.log("No account found");
            }
            console.log("accounts: ", accounts);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }


    //connect wallet
    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMak.");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }

 


    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);


    return (
        <Web3Context.Provider value={{test}}>
            {children}
        </Web3Context.Provider>
    )
}