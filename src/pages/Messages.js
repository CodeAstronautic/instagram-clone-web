import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Messages = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleInputChange = (e) => setMessage(e.target.value);

    const handleSendMessage = () => {
        if (message.trim()) {
            setMessages([...messages, { text: message, fromMe: true }]);
            setMessage('');
        }
    };

    return (
        <div>
            {/* <div className="h-full flex flex-col p-4">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-2">
                <span className="font-bold text-lg">Messages</span>
            </div>
            
            <div className="flex-1 overflow-y-auto mb-2">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'} mb-2`}>
                        {!msg.fromMe && <FaUserCircle className="text-2xl text-gray-600" />}
                        <div className={`max-w-xs p-2 rounded-lg ${msg.fromMe ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="flex items-center border-t border-gray-300 pt-2">
                <input
                    type="text"
                    value={message}
                    onChange={handleInputChange}
                    placeholder="Type a message..."
                    className="flex-1 border border-gray-300 rounded-lg p-2"
                />
                <button
                    onClick={handleSendMessage}
                    className="ml-2 bg-blue-500 text-white rounded-lg px-4 py-2"
                >
                    Send
                </button>
            </div>
        </div> */}
        </div>
    );
};

export default Messages;
