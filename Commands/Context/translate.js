const { Client, MessageEmbed, ContextMenuInteraction } = require("discord.js")
const translate = require('@iamtraction/google-translate')

module.exports = {
    name: "Translate Message",
    type: "MESSAGE",
    context: true,
    category: "Context",

    /**
     * @param {Client} client
     * @param {ContextMenuInteraction} interaction
     */
    async execute(interaction, client) {

        const { channel, targetId } = interaction

        const query = await channel.messages.fetch(targetId)
        const raw = query.content

        const translated = await translate(query, { to: 'en' })

        return interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setColor('#df42f5')
                    .setTitle("Translation")
                    .addFields([
                        { name: "Raw:", value: "```" + raw + "```", inline: false },
                        { name: "Translated:", value: "```" + translated.text + "```", inline: false },
                    ])
                    .setFooter({ text: 'Infinity Boost' })
                    .setTimestamp()
            ]
        })

    }
}