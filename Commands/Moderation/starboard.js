const { Client, MessageEmbed, CommandInteraction } = require("discord.js")
const starboardSchema = require("../../Structures/Schemas/Starboard")

module.exports = {
    name: "starboard",
    description: "Sets or resets the Starboard Channel",
    permission: "MANAGE_GUILD",
    options: [
        {
            name: "set",
            description: "Sets the Starboard channel",
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
            description: "Resets the Starboard channel",
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

                starboardSchema.findOne({ Guild: guild.id }, async (err, data) => {

                    if (err) throw err

                    if (data) {

                        data.delete()

                        data = new starboardSchema({
                            Guild: guild.id,
                            Channel: channel.id
                        })
                        await data.save()

                    } else {

                        data = new starboardSchema({
                            Guild: guild.id,
                            Channel: channel.id
                        })
                        await data.save()

                    }

                    return interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor("BLUE")
                                .setDescription(`✅ - ${channel} is now set as Starboard Channel`)
                        ]
                    })

                })

            }
                break;

            case "reset": {

                starboardSchema.findOne({ Guild: guild.id }, async (err, data) => {

                    if (err) throw err

                    if (data) {

                        data.delete()

                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor("BLUE")
                                    .setDescription(`✅ - Starboard Channel has been reset to none`)

                            ]
                        })

                    } else {

                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor("BLUE")
                                    .setDescription(`✅ - Starboard Channel has already been reset to none`)

                            ]
                        })

                    }

                })

            }
                break;

        }

    }
}