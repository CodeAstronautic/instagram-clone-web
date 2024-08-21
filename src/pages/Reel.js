import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { FaHeart, FaComment, FaBookmark, FaEllipsisH } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { FaRegComment, FaRegBookmark } from 'react-icons/fa';
import reel1 from '../assets/reel/reel1.mp4';
import reel2 from '../assets/reel/reel2.mp4';
import reel3 from '../assets/reel/reel3.mp4';
import reel4 from '../assets/reel/reel4.mp4';

const users = [
  {
    id: 'user1',
    name: 'Alex',
    profilePic: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: 'user2',
    name: 'Jamie',
    profilePic: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: 'user3',
    name: 'Jordan',
    profilePic: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    id: 'user4',
    name: 'Taylor',
    profilePic: 'https://randomuser.me/api/portraits/women/4.jpg'
  }
];

const Reel = () => {
  const [likes, setLikes] = useState({
    reel1: { count: 62200, liked: false },
    reel2: { count: 62200, liked: false },
    reel3: { count: 6200, liked: false },
    reel4: { count: 2000, liked: false }
  });

  const [comments, setComments] = useState({
    reel1: [{ userId: 'user1', text: 'Nice video!' }],
    reel2: [{ userId: 'user2', text: 'Love it!' }],
    reel3: [{ userId: 'user3', text: 'So funny!' }],
    reel4: [{ userId: 'user4', text: 'Amazing!' }]
  });

  const [commentCount, setCommentCount] = useState({
    reel1: 1,
    reel2: 1,
    reel3: 1,
    reel4: 1
  });

  const [showComments, setShowComments] = useState({
    reel1: false,
    reel2: false,
    reel3: false,
    reel4: false
  });

  const handleLike = (reel) => {
    setLikes(prevLikes => ({
      ...prevLikes,
      [reel]: {
        count: prevLikes[reel].liked
          ? prevLikes[reel].count - 1
          : prevLikes[reel].count + 1,
        liked: !prevLikes[reel].liked
      }
    }));
  };

  const handleCommentClick = (reel) => {
    setShowComments(prev => ({
      ...prev,
      [reel]: !prev[reel]
    }));
  };

  const handleAddComment = (e, reel) => {
    e.preventDefault();
    const newCommentText = e.target.comment.value;
    if (newCommentText.trim() === '') return;

    const randomUser = users[Math.floor(Math.random() * users.length)];

    setComments(prevComments => ({
      ...prevComments,
      [reel]: [...prevComments[reel], { userId: randomUser.id, text: newCommentText }]
    }));

    setCommentCount(prevCount => ({
      ...prevCount,
      [reel]: prevCount[reel] + 1
    }));

    e.target.reset();
  };

  const reels = [
    {
      url: reel1,
      user: 'officel_Kunu',
      profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTWBwS10Rq-_Huyc449gljfAm088EG8XNiog&s',
      caption: 'Mithudiii 🌍❤️',
      hashtags: '#love #trending',
      key: 'reel1'
    },
    {
      url: reel2,
      user: 'officel_raj_002',
      profilePic: 'https://images.unsplash.com/photo-1628563694622-5a76957fd09c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      caption: 'Mithudiii 👻🌍🐼',
      hashtags: '#funny #trending',
      key: 'reel2'
    },
    {
      url: reel3,
      user: 'Lion_World',
      profilePic: 'https://marketplace.canva.com/EAFSTby_Nnc/1/0/1600w/canva-black-and-blue-modern-instagram-profile-picture-gkkLzYu1aGg.jpg',
      caption: 'Mithudiii ❤️🐼',
      hashtags: '#love #trending #animal',
      key: 'reel3'
    },
    {
      url: reel4,
      user: 'King_lion',
      profilePic: 'https://marketplace.canva.com/EAFSTby_Nnc/1/0/1600w/canva-black-and-blue-modern-instagram-profile-picture-gkkLzYu1aGg.jpg',
      caption: 'Mithudiii 👻🌍',
      hashtags: '#Lion #trending',
      key: 'reel4'
    }
  ];

  return (
    <div className="w-[500px] m-auto reel-page flex flex-col items-center justify-center h-auto bg-[#fff]">
      {reels.map((reel, index) => (
        <div key={index} className="relative flex gap-[2rem] w-full h-full mt-[40px]">
          <ReactPlayer
            url={reel.url}
            playing
            muted
            loop
            controls={false}
            width="100%"
            height="100%"
            className="object-cover"
          />

          {/* Overlay Content */}
          <div className="absolute bottom-0 left-0 w-full p-4 text-white">
            {/* User Info */}
            <div className="flex items-center space-x-2 mb-2">
              <img
                className="w-8 h-8 rounded-full"
                src={reel.profilePic}
                alt="User Profile"
              />
              <div>
                <p className="font-bold">{reel.user}</p>
                <p className="text-sm">Follow</p>
              </div>
            </div>

            {/* Caption and Hashtags */}
            <p className="mb-2">
              {reel.caption} <span>{reel.hashtags}</span>
            </p>

            {/* Music Info */}
            <div className="flex items-center space-x-2">
              <img
                className="w-4 h-4"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTODEJ7TOuaO5wmqmQj7Y3aYpu0nHUJ7sxQAg&s"
                alt="Music Icon"
              />
              <p className="text-sm">Kaushik Bharwad · Albelo</p>
            </div>
          </div>

          {/* Like, Comment, Share Buttons */}
          <div>
            <div className="absolute top-[45em] transform -translate-y-1/2 flex flex-col items-center space-y-4 text-white">
              <div className="flex text-[#000] flex-col items-center">
                <div onClick={() => handleLike(reel.key)}>
                  {likes[reel.key].liked ? (
                    <FaHeart size={28} color="red" />
                  ) : (
                    <FiHeart size={28} />
                  )}
                </div>
                <span className="text-sm">{likes[reel.key].count}</span>
              </div>
              <div className="flex text-[#000] flex-col items-center">
                <div onClick={() => handleCommentClick(reel.key)}>
                  <FaRegComment size={28} />
                </div>
                <span className="text-sm">{commentCount[reel.key]}</span>
              </div>
              <div className="flex text-[#000] flex-col items-center">
                <FaRegBookmark size={28} />
              </div>
              <FaEllipsisH className='text-[#000]' size={28} />
              <img
                src={reel.profilePic}
                alt="Thumbnail"
                className="w-10 h-10 rounded-full mt-4"
              />
            </div>

            {/* Comments Section */}
            {showComments[reel.key] && (
              <div className="absolute top-[4rem] left-{1rem} w-[300px] h-auto shadow-2xl bg-white text-black z-10 p-4">
                <div className="mb-2">
                  {comments[reel.key].map((comment, idx) => {
                    const user = users.find(u => u.id === comment.userId);
                    return (
                      <p key={idx} className="mb-1">
                        <strong>
                          <img
                            src={user.profilePic}
                            alt={user.name}
                            className="w-6 h-6 rounded-full inline-block mr-2"
                          />
                          {user.name}:
                        </strong>
                        {comment.text}
                      </p>
                    );
                  })}
                </div>
                <form onSubmit={(e) => handleAddComment(e, reel.key)} className="flex mt-[17rem]">
                  <input
                    type="text"
                    name="comment"
                    placeholder="Add a comment..."
                    className="flex-grow px-2 py-1 w-[100px] bg- border border-gray-700 rounded"
                  />
                  <button type="submit" className="ml-2 bg-blue-500 px-4 py-1 rounded text-white">Post</button>
                </form>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reel;
