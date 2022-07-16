const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  
  name: "bomb",
  description: "Send the embed to the specified verification channel.",

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

   async execute (interaction, client) {
    const Embed = new MessageEmbed()

    .setTitle("💣 Test")
    .setDescription("_Click the button to add a `💣` to your username!_")
    .setColor("#2F3136")

    const Row = new MessageActionRow()

    .addComponents(
      
      new MessageButton()
      .setStyle("SECONDARY")
      .setCustomId("boom")
      .setEmoji("💣")
      
    );

    await interaction.channel.send({ embeds: [Embed], components: [Row] })

    interaction.reply({ content: "✅ | Operation completed successfully.", ephemeral: true })
    
   }
};