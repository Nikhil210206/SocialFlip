import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/messages/SearchBar";
import ChatCard from "../components/messages/ChatCard";
import Conversation from "../components/messages/Conversation";
import messages from "../data/messages";
import chats from "../data/chats";

export default function MessagesPage() {
  const location = useLocation();
  const sellerUsername = location.state?.sellerUsername;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChat, setSelectedChat] = useState(messages[0]);
  const [conversations, setConversations] = useState(chats);

  useEffect(() => {
    if (sellerUsername) {
      // Find chat corresponding to the seller
      const formattedSeller = sellerUsername.replace("@", "").toLowerCase();
      const matchedChat = messages.find((m) =>
        m.name.toLowerCase().includes(formattedSeller) ||
        formattedSeller.includes(m.name.toLowerCase())
      );
      if (matchedChat) {
        setSelectedChat(matchedChat);
      }
    }
  }, [sellerUsername]);

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleSend(newMessage) {
    setConversations((prev) => ({
      ...prev,
      [selectedChat.id]: [
        ...prev[selectedChat.id],
        {
          id: Date.now(),
          sender: "me",
          text: newMessage,
        },
      ],
    }));
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-16">
      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1F2937]">
          Messages
        </h1>
        <p className="mt-2 text-gray-500">
          Chat with buyers and sellers
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Panel */}
          <div className="md:col-span-1">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            <div className="mt-5 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => setSelectedChat(message)}
                    className={`cursor-pointer transition-colors duration-200 ${
                      selectedChat.id === message.id
                        ? "bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <ChatCard
                      name={message.name}
                      message={message.message}
                      time={message.time}
                      unread={message.unread}
                      image={message.image}
                    />
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No conversations found.
                </div>
              )}
            </div>
          </div>

          {/* Right Panel */}
          <div className="hidden md:block md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
            <Conversation
              selectedChat={selectedChat}
              messages={conversations[selectedChat.id] || []}
              onSend={handleSend}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
