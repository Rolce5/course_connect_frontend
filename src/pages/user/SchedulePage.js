import { useState } from 'react';
import { FiCalendar, FiClock, FiPlus, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('upcoming');

  // Mock data
  const events = [
    {
      id: 1,
      title: "Live Q&A Session - React",
      instructor: "Sarah Johnson",
      date: new Date(2023, 5, 15, 14, 0),
      duration: 60,
      type: "live",
      joined: true
    },
    {
      id: 2,
      title: "Assignment Deadline",
      course: "Python for Data Science",
      date: new Date(2023, 5, 18, 23, 59),
      type: "deadline"
    },
    {
      id: 3,
      title: "Weekly Study Group",
      instructor: "Peer-led",
      date: new Date(2023, 5, 20, 18, 0),
      duration: 90,
      type: "study-group",
      joined: false
    },
    {
      id: 4,
      title: "Completed: Final Exam",
      course: "UI/UX Fundamentals",
      date: new Date(2023, 4, 28, 10, 0),
      duration: 120,
      type: "exam",
      status: "completed"
    }
  ];

  const filteredEvents = events.filter(event => 
    activeTab === 'upcoming' ? 
      event.date >= new Date() : 
      event.date < new Date()
  );

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getEventTypeBadge = (type) => {
    const baseClasses = "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium";
    switch(type) {
      case 'live':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'deadline':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'study-group':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'exam':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">My Schedule</h1>
        <div className="flex space-x-4">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
            <FiPlus className="mr-2" />
            Add Event
          </button>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'upcoming'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'past'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              Past
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => {
                  const prevMonth = new Date(currentDate);
                  prevMonth.setMonth(prevMonth.getMonth() - 1);
                  setCurrentDate(prevMonth);
                }}
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <FiChevronLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setCurrentDate(new Date())}
                className="text-sm px-3 py-1 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Today
              </button>
              <button 
                onClick={() => {
                  const nextMonth = new Date(currentDate);
                  nextMonth.setMonth(nextMonth.getMonth() + 1);
                  setCurrentDate(nextMonth);
                }}
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <FiChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Calendar Grid - Simplified for this example */}
          <div className="grid grid-cols-7 gap-1 mb-6">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }).map((_, i) => {
              const date = new Date(currentDate);
              date.setDate(1);
              date.setDate(date.getDate() - date.getDay() + i);
              const isCurrentMonth = date.getMonth() === currentDate.getMonth();
              const isToday = date.toDateString() === new Date().toDateString();
              const hasEvents = events.some(e => 
                e.date.getDate() === date.getDate() && 
                e.date.getMonth() === date.getMonth() && 
                e.date.getFullYear() === date.getFullYear()
              );

              return (
                <div 
                  key={i}
                  className={`h-12 border rounded-md flex flex-col items-center justify-center text-sm ${
                    isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                  } ${
                    isToday ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                  }`}
                >
                  {date.getDate()}
                  {hasEvents && (
                    <div className="w-1 h-1 rounded-full bg-indigo-500 mt-1"></div>
                  )}
                </div>
              );
            })}
          </div>

          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {activeTab === 'upcoming' ? 'Upcoming Events' : 'Past Events'}
          </h3>

          {filteredEvents.length > 0 ? (
            <div className="space-y-4">
              {filteredEvents.map(event => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <p className="text-sm text-gray-500">
                        {event.course ? `Course: ${event.course}` : `Instructor: ${event.instructor}`}
                      </p>
                    </div>
                    <span className={getEventTypeBadge(event.type)}>
                      {event.type === 'live' ? 'Live Session' : 
                       event.type === 'deadline' ? 'Deadline' : 
                       event.type === 'study-group' ? 'Study Group' : 
                       'Exam'}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <FiCalendar className="mr-1.5" />
                    <span>{formatDate(event.date)}</span>
                    <FiClock className="ml-3 mr-1.5" />
                    <span>
                      {formatTime(event.date)}
                      {event.duration && ` - ${event.duration} min`}
                    </span>
                  </div>
                  {activeTab === 'upcoming' && event.type === 'live' && (
                    <div className="mt-3">
                      <button className={`inline-flex items-center px-3 py-1.5 border rounded-md text-sm font-medium ${
                        event.joined 
                          ? 'border-green-300 bg-green-100 text-green-800' 
                          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                      }`}>
                        {event.joined ? 'Joined' : 'Join Session'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FiCalendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No {activeTab === 'upcoming' ? 'upcoming' : 'past'} events
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {activeTab === 'upcoming' 
                  ? 'You have no scheduled events coming up' 
                  : 'Your past events will appear here'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}