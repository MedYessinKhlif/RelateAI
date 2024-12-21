import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/navbar';

function Home() {
  const [chats, setChats] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [title, setTitle] = useState('New Chat');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const fetchChats = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/chats', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setChats(response.data);
        } catch (error) {
          console.error('Error fetching chats:', error);
          localStorage.removeItem('token');
          setIsLoggedIn(false);
          navigate('/signin');
        }
      };
      fetchChats();
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/chats',
        { title, prompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setChats((prev) => [...prev, response.data]);
      setPrompt('');
    } catch (error) {
      console.error('Error creating chat:', error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/signin');
      }
    }
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      {isLoggedIn ? (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Welcome to Gemini Chat</h1>
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="text"
              placeholder="Enter a title for your chat"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 mr-2"
            />
            <input
              type="text"
              placeholder="Enter your prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="border p-2 mr-2"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Send
            </button>
          </form>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.isArray(chats) && chats.length > 0 ? (
              chats.map((chat) => (
                <div key={chat._id} className="border p-4 rounded shadow">
                  <h2 className="font-bold">{chat.title}</h2>
                  <p>{chat.prompt}</p>
                  <p className="text-gray-500">{chat.response.substring(0, 100)}...</p>
                  <button
                    onClick={() => navigate(`/chats/${chat._id}`)}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    View Full Chat
                  </button>
                </div>
              ))
            ) : (
              <div>No chats available</div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Gemini Chat</h1>
            <p className="text-lg mb-4">Sign in or sign up to start chatting!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;