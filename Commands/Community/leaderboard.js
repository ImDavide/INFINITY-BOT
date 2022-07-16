const { Client, MessageEmbed, CommandInteraction, MessageAttachment, User } = require("discord.js")
const levelsSchema = require("../../Structures/Schemas/Levels")
const levelSchema = require("../../Structures/Schemas/Level")

module.exports = {
    name: "leaderboard",
    description: "Displays the ranking leaderboard",
    category: "Community",

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {

        const { guild, user } = interaction

        const levelData = await levelsSchema.findOne({ Guild: guild.id })
            .catch(err => console.log(err))

        if (levelData) {

            let text = ""

            const Data = await levelSchema.find({ Guild: guild.id })
                .sort({
                    XP: -1,
                    Level: -1
                })
                .limit(10)

            if (!Data) return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor('#df42f5')
                        .setDescription("‼️ - No one's at the leaderboard right now!")
                ],
                ephemeral: true
            })

            function shortener(count) {

                const COUNT_ABBRS = ['', 'k', 'M', 'T']

                const i = 0 === count ? count : Math.floor(Math.log(count) / Math.log(1000))

                let result = parseFloat((count / Math.pow(1000, i)).toFixed(2))
                result += `${COUNT_ABBRS[i]}`

                return result

            }

            for (let counter = 0; counter < Data.length; ++counter) {

                const { User, XP, Level = 0 } = Data[counter]

                const Member = client.users.cache.get(User)

                let shortXp = shortener(XP)

                text += `${counter + 1}. ${Member.tag} | XP: ${shortXp} | Level: ${Level}\n`

            }

            return interaction.reply({

                embeds: [
                    new MessageEmbed()
                        .setTitle(`Leaderboard of ${guild.name}`)
                        .setDescription(`**Top 10:**\n\`\`\`${text}\`\`\``)
                        .setColor('#df42f5')
                        .setFooter({ text: "Ranking Leaderboard by Drago" })
                        .setTimestamp()
                        .setThumbnail(guild.iconURL({ dynamic: true }))
                ],

            })

        } else {

            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor('#df42f5')
                        .setDescription('‼️ - Leveling System is disabled!')
                ],
                ephemeral: true
            })

        }

    }
}