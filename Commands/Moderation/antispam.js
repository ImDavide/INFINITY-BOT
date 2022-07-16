const { Client, MessageEmbed, CommandInteraction } = require("discord.js")
const antiSpamSchema = require("../../Structures/Schemas/AntiSpam")

module.exports = {
    name: "antispam",
    description: "A full Anti-spam system",
    permission: "MANAGE_GUILD",
    options: [
        {
            name: "add",
            description: "Adds a channel to the anti-spam system",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "channel",
                    description: "Select a channel",
                    required: true,
                    type: "CHANNEL"
                }
            ],
        },
        {
            name: "remove",
            description: "Removes a channel from the anti-spam system",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "channel",
                    description: "Select a channel",
                    required: true,
                    type: "CHANNEL"
                }
            ],
        },
        {
            name: "list",
            description: "Shows all the channels for the anti-spam system",
            type: "SUB_COMMAND",
        },
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {

        const { options, guild, channel } = interaction

        switch (options.getSubcommand()) {

            case "add": {

                const channel = options.getChannel("channel")

                let data

                try {

                    data = await antiSpamSchema.findOne({ Guild: guild.id })

                    if (!data) {

                        data = await antiSpamSchema.create({ Guild: guild.id })

                    }

                } catch (err) {

                    console.log(err)

                }

                if (data.Channels.includes(channel.id)) return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("BLUE")
                            .setDescription(`‼ - ${channel} is already added to Anti-spam system!`)
                    ],
                    ephemeral: true
                })

                data.Channels.push(channel.id)
                await data.save()

                interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("BLUE")
                            .setDescription(`✅ - ${channel} is successfully added to Anti-spam system`)
                    ],
                    ephemeral: true
                })

            }
                break;

            case "remove": {

                const channel = options.getChannel("channel")

                let data

                try {

                    data = await antiSpamSchema.findOne({ Guild: guild.id })

                    if (!data) {

                        data = await antiSpamSchema.create({ Guild: guild.id })

                    }

                } catch (err) {

                    console.log(err)

                }

                if (!data.Channels.includes(channel.id)) return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("BLUE")
                            .setDescription(`‼ - ${channel} is not even added to Anti-spam system!`)
                    ],
                    ephemeral: true
                })

                let array = data.Channels

                array = array.filter(x => x !== channel.id)

                data.Channels = array

                await data.save()

                interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("BLUE")
                            .setDescription(`✅ - ${channel} is successfully deleted from Anti-spam system`)
                    ],
                    ephemeral: true
                })

            }
                break;

            case "list": {

                let data = await antiSpamSchema.findOne({ Guild: guild.id })
                let channel

                if (!data) {

                    channel = "NOT SET YET"

                } else {

                    channel = data.Channels

                }

                let channels

                if (channel !== "NOT SET YET") {

                    channels = channel.map((c) => guild.channels.cache.get(c)).join(", ")

                } else {

                    channels = "NOT YET SET"

                }

                interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("BLUE")
                            .setDescription(`✅ - The channels set in antispam system are: ${channels}`)
                    ],
                    ephemeral: true
                })

            }
                break;


        }

    }
}