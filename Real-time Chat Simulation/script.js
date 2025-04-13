document.addEventListener("DOMContentLoaded", () => {
  const chatMessages = document.getElementById("chat-messages");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");

  // Sample responses for simulated messages
  const sampleResponses = [
    "That's interesting! Tell me more.",
    "I understand what you're saying.",
    "How has your day been?",
    "That sounds great!",
    "I'm here to chat with you.",
    "What else is on your mind?",
    "That's a good point!",
    "I'm enjoying our conversation.",
  ];

  // Function to add a message to the chat
  function addMessage(text, isSent = false) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${isSent ? "sent" : "received"}`;

    const messageContent = document.createElement("div");
    messageContent.textContent = text;

    const timestamp = document.createElement("div");

    // Timestamp color based on message type
    timestamp.className = `${
      isSent ? "message-timestamp-sent" : "message-timestamp-received"
    }`;

    timestamp.textContent = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    messageDiv.appendChild(messageContent);
    messageDiv.appendChild(timestamp);
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Function to simulate receiving a message
  function simulateIncomingMessage() {
    const randomResponse =
      sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
    setTimeout(() => {
      addMessage(randomResponse);
    }, 1000); // Simulate a delay for incoming message
  }

  // Function to handle sending a message
  function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
      addMessage(message, true);
      messageInput.value = "";
      simulateIncomingMessage();
    }
  }

  // Event listeners
  sendButton.addEventListener("click", sendMessage);
  messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  // Add initial welcome message
  addMessage("Hello! I'm your chat partner. How can I help you today?");
});
