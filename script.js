/* ==========================================================================
   1. SCROLL REVEAL ANIMATION (Intersection Observer)
   ========================================================================== */
const observerOptions = {
    threshold: 0.15 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: Unobserve after animating for performance
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(section => {
    observer.observe(section);
});


/* ==========================================================================
   2. MOBILE NAVIGATION (Hamburger Menu)
   ========================================================================== */
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links li a");

// Toggle Menu
hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("is-active");
});

// Close menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("is-active");
    });
});


/* ==========================================================================
   3. SMOOTH SCROLLING (Fixed Header Offset)
   ========================================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerOffset = 80; 
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});


/* ==========================================================================
   4. MADBOT AI ASSISTANT (Chatbot Logic)
   ========================================================================== */
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const chatBody = document.getElementById('chatBody');

const botResponses = {
    "skills": "Muhammad specializes in Web Development (HTML, CSS, JS) and is currently focusing on Information Technology at STI College Naga.",
    "projects": "He has built a Portfolio, a Weather Dashboard, and a Task Manager. Check the 'Projects' section above!",
    "github": "You can find his open-source work at github.com/madokur1. Feel free to explore his repositories!",
    "hire": "You can reach him via the email or phone number listed on the left side of this section!",
    "default": "I'm not sure about that. Try asking about his 'skills', 'projects', or 'GitHub'!"
};

// Core Chat Functions
function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}-msg`;
    msgDiv.textContent = text;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function getBotResponse(input) {
    const query = input.toLowerCase();
    if (query.includes("skill")) return botResponses.skills;
    if (query.includes("project")) return botResponses.projects;
    if (query.includes("github") || query.includes("repo") || query.includes("code")) return botResponses.github;
    if (query.includes("hire") || query.includes("contact")) return botResponses.hire;
    return botResponses.default;
}

function handleChat() {
    const userText = chatInput.value.trim();
    if (!userText) return;

    appendMessage(userText, 'user');
    chatInput.value = "";

    setTimeout(() => {
        const response = getBotResponse(userText);
        appendMessage(response, 'bot');
    }, 800);
}

/**
 * Global function for Guide Button clicks
 */
window.askGuide = function(question) {
    appendMessage(question, 'user');
    setTimeout(() => {
        const response = getBotResponse(question);
        appendMessage(response, 'bot');
    }, 800);
};

// Event Listeners
if (sendBtn) {
    sendBtn.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChat();
    });
}



