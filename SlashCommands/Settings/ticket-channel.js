const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const {
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
  Permissions
} = require(`discord.js`);
const db = require(`quick.db`)

module.exports = {
    name: "ticket-setup",
    description: "Setup the ticket-system",
    premium: true,
    options: [
    {
        name: "system",
        description: "Select which Ticket-System you want to setup",
        type: "STRING",
        required: true,
        choices: [
          { name: `1st Ticket-System`, value: `1` },
          { name: `2nd Ticket-System`, value: `2` },
          { name: `3rd Ticket-System`, value: `3` },
          { name: `4th Ticket-System`, value: `4` },
          { name: `5th Ticket-System`, value: `5` },
          { name: `6th Ticket-System`, value: `6` },
          { name: `7th Ticket-System`, value: `7` },
          { name: `8th Ticket-System`, value: `8` },
          { name: `9th Ticket-System`, value: `9` },
          { name: `10th Ticket-System`, value: `10` },
          { name: `11th Ticket-System`, value: `11` },
          { name: `12th Ticket-System`, value: `12` },
          { name: `13th Ticket-System`, value: `13` },
          { name: `14th Ticket-System`, value: `14` },
          { name: `15th Ticket-System`, value: `15` },
          { name: `BETA Ticket-System`, value: `Beta` },
        ]
      },
      {
          name: "channel",
          description: "canale ticket",
          type: "CHANNEL",
          channelTypes: ["GUILD_TEXT"],
          required: true,
      },
      
      {
            name: "role",
            description: "Ruolo di amministratore per la gestione dei ticket",
            type: 8,
            required: true,
      },
      {
        name: "button_label",
        description: "Scritta sul pulsante",
        type: "STRING",
        required: true,
      },
      {
        name: "embed_desc",
        description: "Messaggio sul pannello",
        type: "STRING",
        required: true,
      },
      {
        name: "ticket_open_msg",
        description: "Messaggio appena apri il ticket [Use +n+ to add a space]",
        type: "STRING",
        required: true,
      },
      {
        name: "ticket_channel_name",
        description: "Name for the ticket channels {user} = Opener username",
        type: "STRING",
        required: false,
      },
      {
          name: "category",
          description: "Categoria dove si crea il ticket",
          type: "CHANNEL",
          channelTypes: ["GUILD_CATEGORY"],
          required: false,
      },
      
    ], 
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      let s = interaction.options.getString('system');
      let channel = interaction.options.getChannel("channel");
      let category = interaction.options.getChannel("category");
      let role = interaction.options.getRole('role');
      let message = interaction.options.getString('embed_desc');
      let msg = interaction.options.getString('ticket_open_msg');
      let label = interaction.options.getString('button_label');
      let ticketname = interaction.options.getString('ticket_channel_name') || `ticket-{user}`;
      let check = await interaction.guild.channels.cache.get(channel.id);

      if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.followUp({ content: `${client.emoji.wrong} **Non è possibile utilizzare questo comando per gestire il sistema dei ticket!**`, ephemeral: true})

      if(!check) return interaction.followUp({ content: `${client.emoji.wrong} Gli argomenti che fornisci non sono un canale o non riesco a visualizzare il canale selezionato.` })

      const panel = new MessageEmbed()
      .setColor(client.config.color.main)
      .setTitle(`📨 Ticket Estonija`)
        
      .setDescription(`${message || `Apri un ticket per ${interaction.guild.name}`}`)
      .setFooter(`Estonija©`, interaction.guild.iconURL())

      const button = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(label)
        .setStyle(`PRIMARY`)
        .setEmoji(``)
        .setCustomId(`create_ticket${s}`)
      ])
      const embed = new MessageEmbed()
      .setColor(client.config.color.main)
      .setTitle(`${client.emoji.correct} Ho impostato il sistema di ticket`)
        .setDescription(`Ho impostato con successo il tuo sistema di ticket! Per impostare i log, usa \`/ticket-logs\`!`)
      .addField(`:1234: System Number:`, `**${s}. Ticket-System**`)
      .addField(`<:Channel:936546405584089108> Ticket Channel:`, `**${channel} (${channel.id})**`)
      .addField(`<:Channel:936546405584089108> Ticket Category:`, `**${category || `_\` None Set, Using Default \`_`}**`)
      .addField(`${client.emoji.manage} Admin Role:`, `**${role} (${role.id})**`)
        .addField(`${client.emoji.preview} Ticket Channel Name`, `\`${ticketname}\` (*The variable \`{user}\` will show as the Opener username*)`)
        .addField(`${client.emoji.preview} Ticket Message (Panel Embed)`, `${message || `Open a ticket for ${interaction.guild.name}`}`)
      .addField(`${client.emoji.preview} Ticket Message (On Open)`, msg.split("+n+").join("\n"))
      
      db.set(`ticketmsg_${interaction.guild.id}${s}`, msg.split("+n+").join("\n"));
      if(category) db.set(`category_${interaction.guild.id}${s}`, category.id)
      db.set(`adminrole_${interaction.guild.id}${s}`, role.id);
      db.set(`ticketname_${interaction.guild.id}`, ticketname);
      interaction.followUp({ embeds: [embed] })

      client.channels.cache.get(channel.id).send({ embeds: [panel], components: [button] })
    },
};