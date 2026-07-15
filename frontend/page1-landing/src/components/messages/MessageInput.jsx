import React from "react";

function MessageInput({ message, setMessage, onSend }) {
  return (
    <div className="mt-6 flex gap-3">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSend();
          }
        }}
        className="flex-1 border rounded-lg px-4 py-2"
      />
      <button
        onClick={onSend}
        disabled={!message.trim()}
        className={`px-6 rounded-lg text-white transition-colors ${
          message.trim()
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Send
      </button>
    </div>
  );
}

export default MessageInput;
