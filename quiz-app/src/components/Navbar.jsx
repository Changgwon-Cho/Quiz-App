import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('currentUser'));
  const isLoggedIn = !!user;

  const handleLogoClick = () => {
    if (isLoggedIn) {
      if (user.role === 'user') {
        navigate('/user');
      } else if (user.role === 'admin') {
        navigate('/admin');
      }
    } else {
      navigate('/');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="text-xl font-bold cursor-pointer" onClick={handleLogoClick}>
        Quiz App
      </div>
      {isLoggedIn && (
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Current User : {user.username}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}