import React, { useState } from 'react';
import { BsCardImage } from 'react-icons/bs';

const InstagramPostUploader = ({ onPostUpload, username }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (selectedImage) {
      const newPost = { imageUrl: selectedImage, caption, author: username };
      onPostUpload(newPost);
      setSelectedImage(null);
      setCaption('');
    }
  };

  return (
    <div>
      <div className="w-full mb-4">
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
          <label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
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

      <button
        onClick={handleUpload}
        disabled={!selectedImage}
        className="w-[400px] px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
      >
        Share
      </button>
    </div>
  );
};

export default InstagramPostUploader;
