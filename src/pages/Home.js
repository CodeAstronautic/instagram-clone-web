import React, { useState, useEffect } from 'react';
import { FaTrash, FaEllipsisV } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import { FcLike } from 'react-icons/fc';
import { Sidebar } from '../components/Sidebar';
import Suggestions from './Suggestions';
import Profile from './Profile';
import Reel from './Reel';

function Home() {
    const [selectedMenuItem, setSelectedMenuItem] = useState('Home');
    const [posts, setPosts] = useState(() => {
        const savedPosts = localStorage.getItem('posts');
        return savedPosts ? JSON.parse(savedPosts) : [];
    });
    const [stories, setStories] = useState(() => {
        const savedStories = localStorage.getItem('stories');
        return savedStories ? JSON.parse(savedStories) : [];
    });
    const [selectedStory, setSelectedStory] = useState(null);
    const [followStatus, setFollowStatus] = useState({
        officel_Kunu: { followed: false, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTWBwS10Rq-_Huyc449gljfAm088EG8XNiog&s' },
        kavbya_007: { followed: false, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP059lc6iDmN4G4lHXG1yQGS4bhlJUHeuWaw&s' },
        NotGamer_Fleet: { followed: false, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJqypyYsjRrcAZlRKc-zAjeENINffo7EN2Pw&s' },
        Pinki_shidhu: { followed: false, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTODEJ7TOuaO5wmqmQj7Y3aYpu0nHUJ7sxQAg&s' },
        rakhi_Moni: { followed: false, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaJBFx3frl4NbdX5VJbn7FpawQoXxH2vYCfA&s' }
    });

    const [showPostOptions, setShowPostOptions] = useState(null);
    const [likedPosts, setLikedPosts] = useState(() => {
        const savedLikes = localStorage.getItem('likedPosts');
        return savedLikes ? new Set(JSON.parse(savedLikes)) : new Set();
    });
    const [editingPost, setEditingPost] = useState(null);
    const [newCaption, setNewCaption] = useState('');
    const [newImage, setNewImage] = useState(null);

    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
    }, [posts]);

    useEffect(() => {
        localStorage.setItem('likedPosts', JSON.stringify(Array.from(likedPosts)));
    }, [likedPosts]);

    useEffect(() => {
        localStorage.setItem('stories', JSON.stringify(stories));
    }, [stories]);

    const handleLike = (id) => {
        setLikedPosts(prev => {
            const newLikes = new Set(prev);
            if (newLikes.has(id)) {
                newLikes.delete(id);
            } else {
                newLikes.add(id);
            }
            return newLikes;
        });
    };

    const handleStoryUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setStories(prevStories => [
                    ...prevStories,
                    { id: Date.now(), src: reader.result, type: file.type.includes('video') ? 'video' : 'image', uploaderName: generateRandomName() }
                ]);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileSelect = () => {
        document.getElementById('fileInput').click();
    };

    const openStory = (story) => {
        setSelectedStory(story);
    };

    const closeStory = () => {
        setSelectedStory(null);
    };

    const deleteStory = () => {
        setStories(prevStories => {
            const updatedStories = prevStories.filter(story => story.id !== selectedStory.id);
            return updatedStories;
        });
        closeStory();
    };

    const generateRandomName = () => {
        const names = ['JohnDoe', 'JaneSmith', 'AliceJohnson', 'BobBrown', 'CharlieDavis'];
        return names[Math.floor(Math.random() * names.length)];
    };

    const toggleFollow = (user) => {
        setFollowStatus(prevStatus => ({
            ...prevStatus,
            [user]: { ...prevStatus[user], followed: !prevStatus[user].followed }
        }));
    };

    const handlePostUpload = (newPost) => {
        setPosts(prevPosts => [...prevPosts, { id: prevPosts.length + 1, ...newPost }]);
    };

    const handlePostOptionsClick = (id) => {
        setShowPostOptions(id === showPostOptions ? null : id);
    };

    const handleEditPost = (post) => {
        setEditingPost(post);
        setNewCaption(post.caption);
        setNewImage(null);
        handlePostOptionsClick(post.id);
    };

    const handleDeletePost = () => {
        const confirmed = window.confirm('Are you sure you want to delete this post?');
        if (confirmed) {
            setPosts(prevPosts => prevPosts.filter(post => post.id !== showPostOptions));
            setShowPostOptions(null);
        }
    };

    const handleEditCaptionChange = (event) => {
        setNewCaption(event.target.value);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveEdit = () => {
        if (editingPost) {
            setPosts(prevPosts => prevPosts.map(post =>
                post.id === editingPost.id
                    ? { ...post, caption: newCaption, imageUrl: newImage || post.imageUrl }
                    : post
            ));
            setEditingPost(null);
        }
    };

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleStoryUpload}
                accept="image/*, video/*"
            />
            <input
                type="file"
                id="editImageInput"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
                accept="image/*"
            />
            <Sidebar setSelectedMenuItem={setSelectedMenuItem} selectedMenuItem={selectedMenuItem} handlePostUpload={handlePostUpload} />

            <div className="w-3/5 p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 4rem)' }}>

                {selectedMenuItem === 'Profile' &&
                    <Profile />
                }
                {selectedMenuItem === 'Reels' &&
                    <Reel />
                }
                {selectedMenuItem === 'Home' &&
                    <>
                        <div className="flex space-x-4 overflow-x-auto mb-8">
                            <div>
                                <li className="flex flex-col items-center space-y-1">
                                    <div className="relative bg-gradient-to-tr from-yellow-400 to-purple-600 p-1 rounded-full">
                                        <a onClick={triggerFileSelect} className="block bg-white p-1 rounded-full transform transition hover:-rotate-6 cursor-pointer">
                                            <img className="h-[65px] w-[65px] rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ718nztPNJfCbDJjZG8fOkejBnBAeQw5eAUA&s" />
                                        </a>
                                        <button onClick={triggerFileSelect} className="absolute bg-blue-500 text-white text-2xl font-medium w-8 h-8 rounded-full bottom-0 right-1 border-4 border-white flex justify-center items-center font-mono hover:bg-blue-700 focus:outline-none">
                                            <div className="transform -translate-y-px">+</div>
                                        </button>
                                    </div>
                                    <h1>azevde_dd</h1>
                                </li>
                            </div>
                            {stories.map((story) => (
                                <div key={story.id}>
                                    <li className="flex flex-col items-center space-y-1">
                                        <div className="relative bg-gradient-to-tr from-yellow-400 to-purple-600 p-1 rounded-full">
                                            <a onClick={() => openStory(story)} className="block bg-white p-1 rounded-full transform transition hover:-rotate-6 cursor-pointer">
                                                <div>
                                                    {story.type === 'video' ? (
                                                        <video className="h-[65px] w-[65px] rounded-full" src={story.src} alt="Story" />
                                                    ) : (
                                                        <img className="h-[65px] w-[65px] rounded-full" src={story.src} alt="Story" />
                                                    )}
                                                </div>
                                            </a>
                                        </div>
                                        <h1>{story.uploaderName}</h1>
                                    </li>
                                </div>
                            ))}
                        </div>

                        <div>
                            <div className="flex flex-col space-y-4">
                                {posts.map((post) => (
                                    <div key={post.id} className="bg-white shadow-md rounded-lg mb-4">
                                        {/* Post Options */}
                                        <div className="relative">
                                            <button
                                                onClick={() => handlePostOptionsClick(post.id)}
                                                className="absolute top-2 right-2 text-gray-600 text-lg"
                                            >
                                                <FaEllipsisV />
                                            </button>
                                            {showPostOptions === post.id && (
                                                <div className="absolute top-8 right-2 bg-white shadow-md rounded-lg border">
                                                    <button
                                                        onClick={() => handleEditPost(post)}
                                                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={handleDeletePost}
                                                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        {/* Post Image */}
                                        <img src={post.imageUrl} alt={`Post ${post.id}`} className="w-full" />
                                        {/* Post Actions */}
                                        <div className="flex items-center justify-between px-4 py-2">
                                            <div className="flex items-center space-x-4">
                                                <button
                                                    onClick={() => handleLike(post.id)}
                                                    className="text-[30px] transition-colors duration-300"
                                                >
                                                    {likedPosts.has(post.id) ? (
                                                        <FcLike className='text-[30px]' />
                                                    ) : (
                                                        <CiHeart className='text-[30px]' />
                                                    )}
                                                </button>
                                                <div className="text-[27px] transition-colors duration-300">
                                                    <svg aria-label="Comment" className="x1lliihq x1n2onr6 x5n08af"
                                                        fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                                        <title>Comment</title>
                                                        <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                                                            fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <svg aria-label="Share Post" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor"
                                                        height="24" role="img" viewBox="0 0 24 24" width="24">
                                                        <title>Share Post</title>
                                                        <line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"
                                                            x1="22" x2="9.218" y1="3" y2="10.083"></line>
                                                        <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                                                            stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Post Caption */}
                                        <div className="px-4 pb-4">
                                            <span className="font-semibold">{post.author} </span>
                                            <span>{post.caption}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                }
            </div>
            {selectedMenuItem !== 'Profile' &&
                <div className="w-1/5 p-4 border-l bg-white">
                    <div className="mb-8">
                        <div className="flex items-center space-x-4">
                            <img className="w-16 h-16 rounded-full" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ718nztPNJfCbDJjZG8fOkejBnBAeQw5eAUA&s' />
                            <div>
                                <p className="font-semibold">azevde_ddr</p>
                                <p className="text-sm text-gray-500">Azevedo</p>
                            </div>
                            <button className="text-blue-500 text-sm font-semibold">Switch</button>
                        </div>
                    </div>
                    <Suggestions />
                </div>
            }
            {/* Story Modal */}
            {selectedStory && (
                <div onClick={closeStory} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                    <div className="w-[400px] h-[510px]">
                        <div className="relative">
                            {selectedStory.type === 'video' ? (
                                <video className="h-[500px] w-[500px] object-cover rounded-lg" src={selectedStory.src} autoPlay controls />
                            ) : (
                                <img className="h-[500px] w-[500px] object-cover rounded-lg" src={selectedStory.src} alt="Story" />
                            )}
                            <button
                                onClick={closeStory}
                                className="absolute top-2 right-2 text-white text-2xl font-bold bg-black bg-opacity-50 p-2 rounded-full"
                            >
                                &times;
                            </button>
                            <button
                                onClick={deleteStory}
                                className="absolute top-2 left-2 text-white text-2xl font-bold bg-red-600 bg-opacity-50 p-2 rounded-full flex items-center"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Edit Post Modal */}
            {editingPost && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                    <div className="w-[400px] p-6 bg-white rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
                        <input
                            type="file"
                            id="editImageInput"
                            style={{ display: 'none' }}
                            onChange={handleImageUpload}
                            accept="image/*"
                        />
                        <div className="mb-4">
                            <label htmlFor="caption" className="block text-sm font-medium text-gray-700">Caption</label>
                            <input
                                id="caption"
                                type="text"
                                value={newCaption}
                                onChange={handleEditCaptionChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <button
                                onClick={() => document.getElementById('editImageInput').click()}
                                className="text-blue-500"
                            >
                                {newImage ? 'Change Image' : 'Upload Image'}
                            </button>
                        </div>
                        {newImage && (
                            <div className="mb-4">
                                <img src={newImage} alt="New" className="w-full h-auto rounded-md" />
                            </div>
                        )}
                        <div className="flex space-x-4">
                            <button
                                onClick={handleSaveEdit}
                                className="bg-blue-500 text-white py-2 px-4 rounded-md"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setEditingPost(null)}
                                className="bg-gray-300 text-black py-2 px-4 rounded-md"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
