import React, { useState } from "react";
import axios from "axios";

const LLMChatButton = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    
    setLoading(true);
    setResponse(""); // Clear old response

    try {
      const res = await axios.post("http://localhost:5000/api/messages/ask-llm", { message });
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setResponse("Failed to get response.");
    }

    setLoading(false);
  };

  return (
    <div>
      <input 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        placeholder="Ask the AI..." 
      />
      <button onClick={handleSend} disabled={loading}>
        {loading ? "Loading..." : "Chat with LLM"}
      </button>
      {response && <p>Response: {response}</p>}
    </div>
  );
};

export default LLMChatButton;
