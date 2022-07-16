const {MessageEmbed, GuildMember} = require("discord.js");

module.exports = {
    name: "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} member
     */
async execute(member) {
    const { user, guild } = member;
    const logs2 = guild.client.channels.cache.get("997149438613147668");
    const dateText = `<t:${Math.round(new Date().getTime() / 1000)}>` 
    const logge = new MessageEmbed()
              .setAuthor({name: `${member.user.tag}`, iconURL: `${member.user.displayAvatarURL()}`})
              .setDescription(`<@${member.id}> è uscito dal server (${member.user.tag})`)
              .setColor("#ff0000")
              .addField(`ID`, `\`\`\`yaml\nUtente: ${member.id}\`\`\``)
              .addField(`Data`, `${dateText}`)
              .setFooter({text: `Utente ${member.user.tag}`, iconURL: `${member.user.displayAvatarURL()}`})

                        
        await logs2.send({ embeds: [logge] })
  }
}



// client.on('guildMemberAdd', member => {
//     const dateText = `<t:${Math.round(new Date().getTime() / 1000)}>` 
//     const embed = new MessageEmbed()
//       .setColor("#ff0000")
//         .setAuthor(`${member.user.tag}`, `${member.user.displayAvatarURL()}`)
//               .setDescription(`Hi ${member.user}, Welcome to **Samurai Services** \n \n Verify in the channel <#968239359214125076>`)
//               .setThumbnail(member.user.displayAvatarURL())
//               .setTimestamp()
//       .setFooter(`Samurai Services®`, `https://cdn.discordapp.com/attachments/947065424980344913/986669837730345050/samurai_serviesss.png`)
//         .setImage("https://cdn.discordapp.com/attachments/947065424980344913/987431809388277771/welcome_fors_smp.png")
          
//     let channel = "975705862494625802"
//     client.channels.cache.get(channel).send({
//       embeds: [embed]
//     })
//   })


