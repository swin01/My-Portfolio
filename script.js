// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDXgxa0lXaCrKh8VaEXY6M2kxflyoKGuRQ",
    authDomain: "aswin-s-portfolio-837fd.firebaseapp.com",
    projectId: "aswin-s-portfolio-837fd",
    storageBucket: "aswin-s-portfolio-837fd.firebasestorage.app",
    messagingSenderId: "495855957710",
    appId: "1:495855957710:web:c42b239e0a16b0dbc3429f",
    measurementId: "G-CF51SRKQBG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const myFullName = "Aswin Mishra";
    const myDescription = document.getElementById('myDescription')?.textContent || 
        "I'm Aswin Mishra, a B.Tech student at Sister Nivedita University, passionate about cybersecurity, software development, and emerging technologies.";

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Chatbot functionality
    function toggleChat() {
        const chatOverlay = document.getElementById('chatOverlay');
        chatOverlay.classList.toggle('open');
        if (chatOverlay.classList.contains('open')) {
            const chatBody = document.getElementById('chatBody');
            chatBody.innerHTML = `<div class="chat-message ai"><div class="message-content">Hey there! I'm Aswin Mishra. What's on your mind?</div></div>`;
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }

    function showTypingIndicator() {
        const chatBody = document.getElementById('chatBody');
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator active';
        typingIndicator.innerHTML = `<div class="dots"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>`;
        chatBody.appendChild(typingIndicator);
        chatBody.scrollTop = chatBody.scrollHeight;
        return typingIndicator;
    }

    function removeTypingIndicator(typingIndicator) {
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    function sendMessage() {
        const chatInput = document.getElementById('chatInput');
        const chatBody = document.getElementById('chatBody');
        const message = chatInput.value.trim();

        if (message) {
            // Add user message
            const userMessage = document.createElement('div');
            userMessage.className = 'chat-message user';
            userMessage.innerHTML = `<div class="message-content">${message}</div>`;
            chatBody.appendChild(userMessage);
            chatBody.scrollTop = chatBody.scrollHeight;

            // Show typing indicator
            const typingIndicator = showTypingIndicator();

            // Simulate response with a slight delay for realism
            setTimeout(() => {
                removeTypingIndicator(typingIndicator);
                const response = simulateGeminiAPI(message, myDescription);
                const aiMessage = document.createElement('div');
                aiMessage.className = 'chat-message ai';
                aiMessage.innerHTML = `<div class="message-content">${response}</div>`;
                chatBody.appendChild(aiMessage);
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 1000); // 1-second delay to mimic processing

            chatInput.value = ''; // Clear input
        }
    }

    // Simulate Gemini API response with mock responses
    function simulateGeminiAPI(message, description) {
        const lowerMessage = message.toLowerCase();
        let response;

        if (lowerMessage.includes('about you') || lowerMessage.includes('who are you')) {
            response = `I'm Aswin Mishra, a B.Tech student at Sister Nivedita University. I’m into cybersecurity and software dev. ${description}`;
        } else if (lowerMessage.includes('skills') || lowerMessage.includes('expertise') || lowerMessage.includes('tech')) {
            response = `I’m skilled in cybersecurity and software development. I build projects and hold a Google Cybersecurity Certificate. Ask me about my work!`;
        } else if (lowerMessage.includes('project') || lowerMessage.includes('projects')) {
            response = `I’ve built an Amazon Clone, a Rock Paper Scissors game, and a Tic Tac Toe game. Which one interests you?`;
        } else if (lowerMessage.includes('amazon') || lowerMessage.includes('clone')) {
            response = `My Amazon Clone is a webpage built with HTML and CSS. It mimics Amazon’s look. Want to know more?`;
        } else if (lowerMessage.includes('rock paper') || lowerMessage.includes('scissors')) {
            response = `My Rock Paper Scissors game is a fun JavaScript project. Play it in the browser! Want a demo?`;
        } else if (lowerMessage.includes('tic tac toe')) {
            response = `My Tic Tac Toe game is built with HTML, CSS, and JavaScript. It’s interactive and fun! Check it out!`;
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach you')) {
            response = `Email me at aswinmishra551@gmail.com, or find me on LinkedIn (linkedin.com/in/aswin-mishra-3a9901259) or GitHub (github.com/swin01).`;
        } else if (lowerMessage.includes('internship') || lowerMessage.includes('experience')) {
            response = `I’m working on projects and internships to gain experience. Always learning new tech solutions!`;
        } else if (lowerMessage.includes('hobbies') || lowerMessage.includes('interests') || lowerMessage.includes('gaming') || lowerMessage.includes('travel')) {
            response = `I love gaming, traveling, and exploring gadgets. What’s your favorite hobby?`;
        } else if (lowerMessage.includes('education') || lowerMessage.includes('b.tech')) {
            response = `I’m a B.Tech student at Sister Nivedita University, diving into cybersecurity and dev. Loving the journey!`;
        } else {
            response = `Hey, I’m Aswin! I enjoy tech and gaming chats. What’s up with you?`;
        }

        return response;
    }

    // Allow sending message with Enter key
    document.getElementById('chatInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Dark theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        if (document.body.classList.contains('dark')) {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
    });

    // Image error handling
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', () => {
            img.src = img.getAttribute('onerror').match(/'([^']+)'/)[1];
        });
    });

    // Expose toggleChat and sendMessage globally for HTML onclick
    window.toggleChat = toggleChat;
    window.sendMessage = sendMessage;
});