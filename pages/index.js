import React, { useState, useEffect } from 'react';

const Chatbot = () => {
  const [ messages, setMessages ] = useState([]);
  const [ message, setMessage ] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    setMessages([...messages, { text: message, isUser: true }]);
    setMessage('');

    try {
      const response = await fetch(`/api/openai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });
      const json = await response.json();
      setMessages([...messages, { text: json.text, isUser: false }]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        { messages.map((message, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '20px', backgroundColor: message.isUser ? '#0084ff' : '#ddd', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              { message.isUser ? 'You' : 'Bot' }
            </div>
            <div style={{ backgroundColor: message.isUser ? '#0084ff' : '#ddd', color: 'white', padding: '10px', borderRadius: '5px', marginLeft: '10px' }}>
              { message.text }
            </div>
          </li>
        )) }
      </ul>
      <form onSubmit={handleSubmit} style={{ display: 'flex', paddingTop: '20px' }}>
        <input
          type="text"
          value={message}
          onChange={event => setMessage(event.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '5px' }}
        />
        <button type="submit" style={{ padding: '10px', marginLeft: '10px', backgroundColor: '#0084ff', color: 'white', borderRadius: '5px', border: 'none' }}>Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
