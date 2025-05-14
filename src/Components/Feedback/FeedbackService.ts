export type FeedbackStatus = 'Pending' | 'Reviewed' | 'Resolved';

export interface Feedback {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: FeedbackStatus;
}

const FEEDBACK_KEY = 'feedback_submissions';

export const FeedbackService = {
  getAll(): Feedback[] {
    const data = localStorage.getItem(FEEDBACK_KEY);
    return data ? JSON.parse(data) : [];
  },
  add(feedback: Omit<Feedback, 'id' | 'date' | 'status'>): Feedback {
    const all = FeedbackService.getAll();
    const newFeedback: Feedback = {
      ...feedback,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'Pending',
    };
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify([newFeedback, ...all]));
    return newFeedback;
  },
  updateStatus(id: string, status: FeedbackStatus) {
    const all = FeedbackService.getAll();
    const updated = all.map(f => f.id === id ? { ...f, status } : f);
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(updated));
  },
  delete(id: string) {
    const all = FeedbackService.getAll();
    const updated = all.filter(f => f.id !== id);
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(updated));
  }
};
