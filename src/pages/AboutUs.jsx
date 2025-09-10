import React from 'react';
import { Link } from 'react-router-dom';
import anshitaImage from '../assets/anshita.png';

const AboutUs = () => {
  // Team members data
  const teamMembers = [
    {
      name: 'Anshita Agrawal',
      role: 'Founder & CEO',
      image: anshitaImage,
      bio: 'Financial expert with over 10 years of experience in personal finance management and budgeting.',
    },
    
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-indigo-700 rounded-lg shadow-xl overflow-hidden">
          <div className="px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              About Smart Budget
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100">
              Empowering you to take control of your finances with smart budgeting and expense forecasting.
            </p>
          </div>
        </div>

        {/* Our Mission */}
        <div className="mt-12 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Our Mission</h2>
          <p className="mt-4 text-lg text-gray-500">
            At Smart Budget, we believe that financial freedom starts with understanding and controlling your spending habits. 
            Our mission is to provide intuitive tools that help you track expenses, forecast future spending, and achieve your 
            financial goals. We're committed to making personal finance management accessible and stress-free for everyone.
          </p>
        </div>

        {/* Our Story */}
        <div className="mt-16">
          <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
            <div className="relative sm:py-16 lg:py-0">
              <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
                <div className="relative rounded-2xl shadow-xl overflow-hidden">
                  <img
                    className="object-cover w-full h-full"
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&h=1603&q=80"
                    alt="Team working on financial solutions"
                  />
                </div>
              </div>
            </div>

            <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
              <div className="pt-12 sm:pt-16 lg:pt-20">
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                  Our Story
                </h2>
                <div className="mt-6 text-gray-500 space-y-6">
                  <p className="text-lg">
                    Smart Budget was founded in 2020 by a team of finance professionals and tech enthusiasts who were frustrated with the complexity of existing budgeting tools.
                  </p>
                  <p className="text-base leading-7">
                    We started with a simple idea: create a budgeting platform that not only tracks your spending but also helps you plan for the future. After months of development and testing, we launched our first version with core expense tracking features.
                  </p>
                  <p className="text-base leading-7">
                    Today, we've grown to serve thousands of users across India, helping them save money, reduce financial stress, and achieve their goals. Our AI-powered forecasting tools have helped our users save an average of 20% more each month compared to traditional budgeting methods.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mt-16 bg-white py-12 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-16 rounded-lg shadow">
          <div className="relative max-w-xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Our Values
              </h2>
            </div>
            <div className="mt-12">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                          <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Trust & Transparency</h3>
                      <p className="mt-5 text-base text-gray-500">
                        We believe in complete transparency with our users. Your financial data is yours, and we're committed to keeping it secure and private.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                          <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Innovation</h3>
                      <p className="mt-5 text-base text-gray-500">
                        We're constantly improving our platform with cutting-edge technology to provide the most accurate forecasting and budgeting tools available.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                          <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">User-Centered</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Every feature we develop is designed with our users in mind. We regularly incorporate feedback to ensure our platform meets your needs.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                          <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Financial Education</h3>
                      <p className="mt-5 text-base text-gray-500">
                        We're committed to helping our users understand their finances better through educational resources and actionable insights.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16">
          <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
            <div className="space-y-12">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-center">Meet Our Team</h2>
              <p className="text-lg text-gray-500 text-center max-w-3xl mx-auto">
                Our diverse team of experts is passionate about helping you achieve financial freedom through smart budgeting and forecasting.
              </p>
              {/* Team members with left image, right content */}
              <div className="space-y-12">
                {teamMembers.map((member) => (
                  <div key={member.name} className="lg:flex lg:items-center lg:gap-x-12 bg-white rounded-xl shadow-md overflow-hidden">
                    {/* Left side - Image */}
                    <div className="lg:w-1/3">
                      <img className="h-full w-full object-cover" src={member.image} alt={member.name} />
                    </div>
                    
                    {/* Right side - Content */}
                    <div className="p-6 lg:w-2/3">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                          <p className="text-indigo-600 font-medium">{member.role}</p>
                        </div>
                        <div className="text-lg">
                          <p className="text-gray-500">{member.bio}</p>
                        </div>
                        <div className="pt-4">
                          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Contact {member.name.split(' ')[0]}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-indigo-700 rounded-lg shadow-xl mt-16">
          <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Ready to take control of your finances?</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-indigo-100">
              Join thousands of users who are saving more and stressing less with Smart Budget.
            </p>
            <Link
              to="/signup"
              className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
            >
              Sign up for free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;