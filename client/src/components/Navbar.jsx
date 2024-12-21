import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navbar({ isLoggedIn }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="text-white text-xl font-bold">Gemini Chat</div>
      <div>
        {isLoggedIn ? (
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate('/signin')}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Navbar;