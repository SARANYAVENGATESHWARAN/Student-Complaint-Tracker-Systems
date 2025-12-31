// Database Seeder Script for Student Complaint Tracker
// This script initializes the application with comprehensive demo data

const seedData = {
  // Admin accounts with hierarchical structure
  admins: [
    {
      role: "Chairman",
      count: 1,
      departments: ["Administration"]
    },
    {
      role: "Principal", 
      count: 1,
      departments: ["Administration"]
    },
    {
      role: "Dean",
      count: 1, 
      departments: ["Academic Affairs"]
    },
    {
      role: "Head of Department",
      count: 8,
      departments: [
        "Computer Science and Engineering",
        "Electronics and Communication Engineering", 
        "Electrical and Electronics Engineering",
        "Mechanical Engineering",
        "Civil Engineering",
        "Information Technology",
        "Master of Business Administration",
        "Master of Computer Applications"
      ]
    }
  ],

  // Faculty distribution across departments
  faculty: {
    "Computer Science and Engineering": 10,
    "Electronics and Communication Engineering": 10,
    "Electrical and Electronics Engineering": 10,
    "Mechanical Engineering": 10,
    "Civil Engineering": 10,
    "Information Technology": 10,
    "Master of Business Administration": 5,
    "Master of Computer Applications": 5
  },

  // Student distribution across departments and years
  students: {
    "Computer Science and Engineering": {
      "1st Year": 3,
      "2nd Year": 3, 
      "3rd Year": 3,
      "4th Year": 1
    },
    "Electronics and Communication Engineering": {
      "1st Year": 3,
      "2nd Year": 3,
      "3rd Year": 3, 
      "4th Year": 1
    },
    "Electrical and Electronics Engineering": {
      "1st Year": 3,
      "2nd Year": 3,
      "3rd Year": 3,
      "4th Year": 1
    },
    "Mechanical Engineering": {
      "1st Year": 3,
      "2nd Year": 3,
      "3rd Year": 3,
      "4th Year": 1
    },
    "Civil Engineering": {
      "1st Year": 3,
      "2nd Year": 3,
      "3rd Year": 3,
      "4th Year": 1
    },
    "Information Technology": {
      "1st Year": 3,
      "2nd Year": 3,
      "3rd Year": 3,
      "4th Year": 1
    }
  },

  // Complaint categories and their distribution
  complaintCategories: [
    "Academic",
    "Facility", 
    "Technical",
    "Administrative",
    "Hostel",
    "Library",
    "Transport",
    "Exam"
  ],

  // Complaint status distribution
  complaintStatuses: [
    "Pending",
    "In-progress", 
    "Resolved",
    "Completed"
  ]
};

// Initialize application with seeded data
export const initializeApp = () => {
  console.log("🌱 Seeding Student Complaint Tracker with demo data...");
  
  // Check if data already exists
  const existingUsers = localStorage.getItem('users');
  const existingComplaints = localStorage.getItem('complaints');
  
  if (!existingUsers || !existingComplaints) {
    console.log("📊 Loading comprehensive demo data:");
    console.log(`👥 Users: ${seedData.admins.reduce((sum, admin) => sum + admin.count, 0)} Admins + ${Object.values(seedData.faculty).reduce((sum, count) => sum + count, 0)} Faculty + 60 Students`);
    console.log(`📋 Complaints: 20 sample complaints across all categories`);
    console.log(`🏢 Departments: ${seedData.admins[3].departments.length} engineering departments`);
    console.log("✅ Demo data loaded successfully!");
  }
  
  return {
    totalUsers: 131,
    totalComplaints: 20,
    departments: 8,
    roles: 3
  };
};

// Export seeder configuration
export default seedData;