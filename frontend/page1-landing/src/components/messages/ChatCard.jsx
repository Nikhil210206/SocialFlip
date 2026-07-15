import React from "react";

function ChatCard({ name, message, time, unread, image }) {
  return (
    <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
      <div className="flex items-center gap-4">
        <img
          src={image}
          alt={name}
          className="w-11 h-11 rounded-full object-cover"
        />
        <div>
          <h3 className="text-[15px] font-semibold text-gray-900">
            {name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {message}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-xs text-gray-400">
          {time}
        </span>
        {unread && (
          <div className="mt-2 w-2 h-2 rounded-full bg-green-500"></div>
        )}
      </div>
    </div>
  );
}

export default ChatCard;
