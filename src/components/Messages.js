import React, { useState, useEffect } from "react";

const Messages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch("http://localhost:16009/api/user-messages", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setMessages(data.messages || []);
                }
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            }
        };

        fetchMessages();
    }, []);

    return (
        <div className="messages-container">
            <h2>Tin nhắn</h2>
            {messages.length > 0 ? (
                <ul>
                    {messages.map((msg) => (
                        <li key={msg.Log_ID}>
                            <p><strong>Người tạo:</strong> {msg.Create_by}</p>
                            <p><strong>Nội dung:</strong> {msg.Message_Content}</p>
                            <p><strong>Thời gian:</strong> {new Date(msg.Timestamp).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Không có tin nhắn nào.</p>
            )}
        </div>
    );
};

export default Messages;
