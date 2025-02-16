const BOT_TOKEN = '7250347146:AAF2fQ7skQFhHoOgsboWUJzQlmYo5ZAHMC4';
const ADMIN_CHAT_ID = '5112680061';
const { addUser, getUser, getUserById, removeUser } = require('./database');

// Store registered users
let registeredUsers = JSON.parse(localStorage.getItem('users')) || [];
const users = JSON.parse(localStorage.getItem('users')) || [];

function showRegistration() {
    document.querySelector('.login-box').classList.add('hidden');
    document.querySelector('.registration-box').classList.remove('hidden');
}

function showLogin() {
    document.querySelector('.registration-box').classList.add('hidden');
    document.querySelector('.login-box').classList.remove('hidden');
}

function register() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    if (!username || !password) {
        alert('Please fill all fields');
        return;
    }

    if (users.some(user => user.username === username)) {
        alert('Username already exists');
        return;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful! Please log in.');
    showLogin();
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        alert('Invalid username or password');
        return;
    }

    alert('Login successful!');
    // Redirect to another page or perform other actions
}

async function requestAccount() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    
    if (!username || !password) {
        alert('Please fill all fields');
        return;
    }
    
    if (registeredUsers.some(u => u.username === username)) {
        alert('Username already exists');
        return;
    }
    
    // Generate unique 5-digit ID
    const uniqueId = Math.floor(10000 + Math.random() * 90000);
    const userId = `${uniqueId}_${username}`;
    
    // Store pending registration
    const pendingUser = { userId, username, password, status: 'pending' };
    localStorage.setItem(`pending_${userId}`, JSON.stringify(pendingUser));
    
    // Send request to Telegram bot
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const message = `New registration request:\nUser ID: ${userId}\nUsername: ${username}`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: ADMIN_CHAT_ID,
                text: message,
                reply_markup: JSON.stringify({
                    inline_keyboard: [[
                        { text: 'Accept', callback_data: `accept_${userId}` },
                        { text: 'Reject', callback_data: `reject_${userId}` }
                    ]]
                })
            })
        });
        
        alert('Registration request sent! Please wait for approval.');
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to handle Telegram bot responses
async function handleTelegramResponse(callbackData) {
    const [action, userId] = callbackData.split('_');
    const pendingUser = JSON.parse(localStorage.getItem(`pending_${userId}`));
    
    if (action === 'accept' && pendingUser) {
        addUser({ userId: pendingUser.userId, username: pendingUser.username, password: pendingUser.password });
        localStorage.removeItem(`pending_${userId}`);
        // Send notification to user
        sendTelegramMessage(pendingUser.username, 'Your registration was successful.');
    } else if (action === 'reject' && pendingUser) {
        localStorage.removeItem(`pending_${userId}`);
        sendTelegramMessage(pendingUser.username, 'Your registration was rejected.');
    }
}

function sendTelegramMessage(username, message) {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: ADMIN_CHAT_ID,
            text: `Message to ${username}: ${message}`
        })
    });
}

// Example function to simulate Telegram bot response handling
function simulateTelegramResponse(callbackData) {
    handleTelegramResponse(callbackData);
}

// Example usage: simulateTelegramResponse('accept_12345_username');
