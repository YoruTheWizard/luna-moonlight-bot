module.exports = {
  name: 'ping',
  description: 'Responde com "pong"',
  // options: {},
  devOnly: false,
  testOnly: false,
  deleted: false,

  callback: async (client, interaction) => {
    await interaction.deferReply();
    const reply = await interaction.fetchReply();
    const ping = reply.createdTimestamp - interaction.createdTimestamp;
    interaction.editReply(`Pong! Cliente: ${ping}ms | Websocket: ${client.ws.ping}ms`);
  }
};