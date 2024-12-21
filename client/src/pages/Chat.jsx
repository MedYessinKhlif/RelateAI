import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiArrowBack } from "react-icons/bi";

function Chat() {
  const { id } = useParams();
  const [chat, setChat] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const fetchChat = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/chats/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setChat(response.data);
        } catch (error) {
          console.error("Error fetching chat:", error);
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          navigate("/signin");
        } finally {
          setIsLoading(false);
        }
      };
      fetchChat();
    } else {
      setIsLoading(false); 
    }
  }, [id, navigate]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/chats/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/");
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex justify-center">
          <div className="animate-spin border-t-transparent border-solid rounded-full border-4 w-8 h-8 border-gray-600"></div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to RelateAI Chat</h1>
          <p className="text-lg mb-4">Sign in or sign up to view this chat!</p>
        </div>
      </div>
    );
  }

  if (!chat) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex justify-center">
          <div className="animate-spin border-t-transparent border-solid rounded-full border-4 w-8 h-8 border-gray-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-20 xl:p-24 mx-4 sm:mx-8 md:mx-12 lg:mx-20 xl:mx-24 font-georgia relative">
        <div className="w-full max-w-3xl space-y-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
            {chat.title}
          </h1>
          <p className="mb-4">{chat.prompt}</p>
          <p className="text-gray-500">{chat.response}</p>

          <div className="flex justify-end space-x-4 absolute top-4 right-4 sm:top-8 sm:right-8">
            <button
              onClick={() => navigate("/")}
              className="text-black p-2 rounded-full"
            >
              <BiArrowBack size={24} />
            </button>
            <button
              onClick={handleDelete}
              className="text-red-900 p-2 rounded-full"
            >
              <RiDeleteBinLine size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;