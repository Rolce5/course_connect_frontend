import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const QuizCard = ({ quiz, courseId }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start">
        <div className="bg-purple-100 p-3 rounded-full mr-4">
          <FaQuestionCircle className="text-purple-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{quiz.title}</h3>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <span>{quiz.questions?.length || 0} questions</span>
          </div>
        </div>
        <Link
          to={`/admin/courses/${courseId}/quizzes/${quiz.id}`}
          className="ml-4 px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default QuizCard;