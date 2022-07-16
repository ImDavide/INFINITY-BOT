const { CommandInteraction, MessageEmbed } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

  module.exports = {
    
    name: "interactionCreate",

    async execute (interaction) {
      
     if(interaction.isButton()) {
     if(interaction.customId === "boom") {
         const nick = interaction.member.nickname || interaction.member.user.username;

        if (nick.includes("💣")) {
           await interaction.reply({ content: "You already have the bomb emoji!", ephemeral: true })
        } else {
            const embed = new MessageEmbed()
            .setDescription("**Nickname has been updated**")
            .setColor("#2F3136")     
            await interaction.deferReply({ ephemeral: true });
		    await wait(1000);
            await interaction.member.setNickname(`💣 ${nick}`)
            await interaction.editReply({ embeds: [embed], ephemeral: true })       
        }
      }
    }
  }
};