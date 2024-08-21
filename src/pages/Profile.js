import React, { useState } from 'react';
import { TfiSettings } from 'react-icons/tfi';
import { IoMdAdd } from "react-icons/io";
import { AiOutlineInsertRowRight } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { RiPriceTag2Fill } from "react-icons/ri";
import { CiCamera } from "react-icons/ci";
import { MdClose } from "react-icons/md";
const Profile = () => {
  const [followingCount, setFollowingCount] = useState(300); // Initial count
  const [highlights, setHighlights] = useState([]); // Array to store highlights
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleFollow = () => {
    setFollowingCount(followingCount + 1); // Increment the following count
  };

  const handleAddHighlight = () => {
    const name = prompt("Enter the name of the new highlight:");
    const imageUrl = prompt("Enter the image URL for the highlight:");
    if (name && imageUrl) {
      setHighlights([...highlights, { name, imageUrl, id: Date.now() }]);
    }
  };

  const handleDeleteHighlight = (id) => {
    setHighlights(highlights.filter(highlight => highlight.id !== id));
  };

  return (
    <div>
      <div className="w-[975px] h-[790px] m-auto pt-[30px] pl-[20px] pr-[20px]">
        <div className="flex justify-center items-center">
          <img
            className="w-[150px] h-[150px] rounded-full border-4 border-gray-200"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ718nztPNJfCbDJjZG8fOkejBnBAeQw5eAUA&s"
            alt="Profile"
          />
          <div className="ml-[40px]">
            <div className="mb-[20px] flex items-center justify-center space-x-4">
              <h1 className="text-xl font-semibold">azevde_dd</h1>
              <button className="bg-[#e1e0e0] ml-4 px-4 py-2 rounded-full font-semibold text-sm">
                Edit Profile
              </button>
              <button className="bg-[#e1e0e0] ml-2 px-4 py-2 rounded-full font-semibold text-sm">
                View Archive
              </button>
              <TfiSettings className="text-2xl ml-2" />
            </div>
            <div className="mb-[20px] flex">
              <div className="flex text-center">
                <p className="text-lg font-semibold">2</p>
                <p className="text-gray-600 ml-[8px]">Posts</p>
              </div>
              <div className="ml-[40px] flex text-center">
                <p className="text-lg font-semibold">{followingCount}</p>
                <p className="text-gray-600 ml-[8px]">Following</p>
              </div>
              <div className="ml-[40px] flex text-center">
                <p className="text-lg font-semibold">300</p>
                <p className="text-gray-600 ml-[8px]">Followers</p>
              </div>
            </div>
            <h1 className="text-[18px]">azevde</h1>
          </div>
        </div>

        {/* Add Highlight Button */}
        <div className="flex items-center justify-center mb-[50px]">
          <div onClick={handleAddHighlight} className="w-[115px] cursor-pointer p-[15px] h-[128px]">
            <div className="bg-[#f1f4f7] text-center p-[16px] w-[87px] h-[87px] rounded-full">
              <IoMdAdd className="text-[55px] text-gray-300" />
            </div>
            <h1 className="text-[15px] text-center pt-[10px]">New</h1>
          </div>

          {/* Display Highlights */}
          <div className="flex flex-wrap">
            {highlights.map((highlight) => (
              <div key={highlight.id} className="w-[115px] cursor-pointer p-[15px] h-[128px] text-center">
                <div className="bg-[#f1f4f7] text-center p-[16px] w-[87px] h-[87px] rounded-full">
                  <img
                    className="w-[100px] h-full rounded-full"
                    src={highlight.imageUrl}
                    alt={highlight.name}
                  />
                </div>
                <h1 className="text-[15px] text-center pt-[10px]">{highlight.name}</h1>
                {/* <button
                  onClick={() => handleDeleteHighlight(highlight.id)}
                  className="mt-2 text-red-500 text-sm"
                >
                  Delete
                </button> */}
              </div>
            ))}
          </div>
        </div>

        <div className="w-[705px] m-auto h-[1px] bg-[#a1a1a1]"></div>
        <div className="flex justify-center items-center">
          <div className="flex items-center justify-center">
            <AiOutlineInsertRowRight />
            <h1 className="text-[14px] ml-[5px]">POSTS</h1>
          </div>
          <div className="ml-[40px] flex items-center justify-center">
            <BsBookmark />
            <h1 className="text-[14px] ml-[5px]">SAVED</h1>
          </div>
          <div className="ml-[40px] flex items-center justify-center">
            <RiPriceTag2Fill />
            <h1 className="text-[14px] ml-[5px]">TAGGED</h1>
          </div>
        </div>
        <div className="w-[450px] m-auto text-center">
        <div className="w-[100px] h-[100px] p-[15px] m-auto mt-[40px] rounded-full border-[#000] mb-[20px] border-[1px]">
        <CiCamera onClick={openModal} className="text-[60px] m-auto" />
        </div>
        <h1 className="font-semibold text-[30px]">Share Photos</h1>
        <p className="text-[14px]">When you share photos, they will appear on your profile.</p>
        <span className="text-[14px] text-[#0095f6]">Share your First Photos</span>
        </div>
      </div>
      {isModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-[#000] bg-opacity-70"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white p-6 rounded-lg w-[600px] h-[600px]"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <h1 className="text-[16px] border-b-[1.5px] text-center">Create new Post</h1>
                        <img className="w-[100px] h-[100px] mb-[25px] mt-[100px] m-auto" src='https://www.svgrepo.com/show/309921/resize-video.svg' />
                        <h1 className="text-[20px] text-center mb-[20px]">Drag photos and videos here</h1>
                        <button className="w-[200px] h-[30px] bg-[#1877F2] text-[#fff] hover:bg-[#0652dd] text-[16px] p-[1px] rounded-[10px] border-[1px] ml-[180px]">Select from computer</button>
                    </div>
                    <button
                        className="absolute top-3 right-[30px] text-[#fff] text-[28px]"
                        onClick={closeModal}
                    >
                        <MdClose />
                    </button>
                </div>

            )}
    </div>
  );
};

export default Profile;
