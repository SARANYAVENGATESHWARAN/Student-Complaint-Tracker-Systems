import React from 'react';
import { Target, Users, Lightbulb, Award } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To streamline communication between students, faculty, and administration, ensuring every concern is heard and addressed promptly.'
    },
    {
      icon: Users,
      title: 'Our Community',
      description: 'Serving educational institutions worldwide with a user-friendly platform that brings transparency to complaint management.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Continuously improving our platform with cutting-edge features and user feedback to stay ahead of educational needs.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to providing reliable, secure, and efficient solutions that exceed expectations in educational technology.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">About EduTracker</h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            EduTracker was born from the vision to create a seamless bridge between 
            students, faculty, and administration in educational institutions, making 
            complaint management transparent, efficient, and user-friendly.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p>
                Educational institutions face unique challenges when it comes to managing student 
                concerns and complaints. Traditional methods often involve lengthy processes, 
                lack transparency, and create communication gaps between stakeholders.
              </p>
              <p>
                EduTracker was developed to address these challenges by providing a digital 
                platform that brings all parties together. Our system ensures that every 
                complaint is tracked, every stakeholder is informed, and every resolution 
                is documented for future reference.
              </p>
              <p>
                With features like real-time updates, role-based access, and comprehensive 
                reporting, EduTracker transforms how educational institutions handle student 
                concerns, making the process more efficient and transparent for everyone involved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in creating technology that serves people, promotes transparency, 
              and builds stronger educational communities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <value.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Built with Care</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            EduTracker is developed by a passionate team of educators, developers, and 
            designers who understand the unique needs of educational institutions. We're 
            committed to continuous improvement and always welcome feedback from our users 
            to make the platform even better.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join the growing community of educational institutions using EduTracker 
            to improve their complaint management processes.
          </p>
          <a
            href="/login"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 inline-block"
          >
            Start Your Journey
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;