const { Client, Message, MessageEmbed, CommandInteraction, MessageButton, MessageActionRow } = require("discord.js")
const ms = require("ms")

module.exports = {
    name: "messageCreate",

    /**
     * @param {Message} message 
     */
    async execute(message) {

        const { author, guild, content, client } = message

        if (!guild || author.bot) return
        if (content.includes("@here") || content.includes("@everyone")) return

        if (content.includes(client.user.id)) {

            message.reply({

                embeds: [
                    new MessageEmbed()
                        .setColor('#df42f5')
                        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                        .setDescription(`Hey, mi hai taggato? Piacere di conoscerti.\n\n*Questo messaggio si eliminerà in \`10 secondi\`!*`)
                        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                        .setFooter({ text: 'Infinity Boost' })
                        .setTimestamp()
                ],

                components: [
                    new MessageActionRow().addComponents(

                        new MessageButton()
                            .setStyle('LINK')
                            .setURL('https://discord.com/channels/989275227395588136/995827856343052379')
                            .setLabel('Ticket'),

                    )
                ]

            }).then(msg => {

                setTimeout(() => {

                    msg.delete().catch((err) => {

                        if (err.code !== 10008) return console.log(err)

                    })

                }, ms("10s"))

            })

        }

    }
}