import React, { useState } from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

function Conversation({ selectedChat, messages, onSend }) {
  const [message, setMessage] = useState("");

  function handleSend() {
    if (message.trim() === "") return;
    onSend(message);
    setMessage("");
  }

  return (
    <div className="flex flex-col h-[520px] p-6">
      <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
        <img
          src={selectedChat.image}
          alt={selectedChat.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">
            {selectedChat.name}
          </h2>
          <p className="text-sm text-gray-500">
            Active now
          </p>
        </div>
      </div>

      <div className="flex-1 mt-6 space-y-3 overflow-y-auto">
        {messages.map((chat) => (
          <MessageBubble
            key={chat.id}
            sender={chat.sender}
            text={chat.text}
          />
        ))}
      </div>

      <MessageInput
        message={message}
        setMessage={setMessage}
        onSend={handleSend}
      />
    </div>
  );
}

export default Conversation;
