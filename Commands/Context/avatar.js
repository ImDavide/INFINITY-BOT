const { Client, MessageEmbed, ContextMenuInteraction, Permissions, MessageActionRow , MessageButton } = require("discord.js")

module.exports = {
    name: "Avatar",
    type: "USER",
    context: true,
    category: "Context",

    /**
     * @param {Client} client
     * @param {ContextMenuInteraction} interaction
     */
    async execute(interaction, client) {

        const { guild, user, targetId } = interaction

        const target = await guild.members.fetch(targetId)

        const Embed = new MessageEmbed()
            .setColor("#df42f5")
            .setAuthor({ name: `${target.user.username}\'s Avatar`, iconURL: `${target.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setImage(`${target.displayAvatarURL({ dynamic: true, size: 4096 })}`)
            .setFooter(guild.name, guild.iconURL())
            .setTimestamp()

            const row = new MessageActionRow()
            .addComponents(
        new MessageButton()
            .setLabel('Download')
            .setEmoji(`<:downloaddd:997162700113203301> `)
            .setURL(target.displayAvatarURL({ size: 4096, dynamic: true }))
            .setStyle('LINK')

            )

        return interaction.reply({ embeds: [Embed], components: [row]})

    }
}