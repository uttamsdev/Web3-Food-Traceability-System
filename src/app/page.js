'use client'
import { ArrowDownIcn, FacebookIcon, LinkedIcon, TwitterIcon } from "@/assets/icons";
import Image from "next/image";
import FoodImage from '@/assets/food2.jpg';
import { useContext, useEffect, useState } from "react";
import { Web3Context } from "@/context/Web3Context";
import { Dropdown, Menu, Space } from "antd";
import User from '../assets/user.svg'
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function Home() {
  const { isActive, userRole, currentAccount, connectWallet } = useContext(Web3Context);
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu


  const menuItems = [
    {
      label: 'Dashboard',
      key: '1',
    },
    {
      label: "Trace Food",
      key: '2'
    },
    {
      label: "Home",
      key: 3
    }
  ];
  const handleMenuClick = (e) => {
    console.log('Clicked item:', e.key);
    if (e.key === '1') {
      router.push('/dashboard');
    } else if (e.key === '2') {
      router.push('/trace-food/search');
    } else if (e.key === '3') {
      router.push('/');
    }
  };

  const menu = (
    <Menu
      items={menuItems}
      onClick={handleMenuClick} // Handle menu item clicks
    />
  );

  // Detect scroll and add glass effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50 relative">
      {/* Navbar */}
      <header className={`sticky top-0 z-[999] transition-all duration-300 ease-in-out
      ${scrolled ? "bg-gradient-to-r from-green-800/70 to-teal-600/70 shadow-2xl backdrop-blur-xl" : "bg-gradient-to-r from-green-800 to-teal-600 shadow-2xl backdrop-blur-xl"}`}>
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Brand Logo */}
          <div className="text-3xl font-extrabold tracking-widest text-white relative z-10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500">Food Traceability System</span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 text-lg font-semibold items-center text-white relative z-10">
            <li><a href="#home" className="hover:text-yellow-400 transition duration-300">Home</a></li>
            <li><a href="#about" className="hover:text-yellow-400 transition duration-300">About</a></li>
            <li><a href="#roles" className="hover:text-yellow-400 transition duration-300">Roles</a></li>
            <li><a href="#contact" className="hover:text-yellow-400 transition duration-300">Contact</a></li>
            <li><Link href="/trace-food/search" className="hover:text-yellow-400 transition duration-300">Trace Food</Link></li>

            {!currentAccount && (
              <li>
                <button onClick={connectWallet} className="bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2 rounded-full text-sm font-bold transition transform duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-yellow-500/50">
                  Connect Wallet
                </button>
              </li>
            )}

            {currentAccount && (
              <div className="relative z-[99999]">
                <Dropdown overlay={menu} trigger={['click']}>
                  <Space>
                    <div className="flex gap-2 items-center cursor-pointer arrow-icn">
                      <Image className="w-10 h-10 rounded-full ring-2 ring-yellow-500 shadow-lg" src={User} alt="user image" />
                      <div className="flex flex-col text-left">
                        <h3 className="text-base leading-5 text-white font-semibold">{userRole}</h3>
                        <span className="text-xs text-gray-300">FoodX Tracer</span>
                      </div>
                      <ArrowDownIcn />
                    </div>
                  </Space>
                </Dropdown>
              </div>
            )}
          </ul>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
              <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden absolute top-16 left-0 w-full bg-green-900/80 backdrop-blur-md shadow-2xl p-6">
              <ul className="flex flex-col space-y-6 text-lg font-semibold items-center text-white">
                <li><a href="#home" className="hover:text-yellow-400 transition duration-300" onClick={() => setMenuOpen(false)}>Home</a></li>
                <li><a href="#about" className="hover:text-yellow-400 transition duration-300" onClick={() => setMenuOpen(false)}>About</a></li>
                <li><a href="#roles" className="hover:text-yellow-400 transition duration-300" onClick={() => setMenuOpen(false)}>Roles</a></li>
                <li><a href="#contact" className="hover:text-yellow-400 transition duration-300" onClick={() => setMenuOpen(false)}>Contact</a></li>
                <li><Link href="/trace-food/search" className="hover:text-yellow-400 transition duration-300" onClick={() => setMenuOpen(false)}>Trace Food</Link></li>

                {!currentAccount && (
                  <li>
                    <button onClick={connectWallet} className="bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2 rounded-full text-sm font-bold transition transform duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-yellow-500/50">
                      Connect Wallet
                    </button>
                  </li>
                )}

                {currentAccount && (
                  <div className="relative z-[99999]">
                    <Dropdown overlay={menu} trigger={['click']}>
                      <Space>
                        <div className="flex gap-2 items-center cursor-pointer">
                          <Image className="w-10 h-10 rounded-full ring-2 ring-yellow-500 shadow-lg" src={User} alt="user image" />
                          <div className="flex flex-col text-left">
                            <h3 className="text-base leading-5 text-white font-semibold">{userRole}</h3>
                            <span className="text-xs text-gray-300">Owner</span>
                          </div>
                          <ArrowDownIcn />
                        </div>
                      </Space>
                    </Dropdown>
                  </div>
                )}
              </ul>
            </div>
          )}
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
                src="https://media.istockphoto.com/id/1049653176/photo/happy-thai-female-farmer-harvesting-rice-in-countryside-thailand.jpg?s=612x612&w=0&k=20&c=BD--rcVXQNb-2IE3gg-9BVm8HQ4QqfGjGB7WOFshdJw="
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
                src="https://www.foodnavigator.com/var/wrbm_gb_food_pharma/storage/images/5/5/8/9/1209855-1-eng-GB/Producer-groups-launch-FSMA-guidelines.jpg"
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
                src="https://blog.wenda-it.com/hubfs/Imported_Blog_Media/1616060834-distribuzionewarehouse2.jpg"
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
                src="https://corporate.tops.co.th/wp-content/uploads/2016/10/Fruit-1024x416.jpg"
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
