const { Client, MessageEmbed, CommandInteraction } = require("discord.js")
const DB = require("../../Structures/Schemas/Playlist")

module.exports = {
    name: "queue",
    description: "Create, save or delete your own queue, add or remove songs from that queue",
    category: "Music",
    options: [
        {
            name: "create",
            description: "Creates a new Playlist",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "name",
                    description: "Provide a name for the Playlist (Better to provide a single word)",
                    type: "STRING",
                    required: true
                }
            ]
        },
        {
            name: "privacy",
            description: "Changes the Privacy of the Playlist",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "playlist-id",
                    description: "Provide the Playlist ID",
                    type: "STRING",
                    required: true,
                },
                {
                    name: "options",
                    description: "Select a Privacy option",
                    type: "STRING",
                    required: true,
                    choices: [
                        {
                            name: "public",
                            value: "public"
                        },
                        {
                            name: "private",
                            value: "private"
                        }
                    ]
                }
            ]
        },
        {
            name: "add",
            description: "Adds a new song to the provided Playlist ID",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "playlist-id",
                    description: "Provide the Playlist ID",
                    type: "STRING",
                    required: true
                },
                {
                    name: "song-name",
                    description: "Provide the Name or URL of the song",
                    type: "STRING",
                    required: true
                }
            ]
        },
        {
            name: "remove",
            description: "Adds a new song to the provided Playlist ID",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "playlist-id",
                    description: "Provide the Playlist ID",
                    type: "STRING",
                    required: true
                },
                {
                    name: "song-position",
                    description: "Provide the Song Postion of the Song to be removed",
                    type: "INTEGER",
                    required: true
                }
            ]
        },
        {
            name: "delete",
            description: "Deletes the existing Playlist",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "playlist-id",
                    description: "Provide the Playlist ID to be deleted",
                    type: "STRING",
                    required: true
                }
            ]
        },
        {
            name: "list",
            description: "Lists all the active Playlists",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "options",
                    description: "Select a Privacy option",
                    type: "STRING",
                    required: true,
                    choices: [
                        {
                            name: "public",
                            value: "public"
                        },
                        {
                            name: "private",
                            value: "private"
                        }
                    ]
                }
            ]
        },
        {
            name: "info",
            description: "Shows information about a particular Playlist",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "playlist-id",
                    description: "Provide the Playlist ID to be shown",
                    type: "STRING",
                    required: true
                }
            ]
        },
        {
            name: "play",
            description: "Plays a custom playlist",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "playlist-id",
                    description: "Provide the Playlist ID to be played",
                    type: "STRING",
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

        const { options, guild, user, member, channel } = interaction

        switch (options.getSubcommand()) {

            case "create": {

                const name = options.getString("name").toLowerCase()

                let data = await DB.findOne({ User: user.id })

                if (!data) {

                    new DB({

                        Guild: guild.id,
                        User: user.id,
                        Name: name,
                        Privacy: true

                    }).save()

                } else {

                    if (data.Name.includes(name)) return interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor("BLUE")
                                .setDescription(`‼ - A Playlist already exists with the name **${name.toUpperCase()}**, please try a new one!`)
                        ],
                        ephemeral: true
                    })

                    new DB({

                        Guild: guild.id,
                        User: user.id,
                        Name: name,
                        Privacy: true

                    }).save()

                }

                interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("BLUE")
                            .setDescription(`✅ - A new Playlist named **${name.toUpperCase()}** has been created by ${user}, use \`/queue list\` to see the Playlist ID and \`/queue privacy\` to change the privacy mode`)
                    ]
                })

            }
                break;

            case "privacy": {

                const queueID = options.getString("playlist-id")
                const choice = options.getString("options")

                const queueInfo = await DB.findById(queueID).catch(() => {

                    return interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor("BLUE")
                                .setDescription("‼ - Please provide a valid Playlist ID!")
                        ],
                        ephemeral: true
                    })

                })

                if (user.id !== queueInfo.User) return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("BLUE")
                            .setDescription("‼ - You can't change the privacy of a Playlist which is not managed by you!")
                    ],
                    ephemeral: true
                })

                switch (choice) {

                    case "public": {

                        if (queueInfo.Privacy === false) return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor("BLUE")
                                    .setDescription("‼ - Playlist Privacy is already set to `Public`!")
                            ],
                            ephemeral: true
                        })

                        queueInfo.Privacy = false
                        await queueInfo.save()

                        interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor("BLUE")
                                    .setDescription("🔓 - Playlist Privacy is now set to `Public`")
                            ]
                        })

                    }
                        break;

                    case "private": {

                        if (queueInfo.Privacy === true) return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor("BLUE")
                                    .setDescription("‼ - Playlist Privacy is already set to `Private`!")
                            ],
                            ephemeral: true
                        })

                        queueInfo.Privacy = true
                        await queueInfo.save()

                        interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor("BLUE")
                                    .setDescription("🔒 - Playlist Privacy is now set to `Private`")
                            ]
                        })

                    }
                        break;

                }

            }
                break;

            case "list": {

                const choice = options.getString("options")

                switch (choice) {

                    case "public": {

                        const queueList = await DB.find({ Privacy: false })

                        if (!queueList?.length) return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor('BLUE')
                                    .setDescription(`‼️ - There's no Public Playlist active at this moment!`)
                            ],
                            ephemeral: true
                        })

                        let index = 1

                        const queueData = queueList.map((queue) => {

                            return [
                                `**${index++}. ${queue.Name.toUpperCase()}** - \`${queue._id}\``
                            ].join("\n")

                        }).join("\n")

                        interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor("BLUE")
                                    .setTitle("📰 Public Playlists")
                                    .setDescription(`${queueData}`)
                                    .setThumbnail(guild.iconURL({ dynamic: true }))
                                    .setFooter({ text: "Playlists by Drago" })
                                    .setTimestamp()
                            ]

                        })

                    }
                        break;

                    case "private": {

                        const queueList = await DB.find({ User: user.id, Privacy: true })

                        if (!queueList?.length) return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor('BLUE')
                                    .setDescription(`‼️ - You don't have any active playlist currently!`)
                            ],
                            ephemeral: true
                        })

                        let index = 1

                        const queueData = queueList.map((queue) => {

                            return [
                                `**${index++}. ${queue.Name.toUpperCase()}** - \`${queue._id}\``
                            ].join("\n")

                        }).join("\n")

                        interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor("BLUE")
                                    .setTitle("📰 Your Playlists")
                                    .setDescription(`${queueData}`)
                                    .setThumbnail(guild.iconURL({ dynamic: true }))
                                    .setFooter({ text: "Playlists by Drago" })
                                    .setTimestamp()
                            ]
                        })

                    }
                        break;

                }

            }
                break;

            case "info": {

                const queueID = options.getString("playlist-id")

                const queueInfo = await DB.findById(queueID).catch(() => {

                    return interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor("BLUE")
                                .setDescription("‼ - Please provide a valid Playlist ID!")
                        ],
                        ephemeral: true
                    })

                })

                const User = guild.members.cache.get(queueInfo.User)

                let privacy

                if (queueInfo.Privacy === true) {
                    privacy = "Private"
                } else {
                    privacy = "Public"
                }

                const rawFields = queueInfo.Songs.NAME

                let index = 1

                const fields = rawFields.map((f) => {

                    return `**${index++}.** ${f}`

                }).join("\n")

                interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("BLUE")
                            .setTitle(`ℹ Playlist Information`)
                            .setDescription(
                                `**Name:** ${queueInfo.Name.toUpperCase()}
                                **ID:** \`${queueID}\`
                                **Creator:** ${User}
                                **Privacy:** ${privacy}

                                **Songs:**
                                ${fields}`
                            )
                            .setThumbnail(guild.iconURL({ dynamic: true }))
                            .setFooter({ text: "Playlists by Drago" })
                            .setTimestamp()
                    ]
                })

            }
                break;

            case "add": {

                const queueID = options.getString("playlist-id")
                const songs = options.getString("song-name")

                const queueInfo = await DB.findById(queueID).catch(() => {

                    return interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor("BLUE")
                                .setDescription("‼ - Please provide a valid Playlist ID!")
                        ],
                        ephemeral: true
                    })

                })

                if (user.id !== queueInfo.User) return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("BLUE")
                            .setDescription("‼ - You can't add songs to a Playlist which is not managed by you!")
                    ],
                    ephemeral: true
                })

                const data = await client.distube.search(songs, { limit: 1 }).catch((err) => {

                    if (err) return interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor("BLUE")
                                .setDescription(`‼️ - The song you're trying to add is not valid!`)
                        ],
                        ephemeral: true
                    })

                })

                const URL = data[0].url
                const Name = data[0].name

                if (queueInfo.Songs.URL.includes(URL)) return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("BLUE")
                            .setDescription(`‼️ - The song you're trying to add for this Playlist, is already added!`)
                    ],
                    ephemeral: true
                })

                queueInfo.Songs.URL.push(URL)
                queueInfo.Songs.NAME.push(Name)
                await queueInfo.save()

                interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("BLUE")
                            .setDescription(`✅ - Successfully added the [${Name}](${URL}) into the Playlist, use \`/queue info\` to see the Playlist`)
                    ]
                })

            }
                break;

            case "remove": {

                const queueID = options.getString("playlist-id")
                const position = options.getInteger("song-position")

                const queueInfo = await DB.findById(queueID).catch(() => {

                    return interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor("BLUE")
                                .setDescription("‼ - Please provide a valid Playlist ID!")
                        ],
                        ephemeral: true
                    })

                })

                if (user.id !== queueInfo.User) return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("BLUE")
                            .setDescription("‼ - You can't remove a song from a Playlist which is not managed by you!")
                    ],
                    ephemeral: true
                })

                const Name = queueInfo.Songs.NAME
                const Url = queueInfo.Songs.URL

                const filtered = parseInt(position - 1)

                if (filtered > Name.length) return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("BLUE")
                            .setDescription("‼ - Provide a valid Song Postion, use `/queue info` to check all the song positions!")
                    ],
                    ephemeral: true
                })

                const afName = Name.splice(filtered, 1)
                const afUrl = Url.splice(filtered, 1)

                const rmvName = afName.filter(x => !Name.includes(x))
                const rmvUrl = afUrl.filter(x => !Url.includes(x))

                await queueInfo.save()

                interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("BLUE")
                            .setDescription(`✅ - Successfully [${rmvName}](${rmvUrl}) removed from the Playlist`)
                    ]
                })

            }
                break;

            case "delete": {

                const queueID = options.getString("playlist-id")

                const queueInfo = await DB.findById(queueID).catch(() => {

                    return interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor("BLUE")
                                .setDescription("‼ - Please provide a valid Playlist ID!")
                        ],
                        ephemeral: true
                    })

                })

                if (user.id !== queueInfo.User) return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("BLUE")
                            .setDescription("‼ - You can't delete a Playlist which is not managed by you!")
                    ],
                    ephemeral: true
                })

                queueInfo.delete()

                interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("BLUE")
                            .setDescription(`✅ - Successfully deleted the Playlist of associated to the ID: \`${queueID}\``)
                    ]
                })

            }
                break;

            case "play": {

                const VoiceChannel = member.voice.channel

                await interaction.deferReply({ephemeral: true})

                if (!VoiceChannel) return interaction.editReply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("BLUE")
                            .setDescription("‼ - You need to in a Voice Channel to use this command!")
                    ]
                })

                if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId) return interaction.editReply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("BLUE")
                            .setDescription(`‼ - Music is already being played in ${guild.me.voice.channel}, you need to in the same Voice Channel as me!`)
                    ]
                })

                const queueID = options.getString("playlist-id")

                const queueInfo = await DB.findById(queueID).catch(() => {

                    return interaction.editReply({
                        embeds: [
                            new MessageEmbed()
                                .setColor("BLUE")
                                .setDescription("‼ - Please provide a valid Playlist ID!")
                        ]
                    })

                })

                if (queueInfo.Privacy === true) {

                    const User = client.users.cache.get(queueInfo.User)

                    if (queueInfo.User !== user.id) return interaction.editReply({
                        embeds: [
                            new MessageEmbed()
                                .setColor('BLUE')
                                .setDescription(`‼️ - This is a Private Playlist managed by ${User}!`)
                        ]
                    })

                    const songs = queueInfo.Songs.URL
                    const playlistName = queueInfo.Name.toUpperCase()

                    if (!songs?.length) return interaction.editReply({
                        embeds: [
                            new MessageEmbed()
                                .setColor('BLUE')
                                .setDescription(`‼️ - Please add songs to the playlist by using \`/queue add\` command!`)
                        ]
                    })

                    const playlist = await client.distube.createCustomPlaylist(songs, {
                        member: member,
                        properties: { name: `${playlistName}` },
                        parallel: true
                    })

                    client.distube.play(VoiceChannel, playlist, { textChannel: channel, member: member })

                    interaction.editReply({
                        embeds: [
                            new MessageEmbed()
                                .setColor("BLUE")
                                .setDescription(`✅ - Request received`)
                        ]
                    })

                } else {

                    const songs = queueInfo.Songs.URL
                    const playlistName = queueInfo.Name.toUpperCase()

                    if (!songs?.length) return interaction.editReply({
                        embeds: [
                            new MessageEmbed()
                                .setColor('BLUE')
                                .setDescription(`‼️ - Please add songs to the playlist by using \`/queue add\` command!`)
                        ]
                    })

                    const playlist = await client.distube.createCustomPlaylist(songs, {
                        member: member,
                        properties: { name: `${playlistName}` },
                        parallel: true
                    })

                    client.distube.play(VoiceChannel, playlist, { textChannel: channel, member: member })

                    interaction.editReply({
                        embeds: [
                            new MessageEmbed()
                                .setColor("BLUE")
                                .setDescription(`✅ - Request received`)
                        ]
                    })

                }

            }
                break;

        }

    }
}