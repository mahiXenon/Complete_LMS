import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response)
        setUser(response.data.data);
      } catch (error) {
        toast.error('Failed to fetch profile');
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="profile-container" style={{ padding: '20px', margin: 'auto' }}>
      <h1>Your Profile</h1>
      <ToastContainer />
      <div className="profile-card" style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '20px' }}>
        <h2>{user.name}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Contact No:</strong> {user.contact_number}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
