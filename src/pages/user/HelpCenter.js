import { FiHelpCircle, FiSearch, FiMail, FiMessageSquare, FiClock, FiCheckCircle } from 'react-icons/fi';
import { useState } from 'react';

export default function HelpCenter() {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const faqCategories = [
    {
      id: 1,
      name: 'Account Settings',
      questions: [
        { id: 101, question: 'How do I update my profile information?', answer: 'You can update your profile by clicking on your avatar in the top right corner and selecting "Profile Settings".' },
        { id: 102, question: 'How do I change my password?', answer: 'Go to Account Security in your profile settings and select "Change Password".' }
      ]
    },
    {
      id: 2,
      name: 'Course Access',
      questions: [
        { id: 201, question: 'Why can\'t I access my purchased course?', answer: 'Please check your internet connection and ensure you\'re logged in with the correct account.' },
        { id: 202, question: 'How long do I have access to my courses?', answer: 'You have lifetime access to all courses you\'ve purchased.' }
      ]
    },
    {
      id: 3,
      name: 'Certificates',
      questions: [
        { id: 301, question: 'How do I download my certificate?', answer: 'Navigate to your completed course and click the "Download Certificate" button.' },
        { id: 302, question: 'My certificate has an error. How do I fix it?', answer: 'Please contact our support team with details of the error.' }
      ]
    }
  ];

  const popularArticles = [
    { id: 1, title: 'Getting Started with Your First Course', category: 'Getting Started' },
    { id: 2, title: 'Troubleshooting Playback Issues', category: 'Technical Help' },
    { id: 3, title: 'Understanding Course Certificates', category: 'Certificates' },
    { id: 4, title: 'Managing Your Subscription', category: 'Billing' }
  ];

  const supportTickets = [
    { id: 1, subject: 'Certificate download issue', status: 'Open', date: '2023-05-15' },
    { id: 2, subject: 'Course progress not saving', status: 'Resolved', date: '2023-04-28' },
    { id: 3, subject: 'Payment method question', status: 'Closed', date: '2023-03-10' }
  ];

  const filteredFaqs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-4">
          <FiHelpCircle className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Help Center</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions or contact our support team
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search help articles..."
            className="block w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('faq')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'faq'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            FAQs
          </button>
          <button
            onClick={() => setActiveTab('articles')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'articles'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Popular Articles
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'contact'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Contact Support
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'tickets'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            My Support Tickets
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {activeTab === 'faq' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
            {filteredFaqs.length > 0 ? (
              <div className="space-y-8">
                {filteredFaqs.map((category) => (
                  <div key={category.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">{category.name}</h3>
                    <div className="space-y-4">
                      {category.questions.map((q) => (
                        <div key={q.id} className="group">
                          <div className="flex items-start">
                            <div className="flex-1">
                              <h4 className="text-base font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                                {q.question}
                              </h4>
                              <p className="mt-2 text-sm text-gray-500">{q.answer}</p>
                            </div>
                            <button className="ml-4 text-indigo-600 hover:text-indigo-800">
                              <FiMessageSquare />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No results found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'articles' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Popular Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {popularArticles.map((article) => (
                <div key={article.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mb-3">
                    {article.category}
                  </span>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{article.title}</h3>
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    Read article →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Send us a message</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="What can we help you with?"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Please describe your issue in detail..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <FiMail className="mr-2" />
                    Send Message
                  </button>
                </form>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Support Information</h3>
                <div className="bg-gray-50 rounded-lg p-5">
                  <div className="flex items-start mb-4">
                    <div className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5">
                      <FiClock />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">Response Time</h4>
                      <p className="text-sm text-gray-500">Typically within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5">
                      <FiCheckCircle />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">Support Hours</h4>
                      <p className="text-sm text-gray-500">Monday - Friday, 9am - 5pm EST</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Emergency Contact</h4>
                  <p className="text-sm text-gray-500">
                    For urgent issues, please call: <span className="font-medium">+1 (555) 123-4567</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tickets' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">My Support Tickets</h2>
            {supportTickets.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ticket ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {supportTickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{ticket.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {ticket.subject}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            ticket.status === 'Open' ? 'bg-green-100 text-green-800' :
                            ticket.status === 'Resolved' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {ticket.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {ticket.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">You don't have any support tickets yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}