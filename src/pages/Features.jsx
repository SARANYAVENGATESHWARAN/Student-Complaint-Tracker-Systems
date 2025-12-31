import React from 'react';
import { 
  Users, 
  Clock, 
  BarChart3, 
  Shield, 
  CheckCircle, 
  Bell,
  FileText,
  MessageSquare,
  Database,
  Download,
  Monitor,
  Smartphone
} from 'lucide-react';

const Features = () => {
  const featureCategories = [
    {
      title: 'Core Features',
      description: 'Essential functionality that powers the complaint tracking system',
      features: [
        {
          icon: Users,
          title: 'Role-Based Access Control',
          description: 'Separate dashboards and permissions for students, faculty, and administrators with secure authentication.',
          details: ['Student portal for submissions', 'Faculty assignment interface', 'Admin management console', 'Secure login system']
        },
        {
          icon: Clock,
          title: 'Real-Time Updates',
          description: 'Instant synchronization across all dashboards when complaint status changes or updates occur.',
          details: ['Live status updates', 'Immediate notifications', 'Cross-dashboard sync', 'Timeline tracking']
        },
        {
          icon: FileText,
          title: 'Comprehensive Complaint Management',
          description: 'Complete lifecycle management from submission to resolution with detailed tracking.',
          details: ['Easy submission process', 'Status tracking', 'Assignment workflow', 'Resolution documentation']
        },
        {
          icon: MessageSquare,
          title: 'Communication Hub',
          description: 'Built-in messaging system for direct communication between students, faculty, and staff.',
          details: ['Reply system', 'Message history', 'Status updates', 'Feedback collection']
        }
      ]
    },
    {
      title: 'Advanced Analytics',
      description: 'Powerful reporting and analytics tools for insights and decision making',
      features: [
        {
          icon: BarChart3,
          title: 'Interactive Reports & Charts',
          description: 'Visual analytics with interactive charts showing complaint trends, categories, and resolution rates.',
          details: ['Category breakdowns', 'Status distribution', 'Trend analysis', 'Performance metrics']
        },
        {
          icon: Download,
          title: 'Export & Download',
          description: 'Export reports and data in multiple formats including PDF and CSV for external use.',
          details: ['PDF reports with charts', 'CSV data export', 'Custom date ranges', 'Professional formatting']
        },
        {
          icon: Database,
          title: 'Data Management',
          description: 'Robust data handling with search, filter, and sort capabilities across all complaint data.',
          details: ['Advanced search', 'Multiple filters', 'Sort options', 'Data validation']
        }
      ]
    },
    {
      title: 'User Experience',
      description: 'Designed for ease of use with modern, responsive interfaces',
      features: [
        {
          icon: Monitor,
          title: 'Desktop Optimized',
          description: 'Full-featured desktop experience with comprehensive dashboards and detailed views.',
          details: ['Rich dashboards', 'Detailed tables', 'Advanced forms', 'Multi-panel layouts']
        },
        {
          icon: Smartphone,
          title: 'Mobile Responsive',
          description: 'Fully responsive design that works perfectly on mobile devices and tablets.',
          details: ['Touch-friendly interface', 'Mobile navigation', 'Optimized forms', 'Quick actions']
        },
        {
          icon: Bell,
          title: 'Smart Notifications',
          description: 'Intelligent notification system that keeps users informed without overwhelming them.',
          details: ['Status change alerts', 'Assignment notifications', 'Deadline reminders', 'Priority indicators']
        },
        {
          icon: Shield,
          title: 'Security & Privacy',
          description: 'Built with security best practices to protect user data and ensure system reliability.',
          details: ['Secure authentication', 'Data encryption', 'Privacy controls', 'Access logging']
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">Powerful Features</h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            Discover the comprehensive set of tools and capabilities that make EduTracker 
            the perfect solution for educational complaint management.
          </p>
        </div>
      </section>

      {/* Feature Categories */}
      {featureCategories.map((category, categoryIndex) => (
        <section key={categoryIndex} className={`py-20 ${categoryIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{category.title}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {category.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {category.features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-gray-700">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Feature Highlights */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose EduTracker?</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Built specifically for educational institutions with features that address 
              real-world challenges in complaint management.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4">User-Centric Design</h3>
              <p className="text-blue-100">
                Interfaces designed specifically for students, faculty, and administrators 
                with intuitive workflows.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Real-Time Processing</h3>
              <p className="text-blue-100">
                Instant updates and notifications ensure everyone stays informed 
                throughout the complaint lifecycle.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Data-Driven Insights</h3>
              <p className="text-blue-100">
                Comprehensive analytics and reporting tools help identify trends 
                and improve institutional processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Experience These Features Today</h2>
          <p className="text-xl text-gray-600 mb-8">
            Ready to see how EduTracker can transform your institution's complaint management? 
            Get started with our comprehensive platform today.
          </p>
          <a
            href="/login"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 inline-block"
          >
            Start Using EduTracker
          </a>
        </div>
      </section>
    </div>
  );
};

export default Features;