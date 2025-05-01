const QuizModal = ({ quiz, onClose, onComplete }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState({})
    const [showResults, setShowResults] = useState(false)
    const [score, setScore] = useState(0)
  
    const handleAnswerSelect = (questionId, answerId) => {
      setSelectedAnswers({
        ...selectedAnswers,
        [questionId]: answerId
      })
    }
  
    const calculateScore = () => {
      let correct = 0
      quiz.questions.forEach(question => {
        const selected = selectedAnswers[question.id]
        const correctAnswer = question.answers.find(a => a.correct)
        if (selected === correctAnswer?.id) correct++
      })
      setScore(Math.round((correct / quiz.questions.length) * 100))
      setShowResults(true)
    }
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{quiz.title}</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
  
            {!showResults ? (
              <div>
                <div className="mb-4">
                  <span className="font-medium">Question {currentQuestion + 1} of {quiz.questions.length}</span>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                    />
                  </div>
                </div>
  
                <div key={quiz.questions[currentQuestion].id} className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {quiz.questions[currentQuestion].question}
                  </h3>
                  <div className="space-y-3">
                    {quiz.questions[currentQuestion].answers.map(answer => (
                      <div 
                        key={answer.id}
                        onClick={() => handleAnswerSelect(quiz.questions[currentQuestion].id, answer.id)}
                        className={`p-4 border rounded-lg cursor-pointer transition ${
                          selectedAnswers[quiz.questions[currentQuestion].id] === answer.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        {answer.answerText}
                      </div>
                    ))}
                  </div>
                </div>
  
                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestion === 0}
                    className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {currentQuestion < quiz.questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQuestion(prev => prev + 1)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={calculateScore}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Submit Quiz
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-green-500" size={48} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
                <p className="text-xl mb-6">Your score: <span className="font-bold">{score}%</span></p>
                <p className="text-gray-600 mb-8">
                  {score >= 80 
                    ? "Great job! You've mastered this lesson."
                    : score >= 50
                    ? "Good effort! Review the material and try again."
                    : "Let's review the lesson material and try again."}
                </p>
                <button
                  onClick={() => {
                    onComplete(score)
                    onClose()
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Continue Learning
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }