const {MessageEmbed, GuildMember} = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member
     */
async execute(member) {
    const { user, guild } = member;
    const logs2 = guild.client.channels.cache.get("997149438613147668");
    const logsChannel = guild.client.channels.cache.get("997243251004276887");
    const dateText = `<t:${Math.round(new Date().getTime() / 1000)}>` 
    const embed = new MessageEmbed()
              .setColor("#df42f5")
              .setAuthor({name: `${member.user.tag}`, iconURL: `${member.user.displayAvatarURL()}`})
              .setDescription(`Ciao ${member.user}, Benvenuto su **Infinity Boost** \n \n Verificati su <#996897325534425099>`)
              .setThumbnail(member.user.displayAvatarURL())
              .setTimestamp()
              .setFooter({text: `${guild.name}`, iconURL: `https://images-ext-1.discordapp.net/external/M7twldjW6_OVrFQPfOI13uhV1uVDvrARIrkFLK1w_H0/https/images-ext-1.discordapp.net/external/pCIwIlkXZ3D7ni5wRW12MXF_NKopaXyP8okYifhE-9Y/https/images-ext-1.discordapp.net/external/NG87DFNmyRqsgO9QxwgLPQf7DTGlGmbUYHsQSol-U9U/https/i.postimg.cc/xjpkWpWS/bac3d9382c97ae8d9728a38b9eb594984f64eb0f915fceeeb1daaf482831431f.gif`})
              .setImage("https://images-ext-1.discordapp.net/external/M7twldjW6_OVrFQPfOI13uhV1uVDvrARIrkFLK1w_H0/https/images-ext-1.discordapp.net/external/pCIwIlkXZ3D7ni5wRW12MXF_NKopaXyP8okYifhE-9Y/https/images-ext-1.discordapp.net/external/NG87DFNmyRqsgO9QxwgLPQf7DTGlGmbUYHsQSol-U9U/https/i.postimg.cc/xjpkWpWS/bac3d9382c97ae8d9728a38b9eb594984f64eb0f915fceeeb1daaf482831431f.gif")
    const logge = new MessageEmbed()
              .setAuthor({name: `${member.user.tag}`, iconURL: `${member.user.displayAvatarURL()}`})
              .setDescription(`<@${member.id}> è entrato nel server (${member.user.tag})`)
              .setColor("#15ff00")
              .addField(`ID`, `\`\`\`yaml\nUtente: ${member.id}\`\`\``)
              .addField(`Data`, `${dateText}`)
              .setFooter({text: `Utente ${member.user.tag}`, iconURL: `${member.user.displayAvatarURL()}`})

                        
        await logsChannel.send({ embeds: [embed] })
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


