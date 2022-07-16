const { Client, Message, MessageEmbed, CommandInteraction } = require("discord.js")
const levelsSchema = require("../../Structures/Schemas/Levels")
const levelSchema = require("../../Structures/Schemas/Level")
const levelChannelSchema = require("../../Structures/Schemas/LevelUpChannel")
const levelRewardSchema = require('../../Structures/Schemas/LevelReward')

module.exports = {
    name: "messageCreate",

    /**
     * @param {Message} message
     */
    async execute(message) {

        const { author, guild, member } = message

        if (author.bot || !guild) return

        const levelData = await levelsSchema.findOne({ Guild: guild.id }).catch(err => console.log(err))

        if (!levelData) return

        levelSchema.findOne({ Guild: guild.id, User: author.id }, async (err, data) => {

            if (err) throw err

            if (!data) {

                levelSchema.create({
                    Guild: guild.id,
                    User: author.id,
                    XP: 0,
                    Level: 0
                })

            }

        })

        const ChannelData = await levelChannelSchema.findOne({ Guild: guild.id })

        const give = Math.floor(Math.random() * 29) + 1

        const data = await levelSchema.findOne({
            Guild: guild.id,
            User: author.id
        })

        if (!data) return

        const requiredXp = data.Level * data.Level * 100 + 100

        if (data.XP + give >= requiredXp) {

            data.XP += give
            data.Level += 1
            await data.save()

            if (ChannelData) {

                const Channel = guild.channels.cache.get(ChannelData.Channel)

                Channel.send({
                    content: `${author}`,
                    embeds: [
                        new MessageEmbed()
                            .setColor("BLUE")
                            .setDescription(`🎊 - Congratulations! You have now reached **Level ${data.Level}** 🎉`)
                    ]
                })

            }

        } else {

            data.XP += give
            await data.save()

        }

        const nextRoleCheck = await levelRewardSchema.findOne({ Guild: guild.id, Level: data.Level })

        if (nextRoleCheck) {

            const levelRole = guild.roles.cache.get(nextRoleCheck.Role)

            const userLevel = await levelSchema.findOne({ Guild: guild.id, User: author.id })

            if (member.roles.cache.find(r => r.id === levelRole.id)) return

            member.roles.add(levelRole)

            userLevel.Role = levelRole.id
            await userLevel.save()

            return member.send({
                embeds: [
                    new MessageEmbed()
                        .setColor("BLUE")
                        .setAuthor({ name: author.username, iconURL: author.displayAvatarURL({ dynamic: true }) })
                        .setTitle("You've got a new reward! 🥳")
                        .setDescription(`${levelRole.name}`)
                        .setTimestamp()
                ]
            }).catch((err) => {

                if (err.code !== 50007) return console.log(err)

            })

        }

    }
}