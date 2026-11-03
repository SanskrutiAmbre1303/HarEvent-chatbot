
import { useState, useRef, useEffect } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/chat";

const initialMessage = {
  sender: "bot",
  text: "Hi! Welcome to HarEvent! 👋\n\nI'm NiDi, your personal guide. How can I help you today?",
};

const initialOptions = [
  {
    label: "I'm a Customer",
    description: "Explore vendors, services and events.",
    value: "customer",
    icon: "🔍",
  },
  {
    label: "I'm a Vendor",
    description: "Register your business and grow with HarEvent.",
    value: "vendor",
    icon: "🏪",
  },
];

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([initialMessage]);
  const [options, setOptions] = useState(initialOptions);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const isWelcomeScreen =
    messages.length === 1 &&
    messages[0].sender === "bot" &&
    options === initialOptions;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, options, loading]);

  async function handleOptionClick(option) {
    if (loading) return;

    if (
      ["start", "restart", "main_menu", "start_again"].includes(option.value) ||
      ["Start again", "Main menu"].includes(option.label)
    ) {
      setMessages([initialMessage]);
      setOptions(initialOptions);
      return;
    }

    setMessages((previous) => [
      ...previous,
      { sender: "user", text: option.label },
    ]);

    setOptions([]);
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ choice: option.value }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Something went wrong. Please try again."
        );
      }

      setMessages((previous) => [
        ...previous,
        { sender: "bot", text: data.message },
      ]);

      if (Array.isArray(data.options) && data.options.length > 0) {
        setOptions(data.options);
      } else {
        setOptions([{ label: "Main menu", value: "main_menu" }]);
      }
    } catch (error) {
      console.error("Chatbot request failed:", error);

      setMessages((previous) => [
        ...previous,
        {
          sender: "bot",
          text:
            "Sorry, I couldn't connect to HarEvent's chatbot server. Please check that the backend is running and try again.",
        },
      ]);

      setOptions([
        { label: "Try again", value: option.value },
        { label: "Main menu", value: "main_menu" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chatbot-container">
      {isOpen ? (
        <div className="chatbot-window">

          <div className="chatbot-header">
            <div className="header-profile">
              <div className="bot-avatar">💬</div>

              <div className="header-details">
                <h2>Chat with NiDi</h2>
                <p>Your Personal HarEvent Guide</p>
              </div>
            </div>

            <div className="online-status">
              <span className="online-dot"></span>
              Online
            </div>

            <button
              type="button"
              className="close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              ×
            </button>
          </div>

          <div
            className="chatbot-messages"
            aria-live="polite"
            aria-label="Chat conversation"
          >
            {messages.map((message, index) => (
              <div
                key={`${index}-${message.sender}`}
                className={`message ${message.sender}`}
              >
                {message.text}
              </div>
            ))}

            {isWelcomeScreen && (
              <div className="journey-heading">
                Choose your journey:
              </div>
            )}

            {loading && (
              <div className="message bot">
                Please wait, I'm thinking...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className={`chatbot-options ${isWelcomeScreen ? "welcome-options" : ""}`}>
            {options.map((option) => (
              <button
                type="button"
                key={`${option.value}-${option.label}`}
                className={`option-button ${isWelcomeScreen ? "journey-card" : ""}`}
                onClick={() => handleOptionClick(option)}
                disabled={loading}
              >
                {isWelcomeScreen ? (
                  <>
                    <span className="journey-icon">{option.icon}</span>

                    <span className="journey-content">
                      <strong>{option.label}</strong>
                      <small>{option.description}</small>
                    </span>

                    <span className="journey-arrow">›</span>
                  </>
                ) : (
                  <>
                    <span>{option.label}</span>
                    <span className="option-arrow">›</span>
                  </>
                )}
              </button>
            ))}
          </div>

          <div className="chatbot-footer">
            Powered by <strong>HarEvent</strong>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="chatbot-launch-button"
          onClick={() => setIsOpen(true)}
        >
          💬 Chat with NiDi
        </button>
      )}
    </div>
  );
}

export default App;
