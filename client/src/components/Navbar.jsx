import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdExitToApp } from 'react-icons/md';
import RelateAI from '../assets/RelateAI.png';

function Navbar({ isLoggedIn }) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/signout', {
        method: 'POST',
        credentials: 'include', // Ensure credentials are included
      });
  
      if (response.ok) {
        localStorage.removeItem('token');
        navigate('/signin');
      } else {
        console.error('Failed to sign out');
      }
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <nav className="bg-gray-100 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20"> {/* Increased height */}
          <a href="/" className="flex flex-shrink-0 items-center">
            <img
              src={RelateAI}
              alt="RelateAI"
              className="mx-auto h-20 w-auto pointer-events-none select-none" // Adjusted image height
            />
          </a>
          <div className="flex space-x-4">
            {isLoggedIn ? (
              <a
                href="#"
                onClick={handleSignOut}
                className="text-gray-600 hover:text-gray-900 flex items-center space-x-2 px-4 py-2 text-sm font-medium"
              >
                <MdExitToApp className="text-lg" />
                <span>Sign Out</span>
              </a>
            ) : (
              <>
                <a
                  href="/signin"
                  className="text-gray-600 hover:text-gray-900 px-4 py-2 text-sm font-medium"
                >
                  Sign In
                </a>
                <a
                  href="/signup"
                  className="text-gray-600 hover:text-gray-900 px-4 py-2 text-sm font-medium"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Navbar;