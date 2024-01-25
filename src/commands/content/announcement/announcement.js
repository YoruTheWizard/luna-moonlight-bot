const { SlashCommandBuilder, SlashCommandStringOption, Client, Interaction } = require("discord.js");
const { getTitlesChoices } = require('../../../utils/utils');
const announcement = require('../../../utils/announcementFunctions');

/**
 * 
 * @param {SlashCommandStringOption} opt 
 * @returns SlashCommandStringOption
 */
const getTitleOption = opt => {
  opt.setName('obra')
    .setDescription('Nome da obra')
    .setRequired(true);
  const titles = getTitlesChoices();
  for (let title of titles)
    opt.addChoices(title);
  return opt;
};

const getSlashCommand = () => {
  const cmd = new SlashCommandBuilder()
    .setName('anuncio')
    .setDescription('[Staff] Manda um anúncio')
    .addSubcommandGroup(subGroup => subGroup
      .setName('novo')
      .setDescription('[Staff] Anúncio de lançamento')
      .addSubcommand(sub => sub
        .setName('lancamento')
        .setDescription('[Staff] Envia um anúncio de novo lançamento')
        .addStringOption(opt => getTitleOption(opt))
        .addStringOption(opt => opt
          .setName('tipo')
          .setDescription('Tipo de lançamento')
          .addChoices(
            { name: 'Capítulo', value: 'capítulo' },
            { name: 'Volume', value: 'volume' }
          )
          .setRequired(true)
        )
        .addNumberOption(opt => opt
          .setName('numero')
          .setDescription('Número do lançamento')
          .setRequired(true)
        )
        .addStringOption(opt => opt
          .setName('links')
          .setDescription('Links para ler o lançamento')
          .setRequired(true)
        )
        .addNumberOption(opt => opt
          .setName('volume')
          .setDescription('Volume do lançamento')
        )
        .addStringOption(opt => opt
          .setName('descricao')
          .setDescription('Descrição do lançamento')
        )
        .addStringOption(opt => opt
          .setName('imagem')
          .setDescription('Imagem do lançamento')
        )
        .addStringOption(opt => opt
          .setName('link-imagem')
          .setDescription('Link da imagem do lançamento')
        )
      )
      .addSubcommand(sub => sub
        .setName('obra')
        .setDescription('[Staff] Envia um anúncio de nova obra')
        .addStringOption(opt => opt
          .setName('nome')
          .setDescription('Nome da obra')
          .setRequired(true)
        )
        .addStringOption(opt => opt
          .setName('links')
          .setDescription('Links para ler a obra')
          .setRequired(true)
        )
        .addStringOption(opt => opt
          .setName('sinopse')
          .setDescription('Sinopse da obra')
        )
        .addStringOption(opt => opt
          .setName('comentario')
          .setDescription('Algum comentário sobre a obra')
        )
        .addStringOption(opt => opt
          .setName('imagem')
          .setDescription('Arquivo de uma imagem da obra')
        )
        .addStringOption(opt => opt
          .setName('link-imagem')
          .setDescription('URL de uma imagem da obra')
        )
      )
    );

  cmd.addSubcommand(sub => sub
    .setName('recrutamento')
    .setDescription('[Staff] Manda um anúncio de recrutamento para todos no servidor')
    .addStringOption(opt => getTitleOption(opt))
    .addStringOption(opt => opt
      .setName('cargos')
      .setDescription('Cargos requisitados, separados por vírgula')
      .setRequired(true)
    )
    .addStringOption(opt => opt
      .setName('requisitos')
      .setDescription('Requisitos para o recrutamento, separados por vírgula')
      .setRequired(true)
    )
    .addStringOption(opt => opt
      .setName('comentario')
      .setDescription('Mais informações sobre o recrutamento')
    )
    .addStringOption(opt => opt
      .setName('contato')
      .setDescription('Onde falar com você')
    )
  );

  return cmd;
};

module.exports = {
  data: getSlashCommand(),
  options: {
    staffOnly: true
  },

  /**
   * 
   * @param {{
   *  interaction: Interaction,
   *  client: Client
   * }} param0 
   */
  run: async ({ interaction, client }) => {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'lancamento': announcement.newRelease(); break;
      case 'obra': announcement.newTitle(); break;
      case 'recrutamento': announcement.recruitment();
    }
  }
};