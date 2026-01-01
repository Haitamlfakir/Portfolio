// Portfolio JavaScript Functionality

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(13, 17, 23, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(13, 17, 23, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Initialize EmailJS and Contact form handling
window.addEventListener('load', function() {
    // Setup contact form
    function setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Check if EmailJS is loaded
                if (typeof emailjs === 'undefined') {
                    showNotification('Email service not initialized. Please configure EmailJS.', 'error');
                    return;
                }
                
                // Get form data
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const subject = document.getElementById('subject').value.trim();
                const message = document.getElementById('message').value.trim();
                const submitBtn = document.getElementById('submitBtn');
                
                // Simple validation
                if (!name || !email || !subject || !message) {
                    showNotification('Please fill in all fields', 'error');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    showNotification('Please enter a valid email address', 'error');
                    return;
                }
                
                // Update button state
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // EmailJS service parameters
                // Replace these with your actual EmailJS Service ID and Template ID
                const serviceID = 'service_5wa2ogn';
                const templateID = 'template_j2u5q4g';
                
                // Prepare template parameters
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    subject: subject,
                    message: message,
                    to_email: 'haytamlfakir@gmail.com' // Your email address
                };
                
                // Send email using EmailJS
                emailjs.send(serviceID, templateID, templateParams)
                    .then(function(response) {
                        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                        contactForm.reset();
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, function(error) {
                        console.error('EmailJS Error:', error);
                        showNotification('Failed to send message. Please try again or contact me directly at haytamlfakir@gmail.com', 'error');
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    });
            });
        }
    }
    
    // Wait for EmailJS to load, then initialize
    function initEmailJS() {
        if (typeof emailjs !== 'undefined') {
            emailjs.init("6o19632Ioe5MXDBPr"); // Replace with your EmailJS Public Key
            setupContactForm();
        } else {
            // Retry after a short delay if EmailJS hasn't loaded yet
            setTimeout(initEmailJS, 100);
        }
    }
    
    // Initialize when page loads
    initEmailJS();
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = '#10b981';
    } else if (type === 'error') {
        notification.style.background = '#ef4444';
    } else {
        notification.style.background = '#3b82f6';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .about-stats .stat');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing animation for the hero title span
document.addEventListener('DOMContentLoaded', function() {
    const highlightSpan = document.querySelector('.highlight');
    
    if (highlightSpan) {
        const originalText = highlightSpan.textContent;
        let currentText = '';
        let isDeleting = false;
        let textIndex = 0;
        
        function typeText() {
            if (isDeleting) {
                // Deleting text
                currentText = originalText.substring(0, textIndex - 1);
                textIndex--;
                highlightSpan.textContent = currentText;
                
                if (textIndex === 0) {
                    isDeleting = false;
                    setTimeout(typeText, 1000); // Wait 1 second before typing again
                    return;
                }
            } else {
                // Typing text
                currentText = originalText.substring(0, textIndex + 1);
                textIndex++;
                highlightSpan.textContent = currentText;
                
                if (textIndex === originalText.length) {
                    setTimeout(() => {
                        isDeleting = true;
                        typeText();
                    }, 2000); // Wait 2 seconds before deleting
                    return;
                }
            }
            
            // Continue typing/deleting
            const delay = isDeleting ? 100 : 200; // Faster deletion, slower typing
            setTimeout(typeText, delay);
        }
        
        // Start the typing animation after a short delay
        setTimeout(typeText, 1000);
        
        // Add cursor effect
        highlightSpan.style.position = 'relative';
        highlightSpan.style.borderRight = '2px solid #00ff88';
        highlightSpan.style.animation = 'blink 1s infinite';
    }
});

// Add CSS for active nav link and highlight animations
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #00ff88;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
    
    @keyframes blink {
        0%, 50% {
            border-right-color: #00ff88;
        }
        51%, 100% {
            border-right-color: transparent;
        }
    }
    
    .highlight {
        transition: all 0.3s ease;
        cursor: text;
    }
`;
document.head.appendChild(style);

// Chat AI Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatWidget = document.getElementById('chatWidget');
    const chatHeader = document.getElementById('chatHeader');
    const chatBody = document.getElementById('chatBody');
    const chatToggle = document.getElementById('chatToggle');
    const chatToggleIcon = document.getElementById('chatToggleIcon');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSend');

    let isCollapsed = false;

    // Check if device is mobile
    function isMobileDevice() {
        return window.innerWidth <= 768;
    }

    // Toggle chat
    chatHeader.addEventListener('click', function() {
        isCollapsed = !isCollapsed;
        chatBody.classList.toggle('collapsed', isCollapsed);
        chatToggle.classList.toggle('active', isCollapsed);
        
        // On mobile, add/remove collapsed-mobile class to widget
        if (isMobileDevice()) {
            if (isCollapsed) {
                chatWidget.classList.add('collapsed-mobile');
            } else {
                chatWidget.classList.remove('collapsed-mobile');
            }
        }
    });

    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';

        // Disable input while processing
        chatSendBtn.disabled = true;
        chatInput.disabled = true;

        // Simulate AI response
        setTimeout(() => {
            const response = generateResponse(message);
            addMessage(response, 'bot');
            chatSendBtn.disabled = false;
            chatInput.disabled = false;
            chatInput.focus();
        }, 500);
    }

    // Add message to chat
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const p = document.createElement('p');
        p.textContent = text;
        
        contentDiv.appendChild(p);
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Generate AI response based on user query
    function generateResponse(query) {
        const lowerQuery = query.toLowerCase();
        
        // Portfolio information
        if (lowerQuery.includes('name') || lowerQuery.includes('who')) {
            return "Haitam Lfakir is a Software Application Developer with 2+ years of experience creating modern, responsive software applications.";
        }
        
        if (lowerQuery.includes('skill') || lowerQuery.includes('technology') || lowerQuery.includes('tech')) {
            return "Haitam's skills include: Frontend (HTML5, CSS3, JavaScript, React, Flutter), Backend (Node.js, PHP, MySQL, Python), and Tools (Git, Figma, Postman, VS Code, Docker).";
        }
        
        if (lowerQuery.includes('project') || lowerQuery.includes('app') || lowerQuery.includes('work')) {
            return "Haitam has worked on several projects including: Lahja - a real-time chat app with Flutter, Firebase, and GetX; and an E-commerce Mobile App built with Flutter, Firebase, PHP, MySQL, and MVC architecture.";
        }
        
        if (lowerQuery.includes('experience') || lowerQuery.includes('year')) {
            return "Haitam has 2+ years of experience in software development, with expertise in mobile application development using Flutter.";
        }
        
        if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('reach')) {
            return "You can contact Haitam at haytamlfakir@gmail.com or +212 0621813154. He's located in Rabat, Morocco. You can also find him on GitHub, LinkedIn, and Instagram.";
        }
        
        if (lowerQuery.includes('education') || lowerQuery.includes('degree') || lowerQuery.includes('university')) {
            return "For detailed education and background information, please check the portfolio sections or reach out directly via the contact form.";
        }
        
        if (lowerQuery.includes('flutter') || lowerQuery.includes('dart')) {
            return "Flutter is one of Haitam's main technologies. He uses it for cross-platform mobile development, building apps that work on both Android and iOS.";
        }
        
        if (lowerQuery.includes('firebase')) {
            return "Haitam uses Firebase for backend services including real-time databases, authentication, and cloud storage in his applications.";
        }
        
        if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
            return "Hello! I'm here to help you learn more about Haitam's portfolio. What would you like to know?";
        }
        
        if (lowerQuery.includes('help')) {
            return "I can help you learn about Haitam's skills, projects, experience, contact information, and technologies. Just ask me anything!";
        }
        
        // Default response
        return "I'm not sure about that specific detail. You can ask me about Haitam's skills, projects, experience, or contact information. Feel free to ask anything else!";
    }

    // Send button click
    chatSendBtn.addEventListener('click', sendMessage);

    // Enter key to send
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Handle window resize to update mobile state
    window.addEventListener('resize', function() {
        if (!isMobileDevice() && chatWidget.classList.contains('collapsed-mobile')) {
            chatWidget.classList.remove('collapsed-mobile');
        }
    });
    
    // Focus input when chat opens
    if (!isCollapsed) {
        chatInput.focus();
    }
});

// Mini Game - Chrome Dino Style
(function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const gameContainer = document.getElementById('gameContainer');
    const gameScore = document.getElementById('gameScore');
    const gameStartBtn = document.getElementById('gameStartBtn');
    const gameResetBtn = document.getElementById('gameResetBtn');
    
    // Set canvas size
    canvas.width = gameContainer.offsetWidth;
    canvas.height = 150;
    
    // Game variables
    let gameRunning = false;
    let gameOver = false;
    let score = 0;
    let gameSpeed = 3;
    let animationId = null;
    
    // Player
    const player = {
        x: 50,
        y: 0,
        width: 30,
        height: 30,
        jumpPower: 12,
        velocityY: 0,
        gravity: 0.5,
        onGround: false,
        color: '#00ff88'
    };
    
    // Ground
    const groundY = canvas.height - 40;
    player.y = groundY - player.height;
    player.onGround = true;
    
    // Obstacles
    let obstacles = [];
    let obstacleTimer = 0;
    
    // Game functions
    function drawPlayer() {
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.width, player.height);
        
        // Draw simple face
        ctx.fillStyle = '#0d1117';
        ctx.fillRect(player.x + 8, player.y + 8, 6, 6); // Left eye
        ctx.fillRect(player.x + 16, player.y + 8, 6, 6); // Right eye
        ctx.fillRect(player.x + 10, player.y + 18, 10, 4); // Mouth
    }
    
    function drawGround() {
        ctx.fillStyle = '#30363d';
        ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);
        
        // Draw ground line
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, groundY);
        ctx.lineTo(canvas.width, groundY);
        ctx.stroke();
    }
    
    function drawObstacles() {
        obstacles.forEach(obstacle => {
            ctx.fillStyle = '#ef4444';
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            
            // Add some detail
            ctx.fillStyle = '#991b1b';
            ctx.fillRect(obstacle.x + 5, obstacle.y + 5, obstacle.width - 10, obstacle.height - 10);
        });
    }
    
    function drawScore() {
        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 16px Inter';
        ctx.fillText(`Score: ${score}`, 10, 25);
    }
    
    function drawGameOver() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 24px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 20);
        
        ctx.fillStyle = '#c9d1d9';
        ctx.font = '14px Inter';
        ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 10);
        ctx.textAlign = 'left';
    }
    
    function updatePlayer() {
        // Apply gravity
        if (!player.onGround) {
            player.velocityY += player.gravity;
            player.y += player.velocityY;
        }
        
        // Ground collision
        if (player.y >= groundY - player.height) {
            player.y = groundY - player.height;
            player.velocityY = 0;
            player.onGround = true;
        } else {
            player.onGround = false;
        }
    }
    
    function updateObstacles() {
        obstacleTimer++;
        
        // Create new obstacle
        if (obstacleTimer > 120 - gameSpeed * 2) {
            obstacles.push({
                x: canvas.width,
                y: groundY - 25,
                width: 20,
                height: 25
            });
            obstacleTimer = 0;
        }
        
        // Update obstacles
        obstacles.forEach((obstacle, index) => {
            obstacle.x -= gameSpeed;
            
            // Remove off-screen obstacles
            if (obstacle.x + obstacle.width < 0) {
                obstacles.splice(index, 1);
                score++;
                gameScore.textContent = score;
                
                // Increase speed slightly
                if (score % 5 === 0) {
                    gameSpeed += 0.2;
                }
            }
        });
    }
    
    function checkCollisions() {
        obstacles.forEach(obstacle => {
            if (
                player.x < obstacle.x + obstacle.width &&
                player.x + player.width > obstacle.x &&
                player.y < obstacle.y + obstacle.height &&
                player.y + player.height > obstacle.y
            ) {
                gameOver = true;
                gameRunning = false;
                gameResetBtn.style.display = 'inline-block';
            }
        });
    }
    
    function gameLoop() {
        if (!gameRunning || gameOver) return;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw everything
        drawGround();
        drawPlayer();
        drawObstacles();
        drawScore();
        
        // Update game state
        updatePlayer();
        updateObstacles();
        checkCollisions();
        
        if (gameOver) {
            drawGameOver();
        } else {
            animationId = requestAnimationFrame(gameLoop);
        }
    }
    
    function jump() {
        if (player.onGround && gameRunning && !gameOver) {
            player.velocityY = -player.jumpPower;
            player.onGround = false;
        }
    }
    
    function startGame() {
        gameRunning = true;
        gameOver = false;
        score = 0;
        gameSpeed = 3;
        obstacles = [];
        obstacleTimer = 0;
        player.y = groundY - player.height;
        player.velocityY = 0;
        player.onGround = true;
        gameScore.textContent = score;
        gameStartBtn.style.display = 'none';
        gameResetBtn.style.display = 'none';
        gameLoop();
    }
    
    function resetGame() {
        gameRunning = false;
        gameOver = false;
        score = 0;
        gameSpeed = 3;
        obstacles = [];
        obstacleTimer = 0;
        player.y = groundY - player.height;
        player.velocityY = 0;
        player.onGround = true;
        gameScore.textContent = score;
        gameStartBtn.style.display = 'inline-block';
        gameResetBtn.style.display = 'none';
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGround();
        drawPlayer();
        drawScore();
        
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    }
    
    // Event listeners
    gameStartBtn.addEventListener('click', startGame);
    gameResetBtn.addEventListener('click', resetGame);
    
    // Jump on spacebar
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' && gameRunning && !gameOver) {
            e.preventDefault();
            jump();
        }
    });
    
    // Jump on canvas click
    gameContainer.addEventListener('click', function() {
        if (gameRunning && !gameOver) {
            jump();
        } else if (!gameRunning && !gameOver) {
            startGame();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = gameContainer.offsetWidth;
        if (!gameRunning) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawGround();
            drawPlayer();
            drawScore();
        }
    });
    
    // Initial draw
    drawGround();
    drawPlayer();
    drawScore();
})();
