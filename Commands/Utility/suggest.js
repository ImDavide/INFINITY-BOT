const { Client, MessageEmbed, CommandInteraction, MessageActionRow, MessageButton } = require("discord.js")
const SuggestionDB = require("../../Structures/Schemas/Suggestion")
const DB = require("../../Structures/Schemas/SuggestDB")

module.exports = {
    name: "suggest",
    description: "Suggest something",
    permission: "MANAGE_GUILD",
    options: [
        {
            name: "suggestion",
            description: "Provide the suggestion",
            type: "STRING",
            required: true
        }
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {

        const { options, guild, channel, user } = interaction

        const suggestion = options.getString("suggestion")

        const channelData = await SuggestionDB.findOne({ Guild: guild.id }).catch(err => { })

        if (channelData) {

            const Channel = guild.channels.cache.get(channelData.Channel)

            if (!Channel) return Error(interaction, "Suggestion Channel is not yet")

            if (channel.id !== Channel.id) return Error(interaction, "You can only suggest in the Suggestion Channel")

            const Embed = new MessageEmbed()
                .setColor("BLUE")
                .setTitle("ℹ NEW SUGGESTION")
                .addFields([
                    { name: "Suggestion", value: `${suggestion}`, inline: false },
                    { name: "Suggested By", value: `${user}`, inline: true },
                    { name: "Status", value: "Pending", inline: true },
                ])
                .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                .setFooter({ text: "Infinity Boost" })
                .setTimestamp()

            const Row = new MessageActionRow().addComponents(

                new MessageButton()
                    .setCustomId("sug-acc")
                    .setStyle("SUCCESS")
                    .setLabel("ACCEPT"),

                new MessageButton()
                    .setCustomId("sug-dec")
                    .setStyle("SUCCESS")
                    .setLabel("DECLINNE"),

            )

            const M = await interaction.reply({ embeds: [Embed], components: [Row], fetchReply: true })

            const Data = new DB({
                Guild: guild.id,
                MessageID: M.id,
                Details: [
                    {
                        MemberID: user.id,
                        Suggestion: suggestion
                    }
                ]
            })

            await Data.save()

        } else return Error(interaction, "Suggestion Channel is not yet")
    }
}

function Error(interaction, description) {

    interaction.reply({
        embeds: [
            new MessageEmbed()
                .setColor("#df42f5")
                .setDescription(`‼ - ${description}!`)
        ],
        ephemeral: true
    })

}