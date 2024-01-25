require('dotenv').config();
const { Client, IntentsBitField } = require("discord.js");
const { CommandKit } = require('commandkit');
const path = require('path');
const config = require('./config.json');

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

new CommandKit({
  client,
  devGuildIds: [config.testServer],
  devUserIds: config.devs,
  commandsPath: path.join(__dirname, 'commands'),
  eventsPath: path.join(__dirname, 'events'),
  validationsPath: path.join(__dirname, 'validations'),
  // bulkRegister: true
});

client.login(process.env.TOKEN);