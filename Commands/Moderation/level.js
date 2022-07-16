const { Client, MessageEmbed, CommandInteraction } = require('discord.js')
const levelSchema = require("../../Structures/Schemas/Levels")
const levelRewardSchema = require("../../Structures/Schemas/LevelReward")
const levelChannelSchema = require("../../Structures/Schemas/LevelUpChannel")

module.exports = {
    name: "level",
    description: "A complete Leveling system",
    permission: "MANAGE_GUILD",
    category: "Moderation",
    options: [
        {
            name: "system",
            type: "SUB_COMMAND_GROUP",
            description: "Enables or disables the levelling system",
            options: [
                {
                    name: "enable",
                    description: "Enables the levelling system",
                    type: "SUB_COMMAND"
                },
                {
                    name: "disable",
                    description: "Disables the levelling system",
                    type: "SUB_COMMAND"
                }
            ]
        },
        {
            name: "channel",
            type: "SUB_COMMAND_GROUP",
            description: "Sets or resets the level up channel",
            options: [
                {
                    name: "set",
                    description: "Sets the level up channel",
                    type: "SUB_COMMAND",
                    options: [
                        {
                            name: "channel",
                            description: "Select the Level Up Notification Channel",
                            channelTypes: ["GUILD_TEXT"],
                            type: "CHANNEL",
                            required: true
                        }
                    ]
                },
                {
                    name: "reset",
                    description: "Resets the level up channel to none",
                    type: "SUB_COMMAND"
                }
            ]
        },
        {
            name: "reward",
            type: "SUB_COMMAND_GROUP",
            description: "Adds or removes a level reward role",
            options: [
                {
                    name: "add",
                    description: "Adds a reward role to the specified level",
                    type: "SUB_COMMAND",
                    options: [
                        {
                            name: "level",
                            description: "Select the level for the role",
                            type: "INTEGER",
                            required: true
                        },
                        {
                            name: "role",
                            description: "Select the role for the level",
                            type: "ROLE",
                            required: true
                        }
                    ]
                },
                {
                    name: "remove",
                    description: "Removes a reward role from the specified level",
                    type: "SUB_COMMAND",
                    options: [
                        {
                            name: "level",
                            description: "Select the level to remove reward role",
                            type: "INTEGER",
                            required: true
                        },
                    ]
                }
            ]
        },
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {

        const { options, channel, user, guild } = interaction

        const Sub = options.getSubcommandGroup()
        const Options = options.getSubcommand()

        switch (Sub) {

            case "system": {

                switch (Options) {

                    case "enable": {

                        levelSchema.findOne({ Guild: guild.id }, async (err, data) => {

                            if (err) throw err

                            if (data) {

                                data.delete()

                                data = new levelSchema({
                                    Guild: guild.id,
                                    Data: true
                                })
                                data.save()

                            } else {

                                data = new levelSchema({
                                    Guild: guild.id,
                                    Data: true
                                })
                                data.save()

                            }

                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor("BLUE")
                                        .setDescription("✅ - Levelling System is now enabled for this server")
                                ]
                            })

                        })

                    }
                        break;

                    case "disable": {

                        levelSchema.findOne({ Guild: guild.id }, async (err, data) => {

                            if (err) throw err

                            if (data) {

                                data.delete()

                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                            .setColor("BLUE")
                                            .setDescription("✅ - Levelling System is now disabled for this server")
                                    ]
                                })

                            } else {

                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                            .setColor("BLUE")
                                            .setDescription("✅ - Levelling System is already disabled in this server")
                                    ]
                                })

                            }

                        })

                    }
                        break;

                }

            }
                break;

            case "channel": {

                switch (Options) {

                    case "set": {

                        const channel = options.getChannel("channel")

                        levelChannelSchema.findOne({ Guild: guild.id }, async (err, data) => {

                            if (err) throw err

                            if (data) {

                                data.delete()

                                data = new levelChannelSchema({
                                    Guild: guild.id,
                                    Channel: channel.id
                                })
                                data.save()

                            } else {

                                data = new levelChannelSchema({
                                    Guild: guild.id,
                                    Channel: channel.id
                                })
                                data.save()

                            }

                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor("BLUE")
                                        .setDescription(`✅ - ${channel} is now set as Level Up Channel`)
                                ]
                            })

                        })

                    }
                        break;

                    case "reset": {

                        levelChannelSchema.findOne({ Guild: guild.id }, async (err, data) => {

                            if (err) throw err

                            if (data) {

                                data.delete()

                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                            .setColor("BLUE")
                                            .setDescription("✅ - Level Up Channel is now reset to none")
                                    ]
                                })

                            } else {

                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                            .setColor("BLUE")
                                            .setDescription("✅ - Level Up Channel is already reset to none")
                                    ]
                                })

                            }

                        })

                    }
                        break;

                }

            }
                break;

            case "reward": {

                switch (Options) {

                    case "add": {

                        const level = options.getInteger("level")
                        const role = options.getRole("role")

                        levelRewardSchema.create({
                            Guild: guild.id,
                            Level: level,
                            Role: role.id
                        })

                        interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor("BLUE")
                                    .setDescription(`✅ - Successfully set ${role} for **Level ${level}** as a level reward`)
                            ]
                        })

                    }
                        break;

                    case "remove": {

                        const level = interaction.options.getInteger("level")

                        const Data = await levelRewardSchema.findOne({ Guild: guild.id, Level: level })

                        if (!Data) return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor("BLUE")
                                    .setDescription(`‼ - Couldn't find any level reward data for **Level ${level}**`)
                            ],
                            ephemeral: true
                        })

                        Data.delete()

                        interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor('BLUE')
                                    .setDescription(`✅ - Removed **${level}** Level from Role Reward System`)
                            ]
                        })

                    }
                        break;

                }

            }
                break;

        }

    }
}