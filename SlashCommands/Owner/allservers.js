 const { Client, MessageEmbed, CommandInteraction, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js");

 module.exports = {
     name: "allservers",
     description: "๐",
     run: async (client, interaction, args) => {
       let msg = await interaction.followUp({ content: `Recupero..` })

       if (!client.config.developers.includes(interaction.user.id)) return msg.edit({ content: `๐ **Questo comando รจ bloccato solo per "SVILUPPATORI BOT".!**`, ephemeral: true})

       let array = []
       client.guilds.cache.forEach(async(x) => {
           array.push(`${x.name} [${x.memberCount}]`);
           return msg.edit(`${array.join("\n")}`)
       });
     },
 };