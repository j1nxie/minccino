// initialize environment variables
require('dotenv').config();

// necessary classes
const Discord = require('discord.js');
const {
    Client,
    Intents,
} = require('discord.js');
const { Player } = require('discord-player');
const Handler = require('./handler/handler.js');

// initialize new client instance
const client = new Client({ intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    "GUILD_MEMBERS",
] });

// initialize new player instance
const player = new Player(client);

// print message to log once bot is ready
client.on('ready', () => {
    console.log('minccino ready!');
});

client.on('messageCreate', (message) => {
    Handler.handle(client, message, player);
});

player.on('trackStart', (queue, track) => {
    queue.metadata.channel.channel.send(`🎶 | now playing: **${track.title}**`);
});

// login client with token
client.login(process.env.DISCORD_TOKEN);
