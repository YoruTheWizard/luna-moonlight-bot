const { SlashCommandBuilder, SlashCommandStringOption, Client, Interaction } = require("discord.js");
const { setCommandTitleOption } = require('../../utils/utils');
const announcement = require('../../utils/announcementFunctions');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('anuncio')
    .setDescription('[Staff] Manda um anúncio')

    // "new" subcommand group
    .addSubcommandGroup(subGroup => subGroup
      .setName('novo')
      .setDescription('[Staff] Anúncio de lançamento')

      // "release" subcommand
      .addSubcommand(sub => sub
        .setName('lancamento')
        .setDescription('[Staff] Envia um anúncio de novo lançamento')
        .addStringOption(opt => setCommandTitleOption(opt))
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
        .addAttachmentOption(opt => opt
          .setName('imagem')
          .setDescription('Imagem do lançamento')
        )
        .addStringOption(opt => opt
          .setName('link-imagem')
          .setDescription('Link da imagem do lançamento')
        )
      )

      // "title" subcommand
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
        .addAttachmentOption(opt => opt
          .setName('imagem')
          .setDescription('Arquivo de uma imagem da obra')
        )
        .addStringOption(opt => opt
          .setName('link-imagem')
          .setDescription('URL de uma imagem da obra')
        )
      )
    )

    // "recruitment" subcommand
    .addSubcommand(sub => sub
      .setName('recrutamento')
      .setDescription('[Staff] Manda um anúncio de recrutamento para todos no servidor')
      .addStringOption(opt => setCommandTitleOption(opt))
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
    ),

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
      case 'lancamento': announcement.newRelease({ interaction, client }); break;
      case 'obra': announcement.newTitle({ interaction, client }); break;
      case 'recrutamento': announcement.recruitment({ interaction, client });
    }
  }
};