require('dotenv').config();
const { Client, IntentsBitField } = require("discord.js");
const { CommandHandler } = require('djs-commander');
const path = require('path');
const { testServer } = require('./config.json');

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
});

new CommandHandler({
  client,
  commandsPath: path.join(__dirname, 'commands'),
  eventsPath: path.join(__dirname, 'events'),
  validationsPath: path.join(__dirname, 'validations'),
});

client.login(process.env.TOKEN);