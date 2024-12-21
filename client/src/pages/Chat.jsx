import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/navbar';

function ChatDetail() {
  const { id } = useParams();
  const [chat, setChat] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const fetchChat = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/chats/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setChat(response.data);
        } catch (error) {
          console.error('Error fetching chat:', error);
          localStorage.removeItem('token');
          setIsLoggedIn(false);
          navigate('/signin');
        }
      };
      fetchChat();
    }
  }, [id, navigate]);

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Gemini Chat</h1>
          <p className="text-lg mb-4">Sign in or sign up to view this chat!</p>
        </div>
      </div>
    );
  }

  if (!chat) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">{chat.title}</h1>
        <p className="mb-4">{chat.prompt}</p>
        <p className="text-gray-500">{chat.response}</p>
        <button onClick={() => navigate('/')} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default ChatDetail;