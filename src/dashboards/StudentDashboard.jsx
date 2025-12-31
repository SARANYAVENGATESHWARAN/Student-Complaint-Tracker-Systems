import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useComplaints } from '../context/ComplaintContext';
import { Plus, FileText, Clock, CheckCircle, AlertCircle, Calendar, Eye, Trash2, CreditCard as Edit3, Upload, X, Filter, Search } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { complaints, submitComplaint, deleteComplaint, getComplaintsByStudent, updateComplaint } = useComplaints();
  const [showForm, setShowForm] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    category: 'Academic',
    description: '',
    attachments: []
  });

  const studentComplaints = getComplaintsByStudent(user.id);

  // Generate unique complaint ID
  const generateComplaintId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return parseInt(`${timestamp.toString().slice(-6)}${random.toString().padStart(3, '0')}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const complaintData = {
      ...formData,
      id: generateComplaintId()
    };
    const newComplaint = submitComplaint(complaintData, user.id, user.name);
    setFormData({ title: '', category: 'Academic', description: '', attachments: [] });
    setShowForm(false);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        alert(`File ${file.name} is too large. Maximum size is 5MB.`);
        return false;
      }
      return true;
    });

    setFormData({
      ...formData,
      attachments: [...formData.attachments, ...validFiles.slice(0, 3 - formData.attachments.length)]
    });
  };

  const removeAttachment = (index) => {
    setFormData({
      ...formData,
      attachments: formData.attachments.filter((_, i) => i !== index)
    });
  };

  const handleDelete = (complaintId) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      deleteComplaint(complaintId);
    }
  };

  const markAsCompleted = (complaintId) => {
    updateComplaint(complaintId, { status: 'Completed' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'In-progress':
        return 'bg-blue-100 text-blue-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <Clock className="h-4 w-4" />;
      case 'In-progress':
        return <AlertCircle className="h-4 w-4" />;
      case 'Resolved':
        return <CheckCircle className="h-4 w-4" />;
      case 'Completed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const categories = ['Academic', 'Facility', 'Exam', 'Administrative', 'Technical', 'Hostel', 'Library', 'Transport', 'Other'];

  // Filter and search complaints
  const filteredComplaints = studentComplaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || complaint.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || complaint.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user.name}! Manage your complaints here.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Complaints</p>
                <p className="text-2xl font-bold text-gray-900">{studentComplaints.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {studentComplaints.filter(c => c.status === 'Pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <AlertCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {studentComplaints.filter(c => c.status === 'In-progress').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {studentComplaints.filter(c => c.status === 'Resolved').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-gray-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {studentComplaints.filter(c => c.status === 'Completed').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Submit Complaint Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Submit New Complaint</h2>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>New</span>
                </button>
              </div>

              {showForm && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Brief description of your complaint"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Detailed description of your complaint"
                      required
                    />
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Attachments (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <input
                        type="file"
                        multiple
                        accept="image/*,video/*,.pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center space-y-2"
                      >
                        <Upload className="h-8 w-8 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          Click to upload files (Max 5MB each, up to 3 files)
                        </span>
                      </label>
                    </div>
                    
                    {/* Display uploaded files */}
                    {formData.attachments.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {formData.attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <span className="text-sm text-gray-700 truncate">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeAttachment(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Submit Complaint
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* My Complaints List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">My Complaints</h2>
                <p className="text-gray-600 mt-1">Track the status of your submitted complaints</p>
                
                {/* Search and Filter */}
                <div className="mt-4 flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search complaints..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In-progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-6">
                {filteredComplaints.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {studentComplaints.length === 0 ? 'No complaints submitted yet' : 'No complaints match your search'}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {studentComplaints.length === 0 ? 'Click "New" to submit your first complaint' : 'Try adjusting your search or filters'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredComplaints.map((complaint) => (
                      <div key={complaint.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-gray-900">{complaint.title}</h3>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                                {getStatusIcon(complaint.status)}
                                <span className="ml-1">{complaint.status}</span>
                              </span>
                            </div>
                            <p className="text-gray-600 mb-2">{complaint.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="inline-flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(complaint.createdAt).toLocaleDateString()}
                              </span>
                              <span>Category: {complaint.category}</span>
                              {complaint.assignedFacultyName && (
                                <span>Assigned to: {complaint.assignedFacultyName}</span>
                              )}
                            </div>
                            {complaint.reply && (
                              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-900 font-medium">Faculty Reply:</p>
                                <p className="text-blue-800 text-sm mt-1">{complaint.reply}</p>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={() => setSelectedComplaint(complaint)}
                              className="text-blue-600 hover:text-blue-800 p-1"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            {complaint.status === 'Resolved' && (
                              <button
                                onClick={() => markAsCompleted(complaint.id)}
                                className="text-green-600 hover:text-green-800 p-1"
                                title="Mark as Completed"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </button>
                            )}
                            {complaint.status === 'Pending' && (
                              <button
                                onClick={() => handleDelete(complaint.id)}
                                className="text-red-600 hover:text-red-800 p-1"
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Complaint Detail Modal */}
        {selectedComplaint && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Complaint Details</h2>
                  <button
                    onClick={() => setSelectedComplaint(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Plus className="h-6 w-6 transform rotate-45" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Title</h3>
                    <p className="text-gray-700">{selectedComplaint.title}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Category</h3>
                    <p className="text-gray-700">{selectedComplaint.category}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-700">{selectedComplaint.description}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Status</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedComplaint.status)}`}>
                      {getStatusIcon(selectedComplaint.status)}
                      <span className="ml-1">{selectedComplaint.status}</span>
                    </span>
                  </div>
                  {selectedComplaint.assignedFacultyName && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Assigned Faculty</h3>
                      <p className="text-gray-700">{selectedComplaint.assignedFacultyName}</p>
                    </div>
                  )}
                  {selectedComplaint.reply && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Faculty Reply</h3>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-blue-800">{selectedComplaint.reply}</p>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Created</h3>
                      <p>{new Date(selectedComplaint.createdAt).toLocaleString()}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Last Updated</h3>
                      <p>{new Date(selectedComplaint.updatedAt).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;