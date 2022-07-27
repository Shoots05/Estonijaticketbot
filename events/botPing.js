const client = require("../index");
const { MessageEmbed } = require('discord.js')

client.on('messageCreate', async(message) => {

  if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`){
    return message.reply(`**:wave: Hello __${message.author.username}__, Ho eseguito la migrazione a tutti i *\`/\`* comandi!**\n ↳ *Usa \`/help\` per visualizzare tutti i miei comandi!*`)
  }

})