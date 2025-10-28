import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const InviteUserModal = ({ isOpen, onClose, onInviteSent }) => {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('User'); // Default role
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user: authUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUser.token}`,
        },
      };
      const body = { email, userType };
      await axios.post('/api/users/invite', body, config);
      
      setLoading(false);
      onInviteSent(); // Tell the parent component it was successful
      onClose();      // Close the modal
    } catch (err) {
      setLoading(false);
      setError(err.response ? err.response.data.message : 'Failed to send invite.');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    // Backdrop
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
      {/* Modal */}
      <div className="bg-white p-6 rounded-lg shadow-xl z-50 max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Invite New User</h2>
        {error && <div className="bg-red-200 text-red-800 p-3 mb-4 rounded">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Role (userType)</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="User">Customer</option>
              <option value="Vendor">Vendor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? 'Sending...' : 'Send Invite'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteUserModal;