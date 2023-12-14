require('dotenv').config();
const { Client, IntentsBitField } = require("discord.js");
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.MessageContent,
  ],
  allowedMentions: {
    parse: ['roles', 'users', 'everyone'],
    repliedUser: true
  },
  disableEveryone: false
});

eventHandler(client);
client.login(process.env.TOKEN);