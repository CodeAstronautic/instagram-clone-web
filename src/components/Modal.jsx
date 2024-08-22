import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';


export const PostModal = ({ setIsModalOpen, onPostUploads }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [caption, setCaption] = useState('');
    const username = "azevde_ddr";


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleUpload = () => {
        if (selectedImage) {
            const newPost = { imageUrl: selectedImage, caption, author: username };
            if (typeof onPostUploads === 'function') {
                onPostUploads(newPost);
            } else {
                console.error('onPostUploads is not a function');
            }
            setSelectedImage(null);
            setCaption('');
            setIsModalOpen(false)
        }
    };
    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-[#000] bg-opacity-70 z-10"
            onClick={() => setIsModalOpen(false)}
        >
            <div
                className="bg-white p-6 rounded-lg w-auto h-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <h1 className="text-[16px] border-b-[1.5px] text-center">Create new Post</h1>
                <img className="w-[100px] h-[100px] mb-[25px] mt-[100px] m-auto" src='https://www.svgrepo.com/show/309921/resize-video.svg' alt="Upload Icon" />
                <h1 className="text-[20px] text-center mb-[20px]">Drag photos and videos here</h1>

                <div>
                    <div className="w-full flex justify-center m-auto mb-4">
                        {selectedImage ? (
                            <div className="relative">
                                <img
                                    src={selectedImage}
                                    alt="Selected"
                                    className="w-full h-64 object-cover rounded-lg"
                                />
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2"
                                >
                                    ✕
                                </button>
                            </div>
                        ) : (
                            <button className=" m-auto bg-[#1877F2] text-[#fff] hover:bg-[#0652dd] text-[14px] p-4 rounded-[10px] border-[1px]">
                                <label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    Select from computer
                                </label>
                            </button>
                        )}
                    </div>

                    {selectedImage && (
                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Write a caption..."
                            className="w-full p-2 mb-4 border border-gray-300 rounded-lg resize-none"
                        />
                    )}

                    <div className='text-center'>
                        <button
                            onClick={handleUpload}
                            disabled={!selectedImage}
                            className="w-[400px] px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
                        >
                            Share
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
