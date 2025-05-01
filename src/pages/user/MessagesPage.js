import { useState } from 'react';
import { FiMessageSquare, FiSearch, FiSend, FiChevronDown, FiPaperclip } from 'react-icons/fi';

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  // Mock data
  const messages = [
    {
      id: 1,
      sender: "Sarah Johnson",
      subject: "Feedback on your last assignment",
      preview: "Hi there, I've reviewed your assignment and wanted to share some feedback...",
      date: "2 hours ago",
      read: false,
      type: "instructor"
    },
    {
      id: 2,
      sender: "Study Group Team",
      subject: "Weekly study session reminder",
      preview: "Don't forget we have our weekly study session tomorrow at 6 PM...",
      date: "1 day ago",
      read: true,
      type: "group"
    },
    {
      id: 3,
      sender: "Course Support",
      subject: "Your certificate is ready",
      preview: "Congratulations! Your certificate for UI/UX Fundamentals is now available...",
      date: "3 days ago",
      read: true,
      type: "system"
    },
    {
      id: 4,
      sender: "Michael Chen",
      subject: "Question about the next module",
      preview: "Hey, I was wondering if you could help me with the upcoming module on...",
      date: "1 week ago",
      read: true,
      type: "student"
    }
  ];

  const filteredMessages = messages.filter(message => 
    activeTab === 'inbox' ? true : message.type === activeTab
  );

  const getMessageTypeBadge = (type) => {
    switch(type) {
      case 'instructor':
        return 'bg-blue-100 text-blue-800';
      case 'group':
        return 'bg-purple-100 text-purple-800';
      case 'system':
        return 'bg-green-100 text-green-800';
      case 'student':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Messages</h1>
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
          {messages.filter(m => !m.read).length} Unread
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-1/3 border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('inbox')}
                  className={`whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm ${
                    activeTab === 'inbox'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Inbox
                </button>
                <button
                  onClick={() => setActiveTab('instructor')}
                  className={`whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm ${
                    activeTab === 'instructor'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Instructors
                </button>
                <button
                  onClick={() => setActiveTab('group')}
                  className={`whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm ${
                    activeTab === 'group'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Groups
                </button>
              </nav>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
              {filteredMessages.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {filteredMessages.map(message => (
                    <li 
                      key={message.id}
                      onClick={() => setSelectedMessage(message)}
                      className={`px-4 py-4 hover:bg-gray-50 cursor-pointer ${
                        selectedMessage?.id === message.id ? 'bg-indigo-50' : ''
                      } ${!message.read ? 'bg-blue-50' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${
                          !message.read ? 'text-gray-900' : 'text-gray-600'
                        }`}>
                          {message.sender}
                        </p>
                        <span className="text-xs text-gray-500">{message.date}</span>
                      </div>
                      <p className={`text-sm ${
                        !message.read ? 'text-gray-900 font-medium' : 'text-gray-500'
                      }`}>
                        {message.subject}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{message.preview}</p>
                      <span className={`inline-flex items-center mt-1 px-2 py-0.5 rounded text-xs font-medium ${getMessageTypeBadge(message.type)}`}>
                        {message.type === 'instructor' ? 'Instructor' : 
                         message.type === 'group' ? 'Group' : 
                         message.type === 'system' ? 'System' : 'Student'}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-8 text-center">
                  <FiMessageSquare className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">No messages found</p>
                </div>
              )}
            </div>
          </div>

          {/* Message Content */}
          <div className="w-full md:w-2/3">
            {selectedMessage ? (
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">{selectedMessage.subject}</h2>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMessageTypeBadge(selectedMessage.type)}`}>
                        {selectedMessage.type === 'instructor' ? 'Instructor' : 
                         selectedMessage.type === 'group' ? 'Group' : 
                         selectedMessage.type === 'system' ? 'System' : 'Student'}
                      </span>
                      <span className="text-xs text-gray-500">{selectedMessage.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">From: {selectedMessage.sender}</p>
                </div>
                <div className="flex-1 p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
                  <div className="prose prose-sm max-w-none">
                    <p>Dear Student,</p>
                    <p>{selectedMessage.pview}</p>
                    <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.</p>
                    <p>Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere.</p>
                    <p className="mt-4">Best regards,<br />{selectedMessage.sender}</p>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-start space-x-4">
                    <div className="min-w-0 flex-1">
                      <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                        <label htmlFor="comment" className="sr-only">Reply</label>
                        <textarea
                          rows={3}
                          name="comment"
                          id="comment"
                          className="block w-full py-3 border-0 resize-none focus:ring-0 sm:text-sm"
                          placeholder="Write a reply..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <div className="flex justify-between items-center px-3 py-2 bg-gray-50">
                          <div className="flex items-center space-x-5">
                            <button
                              type="button"
                              className="-m-2.5 w-10 h-10 rounded-full inline-flex items-center justify-center text-gray-400 hover:text-gray-500"
                            >
                              <FiPaperclip className="h-5 w-5" />
                              <span className="sr-only">Attach a file</span>
                            </button>
                          </div>
                          <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <FiSend className="-ml-1 mr-2 h-5 w-5" />
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-12">
                <div className="text-center">
                  <FiMessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No message selected</h3>
                  <p className="mt-1 text-sm text-gray-500">Select a message from the list to view it here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}