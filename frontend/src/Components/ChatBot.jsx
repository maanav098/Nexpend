import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import "../Css/ChatBot.css";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hello! I am your Bill Assistant. How can I help you today?",
      type: "bot",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    // Add user message
    const newMessages = [...messages, { text: input, type: "user" }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages([...newMessages, { text: botResponse, type: "bot" }]);
      setIsTyping(false);
    }, 1000);
  };

  // Mock function to handle bot responses
  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();

    if (input.includes("recent") && input.includes("bill")) {
      return "Your most recent bill was from Grocery Store ABC on April 10, 2025, for a total of $78.95.";
    } else if (input.includes("spent") && input.includes("groceries")) {
      return "You've spent $312.45 on groceries this month so far.";
    } else if (input.includes("highest") && input.includes("expense")) {
      return "Your highest expense this month was $145.30 at Utility Company XYZ on April 5, 2025.";
    } else if (input.includes("total") && input.includes("month")) {
      return "Your total expenses this month are $753.21 so far.";
    } else if (input.includes("hi") || input.includes("hello")) {
      return "Hello! How can I help you with your bills and expenses today?";
    } else if (input.includes("thank")) {
      return "You're welcome! Is there anything else I can help you with?";
    } else {
      return "I'm sorry, I don't have enough information about that yet. You can ask me about your recent bills, expenses by category, or totals for the month.";
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h1>Bill Assistant</h1>
        <p>Ask me anything about your bills and expenses</p>
      </div>

      <div className="chat-container" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}-message`}>
            {message.text}
          </div>
        ))}
        {isTyping && (
          <div className="message bot-message typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your question here..."
          className="chat-input"
        />
        <button type="submit" className="chat-send-btn">
          Send
        </button>
      </form>

      <div className="suggested-questions">
        <p>Suggested questions:</p>
        <div className="question-chips">
          <button
            className="question-chip"
            onClick={() => {
              setInput("What was my most recent bill?");
              document
                .querySelector(".chat-input-form")
                .dispatchEvent(
                  new Event("submit", { cancelable: true, bubbles: true })
                );
            }}
          >
            What was my most recent bill?
          </button>
          <button
            className="question-chip"
            onClick={() => {
              setInput("How much have I spent on groceries this month?");
              document
                .querySelector(".chat-input-form")
                .dispatchEvent(
                  new Event("submit", { cancelable: true, bubbles: true })
                );
            }}
          >
            How much have I spent on groceries?
          </button>
          <button
            className="question-chip"
            onClick={() => {
              setInput("What's my highest expense this month?");
              document
                .querySelector(".chat-input-form")
                .dispatchEvent(
                  new Event("submit", { cancelable: true, bubbles: true })
                );
            }}
          >
            What's my highest expense?
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
