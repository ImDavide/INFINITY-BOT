const { Client, MessageEmbed, CommandInteraction } = require("discord.js")
const ms = require("ms")

module.exports = {
    name: "timeout",
    description: "Timeouts a member for a specific time",
    permission: "MODERATE_MEMBERS",
    options: [
        {
            name: "add",
            description: "Adds timeout to a member for a specific duration",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "user",
                    description: "Select a member",
                    type: "USER",
                    required: true
                },
                {
                    name: "duration",
                    description: "Select the duration for the timeout",
                    type: "STRING",
                    required: true,
                    choices: [
                        {
                            name: "60 SEC",
                            value: "60 SEC"
                        },
                        {
                            name: "5 MIN",
                            value: "5 MIN"
                        },
                        {
                            name: "10 MIN",
                            value: "10 MIN"
                        },
                        {
                            name: "1 HOUR",
                            value: "1 HOUR"
                        },
                        {
                            name: "1 DAY",
                            value: "1 DAY"
                        },
                        {
                            name: "1 WEEK",
                            value: "1 WEEK"
                        },
                    ]
                },
                {
                    name: "reason",
                    description: "Provide a reason for the timeout",
                    type: "STRING",
                    required: false
                },
            ]
        },
        {
            name: "remove",
            description: "Removes timeout from a member",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "user",
                    description: "Select a member",
                    type: "USER",
                    required: true
                }
            ]
        },
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {

        const { guild, options } = interaction

        switch (options.getSubcommand()) {

            case "add": {

                const member = options.getMember("user")
                const time = options.getString("duration")
                const reason = options.getString("reason") || "‼ - No reason provided"

                if (guild.me.roles.highest.position <= member.roles.highest.position) return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("#df42f5")
                            .setDescription("‼ - I can't execute this command, please move me higher than the member in **ROLES**!")
                    ],
                    ephemeral: true
                })

                if (interaction.member.roles.highest.position <= member.roles.highest.position) return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("#df42f5")
                            .setDescription("‼ - You can't timeout a member of your same level or higher!")
                    ],
                    ephemeral: true
                })

                switch (time) {

                    case "60 SEC": {

                        member.timeout(ms("60s"), reason)

                        interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor("#df42f5")
                                    .setDescription(`✅ - ${member} has been timed out for **60 Seconds** for : **${reason}**`)
                            ],
                        })

                    }
                        break;

                    case "5 MIN": {

                        member.timeout(ms("5m"), reason)

                        interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor("#df42f5")
                                    .setDescription(`✅ - ${member} has been timed out for **5 Minutes** for : **${reason}**`)
                            ],
                        })

                    }
                        break;

                    case "10 MIN": {

                        member.timeout(ms("10m"), reason)

                        interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor("#df42f5")
                                    .setDescription(`✅ - ${member} has been timed out for **10 Minutes** for : **${reason}**`)
                            ],
                        })

                    }
                        break;

                    case "1 HOUR": {

                        member.timeout(ms("1h"), reason)

                        interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor("#df42f5")
                                    .setDescription(`✅ - ${member} has been timed out for **1 Hour** for : **${reason}**`)
                            ],
                        })

                    }
                        break;

                    case "1 DAY": {

                        member.timeout(ms("1d"), reason)

                        interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor("#df42f5")
                                    .setDescription(`✅ - ${member} has been timed out for **1 Day** for : **${reason}**`)
                            ],
                        })

                    }
                        break;

                    case "1 WEEK": {

                        member.timeout(ms("7d"), reason)

                        interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor("#df42f5")
                                    .setDescription(`✅ - ${member} has been timed out for **7 Day** for : **${reason}**`)
                            ],
                        })

                    }
                        break;

                }

            }
                break;

            case "remove": {

                const member = options.getMember("user")

                if (guild.me.roles.highest.position <= interaction.member.roles.highest.position) return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("BLUE")
                            .setDescription("‼ - I can't execute this command, please move me higher than the member in **ROLES**!")
                    ],
                    ephemeral: true
                })

                if (interaction.member.roles.highest.position <= member.roles.highest.position) return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("BLUE")
                            .setDescription("‼ - You can't timeout a member of your same level or higher!")
                    ],
                    ephemeral: true
                })

                member.timeout(null)

                interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("BLUE")
                            .setDescription(`✅ - Removed timeout from ${member}`)
                    ],
                })

            }
                break;

        }

    }
}