import React, { useState, useRef } from 'react';
import './ChatBot.scss';
import { AiOutlineSend, AiOutlineMinus } from 'react-icons/ai'
import { BsChevronCompactUp } from 'react-icons/bs';
import { RiMessage2Fill } from 'react-icons/ri'
import responsesData from '../../data/responses.json';
import { useNavigate } from 'react-router-dom';

function processUserMessage(userMessage) {
    const lowerUserMessage = userMessage.toLowerCase();
    const responses = responsesData;

    for (const keyword in responses) {
        if (lowerUserMessage.includes(keyword)) {
            if (keyword === "size") {
                const sizePattern = /(\d+)/;
                const match = sizePattern.exec(lowerUserMessage);
                if (match && match[1] >= 38 && match[1] <= 47) {
                    return responses[keyword].replace('{size}', match[1]);
                } else {
                    return responses["size"];
                }
            }
            return responses[keyword];
        }
    }

    return responses.default;
}

export default function ChatBot() {
    const [messages, setMessages] = useState([{ text: "Hello! How can I assist you?", user: 'bot' }]);
    const [input, setInput] = useState('');
    const chatWindowRef = useRef(null);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSendMessage = () => {
        if (input.trim() === '') return;

        setMessages(messages.concat({ text: input, user: 'user' }, { text: '...', user: 'bot' }));
        setTimeout(() => {
            if (chatWindowRef.current) {
                const scrollHeight = chatWindowRef.current.scrollHeight;
                const clientHeight = chatWindowRef.current.clientHeight;
                chatWindowRef.current.scrollTo(0, scrollHeight - clientHeight);
            }
        }, 0);
        setTimeout(() => {
            const botResponse = processUserMessage(input);
            setMessages((prevMessages) => [
                ...prevMessages.slice(0, prevMessages.length - 1),
                { text: botResponse, user: 'bot' },
            ]);

            setTimeout(() => {
                if (chatWindowRef.current) {
                    const scrollHeight = chatWindowRef.current.scrollHeight;
                    const clientHeight = chatWindowRef.current.clientHeight;
                    chatWindowRef.current.scrollTo(0, scrollHeight - clientHeight);
                }
            }, 0);
        }, 1500);

        setInput('');
    };

    const navigate = useNavigate()

    const handleBotResponseClick = (text) => {
        switch (true) {
            case text.includes("lifestyle"):
                navigate('/lifestyle');
                break;
            case text.includes("running"):
                navigate('/running');
                break;
            case text.includes("jordan"):
                navigate('/jordan');
                break;
            case text.includes("training"):
                navigate('/training');
                break;
            case text.includes("basketball"):
                navigate('/basketball');
                break;
            case text.includes("Air Force 1 model"):
                navigate('/product/65141e465c66aa1c8c55a31a');
                break;
            default:
                navigate('/');
                break;
        }
        if (window.innerWidth <= 430) {
            setHideChatBox(true)
        }
    };

    function formatTextWithNike(text) {
        try {
            return text.replace(/Click for discover/g, "<u>Click for discover</u>");
        }
        catch {
            return text
        }
    }



    const [hideChatBox, setHideChatBox] = useState(true);

    return (
        <div className='chatbot' style={window.innerWidth > 430 ? { bottom: hideChatBox ? '-350px' : '-2px' } : window.innerWidth <= 320 ? { top: hideChatBox ? window.innerHeight + "1px" : '0px' } : { bottom: hideChatBox ? `-${window.innerHeight}` + "1px" : '-2px' }}>
            <div className="header" onClick={() => setHideChatBox(!hideChatBox)}>
                <h2>Chatbot</h2>
                <button className='terciary-button' onClick={() => setHideChatBox(!hideChatBox)}>{hideChatBox ? <BsChevronCompactUp /> : <AiOutlineMinus />}</button>
            </div>
            <div className="chat-window" ref={chatWindowRef}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.user}`}
                        onClick={() => handleBotResponseClick(message.text)}
                        style={message.user === 'bot' ? { cursor: 'pointer' } : null}
                        dangerouslySetInnerHTML={{ __html: message.user === 'bot' ? formatTextWithNike(message.text) : message.text }}
                    >
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    className='message-input'
                    placeholder="Type your message..."
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            handleSendMessage();
                        }
                    }}
                />
                <button className="terciary-button" onClick={handleSendMessage}><AiOutlineSend /></button>
            </div>
            {window.innerWidth <= 430 && hideChatBox ?
                <button className='chat-mobile-button' onClick={() => setHideChatBox(false)}><RiMessage2Fill style={{ color: "#fff" }} /></button>
                : null}
        </div>
    );
}
