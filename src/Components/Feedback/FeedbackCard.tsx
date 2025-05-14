import React from 'react';
import { Feedback, FeedbackStatus } from './FeedbackService';

type Props = {
  feedback: Feedback;
  onStatusChange: (status: FeedbackStatus) => void;
  onDelete: () => void;
};

const statusColors = {
  Pending: 'bg-yellow-200 text-yellow-800',
  Reviewed: 'bg-blue-200 text-blue-800',
  Resolved: 'bg-green-200 text-green-800',
};

const FeedbackCard: React.FC<Props> = ({ feedback, onStatusChange, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4 border border-gray-100">
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold text-lg text-gray-800">{feedback.name}</div>
        <span className={`px-2 py-1 rounded text-xs font-bold ${statusColors[feedback.status]}`}>{feedback.status}</span>
      </div>
      <div className="text-sm text-gray-500 mb-1">{new Date(feedback.date).toLocaleString()}</div>
      <div className="font-semibold text-yellow-700 mb-1">{feedback.subject}</div>
      <div className="text-gray-700 mb-2 whitespace-pre-line">{feedback.message}</div>
      <div className="flex gap-2 mt-2">
        {(['Pending','Reviewed','Resolved'] as FeedbackStatus[]).map(status => (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            className={`px-2 py-1 rounded text-xs font-bold border ${feedback.status === status ? 'border-yellow-500' : 'border-gray-200'} ${statusColors[status]} transition`}
            disabled={feedback.status === status}
          >
            {status}
          </button>
        ))}
        <button
          onClick={onDelete}
          className="ml-auto px-2 py-1 rounded text-xs font-bold bg-red-100 text-red-700 border border-red-200 hover:bg-red-200 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default FeedbackCard;
