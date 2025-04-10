export default function ProgressBar({ value, className = '' }) {
    return (
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`}>
        <div 
          className="bg-indigo-600 h-full rounded-full" 
          style={{ width: `${value}%` }}
        ></div>
      </div>
    );
  }