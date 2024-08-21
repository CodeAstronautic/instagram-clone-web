import React, { useState, useEffect } from 'react';

const Suggestions = () => {
    // Initialize follow status from localStorage or use default values
    const [followStatus, setFollowStatus] = useState(() => {
        const savedFollowStatus = localStorage.getItem('followStatus');
        return savedFollowStatus ? JSON.parse(savedFollowStatus) : {
            officel_Kunu: { followed: false, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTWBwS10Rq-_Huyc449gljfAm088EG8XNiog&s' },
            kavbya_007: { followed: false, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP059lc6iDmN4G4lHXG1yQGS4bhlJUHeuWaw&s' },
            NotGamer_Fleet: { followed: false, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJqypyYsjRrcAZlRKc-zAjeENINffo7EN2Pw&s' },
            Pinki_shidhu: { followed: false, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTODEJ7TOuaO5wmqmQj7Y3aYpu0nHUJ7sxQAg&s' },
            rakhi_Moni: { followed: false, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaJBFx3frl4NbdX5VJbn7FpawQoXxH2vYCfA&s' }
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
            <div className="space-y-4">
                {Object.entries(followStatus).map(([user, { followed, avatar }]) => (
                    <div key={user} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <img className="w-[64px] h-[64px] rounded-full" src={avatar} alt={user} />
                            <div>
                                <p className="font-semibold">{user}</p>
                                <p className="text-sm text-gray-500">Followed by m_kundan</p>
                            </div>
                        </div>
                        <button
                            className="text-blue-500 text-sm font-semibold"
                            onClick={() => toggleFollow(user)}
                        >
                            {followed ? 'Unfollow' : 'Follow'}
                        </button>
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
