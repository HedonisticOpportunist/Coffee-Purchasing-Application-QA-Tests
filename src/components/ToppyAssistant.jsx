import React, { useState, useEffect } from "react";
import toppyGif from "../assets/toppy.gif";
import "./ToppyAssistant.css";

const ToppyAssistant = () => {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState([
    { from: "toppy", text: "Hi! Need help?" },
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const showInterval = setInterval(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 8000);
    }, Math.random() * 20000 + 10000);

    return () => clearInterval(showInterval);
  }, []);

  const handleAssistantClick = () => {
    setExpanded(true);
    setVisible(true);
  };

  const handleClose = () => {
    setExpanded(false);
    setVisible(false);
  };

  const handleInputChange = (e) => setInput(e.target.value);

  const postChatMessage = (message) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    };

    fetch("http://localhost:3030/chatMessages", requestOptions).catch((error) =>
      console.log("error", error)
    );
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { from: "user", text: input };
    setMessages([...messages, userMessage]);
    postChatMessage(userMessage);
    setInput("");
    setTimeout(() => {
      const toppyReply = { from: "toppy", text: "I'm here to help!" };
      setMessages((msgs) => [...msgs, toppyReply]);
      postChatMessage(toppyReply);
    }, 1000);
  };

  if (!visible && !expanded) return null;

  if (expanded) {
    return (
      <div className="toppy-modal">
        <div className="toppy-modal-header">
          <img
            src={toppyGif}
            alt="Toppy Assistant"
            className="toppy-modal-img"
          />
          <span className="toppy-modal-title">Toppy Assistant</span>
          <button onClick={handleClose} className="toppy-modal-close">
            &times;
          </button>
        </div>
        <div className="toppy-modal-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`toppy-message ${msg.from}`}>
              <span className="toppy-message-bubble">{msg.text}</span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} className="toppy-modal-form">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="toppy-modal-input"
          />
          <button type="submit" className="toppy-modal-send">
            Send
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="toppy-popup" onClick={handleAssistantClick}>
      <img src={toppyGif} alt="Toppy Assistant" className="toppy-popup-img" />
      <span>Hi! Need help?</span>
    </div>
  );
};

export default ToppyAssistant;
