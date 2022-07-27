const { Modal, TextInputComponent, showModal } = require('discord-modals')
const client = require("../index.js")
const { Formatters } = require('discord.js');
const { MessageEmbed } = require("discord.js")
const discordTranscripts = require('discord-html-transcripts');
const db = require(`quick.db`)
client.on('modalSubmit', async (modal) => {
  if(modal.customId === `close-modal`) {
  const logs = db.get(`ticketlogs_${modal.guild.id}`) || null;
    const firstResponse = modal.getTextInputValue('closeText-modal')
    const attachment = await discordTranscripts.createTranscript(modal.channel);
    const opener = db.get(`Ticketopener_${modal.channel.id}`)
                    
        const embed = new MessageEmbed()
        .setColor(client.config.color.purple)
        .setTitle(`<a:loadingapoints:990617202602422292> Eliminazione del Ticket...`)
        .setDescription(`*Il ticket verrà cancellato in circa 5 secondi!*`)
        .setFooter(`Azione di ${modal.user.username}\n🔷: ${modal.guild.shardId}`, modal.guild.iconURL())

        modal.reply({ embeds: [embed] })
            setTimeout(() => {
                    modal.channel.delete();
                }, 1000 * 4.3);
    
        const tcopener = modal.guild.members.cache.get(opener.id)
        const closed = new MessageEmbed()
    .setTitle(`❌ | TICKET CHIUSO`)
          .setColor(`WHITE`)
          .addField(`**APERTO DA:**`, `\`\`\`\n${tcopener.user.tag} (${tcopener.user.id})\n\`\`\``)
    .addField(`**CHIUSO DA:**`, `\`\`\`\n${modal.user.tag} (${modal.user.id})\n\`\`\``)
    .addField(`**MOTIVO:**`, `${Formatters.codeBlock('markdown', firstResponse) || "`NO REASON ADDED`"}`)
    .setFooter(`Sviluppato da ! Simo#0272!`)
        

    tcopener.send({ embeds: [closed], files: [attachment]}).catch(() => {});
    client.channels.cache.get(logs.id).send({ embeds: [closed], files: [attachment]})
  }
})