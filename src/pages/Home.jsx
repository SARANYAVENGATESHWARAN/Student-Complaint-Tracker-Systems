import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  Shield, 
  BarChart3, 
  Clock, 
  CheckCircle, 
  BookOpen,
  ArrowRight,
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Award,
  Target
} from 'lucide-react';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  const features = [
    {
      icon: Users,
      title: 'Role-Based Access',
      description: 'Separate interfaces for students, faculty, and administrators with appropriate permissions.'
    },
    {
      icon: Clock,
      title: 'Real-Time Updates',
      description: 'Instant notifications and updates across all dashboards when complaint status changes.'
    },
    {
      icon: BarChart3,
      title: 'Advanced Reports',
      description: 'Comprehensive analytics and downloadable reports for tracking complaint trends.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Built with security in mind, ensuring data privacy and system reliability.'
    },
    {
      icon: CheckCircle,
      title: 'Easy Tracking',
      description: 'Simple interface to track complaint status from submission to resolution.'
    },
    {
      icon: BookOpen,
      title: 'Educational Focus',
      description: 'Designed specifically for educational institutions with academic workflows.'
    }
  ];

  const benefits = [
    {
      role: 'Students',
      description: 'Submit complaints easily and track their progress in real-time.',
      features: ['Quick submission', 'Status tracking', 'Direct communication'],
      color: 'bg-blue-50 border-blue-200'
    },
    {
      role: 'Faculty',
      description: 'Manage assigned complaints efficiently with organized workflows.',
      features: ['Assignment notifications', 'Status updates', 'Student communication'],
      color: 'bg-green-50 border-green-200'
    },
    {
      role: 'Administration',
      description: 'Oversee all complaints with comprehensive management tools.',
      features: ['Complete oversight', 'Assignment management', 'Detailed reports'],
      color: 'bg-purple-50 border-purple-200'
    }
  ];

  const getDashboardLink = () => {
    switch (user?.role) {
      case 'student':
        return '/student/my-complaints';
      case 'faculty':
        return '/faculty/assigned-complaints';
      case 'admin':
        return '/admin/manage-complaints';
      default:
        return '/';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* College Branding */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white p-4 rounded-full shadow-lg mr-4">
                <BookOpen className="h-12 w-12 text-blue-800" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Sri Manakula Vinayagar Engineering College
                </h2>
                <p className="text-blue-200 text-lg italic">"Start to Learn"</p>
              </div>
            </div>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Streamline Your Educational
              <span className="text-yellow-300 block">Complaint Management</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              A comprehensive platform for SMVEC connecting students, faculty, and administration
              for efficient complaint tracking and resolution at our center of excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Link
                  to={getDashboardLink()}
                  className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    to="/about"
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300"
                  >
                    Learn More
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* College Information Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              About Sri Manakula Vinayagar Engineering College
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A premier institution dedicated to excellence in technical education and research, established with the noble vision of nurturing future engineers and innovators
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Vision & Mission */}
            <div className="space-y-8">
              <div className="bg-blue-50 p-8 rounded-xl border-l-4 border-blue-600">
                <div className="flex items-center mb-4">
                  <Target className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  To be a center of excellence in technical education and research.
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    To emerge as a globally recognized institution for quality technical education
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    To foster innovation and entrepreneurship among students and faculty
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    To contribute significantly to society through cutting-edge research
                  </li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-8 rounded-xl border-l-4 border-green-600">
                <div className="flex items-center mb-4">
                  <Award className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  To impart quality education, foster innovation, and prepare students for global challenges.
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Provide industry-relevant curriculum with hands-on learning experiences
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Develop ethical, socially responsible engineers and leaders
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Promote research and development in emerging technologies
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Build strong industry partnerships for student placements and internships
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Create a conducive environment for holistic personality development
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600">Madagadipet, Puducherry - 605107, India</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">+91 413 2643007 / 2643008</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">principal@smvec.ac.in<br/>info@smvec.ac.in</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Globe className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Website</p>
                    <a 
                      href="https://smvec.ac.in/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      https://smvec.ac.in/
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The fundamental principles that guide our institution towards excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600 text-sm">Striving for the highest standards in education, research, and service</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Integrity</h3>
              <p className="text-gray-600 text-sm">Upholding ethical values and transparency in all our endeavors</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm">Encouraging creative thinking and pioneering solutions</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Commitment</h3>
              <p className="text-gray-600 text-sm">Dedicated to student success and societal development</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built for Every Role at SMVEC
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              EduTracker provides tailored experiences for students, faculty, and administrators,
              ensuring everyone at SMVEC has the tools they need to succeed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`${benefit.color} p-8 rounded-xl border-2 transform hover:scale-105 transition-all duration-300`}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {benefit.role}
                </h3>
                <p className="text-gray-700 mb-6 text-lg">
                  {benefit.description}
                </p>
                <ul className="space-y-2">
                  {benefit.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <Star className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage educational complaints effectively,
              with advanced features that make the process seamless.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Institution?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of educational institutions that trust EduTracker
            for their complaint management needs.
          </p>
          {!isAuthenticated && (
            <Link
              to="/login"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 inline-flex items-center"
            >
              Start Using EduTracker
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;