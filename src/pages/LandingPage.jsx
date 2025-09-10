import { Link } from 'react-router-dom';
import { ArrowRightIcon, ChartBarIcon, CurrencyRupeeIcon, BellAlertIcon } from '@heroicons/react/24/outline';

const LandingPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-indigo-800">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt=""
          />
          <div className="absolute inset-0 bg-indigo-800 mix-blend-multiply" aria-hidden="true" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Smart Budget & Expense Forecaster</h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
            Take control of your finances with intelligent budget tracking and expense forecasting. Plan smarter, save more, and achieve your financial goals.
          </p>
          <div className="mt-10 flex space-x-4">
            <Link
              to="/signup"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Get Started
              <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Smart Features</h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">Everything you need to manage your finances</p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">Comprehensive tools to track, analyze, and forecast your financial journey.</p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                        <CurrencyRupeeIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Budget Tracking</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Easily track your income and expenses. Categorize transactions and get a clear picture of where your money goes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                        <ChartBarIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Expense Forecasting</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Predict future expenses based on your spending patterns. Plan ahead and avoid financial surprises.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                        <BellAlertIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Smart Notifications</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Get timely alerts about your spending habits and achievements. Stay on top of your financial goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Testimonials</h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">Hear from our users</p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">Discover how Smart Budget has transformed financial management for people like you.</p>
          </div>
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-gray-50 rounded-lg p-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img className="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-900">Priya Sharma</h4>
                    <p className="text-indigo-600">Delhi, India</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">
                  "This app helped me save for my dream vacation! The forecasting feature showed me exactly how much I needed to set aside each month."
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img className="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-900">Rahul Patel</h4>
                    <p className="text-indigo-600">Mumbai, India</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">
                  "The notifications feature is a game-changer. I used to overspend without realizing it, but now I get alerts that keep me on track."
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img className="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-900">Amit Kumar</h4>
                    <p className="text-indigo-600">Bangalore, India</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">
                  "I've tried many budget apps, but this one stands out with its forecasting capabilities. I can now plan my finances months in advance."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to take control of your finances?</span>
            <span className="block">Start using Smart Budget today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            Join thousands of users who have transformed their financial habits with our intelligent budgeting tools.
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
  );
};

export default LandingPage;