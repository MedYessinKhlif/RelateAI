import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GrSend } from "react-icons/gr";
import Navbar from "../components/navbar";
import TypingEffect from "react-typing-effect";
import Jumbotron from "../components/Jumbotron";
import NoDataImage from "../assets/NoData.png";
import Footer from "../components/Footer"; 

function Home() {
  const [chats, setChats] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const fetchChats = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/chats", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setChats(response.data);
        } catch (error) {
          console.error("Error fetching chats:", error);
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          navigate("/signin");
        }
      };
      fetchChats();
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/chats",
        { prompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.message === "Please provide a life story or problem") {
        setIsLoading(false);
        return;
      }

      setChats((prev) => [...prev, response.data]);
      setPrompt("");
      setResponse(response.data.response);
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating chat:", error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/signin");
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 mx-2 md:mx-10 lg:mx-20 font-georgia">
        {isLoggedIn ? (
          <div className="w-full space-y-4">
            <h1 className="text-3xl font-bold text-center mb-4">
              <TypingEffect
                text={["Welcome to RelateAI"]}
                speed={100}
                eraseDelay={6000}
                cursor={"_"}
                className="typing-effect"
              />
            </h1>

            {response && (
              <div className="p-4 border rounded-md h-48 overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200">
                <h2 className="font-semibold mb-2">RelateAI:</h2>
                <div className="text-sm">
                  <TypingEffect text={response} speed={10} eraseDelay={90000} />
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex justify-center">
                <div className="animate-spin border-t-transparent border-solid rounded-full border-4 w-8 h-8 border-gray-600"></div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="relative flex flex-col items-center">
              <input
                type="text"
                placeholder="Enter a life problem or challenge"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full max-w-lg border p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit(e);
                  }
                }}
              />
              <small className="text-gray-500 mt-2">
                Please provide a relevant life problem or challenge. Irrelevant content will not be prompted.
              </small>
              <button
                type="submit"
                className="mt-4 text-black p-2 rounded-full flex items-center justify-center w-10 h-10"
              >
                <GrSend className="text-2xl" />
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {Array.isArray(chats) && chats.length > 0 ? (
                chats.map((chat) => (
                  <div
                    key={chat._id}
                    className="bg-gray-100 border p-4 rounded-md relative"
                  >
                    <h2 className="font-bold">{chat.title}</h2>
                    <p>{chat.prompt}</p>
                    <p className="text-gray-500">
                      {chat.response.substring(0, 100)}...
                    </p>
                    <a
                      href={`/chats/${chat._id}`}
                      className="absolute bottom-3 right-3 text-blue-500 hover:underline"
                    >
                      Read more...
                    </a>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <img src={NoDataImage} alt="No Data Available" className="w-1/3 mb-4"/>
                  <p className="text-gray-500 text-lg">You still have no chat</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Jumbotron />
        )}
      </div>
      <Footer />
    </>
  );
}

export default Home;