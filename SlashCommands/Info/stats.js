const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    name: "stats",
    description: "Visualizza le statistiche del bot!",
    cooldown: 5,
    type: 'CHAT_INPUT',

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {


      interaction.followUp({ content: `Attualmente sto gestendo **${client.guilds.cache.size}** guide, guardando **${client.users.cache.size}** membri e io sono attualmente su shard ** ${interaction.guild.shardId}**` })
    }
}