import React from "react";
import { FaCheckCircle, FaPlusCircle, FaExclamationTriangle } from "react-icons/fa";

export interface Notification {
  id: string;
  message: string;
  timestamp: string;
  type?: "success" | "info" | "warning";
  read?: boolean;
  link?: string;
}

interface NotificationListProps {
  notifications: Notification[];
  onMarkRead: (id: string) => void;
  onClear: (id: string) => void;
}

const typeIcon = {
  success: <FaCheckCircle className="text-green-500" />,
  info: <FaPlusCircle className="text-blue-500" />,
  warning: <FaExclamationTriangle className="text-yellow-500" />,
};

const NotificationList: React.FC<NotificationListProps> = ({ notifications, onMarkRead, onClear }) => (
  <ul className="space-y-3">
    {notifications.map((note) => (
      <li
        key={note.id}
        className={`flex items-start gap-3 text-sm bg-gray-50 p-3 rounded-md hover:bg-gray-100 transition cursor-pointer ${note.read ? 'opacity-60' : ''}`}
        onClick={() => note.link && window.open(note.link, "_blank")}
      >
        <span>{typeIcon[note.type || "info"]}</span>
        <div className="flex-1">
          <div className="text-gray-700">{note.message}</div>
          <div className="text-xs text-gray-400 mt-1">{note.timestamp}</div>
        </div>
        <button
          className="ml-2 text-xs text-blue-500 hover:underline"
          onClick={e => { e.stopPropagation(); onMarkRead(note.id); }}
        >
          Mark as read
        </button>
        <button
          className="ml-1 text-xs text-red-400 hover:underline"
          onClick={e => { e.stopPropagation(); onClear(note.id); }}
        >
          Clear
        </button>
      </li>
    ))}
    {notifications.length === 0 && <li className="text-gray-400 text-sm">No notifications</li>}
  </ul>
);

export default NotificationList;
