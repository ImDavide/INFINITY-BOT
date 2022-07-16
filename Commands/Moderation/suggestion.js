const { Client, MessageEmbed, CommandInteraction } = require("discord.js")
const SuggestionDB = require("../../Structures/Schemas/Suggestion")

module.exports = {
    name: "suggestion",
    description: "Sets or resets the Suggestion Channel",
    permission: "MANAGE_GUILD",
    options: [
        {
            name: "set",
            description: "Sets the Suggestion channel",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "channel",
                    description: "Select the channel",
                    type: "CHANNEL",
                    required: false
                }
            ]
        },
        {
            name: "reset",
            description: "Resets the Suggestion channel",
            type: "SUB_COMMAND",
        },
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {

        const { options, user, channel, guild } = interaction

        switch (options.getSubcommand()) {

            case "set": {

                const channel = options.getChannel("channel") || channel

                SuggestionDB.findOne({ Guild: guild.id }, async (err, data) => {

                    if (err) throw err

                    if (data) {

                        data.delete()

                        data = new SuggestionDB({
                            Guild: guild.id,
                            Channel: channel.id
                        })
                        await data.save()

                    } else {

                        data = new SuggestionDB({
                            Guild: guild.id,
                            Channel: channel.id
                        })
                        await data.save()

                    }

                    return interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor("BLUE")
                                .setDescription(`✅ - ${channel} is now set as Suggestion Channel`)
                        ]
                    })

                })

            }
                break;

            case "reset": {

                SuggestionDB.findOne({ Guild: guild.id }, async (err, data) => {

                    if (err) throw err

                    if (data) {

                        data.delete()

                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor("BLUE")
                                    .setDescription(`✅ - Suggestion Channel has been reset to none`)

                            ]
                        })

                    } else {

                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor("BLUE")
                                    .setDescription(`✅ - Suggestion Channel has already been reset to none`)

                            ]
                        })

                    }

                })

            }
                break;

        }

    }
}