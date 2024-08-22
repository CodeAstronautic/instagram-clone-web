import React, { useState, useEffect } from 'react';

const Suggestions = () => {
    // Initialize followStatus with default values including at least one default follower
    const [followStatus, setFollowStatus] = useState(() => {
        const savedFollowStatus = localStorage.getItem('followStatus');
        return savedFollowStatus ? JSON.parse(savedFollowStatus) : {
            officel_Kunu: {
                followed: false,
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTWBwS10Rq-_Huyc449gljfAm088EG8XNiog&s',
                details: 'Lorem ipsum dolor sit amet',
                private: true,
                followers: ['m_kundan'], // Default follower
                followedBy: 'm_kundan' // Default followed by message
            },
            kavbya_007: {
                followed: false,
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP059lc6iDmN4G4lHXG1yQGS4bhlJUHeuWaw&s',
                details: 'Consectetur adipiscing elit',
                private: false,
                followers: ['j_doe'], // Default follower
                followedBy: 'j_doe' // Default followed by message
            },
            NotGamer_Fleet: {
                followed: false,
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJqypyYsjRrcAZlRKc-zAjeENINffo7EN2Pw&s',
                details: 'Sed do eiusmod tempor incididunt',
                private: true,
                followers: ['x_player'], // Default follower
                followedBy: 'x_player' // Default followed by message
            },
            Pinki_shidhu: {
                followed: false,
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTODEJ7TOuaO5wmqmQj7Y3aYpu0nHUJ7sxQAg&s',
                details: 'Ut labore et dolore magna aliqua',
                private: false,
                followers: ['n_smith'], // Default follower
                followedBy: 'n_smith' // Default followed by message
            },
            rakhi_Moni: {
                followed: false,
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaJBFx3frl4NbdX5VJbn7FpawQoXxH2vYCfA&s',
                details: 'Enim ad minim veniam',
                private: true,
                followers: ['z_queen'], // Default follower
                followedBy: 'z_queen' // Default followed by message
            }
        };
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        localStorage.setItem('followStatus', JSON.stringify(followStatus));
    }, [followStatus]);

    const toggleFollow = (user) => {
        setFollowStatus((prevStatus) => {
            const newFollowStatus = {
                ...prevStatus,
                [user]: { ...prevStatus[user], followed: !prevStatus[user].followed }
            };
            const action = newFollowStatus[user].followed ? 'followed' : 'unfollowed';
            setMessage(`${user} has been ${action}.`);
            setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
            return newFollowStatus;
        });
    };

    return (
        <div>
            <p className="text-gray-500 font-semibold mb-4">Suggestions For You</p>
            <div className="relative space-y-4">
                {Object.entries(followStatus).map(([user, { followed, avatar, details, private: isPrivate, followedBy }]) => (
                    <div key={user} className="relative flex items-center justify-between group">
                        <div className="flex items-center space-x-4">
                            <img className="w-[64px] h-[64px] rounded-full" src={avatar} alt={user} />
                            <div>
                                <p className="font-semibold">{user}</p>
                                <p className="text-sm text-gray-500">
                                    Followed by m_kundan
                                </p>
                            </div>
                        </div>
                        <button
                            className="text-blue-500 text-sm font-semibold"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent the user click handler from firing
                                toggleFollow(user);
                            }}
                        >
                            {followed ? 'Unfollow' : 'Follow'}
                        </button>
                        <div className="absolute hidden group-hover:block bg-white border border-gray-300 rounded-lg shadow-lg z-10 left-0 -bottom-20 transform p-4 w-64">
                            <div className="flex items-center space-x-3">
                                <img className="w-16 h-16 rounded-full" src={avatar} alt={user} />
                                <div>
                                    <p className="font-semibold text-sm">{user}</p>
                                    <p className="text-xs text-gray-600">{details}</p>
                                    {isPrivate && (
                                        <div className="flex items-center text-gray-500 mt-2 text-xs">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V5a1 1 0 0 1 1-1zm1 10a1 1 0 0 1-1 1 1 1 0 0 1-1-1h2zm-3-4h6v4H7v-4zM4 12c0 4 2.5 7 7 7 4.5 0 7-3 7-7 0-4-2.5-7-7-7-4.5 0-7 3-7 7z"></path>
                                            </svg>
                                            <span>Private Account</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {message && (
                <div className="mt-4 p-3 bg-blue-100 text-blue-800 rounded-md shadow-md">
                    {message}
                </div>
            )}
        </div>
    );
};

export default Suggestions;
