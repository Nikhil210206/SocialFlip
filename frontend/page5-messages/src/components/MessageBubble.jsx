function MessageBubble({ sender, text }) {
  return (
    <div
      className={`max-w-xs rounded-lg px-4 py-2 ${
        sender === "me"
          ? "bg-blue-600 text-white ml-auto"
          : "bg-gray-200 text-black"
      }`}
    >
      {text}
    </div>
  );
}

export default MessageBubble;