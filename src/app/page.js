'use client'
import { FacebookIcon, LinkedIcon, TwitterIcon } from "@/assets/icons";
import Image from "next/image";
import FoodImage from '@/assets/food2.jpg';
import { useContext } from "react";
import { Web3Context } from "@/context/Web3Context";

export default function Home() {
  const { isActive, userRole, currentAccount, connectWallet } = useContext(Web3Context);

  console.log("current account", currentAccount);
  console.log("isActive", isActive);
  console.log('UserRole', userRole);
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      {/* Navbar */}
      <header className="bg-black opacity-90 text-white shadow-lg">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-4xl font-extrabold tracking-widest">FoodTrace</div>
          <ul className="flex space-x-8 text-lg font-semibold items-center">
            <li><a href="#home" className="hover:text-green-400 transition duration-200">Home</a></li>
            <li><a href="#about" className="hover:text-green-400 transition duration-200">About</a></li>
            <li><a href="#roles" className="hover:text-green-400 transition duration-200">Roles</a></li>
            <li><a href="#contact" className="hover:text-green-400 transition duration-200">Contact</a></li>
            {
              !currentAccount && <li><button onClick={connectWallet} href="#contact" className=" bg-yellow-600 px-1.5 py-1 rounded transition duration-200 active:scale-90">Connect Wallet</button></li>
            }
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative bg-green-700 text-white bg-[url('../assets/food.jpg')] h-screen flex items-center justify-center bg-cover bg-center">
        <div className="bg-black bg-opacity-60 p-10 rounded-xl shadow-lg">
          <h1 className="text-6xl font-extrabold mb-6 text-center tracking-tight">
            Revolutionize Food Supply with Blockchain
          </h1>
          <p className="text-xl text-center mb-8 max-w-2xl mx-auto leading-relaxed">
            Ensure transparency and quality from farm to table with our cutting-edge technology.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#roles" className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-300 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105">Explore Roles</a>
            <a href="#about" className="bg-white text-green-700 hover:text-green-500 font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105">Learn More</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white text-gray-700">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-green-600 mb-6">About the Food Traceability System</h2>
          <p className="text-lg max-w-4xl mx-auto leading-relaxed">
            Our Food Traceability System leverages the power of blockchain to create an immutable record of the journey that food takes from farm to table. By tracking the entire supply chain, from the Farmer to the Retailer, our system ensures transparency, safety, and accountability at every step.
          </p>
        </div>
        <div className="mt-12 text-center">
          <Image
            className="w-full max-w-6xl mx-auto rounded-lg shadow-2xl"
            src={FoodImage}
            alt="Supply chain visualization"
          />
        </div>
      </section>

      {/* Roles Section */}
      <section id="roles" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-green-600 mb-12">How the System Works for Different Roles</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Farmers */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105 hover:shadow-xl">
              <img
                className="h-40 mx-auto mb-4 rounded-full"
                src="https://images.unsplash.com/photo-1529253355930-7e33e5695feb?auto=format&fit=crop&w=600&q=80"
                alt="Farmer"
              />
              <h3 className="text-2xl font-bold mb-2 text-green-700">Farmers</h3>
              <p className="text-gray-600">
                Farmers can register their crops, track farming dates, and ensure every detail is logged on the blockchain.
              </p>
            </div>

            {/* Producers */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105 hover:shadow-xl">
              <img
                className="h-40 mx-auto mb-4 rounded-full"
                src="https://images.unsplash.com/photo-1542838687-fcfbfcb703cc?auto=format&fit=crop&w=600&q=80"
                alt="Producer"
              />
              <h3 className="text-2xl font-bold mb-2 text-green-700">Producers</h3>
              <p className="text-gray-600">
                Producers can track the origin of crops used, add food products, and manage inventory on the blockchain.
              </p>
            </div>

            {/* Distributors */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105 hover:shadow-xl">
              <img
                className="h-40 mx-auto mb-4 rounded-full"
                src="https://images.unsplash.com/photo-1568051243854-6d452366f4e6?auto=format&fit=crop&w=600&q=80"
                alt="Distributor"
              />
              <h3 className="text-2xl font-bold mb-2 text-green-700">Distributors</h3>
              <p className="text-gray-600">
                Distributors manage food transport, log dates, and ensure safe handling throughout the supply chain.
              </p>
            </div>

            {/* Retailers */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105 hover:shadow-xl">
              <img
                className="h-40 mx-auto mb-4 rounded-full"
                src="https://images.unsplash.com/photo-1544918871-18e4ddcb4bd6?auto=format&fit=crop&w=600&q=80"
                alt="Retailer"
              />
              <h3 className="text-2xl font-bold mb-2 text-green-700">Retailers</h3>
              <p className="text-gray-600">
                Retailers can view the entire food history, add sales details, and ensure transparency to consumers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer id="contact" className="bg-green-800 text-white py-10">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6">Get In Touch</h3>
          <p className="text-lg mb-6">
            Contact us to learn more about how blockchain can transform your food supply chain.
          </p>
          <div className="space-x-4">
            <a href="#" className="hover:text-green-400">Privacy Policy</a>
            <a href="#" className="hover:text-green-400">Terms of Service</a>
          </div>
          <div className="mt-8 flex justify-center">
            <a href="#" className="mx-2">
              <LinkedIcon />
            </a>
            <a href="#" className="mx-2">
              <TwitterIcon />
            </a>
            <a href="#" className="mx-2">
              <FacebookIcon />
            </a>
          </div>
          <p className="mt-6 text-gray-400">&copy; 2024 FoodTrace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
