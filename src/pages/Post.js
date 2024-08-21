import React, { useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { MdOutlineAddBox, MdClose } from 'react-icons/md';
import { GoSearch, GoHomeFill } from 'react-icons/go';
import { BiMessageRoundedDots } from 'react-icons/bi';
import { FaThreads } from 'react-icons/fa6';
import InstagramLogo from '../assets/logo/InstagramLogo.png';
import { VscAdd } from "react-icons/vsc";
import { PostModal } from '../components/Modal';

const Post = ({ setSelectedMenuItem,  onPostUpload }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <div
                onClick={() => setIsModalOpen(true)}
                className="w-[350px] h-[50px] rounded-[10px] p-[10px] pb-[10px] flex items-center space-x-4 cursor-pointer bg-[#e2e2e2] "
            >
                <VscAdd />

            </div>
            {isModalOpen && (
                <PostModal setIsModalOpen={setIsModalOpen} setSelectedMenuItem={setSelectedMenuItem} onPostUploads={onPostUpload}  />
            )}
        </div>
    );
}
export default Post;