const { Client, MessageEmbed, CommandInteraction, Permissions } = require("discord.js")
const permissions = Object.keys(Permissions.FLAGS)

module.exports = {
    name: "permissions",
    description: "Displays the permissions that a member has",
    options: [
        {
            name: "user",
            description: "Select the user",
            type: "USER",
            require: false
        }
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {

        const { options, user, channel } = interaction

        const member = options.getMember("user") || user

        let text = `Permissions of ${member}` + "```"

        const mPermissions = channel.permissionsFor(member)

        const total = {
            denied: 0,
            allowed: 0
        }

        // i++ === i = i+1

        permissions.forEach((perm) => {

            if (!mPermissions.has(perm)) {

                text += `${perm} ❌\n`;
                total.denied++;

            } else {

                text += `${perm} ✅\n`;
                total.allowed++;

            }

        })

        text += `\n${total.allowed} ✅ | ${total.denied} ❌` + "\n```"

        return interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setColor('BLUE')
                    .setTitle("PERMISSIONS")
                    .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                    .setDescription(text)
                    .setTimestamp()
                    .setFooter({ text: 'Permissions by Drago' })
            ]
        })

    }
}