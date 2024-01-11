module.exports = {
  data: {
    name: 'ping',
    description: 'Responde com "pong"',
  },

  run: async ({ interaction, client }) => {
    await interaction.deferReply();
    const reply = await interaction.fetchReply();
    const ping = reply.createdTimestamp - interaction.createdTimestamp;
    interaction.editReply(`Pong! Cliente: ${ping}ms | Websocket: ${client.ws.ping}ms`);
  }
};