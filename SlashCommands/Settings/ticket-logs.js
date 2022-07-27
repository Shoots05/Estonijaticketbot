const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const {
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
  Permissions
} = require(`discord.js`);
const db = require(`quick.db`)

module.exports = {
    name: "ticket-logs",
    description: "Imposta il canale dei registri dei ticket!",
    premium: true,
    options: [
    {
        name: "system",
        description: "Seleziona quale Ticket-System vuoi configurare",
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
          description: "ticket-logs channel",
          type: "CHANNEL",
          channelTypes: ["GUILD_TEXT"],
          required: true,
      }
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
const role = db.get(`adminrole_${interaction.guild.id}${s}`);

      if(!role) return interaction.followUp(`${client.emoji.wrong} **Sistema di ticket non ancora configurato! Impostalo prima**`)
      if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.followUp({ content: `${client.emoji.wrong} **Non puoi usare questo comando per gestire il Ticket-System!**`, ephemeral: true})


      const panel = new MessageEmbed()
      .setColor(client.config.color.main)
      .setTitle(`📨 Ticket-Log fissati per il \` ${s}. Ticket-System \``)
      .setDescription(`Questo canale è ora impostato come canale **Ticket-Logs**! Le nuove chiusure dei ticket saranno pubblicate qui!`)
      .setFooter(`Ticketing powered by ! Simo#0272`, interaction.guild.iconURL())

     
      
      interaction.followUp({ content: `${client.emoji.correct} Set **${channel.name} (${channel.id}) as the Ticket-Log channel!**` })

      db.set(`ticketlogs_${interaction.guild.id}`, channel)
      client.channels.cache.get(channel.id).send({ embeds: [panel] })
    },
};