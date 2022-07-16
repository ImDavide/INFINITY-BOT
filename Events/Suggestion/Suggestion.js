const { Client, MessageEmbed, ButtonInteraction } = require("discord.js")
const DB = require("../../Structures/Schemas/SuggestDB")

module.exports = {
    name: "interactionCreate",

    /**
     * @param {Client} client
     * @param {ButtonInteraction} interaction
     */
    async execute(interaction) {

        if (!interaction.isButton()) return

        const { guildId, customId, message, member } = interaction

        DB.findOne({ Guild: guildId, MessageID: message.id }, async (err, data) => {

            if (err) throw err

            switch (customId) {

                case "sug-acc": {

                    if (!member.permissions.has("MANAGE_GUILD")) return Error(interaction, "You can't use this button")

                    if (!data) return Error(interaction, "Sorry, couldn't find any data")

                    const Embed = message.embeds[0]

                    if (!Embed) return

                    Embed.fields[2] = { name: "Status", value: "Accepted", inline: true }

                    message.edit({ embeds: [Embed.setColor("GREEN")], components: [] })

                    await data.delete()

                    Success(interaction, "Suggestion Accepted")

                }
                    break;

                case "sug-dec": {

                    if (!member.permissions.has("MANAGE_GUILD")) return Error(interaction, "You can't use this button")

                    if (!data) return Error(interaction, "Sorry, couldn't find any data")

                    const Embed = message.embeds[0]

                    if (!Embed) return

                    Embed.fields[2] = { name: "Status", value: "Declined", inline: true }

                    message.edit({ embeds: [Embed.setColor("RED")], components: [] })

                    await data.delete()

                    Success(interaction, "Suggestion Declined")

                }
                    break;

            }

        })

    }
}

function Error(interaction, description) {

    interaction.reply({
        embeds: [
            new MessageEmbed()
                .setColor("BLUE")
                .setDescription(`‼ - ${description}!`)
        ],
        ephemeral: true
    })

}

function Success(interaction, description) {

    interaction.reply({
        embeds: [
            new MessageEmbed()
                .setColor("BLUE")
                .setDescription(`✅ - ${description}`)
        ],
        ephemeral: true
    })

}