import React, { useState } from 'react';
import { Feedback, FeedbackService, FeedbackStatus } from './FeedbackService';
import FeedbackCard from './FeedbackCard';

const PAGE_SIZE = 5;

const FeedbackList: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(FeedbackService.getAll());
  const [page, setPage] = useState(0);

  const handleStatusChange = (id: string, status: FeedbackStatus) => {
    FeedbackService.updateStatus(id, status);
    setFeedbacks(FeedbackService.getAll());
  };

  const handleDelete = (id: string) => {
    FeedbackService.delete(id);
    setFeedbacks(FeedbackService.getAll());
  };

  // Pagination
  const pagedFeedbacks = feedbacks.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const pageCount = Math.ceil(feedbacks.length / PAGE_SIZE);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 font-['Roboto_Condensed'] text-yellow-700">Feedback Submissions</h2>
      {pagedFeedbacks.length === 0 ? (
        <div className="text-gray-500 text-center py-8">No feedback submissions yet.</div>
      ) : (
        pagedFeedbacks.map(fb => (
          <FeedbackCard
            key={fb.id}
            feedback={fb}
            onStatusChange={status => handleStatusChange(fb.id, status)}
            onDelete={() => handleDelete(fb.id)}
          />
        ))
      )}
      {/* Pagination controls */}
      {pageCount > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            className="px-3 py-1 rounded bg-yellow-200 text-yellow-800 font-bold disabled:opacity-50"
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            Previous
          </button>
          <span className="px-2 py-1 text-yellow-700 font-semibold">Page {page + 1} of {pageCount}</span>
          <button
            className="px-3 py-1 rounded bg-yellow-200 text-yellow-800 font-bold disabled:opacity-50"
            onClick={() => setPage(p => Math.min(pageCount - 1, p + 1))}
            disabled={page === pageCount - 1}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
