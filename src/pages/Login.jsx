import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, LogIn, User, Lock, GraduationCap, Users, Shield } from 'lucide-react';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = login(formData.email, formData.password);
    
    if (result.success) {
      // Check if user role matches selected role
      if (selectedRole && result.user.role !== selectedRole) {
        setError(`Invalid credentials for ${selectedRole} login`);
        setLoading(false);
        return;
      }

      // Navigate based on role
      switch (result.user.role) {
        case 'student':
          navigate('/student/my-complaints');
          break;
        case 'faculty':
          navigate('/faculty/assigned-complaints');
          break;
        case 'admin':
          navigate('/admin/manage-complaints');
          break;
        default:
          navigate(from, { replace: true });
      }
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  const roleOptions = [
    {
      id: 'student',
      title: 'Student Login',
      icon: GraduationCap,
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'Access your complaints and profile',
      demoEmail: 'student1_cse@college.com'
    },
    {
      id: 'faculty',
      title: 'Faculty Login',
      icon: Users,
      color: 'bg-green-600 hover:bg-green-700',
      description: 'Manage assigned complaints',
      demoEmail: 'faculty1_cse@college.com'
    },
    {
      id: 'admin',
      title: 'Admin Login',
      icon: Shield,
      color: 'bg-purple-600 hover:bg-purple-700',
      description: 'System administration and reports',
      demoEmail: 'principal@college.com'
    }
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role.id);
    setFormData({
      email: role.demoEmail,
      password: '1234'
    });
  };

  const handleBackToRoles = () => {
    setSelectedRole(null);
    setFormData({ email: '', password: '' });
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedRole ? `${roleOptions.find(r => r.id === selectedRole)?.title}` : 'Welcome Back'}
            </h2>
            <p className="text-gray-600 mt-2">
              {selectedRole ? 'Enter your credentials' : 'Choose your role to continue'}
            </p>
          </div>

          {!selectedRole ? (
            /* Role Selection */
            <div className="space-y-4">
              {roleOptions.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role)}
                  className={`w-full ${role.color} text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-4`}
                >
                  <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                    <role.icon className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">{role.title}</h3>
                    <p className="text-sm opacity-90">{role.description}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            /* Login Form */
            <>
              {/* Demo Credentials Notice */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials:</h3>
                <p className="text-xs text-blue-700">
                  Email: {roleOptions.find(r => r.id === selectedRole)?.demoEmail} | Password: 1234
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your password"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </button>
                  <button
                    type="button"
                    onClick={handleBackToRoles}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                </div>
              </form>
            </>
          )}

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;