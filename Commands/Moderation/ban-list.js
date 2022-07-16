const { Client, MessageEmbed, CommandInteraction } = require("discord.js")

module.exports = {
    name: "ban-list",
    description: "Lists all the banned member",
    permission: "MANAGE_GUILD",

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {

        const { guild, member, user } = interaction

        const bannedMembers = await guild.bans.fetch()

        const banned = bannedMembers.map((x) => `• ${x.user.tag} | ${x.user.id} | ${x.user}`).join("\n")

        const Embed = new MessageEmbed()
            .setTitle("Banned Members")
            .setDescription(`${banned}`)
            .setTimestamp()
            .setColor("#df42f5")
            .setFooter({ text: "Infinity Boost", iconURL: 'https://images-ext-1.discordapp.net/external/M7twldjW6_OVrFQPfOI13uhV1uVDvrARIrkFLK1w_H0/https/images-ext-1.discordapp.net/external/pCIwIlkXZ3D7ni5wRW12MXF_NKopaXyP8okYifhE-9Y/https/images-ext-1.discordapp.net/external/NG87DFNmyRqsgO9QxwgLPQf7DTGlGmbUYHsQSol-U9U/https/i.postimg.cc/xjpkWpWS/bac3d9382c97ae8d9728a38b9eb594984f64eb0f915fceeeb1daaf482831431f.gif' })

        return interaction.reply({
            embeds: [Embed]
        })

    }
}