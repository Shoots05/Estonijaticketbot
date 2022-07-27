const { Client, Collection } = require("discord.js");
const chalk = require("chalk");
const Discord = require(`discord.js`)
const colors = require("colors")
const Cluster = require('discord-hybrid-sharding');
const discordModals = require('discord-modals');
const { red, green, blue, magenta, cyan, white, gray, black } = require("chalk");
const client = new Client({
    shards: Cluster.data.SHARD_LIST, 
    shardCount: Cluster.data.TOTAL_SHARDS, 
    intents: 32767,
});
module.exports = client;

// Global Variables

client.commands = new Collection();
client.slashCommands = new Collection();
const fs = require(`fs`);
client.config = require("./config.json");
client.emoji = require(`./emoji.json`)
client.cluster = new Cluster.Client(client)

// Initializing the project
require("./handler")(client);
discordModals(client);

/*        WEB & BOT SERVER         ¦¦        WEB & BOT SERVER        */ 
if(client.config.hostingweb == true) {
require("./webport")();
}


// stop and restart
const glob = require("glob")
const fetch = require(`node-fetch`)
client.on("interactionCreate", async (btn) => {
  if (btn.values == "stop_client") {
    if(!client.config.developers.includes(btn.member.id)) return btn.reply({
      content: "❌ Non puoi usare questo!",
      ephemeral: true
    })
    try {
      btn.reply({
        content: "<a:loading_:906786750494564353> **Spegnimento del bot...**",
        ephemeral: true
      })
      setTimeout(() => {
        process.exit()
      }, 5000)
    } catch (e) {
      btn.editReply({
        content: `${e}`
      })
    }
  }
  if (btn.values == "rename_client") {
    if(!client.config.developers.includes(btn.member.id)) return btn.reply({
      content: "❌ Non puoi usare questo!",
      ephemeral: true
    })
    let filter = (m) => m.author.id === btn.user.id;
    const collector = btn.channel.createMessageCollector({
      filter,
      max: 1
    })
    btn.reply({ content: "<a:loading_:906786750494564353> **Invia nuovo nome bot**",
        ephemeral: true})
    /* collector.on("collect", async(msg) => {
      
    }) */ //not needed
    collector.on("end", (collected) => {
      const name = collected.first().content;
      if (!name) {
        return btn.reditReply({ content: `❌ **Senza nome!**`})
      }
      let beforename = client.user.username;
      client.user.setUsername(name)
        .then((user) => {
          message.delete()
          btn.editReply({ content: `✅ **Impostare correttamente il nome su ${client.user.username} da ${beforename}**`,
        ephemeral: true})
        })
        .catch((e) => {
          btn.editReply({ content: `${e}`,
        ephemeral: true})
        })
    })
  }
  if (btn.values == "changeav_client") {
    if(!client.config.developers.includes(btn.member.id)) return btn.reply({
      content: "❌ Non puoi usarlo!",
      ephemeral: true
    })
    let filter = (m) => m.author.id === btn.user.id;
    const collector = btn.channel.createMessageCollector({
      filter,
      max: 1
    })
    btn.reply({ content: "<a:loading_:906786750494564353> **Invia la nuova immagine del bot**",
        ephemeral: true})
    collector.on("collect", async (msg) => {
        let url = msg.content;
      if(msg.content.includes(`https://`)) {
        btn.editReply({ content: "<a:loading_:906786750494564353> **Changing avatar...**",
        ephemeral: true})
        
        await msg.delete()
        client.user.setAvatar(url)
          .then(user => {
            
              btn.editReply({ content: "✅ **Modificato con successo l'avatar del bot!**",
        ephemeral: true})
            
          }).catch((e) => {
          btn.editReply({ content: `${e}`,
        ephemeral: true})
        })
      } else {
        msg.delete()
        btn.editReply({ content: "❌ Non è un url valido!",
        ephemeral: true})
      }
    })
  }
})
client.login(process.env.token)
process.on('unhandledRejection', (reason, p) => {
    console.log('\n\n\n\n\n[🚩 Anti-Crash] unhandled Rejection:'.toUpperCase().red.dim);
    console.log(reason.stack.yellow.dim ? String(reason.stack).yellow.dim : String(reason).yellow.dim);
    console.log('=== unhandled Rejection ===\n\n\n\n\n'.toUpperCase().red.dim);
  });
  process.on("uncaughtException", (err, origin) => {
    console.log('\n\n\n\n\n\n[🚩 Anti-Crash] uncaught Exception'.toUpperCase().red.dim);
    console.log(err.stack.yellow.dim ? err.stack.yellow.dim : err.yellow.dim)
    console.log('=== uncaught Exception ===\n\n\n\n\n'.toUpperCase().red.dim);
  })
  process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('[🚩 Anti-Crash] uncaught Exception Monitor'.toUpperCase().red.dim);
  });
  process.on('beforeExit', (code) => {
    console.log('\n\n\n\n\n[🚩 Anti-Crash] before Exit'.toUpperCase().red.dim);
    console.log(code.yellow.dim);
    console.log('=== before Exit ===\n\n\n\n\n'.toUpperCase().red.dim);
  });
  process.on('exit', (code) => {
    console.log('\n\n\n\n\n[🚩 Anti-Crash] exit'.toUpperCase().red.dim);
    console.log(code.yellow.dim);
    console.log('=== exit ===\n\n\n\n\n'.toUpperCase().red.dim);
  });
  process.on('multipleResolves', (type, promise, reason) => {
    console.log('\n\n\n\n\n[🚩 Anti-Crash] multiple Resolves'.toUpperCase().red.dim);
    console.log(type, promise, reason.yellow.dim);
    console.log('=== multiple Resolves ===\n\n\n\n\n'.toUpperCase().red.dim);
  });