const BOT_TOKEN = '7250347146:AAF2fQ7skQFhHoOgsboWUJzQlmYo5ZAHMC4';
const ADMIN_CHAT_ID = '5112680061';

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Add login validation logic here
    window.location.href = 'chat.html';
}

function showRegistration() {
    document.querySelector('.login-box').classList.add('hidden');
    document.querySelector('.registration-box').classList.remove('hidden');
}

async function requestAccount() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    
    // Generate unique 5-digit ID
    const uniqueId = Math.floor(10000 + Math.random() * 90000);
    const userId = `${uniqueId}_${username}`;
    
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
