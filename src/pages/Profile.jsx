import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Building, Camera, Save, Shield, Phone, BookOpen, Award, Hash } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    department: user?.department || '',
    profilePicture: user?.profilePicture || '',
    // Student specific fields
    registrationNumber: user?.registrationNumber || '',
    course: user?.course || '',
    year: user?.year || '',
    // Faculty specific fields
    designation: user?.designation || ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setFormData({
          ...formData,
          profilePicture: imageUrl
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateProfile(formData);
    setIsEditing(false);
    setLoading(false);
    setSuccess('Profile updated successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      department: user?.department || '',
      profilePicture: user?.profilePicture || '',
      registrationNumber: user?.registrationNumber || '',
      course: user?.course || '',
      year: user?.year || '',
      designation: user?.designation || ''
    });
    setIsEditing(false);
  };

  const roleColors = {
    student: 'bg-blue-100 text-blue-800',
    faculty: 'bg-green-100 text-green-800',
    admin: 'bg-purple-100 text-purple-800'
  };

  const roleIcons = {
    student: '🎓',
    faculty: '👨‍🏫',
    admin: '⚙️'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={formData.profilePicture}
                  alt={formData.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
                {isEditing && (
                  <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
                    <Camera className="h-6 w-6 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold">{user?.name}</h1>
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${roleColors[user?.role]}`}>
                    {roleIcons[user?.role]} {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                  </span>
                </div>
                <p className="text-blue-100 mt-1">{user?.department}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                {success}
              </div>
            )}

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCancel}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
                  >
                    <Save className="h-4 w-4" />
                    <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Role
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Shield className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                          disabled
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Role-specific Information */}
                {user?.role === 'student' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Registration Number
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Hash className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="registrationNumber"
                            value={formData.registrationNumber}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Course
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <BookOpen className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Year
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Award className="h-5 w-5 text-gray-400" />
                          </div>
                          <select
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                          >
                            <option value="">Select Year</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Department
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Building className="h-5 w-5 text-gray-400" />
                          </div>
                          <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                          >
                            <option value="">Select Department</option>
                            <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                            <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
                            <option value="Mechanical Engineering">Mechanical Engineering</option>
                            <option value="Civil Engineering">Civil Engineering</option>
                            <option value="Electrical and Electronics Engineering">Electrical and Electronics Engineering</option>
                            <option value="Information Technology">Information Technology</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {user?.role === 'faculty' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Department
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Building className="h-5 w-5 text-gray-400" />
                          </div>
                          <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                          >
                            <option value="">Select Department</option>
                            <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                            <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
                            <option value="Mechanical Engineering">Mechanical Engineering</option>
                            <option value="Civil Engineering">Civil Engineering</option>
                            <option value="Electrical and Electronics Engineering">Electrical and Electronics Engineering</option>
                            <option value="Information Technology">Information Technology</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Designation
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Award className="h-5 w-5 text-gray-400" />
                          </div>
                          <select
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                          >
                            <option value="">Select Designation</option>
                            <option value="Assistant Professor">Assistant Professor</option>
                            <option value="Associate Professor">Associate Professor</option>
                            <option value="Professor">Professor</option>
                            <option value="Head of Department">Head of Department</option>
                            <option value="Principal">Principal</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {user?.role === 'admin' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Administrative Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Designation
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Award className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>

            {/* Account Stats */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Account ID:</span>
                    <span className="ml-2 font-mono">{user?.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Institution:</span>
                    <span className="ml-2">SMVEC</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Member Since:</span>
                    <span className="ml-2">January 2024</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="ml-2">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;