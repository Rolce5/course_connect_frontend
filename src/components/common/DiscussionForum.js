const DiscussionForum = ({ courseId, lessonId }) => {
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const [replyingTo, setReplyingTo] = useState(null)
  
    useEffect(() => {
      // Fetch comments for this lesson
    }, [courseId, lessonId])
  
    const handleSubmit = (e) => {
      e.preventDefault()
      if (!newComment.trim()) return
      
      // API call to post comment
      setNewComment('')
      setReplyingTo(null)
    }
  
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Lesson Discussion</h2>
        
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <img 
                src={user.profilePic || '/default-avatar.png'} 
                alt={user.first_name}
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={replyingTo ? `Replying to ${replyingTo.user.first_name}...` : "Add to the discussion..."}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                {replyingTo && (
                  <button
                    type="button"
                    onClick={() => setReplyingTo(null)}
                    className="mr-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {replyingTo ? 'Post Reply' : 'Post Comment'}
                </button>
              </div>
            </div>
          </div>
        </form>
  
        <div className="space-y-6">
          {comments.map(comment => (
            <CommentItem 
              key={comment.id}
              comment={comment}
              onReply={() => setReplyingTo(comment)}
              depth={0}
            />
          ))}
        </div>
      </div>
    )
  }
  
  const CommentItem = ({ comment, onReply, depth }) => {
    const [isExpanded, setIsExpanded] = useState(true)
    const hasReplies = comment.replies && comment.replies.length > 0
  
    return (
      <div 
        className={`pl-${Math.min(depth * 4, 12)}`}
        style={{ paddingLeft: `${Math.min(depth * 16, 48)}px` }}
      >
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <img 
              src={comment.user.profilePic || '/default-avatar.png'} 
              alt={comment.user.first_name}
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div className="flex-1">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-1">
                <span className="font-semibold">
                  {comment.user.first_name} {comment.user.last_name}
                </span>
                <span className="text-gray-500 text-sm ml-2">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700 mb-2">{comment.content}</p>
              <button
                onClick={onReply}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Reply
              </button>
            </div>
          </div>
        </div>
  
        {hasReplies && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-16 mt-2 flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? (
              <>
                <ChevronDown size={16} className="mr-1" />
                Hide {comment.replies.length} replies
              </>
            ) : (
              <>
                <ChevronRight size={16} className="mr-1" />
                Show {comment.replies.length} replies
              </>
            )}
          </button>
        )}
  
        {hasReplies && isExpanded && (
          <div className="mt-3 space-y-3">
            {comment.replies.map(reply => (
              <CommentItem
                key={reply.id}
                comment={reply}
                onReply={onReply}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    )
  }