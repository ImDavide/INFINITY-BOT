const {MessageEmbed, GuildMember, Client} = require("discord.js");

 
module.exports = {
    name: "userUpdate",
    /**
     * 
     * @param {GuildMember} oldUser
     * @param {GuildMember} newUser
     * @param {Client} client
     */
async execute(oldUser, newUser, client) {
    // console.log(oldUser, newUser, client)

const log = ("996769658004852838");
const embed1 = new MessageEmbed()

  .setAuthor({name: "Infinity Boost", iconURL: "https://images-ext-1.discordapp.net/external/M7twldjW6_OVrFQPfOI13uhV1uVDvrARIrkFLK1w_H0/https/images-ext-1.discordapp.net/external/pCIwIlkXZ3D7ni5wRW12MXF_NKopaXyP8okYifhE-9Y/https/images-ext-1.discordapp.net/external/NG87DFNmyRqsgO9QxwgLPQf7DTGlGmbUYHsQSol-U9U/https/i.postimg.cc/xjpkWpWS/bac3d9382c97ae8d9728a38b9eb594984f64eb0f915fceeeb1daaf482831431f.gif"})
  .setImage(newUser.displayAvatarURL({ size: 4096, dynamic: true }))
.setDescription(`Ecco la nuova pfp di <@${newUser.id}>`)
  .setColor("#df42f5")
  .setFooter({text:`Infinity Boost`, iconURL: "https://images-ext-1.discordapp.net/external/M7twldjW6_OVrFQPfOI13uhV1uVDvrARIrkFLK1w_H0/https/images-ext-1.discordapp.net/external/pCIwIlkXZ3D7ni5wRW12MXF_NKopaXyP8okYifhE-9Y/https/images-ext-1.discordapp.net/external/NG87DFNmyRqsgO9QxwgLPQf7DTGlGmbUYHsQSol-U9U/https/i.postimg.cc/xjpkWpWS/bac3d9382c97ae8d9728a38b9eb594984f64eb0f915fceeeb1daaf482831431f.gif"})

  if(oldUser !== newUser) {
    client.channels.cache.get(log).send({embeds: [embed1]})  
  }
}
}
