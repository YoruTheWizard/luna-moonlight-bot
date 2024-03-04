const { SlashCommandBuilder } = require('discord.js');
const { addFamily, removeFamily } = require("../../utils/configFamily");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('familia')
    .setDescription('Gerencia os membros da "família"')
    .addSubcommand(sub => sub
      .setName('adicionar')
      .setDescription('Adiciona um membro na família')
      .addUserOption(opt => opt
        .setName('usuario')
        .setDescription('Usuário a ser adicionado')
        .setRequired(true)
      )
      .addStringOption(opt => opt
        .setName('apelido')
        .setDescription('Apelido do usuário')
        .setRequired(true)
      )
    )
    .addSubcommand(sub => sub
      .setName('remover')
      .setDescription('Remove um membro da "família"')
      .addUserOption(opt => opt
        .setName('usuario')
        .setDescription('Usuário a ser removido')
        .setRequired(true)
      )
    ),

  options: {
    devOnly: true
  },

  /**
   * 
   * @param {{
   *   interaction: import("discord.js").Interaction
   * }} param0 
   */
  run: ({ interaction }) => {
    const subcommand = interaction.options.getSubcommand();
    const userId = interaction.options.get('usuario').value,
      name = interaction.options.get('apelido')?.value;
    let msg;
    switch (subcommand) {
      case 'adicionar':
        addFamily(userId, name);
        msg = `Membro adicionado: **${name}**!`;
        break;
      case 'remover':
        let removed = removeFamily(userId);
        msg = `Membro removido: **${removed}**`;
    }

    interaction.reply({ content: msg, ephemeral: true });
  }
};
