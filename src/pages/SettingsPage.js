import React, { useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";
import { 
  FiSettings, FiUser, FiLock, FiBell, FiCreditCard, 
  FiMail, FiGlobe, FiUsers, FiServer, FiActivity, 
  FiBookmark, FiAward, FiArrowLeft ,FiSearch
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
    const { user } = useOutletContext();
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();
  const isAdmin = user?.role === 'ADMIN';

        console.log(user);

  // Profile state
  const [profile, setProfile] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    profilePic: user?.profilePic || null
  });

  // Security state
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Notification state
  const [notifications, setNotifications] = useState({
    courseUpdates: true,
    promotions: true,
    newsletter: false,
    assignmentReminders: true,
    courseDeadlines: true
  });

  // Admin-only: User management state
  const [userManagement, setUserManagement] = useState({
    searchQuery: '',
    users: []
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurity(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({ ...prev, [name]: checked }));
  };

  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfile(prev => ({ ...prev, profilePic: URL.createObjectURL(e.target.files[0]) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission based on active tab
    console.log('Form submitted for:', activeTab);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your {isAdmin ? 'platform' : 'account'} settings
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <FiArrowLeft className="mr-1" /> Back
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Settings sidebar */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200">
            <nav className="space-y-1 p-4">
              {/* Shared tabs */}
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg ${
                  activeTab === 'profile' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FiUser className="mr-3 h-5 w-5" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg ${
                  activeTab === 'security' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FiLock className="mr-3 h-5 w-5" />
                Security
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg ${
                  activeTab === 'notifications' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FiBell className="mr-3 h-5 w-5" />
                Notifications
              </button>

              {/* Admin-only tabs */}
              {isAdmin && (
                <>
                  <button
                    onClick={() => setActiveTab('users')}
                    className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg ${
                      activeTab === 'users' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FiUsers className="mr-3 h-5 w-5" />
                    User Management
                  </button>
                  <button
                    onClick={() => setActiveTab('platform')}
                    className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg ${
                      activeTab === 'platform' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FiServer className="mr-3 h-5 w-5" />
                    Platform Settings
                  </button>
                </>
              )}

              {/* Regular user-only tabs */}
              {!isAdmin && (
                <>
                  <button
                    onClick={() => setActiveTab('preferences')}
                    className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg ${
                      activeTab === 'preferences' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FiBookmark className="mr-3 h-5 w-5" />
                    Preferences
                  </button>
                  {user?.role === 'STUDENT' && (
                    <button
                      onClick={() => setActiveTab('certificates')}
                      className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg ${
                        activeTab === 'certificates' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <FiAward className="mr-3 h-5 w-5" />
                      Certificates
                    </button>
                  )}
                </>
              )}
            </nav>
          </div>

          {/* Settings content */}
          <div className="flex-1 p-6">
            {/* Profile Tab */}
             {activeTab === 'profile' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Profile Information</h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
                    <div className="col-span-full flex items-center gap-x-8">
                      <div className="relative">
                        <img
                          className="h-24 w-24 rounded-full object-cover"
                          src={profile.profilePic || "https://ui-avatars.com/api/?background=random"}
                          alt="Profile"
                        />
                        <label
                          htmlFor="profile-pic"
                          className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm border border-gray-200 cursor-pointer"
                        >
                          <FiSettings className="h-4 w-4 text-gray-500" />
                          <input
                            id="profile-pic"
                            name="profile-pic"
                            type="file"
                            className="sr-only"
                            onChange={handleProfilePicChange}
                          />
                        </label>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          onClick={() => document.getElementById('profile-pic').click()}
                        >
                          Change
                        </button>
                        <p className="mt-2 text-xs text-gray-500">
                          JPG, GIF or PNG. 1MB max.
                        </p>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="first-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border"
                        value={profile.firstName}
                        onChange={handleProfileChange}
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="last-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border"
                        value={profile.lastName}
                        onChange={handleProfileChange}
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border"
                        value={profile.email}
                        onChange={handleProfileChange}
                      />
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border"
                        value={profile.bio}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      type="button"
                      className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Security Settings</h2>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                        Current password
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        id="current-password"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border"
                        value={security.currentPassword}
                        onChange={handleSecurityChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                        New password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        id="new-password"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border"
                        value={security.newPassword}
                        onChange={handleSecurityChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                        Confirm new password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirm-password"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border"
                        value={security.confirmPassword}
                        onChange={handleSecurityChange}
                      />
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Two-factor authentication</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Add additional security to your account using two-factor authentication.
                      </p>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Enable 2FA
                      </button>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => navigate(-1)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Update Password
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Notification Preferences</h2>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <fieldset>
                      <legend className="text-sm font-medium text-gray-900">Email Notifications</legend>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id="course-updates"
                              name="course-updates"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              defaultChecked
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="course-updates" className="font-medium text-gray-700">
                              Course updates
                            </label>
                            <p className="text-gray-500">Get notified about new courses and updates.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id="promotions"
                              name="promotions"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              defaultChecked
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="promotions" className="font-medium text-gray-700">
                              Promotions
                            </label>
                            <p className="text-gray-500">Receive special offers and discounts.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id="newsletter"
                              name="newsletter"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="newsletter" className="font-medium text-gray-700">
                              Newsletter
                            </label>
                            <p className="text-gray-500">Get our monthly newsletter with learning tips.</p>
                          </div>
                        </div>
                      </div>
                    </fieldset>

                    <fieldset>
                      <legend className="text-sm font-medium text-gray-900">Push Notifications</legend>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id="assignment-reminders"
                              name="assignment-reminders"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              defaultChecked
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="assignment-reminders" className="font-medium text-gray-700">
                              Assignment reminders
                            </label>
                            <p className="text-gray-500">Get reminders about upcoming assignments.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id="course-deadlines"
                              name="course-deadlines"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              defaultChecked
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="course-deadlines" className="font-medium text-gray-700">
                              Course deadlines
                            </label>
                            <p className="text-gray-500">Receive notifications about approaching deadlines.</p>
                          </div>
                        </div>
                      </div>
                    </fieldset>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => navigate(-1)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Admin-only: User Management */}
            {activeTab === 'users' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">User Management</h2>
                <div className="mb-6">
                  <div className="relative rounded-md shadow-sm w-full sm:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                      placeholder="Search users..."
                      value={userManagement.searchQuery}
                      onChange={(e) => setUserManagement({...userManagement, searchQuery: e.target.value})}
                    />
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500">User list would appear here with role management options.</p>
                </div>
              </div>
            )}

            {/* Admin-only: Platform Settings */}
            {isAdmin && activeTab === 'platform' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Platform Settings</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500">Platform configuration options would appear here.</p>
                </div>
              </div>
            )}

            {/* User-only: Preferences */}
            {!isAdmin && activeTab === 'preferences' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Learning Preferences</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500">Personalized learning settings would appear here.</p>
                </div>
              </div>
            )}

            {/* Student-only: Certificates */}
            {!isAdmin && user?.role === 'STUDENT' && activeTab === 'certificates' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">My Certificates</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500">Downloadable certificates would appear here.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;