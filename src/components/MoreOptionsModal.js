// MoreOptionsModal.jsx
import React from 'react';
import { MdClose } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi'; // Settings icon
import { FaChartLine, FaBookmark, FaSignOutAlt } from 'react-icons/fa'; // Activity, Saved, Logout icons
import { IoMdSwitch } from 'react-icons/io'; // Switch Account icon

export const MoreOptionsModal = ({ setIsMoreModalOpen }) => {
    const closeModal = () => setIsMoreModalOpen(false);

    return (
        <div className="fixed inset-0 flex items-center justify-start z-50">
            <div className="bg-white shadow-xl ml-[1.7rem] mt-[28rem] p-6 rounded-lg w-[250px]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">More Options</h2>
                    <MdClose className="text-2xl cursor-pointer" onClick={closeModal} />
                </div>
                <ul className="space-y-2">
                    <li className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded">
                        <FiSettings className="text-xl mr-3" />
                        <span>Settings</span>
                    </li>
                    <li className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded">
                        <FaChartLine className="text-xl mr-3" />
                        <span>Your Activity</span>
                    </li>
                    <li className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded">
                        <FaBookmark className="text-xl mr-3" />
                        <span>Saved</span>
                    </li>
                    <li className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded">
                        <IoMdSwitch className="text-xl mr-3" />
                        <span>Switch Account</span>
                    </li>
                    <li className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded">
                        <FaSignOutAlt className="text-xl mr-3" />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};
