import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useComplaints } from '../context/ComplaintContext';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  User,
  MessageSquare,
  Save,
  Search,
  Filter
} from 'lucide-react';

const FacultyDashboard = () => {
  const { user } = useAuth();
  const { complaints, updateStatus, getComplaintsByFaculty } = useComplaints();
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [statusUpdate, setStatusUpdate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const assignedComplaints = getComplaintsByFaculty(user.id);

  const handleStatusUpdate = (complaintId, newStatus, reply = '') => {
    updateStatus(complaintId, newStatus, reply);
    setSelectedComplaint(null);
    setReplyText('');
    setStatusUpdate('');
  };

  // Filter complaints based on search and filters
  const filteredComplaints = assignedComplaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || complaint.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || complaint.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

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

  const getPriorityByCategory = (category) => {
    const priorities = {
      'Academic': 'high',
      'Exam': 'high',
      'Facility': 'medium',
      'Administrative': 'low',
      'Technical': 'medium',
      'Other': 'low'
    };
    return priorities[category] || 'low';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Faculty Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user.name}! Manage your assigned complaints here.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Assigned</p>
                <p className="text-2xl font-bold text-gray-900">{assignedComplaints.length}</p>
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
                  {assignedComplaints.filter(c => c.status === 'Pending').length}
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
                  {assignedComplaints.filter(c => c.status === 'In-progress').length}
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
                  {assignedComplaints.filter(c => c.status === 'Resolved').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Complaints */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Assigned Complaints</h2>
            <p className="text-gray-600 mt-1">Review and update the status of complaints assigned to you</p>
            
            {/* Search and Filter Controls */}
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search complaints, students, or descriptions..."
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
              </select>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="Academic">Academic</option>
                <option value="Facility">Facility</option>
                <option value="Exam">Exam</option>
                <option value="Administrative">Administrative</option>
                <option value="Technical">Technical</option>
                <option value="Hostel">Hostel</option>
                <option value="Library">Library</option>
                <option value="Transport">Transport</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="p-6">
            {filteredComplaints.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  {assignedComplaints.length === 0 ? 'No complaints assigned yet' : 'No complaints match your search'}
                </p>
                <p className="text-gray-400 text-sm">
                  {assignedComplaints.length === 0 ? 'Complaints will appear here when assigned by admin' : 'Try adjusting your search or filters'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Complaint Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredComplaints.map((complaint) => {
                      const priority = getPriorityByCategory(complaint.category);
                      return (
                        <tr key={complaint.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="max-w-xs">
                              <div className="font-medium text-gray-900">{complaint.title}</div>
                              <div className="text-sm text-gray-600">Category: {complaint.category}</div>
                              <div className="text-sm text-gray-500 mt-1 truncate">
                                {complaint.description}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <User className="h-5 w-5 text-gray-400 mr-2" />
                              <div className="text-sm font-medium text-gray-900">
                                {complaint.studentName}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(priority)}`}>
                              {priority.charAt(0).toUpperCase() + priority.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                              {getStatusIcon(complaint.status)}
                              <span className="ml-1">{complaint.status}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(complaint.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => {
                                setSelectedComplaint(complaint);
                                setReplyText(complaint.reply || '');
                                setStatusUpdate(complaint.status);
                              }}
                              className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium flex items-center space-x-1"
                            >
                              <MessageSquare className="h-4 w-4" />
                              <span>Update</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Update Complaint Modal */}
        {selectedComplaint && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Update Complaint</h2>
                <p className="text-gray-600 mt-1">{selectedComplaint.title}</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  {/* Complaint Details */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Complaint Details</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Student:</span> {selectedComplaint.studentName}</p>
                      <p><span className="font-medium">Category:</span> {selectedComplaint.category}</p>
                      <p><span className="font-medium">Description:</span> {selectedComplaint.description}</p>
                      <p><span className="font-medium">Created:</span> {new Date(selectedComplaint.createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Status Update */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Update Status
                    </label>
                    <select
                      value={statusUpdate}
                      onChange={(e) => setStatusUpdate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In-progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>

                  {/* Reply */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reply to Student
                    </label>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Provide an update or response to the student..."
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleStatusUpdate(selectedComplaint.id, statusUpdate, replyText)}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>Update Complaint</span>
                    </button>
                    <button
                      onClick={() => setSelectedComplaint(null)}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
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

export default FacultyDashboard;