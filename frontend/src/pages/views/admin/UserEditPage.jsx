import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext'; // Adjust path
import axios from 'axios';

const UserEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: authUser } = useAuth(); // Get the logged-in admin's info

  // State for the user being edited
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('User'); // Default to "User"
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${authUser.token}` },
        };
        const { data } = await axios.get(`/api/users/${id}`, config);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setUsername(data.username);
        setEmail(data.email);
        setUserType(data.userType); // This will be "User", "Admin", or "Vendor"
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
        setLoading(false);
      }
    };
    if (authUser.token) {
        fetchUser();
    }
  }, [id, authUser.token]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUser.token}`,
        },
      };
      const body = { firstName, lastName, username, email, userType };
      await axios.put(`/api/users/${id}`, body, config);
      
      setLoading(false);
      setUpdateSuccess(true);
      setError(null);
      setTimeout(() => navigate('/dashboard/users'), 2000); // Redirect after 2s
    } catch (err) {
      setLoading(false);
      // Set the specific error from the backend
      setError(err.response ? err.response.data.message : err.message);
      setUpdateSuccess(false);
    }
  };

  if (loading && !updateSuccess) return <div>Loading user data...</div>;

  return (
    <div className="container p-4 max-w-lg mx-auto">
      <button onClick={() => navigate('/dashboard/users')} className="text-blue-500 mb-4">&larr; Back to Users</button>
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      
      {error && <div className="bg-red-200 text-red-800 p-3 mb-4 rounded">{error}</div>}
      {updateSuccess && <div className="bg-green-200 text-green-800 p-3 mb-4 rounded">User updated successfully! Redirecting...</div>}
      
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
         <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* --- THIS IS THE FIX --- */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Role (userType)</label>
          <select
            value={userType} // This will now correctly match "User", "Vendor", or "Admin"
            onChange={(e) => setUserType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {/* The 'value' attributes are now capitalized */}
            <option value="User">Customer</option>
            <option value="Vendor">Vendor</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        {/* --- END OF FIX --- */}
        
        <button type="submit" disabled={loading} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400">
          {loading ? 'Updating...' : 'Update User'}
        </button>
      </form>
    </div>
  );
};

export default UserEditPage;
