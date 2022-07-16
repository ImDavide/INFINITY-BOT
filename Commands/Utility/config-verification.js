const { Client, MessageEmbed, CommandInteraction, MessageActionRow, MessageButton } = require("discord.js")
const model = require('../../Structures/Schemas/Verification')
// This is our new layout for executing the slash commands
module.exports = {
    name: "config-verification",
    description: "A complete system of guild verification",
    userPermissions: "MANAGE_GUILD",
    botPermissions: "MANAGE_GUILD",
    owner: false,
    category: "Config",
    cooldown: '5s',
    options: [
        {
            name: "set",
            description: "A channel where to send the verification.",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "role",
                    description: "Select a role to give when a user is verified",
                    type: "ROLE",
                    required: true,
                },
                {
                    name: "channel",
                    description: "Select a channel where to send the verification.",
                    type: "CHANNEL",
                    channelTypes: ["GUILD_TEXT"],
                    required: true,
                }
            ],

        }, {
            name: "disable",
            description: "Disable the verification system.",
            type: "SUB_COMMAND",

        }
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    async execute(interaction, client) {
        const Sub = interaction.options.getSubcommand()
        switch (Sub) {
            case "set": {

                const channel = interaction.options.getChannel('channel')
                const role = interaction.options.getRole('role')
                let data = await model.findOne({ Guild: interaction.guild.id });

                if (data) return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("#df42f5")
                            .setDescription(`Verification setup is already exists in this guild.`)
                    ],
                    ephemeral: true
                })

                if (role.position >= interaction.guild.me.roles.highest.position) return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor("#df42f5")
                            .setDescription(`This role is higher than my role.`)
                    ],
                    ephemeral: true
                })


                model.findOne({ Guild: interaction.guild.id }, async (err, data) => {

                    if (err) throw err

                    if (data) {

                        data.delete()

                        data = new model({
                            Guild: interaction.guild.id,
                            Role: role.id,
                            Channel: channel.id
                        })
                        await data.save()

                    } else {

                        data = new model({
                            Guild: interaction.guild.id,
                            Role: role.id,
                            Channel: channel.id

                        })
                        await data.save()

                    }

                    await channel.send({
                        embeds: [new MessageEmbed()
                            .setColor("#df42f5")
                            .setAuthor({ name: 'Infinity Boost®', iconURL: 'https://images-ext-1.discordapp.net/external/M7twldjW6_OVrFQPfOI13uhV1uVDvrARIrkFLK1w_H0/https/images-ext-1.discordapp.net/external/pCIwIlkXZ3D7ni5wRW12MXF_NKopaXyP8okYifhE-9Y/https/images-ext-1.discordapp.net/external/NG87DFNmyRqsgO9QxwgLPQf7DTGlGmbUYHsQSol-U9U/https/i.postimg.cc/xjpkWpWS/bac3d9382c97ae8d9728a38b9eb594984f64eb0f915fceeeb1daaf482831431f.gif' })
                            .setThumbnail("https://images-ext-1.discordapp.net/external/M7twldjW6_OVrFQPfOI13uhV1uVDvrARIrkFLK1w_H0/https/images-ext-1.discordapp.net/external/pCIwIlkXZ3D7ni5wRW12MXF_NKopaXyP8okYifhE-9Y/https/images-ext-1.discordapp.net/external/NG87DFNmyRqsgO9QxwgLPQf7DTGlGmbUYHsQSol-U9U/https/i.postimg.cc/xjpkWpWS/bac3d9382c97ae8d9728a38b9eb594984f64eb0f915fceeeb1daaf482831431f.gif")
                            .setTimestamp()
                            .setFooter({ text: 'Infinity Boost', iconURL: 'https://images-ext-1.discordapp.net/external/M7twldjW6_OVrFQPfOI13uhV1uVDvrARIrkFLK1w_H0/https/images-ext-1.discordapp.net/external/pCIwIlkXZ3D7ni5wRW12MXF_NKopaXyP8okYifhE-9Y/https/images-ext-1.discordapp.net/external/NG87DFNmyRqsgO9QxwgLPQf7DTGlGmbUYHsQSol-U9U/https/i.postimg.cc/xjpkWpWS/bac3d9382c97ae8d9728a38b9eb594984f64eb0f915fceeeb1daaf482831431f.gif' })
                            .setDescription(`Per accedere a \`${interaction.guild.name}\`, devi cliccare il bottone.\n`)],
                        components: [new MessageActionRow().addComponents(new MessageButton().setLabel(`Verifica`).setEmoji("<:check:991064935289212938>").setCustomId("verification_verify").setStyle("SECONDARY"))]
                    })
                    return interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor("#df42f5")
                                .setDescription(`${client.success} Successfully set the verification channel to ${channel}.`)
                        ]
                    })
                })
            }
                break;
            case "disable": {
                model.findOne({ Guild: interaction.guild.id }, async (err, data) => {

                    if (err) throw err

                    if (data) {

                        data.delete()

                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor("#df42f5")
                                    .setDescription(`Verification system disabled successfully..`)

                            ]
                        })

                    } else {

                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor("#df42f5")
                                    .setDescription(`Verification system is already disabled.`)

                            ]
                        })
                    }
                })


            }
        }
    }

}