const { Client, CommandInteraction, MessageEmbed } = require("discord.js")

module.exports = {
    name: "music",
    description: "Play, pause, stop, loop, shuffle and many more music commands",
    category: "Music",
    options: [
        {
            name: "play",
            description: "Plays a song",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "query",
                    description: "Provide the song name or URL",
                    type: "STRING",
                    required: true
                }
            ]
        },
        {
            name: "volume",
            description: "Changes the volume of the song (1 - 100)",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "percent",
                    description: "Provide volume percentage of the song",
                    type: "INTEGER",
                    required: true
                }
            ]
        },
        {
            name: "settings",
            description: "Select an option",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "options",
                    description: "Select an option to continue",
                    type: "STRING",
                    required: true,
                    choices: [
                        {
                            name: "⏭ Skip Song",
                            value: "skip"
                        },
                        {
                            name: "⏸ Pause Song",
                            value: "pause"
                        },
                        {
                            name: "▶️ Resume Song",
                            value: "resume"
                        },
                        {
                            name: "⏹ Stop Music",
                            value: "stop"
                        },
                        {
                            name: "🔢 View Queue",
                            value: "queue"
                        },
                        {
                            name: "🔀 Shuffle Queue",
                            value: "shuffle"
                        },
                        {
                            name: "🔃 Toggle Autoplay Modes",
                            value: "autoplay"
                        },
                        {
                            name: "♉ Add a Related Song",
                            value: "relatedsong"
                        },
                        {
                            name: "🔁 Toggle Repeat Mode",
                            value: "repeatmode"
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

        const { options, guild, member, channel } = interaction

        const VoiceChannel = member.voice.channel
        if (!VoiceChannel) return Error(interaction, "You need to in a Voice Channel to use this command")

        if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId) return Error(interaction, `Music is already being played in ${guild.me.voice.channel}, you need to in the same Voice Channel as me`)

        try {

            switch (options.getSubcommand()) {

                case "play": {

                    client.distube.play(VoiceChannel, options.getString("query"), { textChannel: channel, member: member })

                    return interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor("BLUE")
                                .setDescription(`🎶 - Request received`)
                        ],
                        ephemeral: true
                    })

                }

                case "volume": {

                    const Volume = options.getInteger("percent")

                    if (Volume > 100 || Volume < 1) return Error(interaction, "The volume value must be between 1 & 100")

                    client.distube.setVolume(VoiceChannel, Volume)

                    return interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor("BLUE")
                                .setDescription(`🔊 - Volume is now set to **${Volume}%**`)
                        ],
                    })

                }

                case "settings": {

                    const queue = await client.distube.getQueue(VoiceChannel)
                    if (!queue) return Error(interaction, "There is no active queue")

                    switch (options.getString("options")) {

                        case "skip": {

                            await queue.skip(VoiceChannel)

                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor("BLUE")
                                        .setDescription(`⏭ - Skipped the current song`)
                                ],
                            })

                        }

                        case "stop": {

                            await queue.stop(VoiceChannel)

                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor("BLUE")
                                        .setDescription(`⏹ - Music has been stopped in this server`)
                                ],
                            })

                        }

                        case "pause": {

                            await queue.pause(VoiceChannel)

                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor("BLUE")
                                        .setDescription(`⏸ - Music has been paused in this server`)
                                ],
                            })

                        }

                        case "resume": {

                            await queue.resume(VoiceChannel)

                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor("BLUE")
                                        .setDescription(`▶️ - Music has been resumed in this server`)
                                ],
                            })

                        }

                        case "shuffle": {

                            await queue.shuffle(VoiceChannel)

                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor("BLUE")
                                        .setDescription(`🔀 - The queue has been shuffled`)
                                ],
                            })

                        }

                        case "autoplay": {

                            let Mode = await queue.toggleAutoplay(VoiceChannel)

                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor("BLUE")
                                        .setDescription(`🔃 - Autoplay mode is set to **${Mode ? "On" : "Off"}**`)
                                ],
                            })

                        }

                        case "relatedsong": {

                            await queue.addRelatedSong(VoiceChannel)

                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor("BLUE")
                                        .setDescription(`♉ - Related song has been added to the queue`)
                                ],
                            })

                        }

                        case "repeatmode": {

                            let Mode2 = await client.distube.setRepeatMode(queue)

                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor("BLUE")
                                        .setDescription(`🔁 - Repeat mode is set to **${Mode2 = Mode2 ? Mode2 == 2 ? "Queue" : "Song" : "Off"}**`)
                                ],
                            })

                        }

                        case "queue": {

                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor("BLUE")
                                        .setTitle(`Queue of ${interaction.guild.name}`)
                                        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                                        .setDescription(`${queue.songs.map(
                                            (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
                                        )}`)
                                        .setFooter({ text: "Queue by Drago" })
                                        .setTimestamp()
                                ],
                            })

                        }

                    }

                    return

                }

            }

        } catch (err) {

            return Error(interaction, `Alert: ${err}`)

        }

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