const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    name: "help",
    description: "See all of the bots commands",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      /*let categories = [];

      readdirSync("./SlashCommands/").forEach((dir) => {
        const commands = readdirSync(`./SlashCommands/${dir}/`).filter((file) => file.endsWith(".js"));

        const cmds = commands.map((command) => {
          let file = require(`../../SlashCommands/${dir}/${command}`);
          if (!file.name) return "`COMMAND IS WIP`";
          let name = file.name.replace(".js", "");
          return `\`${name}\``;
        });
        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "WIP 🦺" : cmds.join(" "),
        };

        categories.push(data);
      }); */

      const embed = new MessageEmbed()
      .setTitle(`Estonija Ticket | Sviluppato da ! Simo#0272`)
      .setColor(client.config.color.main)
      //.addFields(categories)
        .setDescription(`${client.user.username} `)
        .addField("\u200b", "🔰 **__Comandi:__**")
        .addField("`help`", "*Visualizza i comandi del bot*")
        .addField("`stats`", "*Visualizza le statistiche del bot*")
        .addField("`invite`", "*Invita **"+client.user.username+"** nel tuo server!*")
        
        .addField("\u200b", "⚙️ **__Comandi di configurazione:__**")
        .addField("`ticket-setup`", "*Configura il sistema di ticket*")
        .addField("`ticket-logs`", "*Imposta il canale Ticket-Logs*")
        
        .addField("\u200b", "👑 **__Comandi Creatori:__**")
        .addField("`allservers`", "*Visualizza tutti i server in cui si trova il bot*")
        .addField("`manage_bot`", "*Cambia/modifica/ferma il bot*")
      .setFooter(`Powered by ! Simo#0272`, interaction.guild.iconURL())
      return interaction.followUp({ embeds: [embed] })
    },
};
