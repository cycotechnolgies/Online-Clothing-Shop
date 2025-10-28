import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext'; // Adjust path
import axios from 'axios';
import { Link } from 'react-router-dom';
// [NEW] Import the modal
import InviteUserModal from '../../../components/InviteUserModal'; // Adjust path

const UsersView = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth(); 

  // --- [NEW] State for modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  // --- End of new state ---

  useEffect(() => {
    fetchUsers();
  }, [user]);

  const fetchUsers = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get('/api/users', config);
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
      setLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        await axios.delete(`/api/users/${id}`, config);
        setUsers(users.filter((u) => u._id !== id)); 
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      }
    }
  };

  // [NEW] Handler for when invite is sent
  const handleInviteSent = () => {
    setSuccessMessage('Invite sent successfully!');
    // You could also re-fetch users if your invite route creates a "pending" user
    // fetchUsers(); 
    setTimeout(() => setSuccessMessage(null), 3000); // Clear message after 3s
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <> {/* Use Fragment to allow modal to be a sibling */}
      <div className="container p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">User Management</h1>
          {/* [NEW] Invite User Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            + Invite User
          </button>
        </div>

        {/* [NEW] Success message container */}
        {successMessage && (
          <div className="bg-green-200 text-green-800 p-3 mb-4 rounded">
            {successMessage}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            {/* ... your table <thead> ... */}
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">NAME</th>
                <th className="py-2 px-4 border">USERNAME</th>
                <th className="py-2 px-4 border">EMAIL</th>
                <th className="py-2 px-4 border">ROLE</th>
                <th className="py-2 px-4 border">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td className="py-2 px-4 border text-xs">{u._id}</td>
                  <td className="py-2 px-4 border">{u.firstName} {u.lastName}</td>
                  <td className="py-2 px-4 border">{u.username}</td>
                  <td className="py-2 px-4 border">{u.email}</td>
                  <td className="py-2 px-4 border">{u.userType}</td>
                  <td className="py-2 px-4 border text-center">
                    <Link 
                      to={`/dashboard/user/${u._id}/edit`} 
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </Link>
                    <button onClick={() => deleteHandler(u._id)} className="text-red-500 hover:text-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* [NEW] Modal Component */}
      <InviteUserModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onInviteSent={handleInviteSent}
      />
    </>
  );
};

export default UsersView;