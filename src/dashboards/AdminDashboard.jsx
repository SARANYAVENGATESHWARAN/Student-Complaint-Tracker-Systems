import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useComplaints } from '../context/ComplaintContext';
import usersData from '../data/users.json';
import ReportChart from '../features/ReportChart';
import ReportDownloadButton from '../features/ReportDownloadButton';
import { 
  FileText, 
  Users, 
  BarChart3, 
  UserCheck,
  Clock, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  User,
  Trash2,
  Plus,
  Eye,
  MessageSquare,
  Search,
  Filter,
  TrendingUp,
  Activity
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { complaints, assignComplaint, deleteComplaint, getComplaintStats } = useComplaints();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [assignmentFaculty, setAssignmentFaculty] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  // Refs for chart components (for PDF export)
  const categoryChartRef = useRef(null);
  const statusChartRef = useRef(null);

  const stats = getComplaintStats();
  const facultyMembers = usersData.filter(u => u.role === 'faculty');
  const students = usersData.filter(u => u.role === 'student');

  const handleAssignComplaint = (complaintId) => {
    if (assignmentFaculty) {
      assignComplaint(complaintId, parseInt(assignmentFaculty));
      setSelectedComplaint(null);
      setAssignmentFaculty('');
    }
  };

  // Filter complaints based on search and filters
  const filteredComplaints = complaints.filter(complaint => {
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

  // Prepare chart data
  const categoryData = Object.entries(stats.byCategory).map(([name, value]) => ({
    name,
    value
  }));

  const statusData = [
    { name: 'Pending', value: stats.pending },
    { name: 'In Progress', value: stats.inProgress },
    { name: 'Resolved', value: stats.resolved },
    { name: 'Completed', value: complaints.filter(c => c.status === 'Completed').length }
  ];

  // Monthly trend data (simulated)
  const monthlyData = [
    { name: 'Jan', complaints: 12, resolved: 8 },
    { name: 'Feb', complaints: 19, resolved: 15 },
    { name: 'Mar', complaints: 15, resolved: 12 },
    { name: 'Apr', complaints: 22, resolved: 18 },
    { name: 'May', complaints: 18, resolved: 16 },
    { name: 'Jun', complaints: 25, resolved: 20 }
  ];

  // Average resolution time (simulated)
  const avgResolutionTime = 3.2; // days

  const reportData = {
    stats,
    byCategory: stats.byCategory
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'complaints', name: 'Manage Complaints', icon: FileText },
    { id: 'users', name: 'Manage Users', icon: Users },
    { id: 'reports', name: 'Reports', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user.name}! Manage the entire system here.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Complaints</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
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
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
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
                <p className="text-2xl font-bold text-gray-900">{stats.resolved}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total > 0 ? Math.round(((stats.resolved + (complaints.filter(c => c.status === 'Completed').length)) / stats.total) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Avg Resolution</p>
                <p className="text-2xl font-bold text-gray-900">{avgResolutionTime}d</p>
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
                  {complaints.filter(c => c.status === 'Completed').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div ref={categoryChartRef}>
                <ReportChart
                  data={categoryData}
                  type="bar"
                  title="Complaints by Category"
                />
              </div>
              <div ref={statusChartRef}>
                <ReportChart
                  data={statusData}
                  type="pie"
                  title="Complaints by Status"
                />
              </div>
            </div>
            
            {/* Monthly Trends */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Complaint Trends</h3>
              <ReportChart
                data={monthlyData}
                type="bar"
                title=""
              />
            </div>
          </div>
        )}

        {activeTab === 'complaints' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">All Complaints</h2>
              <p className="text-gray-600 mt-1">Manage and assign complaints to faculty members</p>
              
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
                  <option value="Completed">Completed</option>
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
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assigned To
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
                    {filteredComplaints.map((complaint) => (
                      <tr key={complaint.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          #{complaint.id}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <User className="h-4 w-4 text-gray-400 mr-2" />
                            <div className="text-sm font-medium text-gray-900">
                              {complaint.studentName}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                            {complaint.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {complaint.category}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                            {getStatusIcon(complaint.status)}
                            <span className="ml-1">{complaint.status}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {complaint.assignedFacultyName || 'Unassigned'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(complaint.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                setSelectedComplaint(complaint);
                                setAssignmentFaculty(complaint.assignedTo || '');
                              }}
                              className="text-blue-600 hover:text-blue-800 p-1"
                              title="Assign/View"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this complaint?')) {
                                  deleteComplaint(complaint.id);
                                }
                              }}
                              className="text-red-600 hover:text-red-800 p-1"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredComplaints.length === 0 && (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No complaints match your search criteria</p>
                    <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-8">
            {/* Faculty Members */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Faculty Members</h2>
                    <p className="text-gray-600 mt-1">Manage faculty accounts and assignments</p>
                  </div>
                  <div className="bg-green-100 px-3 py-2 rounded-lg">
                    <span className="text-green-800 font-medium">{facultyMembers.length} Active</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {facultyMembers.map((faculty) => {
                    const assignedCount = complaints.filter(c => c.assignedTo === faculty.id).length;
                    return (
                      <div key={faculty.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex items-center space-x-3">
                          <img
                            src={faculty.profilePicture}
                            alt={faculty.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{faculty.name}</h3>
                            <p className="text-sm text-gray-600">{faculty.department}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {assignedCount} complaint{assignedCount !== 1 ? 's' : ''} assigned
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Students */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Students</h2>
                    <p className="text-gray-600 mt-1">View student accounts and their complaint history</p>
                  </div>
                  <div className="bg-blue-100 px-3 py-2 rounded-lg">
                    <span className="text-blue-800 font-medium">{students.length} Registered</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {students.map((student) => {
                    const complaintCount = complaints.filter(c => c.studentId === student.id).length;
                    return (
                      <div key={student.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex items-center space-x-3">
                          <img
                            src={student.profilePicture}
                            alt={student.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{student.name}</h3>
                            <p className="text-sm text-gray-600">{student.department}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {complaintCount} complaint{complaintCount !== 1 ? 's' : ''} submitted
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-8">
            {/* Report Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Complaint Analysis Reports</h2>
                  <p className="text-gray-600 mt-1">Download detailed reports and analytics</p>
                </div>
                <ReportDownloadButton
                  data={reportData}
                  chartRefs={[categoryChartRef, statusChartRef]}
                  fileName="complaint-analysis-report"
                />
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div ref={categoryChartRef}>
                <ReportChart
                  data={categoryData}
                  type="bar"
                  title="Complaints by Category"
                />
              </div>
              <div ref={statusChartRef}>
                <ReportChart
                  data={statusData}
                  type="pie"
                  title="Complaints by Status"
                />
              </div>
            </div>

            {/* Monthly Trends */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Complaint Trends</h3>
              <ReportChart
                data={monthlyData}
                type="bar"
                title=""
              />
            </div>
            {/* Summary Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Summary Statistics</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
                    <div className="text-gray-600">Total Complaints</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
                    <div className="text-gray-600">Pending</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{stats.inProgress}</div>
                    <div className="text-gray-600">In Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{stats.resolved}</div>
                    <div className="text-gray-600">Resolved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-600">{complaints.filter(c => c.status === 'Completed').length}</div>
                    <div className="text-gray-600">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-600">{avgResolutionTime}d</div>
                    <div className="text-gray-600">Avg Resolution</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assignment Modal */}
        {selectedComplaint && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Complaint Details & Assignment</h2>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Complaint Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Complaint Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">ID:</span> #{selectedComplaint.id}</p>
                    <p><span className="font-medium">Student:</span> {selectedComplaint.studentName}</p>
                    <p><span className="font-medium">Title:</span> {selectedComplaint.title}</p>
                    <p><span className="font-medium">Category:</span> {selectedComplaint.category}</p>
                    <p><span className="font-medium">Description:</span> {selectedComplaint.description}</p>
                    <p><span className="font-medium">Status:</span> 
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedComplaint.status)}`}>
                        {getStatusIcon(selectedComplaint.status)}
                        <span className="ml-1">{selectedComplaint.status}</span>
                      </span>
                    </p>
                    <p><span className="font-medium">Created:</span> {new Date(selectedComplaint.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                {/* Assignment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assign to Faculty
                  </label>
                  <select
                    value={assignmentFaculty}
                    onChange={(e) => setAssignmentFaculty(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Faculty Member</option>
                    {facultyMembers.map((faculty) => (
                      <option key={faculty.id} value={faculty.id}>
                        {faculty.name} - {faculty.department}
                      </option>
                    ))}
                  </select>
                  {selectedComplaint.assignedFacultyName && (
                    <p className="text-sm text-gray-600 mt-2">
                      Currently assigned to: {selectedComplaint.assignedFacultyName}
                    </p>
                  )}
                </div>

                {selectedComplaint.reply && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Faculty Reply</h3>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-blue-800">{selectedComplaint.reply}</p>
                    </div>
                  </div>
                )}

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleAssignComplaint(selectedComplaint.id)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
                  >
                    <UserCheck className="h-4 w-4" />
                    <span>Assign Complaint</span>
                  </button>
                  <button
                    onClick={() => setSelectedComplaint(null)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;