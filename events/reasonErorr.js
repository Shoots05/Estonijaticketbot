const client = require("../index.js")
client.on("interactionCreate", async (interaction) => {
  if(interaction.customId == "error_reasons") {
    interaction.reply({ content: "**Here might be the reasons for the ErrCode: \`hHa_8\`**\n```\n[-] Admin Role Might have Been Deleted / Bot Can't Access the Role\n[-] Ticket Category Might be Deleted\n[-] Database had an Error And Didnt Save Admin Role\n[+] If None of these Reasons are why, Draxler#6145 (410380919212605440)\n```", ephemeral: true })
  }
})
// Dont Remove my Username and Tag, as if there is ERRORs, I'll probs Know a FIX.