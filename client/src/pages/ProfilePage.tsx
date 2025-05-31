import React, { useEffect, useState } from 'react';
import '../assets/styles/profile.css';
import ProfileUpdates from '../components/profile/ProfileUpdates';
import { UserData } from '../types/user';

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [editMode, setEditMode] = useState(false);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No authentication token found');
        return;
      }
      const response = await fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `
            query {
              currentUser {
                _id
                avatar
                username
                email
                avatar
              }
            }
          `,
        }),
      });
      const result = await response.json();
      console.log('Fetched user data:', result);
      if (result.data && result.data.currentUser) {
        setUserData(result.data.currentUser);
      } else {
        console.error('No user data found');
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchUserData();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Update email
  const handleEmailChange = async (email: string, password: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !userData?._id) {
        console.error('No authentication token or user ID found');
        return;
      }

      const response = await fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `
            mutation updateUser($id: ID!, $username: String!, $password: String!, $email: String!) {
              updateUser(id: $id, username: $username, password: $password, email: $email) {
                _id
                username
                email
                avatar
              }
            }
          `,
          variables: {
            id: userData._id,
            username: userData.username,
            password,
            email,
          },
        }),
      });

      const result = await response.json();
      console.log('Email update result:', result);
      if (result.data && result.data.updateUser) {
        setUserData(result.data.updateUser);
        setEditMode(false);
      } else {
        console.error('Failed to update email');
      }
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };

  // Update password
  const handlePasswordChange = async (password: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !userData?._id || !userData.username) {
        console.error('Missing token or user info');
        return;
      }

      const response = await fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `
            mutation updateUser($id: ID!, $username: String!, $password: String!, $email: String!) {
              updateUser(id: $id, username: $username, password: $password, email: $email) {
                _id
                username
                email
                avatar
              }
            }
          `,
          variables: {
            id: userData._id,
            username: userData.username,
            email: userData.email,
            password,
          },
        }),
      });

      const result = await response.json();
      console.log('Password update result:', result);
      if (result.data && result.data.updateUser) {
        setUserData(result.data.updateUser);
        setEditMode(false);
      } else {
        console.error('Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  // Update avatar
  const handleAvatarChange = async (avatar: string | null, password: string) => {
    if (!avatar || !password) {
        console.error('Avatar or password is missing.');
        return;
    }
    try {
        const token = localStorage.getItem('token');
        if (!token || !userData?._id) {
        console.error('Missing token or user ID');
        return;
        }

        const response = await fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            query: `
            mutation updateUser($id: ID!, $username: String!, $password: String!, $email: String!, $avatar: String) {
                updateUser(id: $id, username: $username, password: $password, email: $email, avatar: $avatar) {
                _id
                username
                email
                avatar
                }
            }
            `,
            variables: {
            id: userData._id,
            username: userData.username,
            password,
            email: userData.email, // 🩺 Added email here!
            avatar,
            },
        }),
        });

        const result = await response.json();
        console.log('Avatar update result:', result);
        if (result.data && result.data.updateUser) {
        setUserData(result.data.updateUser);
        setEditMode(false);
        } else {
        console.error('Failed to update avatar');
        }
    } catch (error) {
        console.error('Error updating avatar:', error);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    fetchUserData();
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <main className="account-background">
      <h1>Profile Management</h1>
      <p>Update your name, avatar, email, or password here.</p>
      <div className="account-container">
        <h4 className="card-header">Profile</h4>
        <div className="profile">
          {!editMode ? (
            <div className="form-input">
              <p className="profile-avatar">
                <img
                  src={userData.avatar || '/default-avatar.png'}
                  alt="User Avatar"
                  className="avatar"
                />
              </p>  
              <p>
                <strong>Username:</strong> {userData.username}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <button className="btn" onClick={() => setEditMode(true)}>
                Edit
              </button>
            </div>
          ) : (
            <div>
              <ProfileUpdates
                email={userData.email || ''}
                avatar={userData.avatar || null}
                onEmailChange={handleEmailChange}
                onPasswordChange={handlePasswordChange}
                onAvatarChange={handleAvatarChange}
              />
              <div className="button-group">
                <button className="btn" type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
