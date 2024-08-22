import React, { useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { MdOutlineAddBox, MdClose } from 'react-icons/md';
import { GoSearch, GoHomeFill } from 'react-icons/go';
import { BiMessageRoundedDots } from 'react-icons/bi';
import { FaThreads } from 'react-icons/fa6';
import InstagramLogo from '../assets/logo/InstagramLogo.png';
import reel from '../assets/navlogo/reel.png';
import { PostModal } from './Modal';
import { MoreOptionsModal } from './MoreOptionsModal'; 

export const Sidebar = ({ setSelectedMenuItem, selectedMenuItem, onPostUpload, username, handlePostUpload }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [showNames, setShowNames] = useState(true); // State to toggle names

    const openPostModal = () => setIsModalOpen(true);
    const closePostModal = () => setIsModalOpen(false);
    const openMoreModal = () => setIsMoreModalOpen(true);
    const closeMoreModal = () => setIsMoreModalOpen(false);

    const handleMenuItemClick = (itemName, action) => {
        if (itemName === 'Messages') {
            setShowNames(false); // Hide names when "Messages" is clicked
        } else {
            setShowNames(true); // Show names for other pages
        }
        if (action) {
            action();
        } else {
            setSelectedMenuItem(itemName);
        }
    };

    const menuItems = [
        { name: 'Home', icon: <GoHomeFill className="text-[28px]" /> },
        { name: 'Search', icon: <GoSearch className="text-[28px]" /> },
        { name: 'Reels', icon: <img className="w-[28px] h-[28px]" src={reel} alt="Reels" /> },
        { name: 'Messages', icon: <BiMessageRoundedDots className="text-[28px]" /> },
        { name: 'Notifications', icon: <CiHeart className="text-[28px]" /> },
        { name: 'Create', icon: <MdOutlineAddBox className="text-[28px]" />, action: openPostModal },
        { name: 'Profile', icon: <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ718nztPNJfCbDJjZG8fOkejBnBAeQw5eAUA&s' className="rounded-full w-7 h-7" alt="Profile" /> },
    ];

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleUpload = () => {
        if (selectedImage) {
            const newPost = { imageUrl: selectedImage, caption, author: username };
            if (typeof onPostUpload === 'function') {
                onPostUpload(newPost);
            } else {
                console.error('onPostUpload is not a function');
            }
            setSelectedImage(null);
            setCaption('');
        }
    };

    return (
        <div>
            <div className="w-[383px] bg-white p-4 border-r">
                <div className="text-2xl font-bold mb-[15px]">
                    <img className="w-[150px]" src={InstagramLogo} alt="Instagram Logo" />
                </div>
                <nav className="space-y-4 block">
                    {menuItems.map((item) => (
                        <div
                            key={item.name}
                            onClick={() => handleMenuItemClick(item.name, item.action)}
                            className={`hover:bg-[#f2f2f2] w-[350px] h-[50px] rounded-[10px] p-[10px] pb-[10px] flex items-center space-x-4 cursor-pointer ${selectedMenuItem === item.name ? 'bg-[#e2e2e2] text-[#000]' : 'text-gray-800'
                                }`}
                        >
                            {item.icon}
                            {showNames && <span>{item.name}</span>}
                        </div>
                    ))}
                </nav>
                <div className="pt-[300px]">
                    <div className={`hover:bg-[#f2f2f2] w-[350px] h-[50px] rounded-[10px] p-[10px] pb-[20px] flex items-center space-x-4 cursor-pointer ${selectedMenuItem === 'Threads' ? 'bg-[#e2e2e2] text-[#000]' : 'text-gray-800'
                        }`}>
                        <FaThreads className="text-[28px]" />
                        {showNames && <span>Threads</span>}
                    </div>
                    <div
                        onClick={openMoreModal}
                        className="hover:bg-[#f2f2f2] w-[350px] h-[50px] rounded-[10px] p-[10px] pb-[10px] flex items-center space-x-4 cursor-pointer"
                    >
                        <svg aria-label="Settings" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                            <title>Settings</title>
                            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="4" y2="4"></line>
                            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="12" y2="12"></line>
                            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="20" y2="20"></line>
                        </svg>
                        {showNames && <span>More</span>}
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <PostModal setIsModalOpen={setIsModalOpen} onPostUploads={handlePostUpload} />
            )}

            {isMoreModalOpen && (
                <MoreOptionsModal setIsMoreModalOpen={setIsMoreModalOpen} />
            )}
        </div>
    );
}
