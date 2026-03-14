const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// Keep-Alive Web Server
app.get("/", (req, res) => res.send("Bot is Active and Jumping!"));
app.listen(process.env.PORT || 3000);

const botArgs = {
    host: 'YOUR_SERVER.aternos.me', // <-- CHANGE THIS
    port: 12345,                   // <-- CHANGE THIS (5 digits)
    username: 'AFK_Bot',               
    version: '1.21.1'                  
};

function createBot() {
    const bot = mineflayer.createBot(botArgs);

    bot.on('spawn', () => {
        console.log("Bot joined! Auto-Jumping started.");
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 5000); 
    });

    bot.on('death', () => bot.respawn());
    bot.on('end', () => setTimeout(createBot, 15000));
}

createBot();
