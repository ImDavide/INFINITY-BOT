const { Client, Guild, MessageEmbed, CommandInteraction, MessageReaction } = require("discord.js")
const starboardSchema = require("../../Structures/Schemas/Starboard")

module.exports = {
    name: "messageReactionAdd",

    /**
     * @param {MessageReaction} reaction
     */
    async execute(reaction) {

        const { message, count, emoji } = reaction
        const { guild } = message

        if (!message.guild) return

        const data = await starboardSchema.findOne({ Guild: guild.id }).catch(err => console.log(err))

        if (data) {

            const handleStarboard = async () => {

                const starboardChannel = guild.channels.cache.get(data.Channel)

                const msgs = await starboardChannel.fetch({ limit: 100 })

                const sentMsg = msgs.messages.cache.find(msg => msg.embeds.length === 1 ? (msg.embeds[0].footer.text.startsWith(message.id) ? true : false) : false)

                if (sentMsg) {

                    sentMsg.edit(`${count} - ⭐`)

                } else {

                    const image = message.attachments.first() ? message.attachments.first().proxyURL : null

                    starboardChannel.send({
                        content: "1 - ⭐",
                        embeds: [
                            new MessageEmbed()
                                .setColor("BLUE")
                                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                                .setDescription(`**[Jump to the Message](${message.url})**\n\n${message.content}\n`)
                                .setImage(image)
                                .setFooter({ text: message.id })
                        ]
                    })

                }

            }

            if (emoji.name === "⭐") {

                if (message.partial) {

                    await reaction.fetch()
                    await message.fetch()

                    handleStarboard()

                } else handleStarboard()

            } else return

        } else return

    }

}