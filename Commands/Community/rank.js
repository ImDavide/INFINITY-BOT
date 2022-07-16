const { Client, MessageEmbed, CommandInteraction, MessageAttachment } = require("discord.js")
const levelsSchema = require("../../Structures/Schemas/Levels")
const levelSchema = require("../../Structures/Schemas/Level")
const Canvas = require("canvas")
const { join } = require("path")

module.exports = {
    name: "rank",
    description: "Displays the rank card of a member",
    category: "Community",
    options: [
        {
            name: 'user',
            description: 'Select a user to see the rank card',
            required: false,
            type: 'USER'
        },
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {

        const { options, user, guild, channel } = interaction

        const member = options.getMember("user") || user

        const levelData = await levelsSchema.findOne({ Guild: guild.id })
            .catch(err => console.log(err))

        if (levelData) {

            const Data = await levelSchema.findOne({ Guild: guild.id, User: member.id })

            if (!Data) return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor('BLUE')
                        .setDescription('‼️ - The user has not gained much XP to show!')
                ],
                ephemeral: true
            })

            const Required = Data.Level * Data.Level * 100 + 100

            Canvas.registerFont(join(__dirname, 'Fonts', 'Poppins-Regular.ttf'), {
                family: 'Poppins-Regular'
            })

            Canvas.registerFont(join(__dirname, 'Fonts', 'Poppins-SemiBold.ttf'), {
                family: 'Poppins-Bold'
            })

            function shortener(count) {

                const COUNT_ABBRS = ['', 'k', 'M', 'T']

                const i = 0 === count ? count : Math.floor(Math.log(count) / Math.log(1000))

                let result = parseFloat((count / Math.pow(1000, i)).toFixed(2))
                result += `${COUNT_ABBRS[i]}`

                return result

            }

            const canvas = Canvas.createCanvas(1080, 400),
                ctx = canvas.getContext("2d")

            const name = member.tag

            const noSymbols = (string) => string.replace(/[\u007f-\uffff]/g, '')

            let fsiz = '45px'

            if (guild.name.length >= 23) {
                fsiz = '38px'
            }
            if (guild.name.length >= 40) {
                fsiz = '28px'
            }
            if (guild.name.length >= 63) {
                fsiz = '22px'
            }

            let BackgroundRadius = '20',
                BackGroundImg = 'https://images.unsplash.com/photo-1464973184257-e8780a4bb226?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
                AttachmentName = 'rank.png',
                Username = noSymbols(name),
                AvatarRoundRadius = '50',
                DrawLayerColor = '#000000',
                DrawLayerOpacity = '0.4',
                BoxColor = '#34393d',
                LevelBarFill = '#ffffff',
                LevelBarBackground = '#ffffff',
                TextEXP = shortener(Data.XP) + ' xp',
                LvlText = `Level ${shortener(Data.Level)}`,
                BarRadius = '20',
                TextXpNeded = '{current}/{needed}',
                CurrentXP = Data.XP,
                NeededXP = Required

            ctx.beginPath()
            ctx.moveTo(0 + Number(BackgroundRadius), 0)
            ctx.lineTo(0 + 1080 - Number(BackgroundRadius), 0)
            ctx.quadraticCurveTo(0 + 1080, 0, 0 + 1080, 0 + Number(BackgroundRadius))
            ctx.lineTo(0 + 1080, 0 + 400 - Number(BackgroundRadius))
            ctx.quadraticCurveTo(
                0 + 1080,
                0 + 400,
                0 + 1080 - Number(BackgroundRadius),
                0 + 400
            )

            ctx.lineTo(0 + Number(BackgroundRadius), 0 + 400)
            ctx.quadraticCurveTo(0, 0 + 400, 0, 0 + 400 - Number(BackgroundRadius))
            ctx.lineTo(0, 0 + Number(BackgroundRadius))
            ctx.quadraticCurveTo(0, 0, 0 + Number(BackgroundRadius), 0)
            ctx.closePath()
            ctx.clip()
            ctx.fillStyle = '#000000'
            ctx.fillRect(0, 0, 1080, 400)
            let background = await Canvas.loadImage(BackGroundImg)
            ctx.globalAlpha = 0.7
            ctx.drawImage(background, 0, 0, 1080, 400)
            ctx.restore()

            ctx.fillStyle = DrawLayerColor
            ctx.globalAlpha = DrawLayerOpacity
            ctx.fillRect(40, 0, 240, canvas.height)
            ctx.globalAlpha = 1

            function RoundedBox(ctx, x, y, width, height, radius) {
                ctx.beginPath()
                ctx.moveTo(x + radius, y)
                ctx.lineTo(x + width - radius, y)
                ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
                ctx.lineTo(x + width, y + height - radius)
                ctx.quadraticCurveTo(
                    x + width,
                    y + height,
                    x + width - radius,
                    y + height
                )
                ctx.lineTo(x + radius, y + height)
                ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
                ctx.lineTo(x, y + radius)
                ctx.quadraticCurveTo(x, y, x + radius, y)
                ctx.closePath()
            }

            let avatar = await Canvas.loadImage(
                member.displayAvatarURL({ dynamic: true, format: 'png' })
            )
            ctx.save()
            RoundedBox(ctx, 40 + 30, 30, 180, 180, Number(AvatarRoundRadius))
            ctx.strokeStyle = BoxColor
            ctx.lineWidth = '10'
            ctx.stroke()
            ctx.clip()
            ctx.drawImage(avatar, 40 + 30, 30, 180, 180)
            ctx.restore()

            ctx.save()
            RoundedBox(ctx, 40 + 30, 30 + 180 + 30 + 50 + 30, 180, 50, 20)
            ctx.strokeStyle = '#BFC85A22'
            ctx.stroke()
            ctx.clip()
            ctx.fillStyle = BoxColor
            ctx.globalAlpha = '1'
            ctx.fillRect(40 + 30, 30 + 180 + 30 + 50 + 30, 180, 50)
            ctx.globalAlpha = 1
            ctx.fillStyle = '#ffffff'
            ctx.font = '32px "Poppins-Bold"'
            ctx.textAlign = 'center'
            ctx.fillText(TextEXP, 40 + 30 + 180 / 2, 30 + 180 + 30 + 30 + 50 + 38)
            ctx.restore()

            ctx.save()
            RoundedBox(ctx, 40 + 30, 30 + 180 + 30, 180, 50, 20)
            ctx.strokeStyle = '#BFC85A22'
            ctx.stroke()
            ctx.clip()
            ctx.fillStyle = BoxColor
            ctx.globalAlpha = '1'
            ctx.fillRect(40 + 30, 30 + 180 + 30, 180, 50, 50)
            ctx.globalAlpha = 1
            ctx.fillStyle = '#ffffff'
            ctx.font = '32px "Poppins-Bold"'
            ctx.textAlign = 'center'
            ctx.fillText(LvlText, 40 + 30 + 180 / 2, 30 + 180 + 30 + 38)
            ctx.restore()

            ctx.save()
            ctx.textAlign = 'left'
            ctx.fillStyle = '#ffffff'
            ctx.shadowColor = '#000000'
            ctx.shadowBlur = 15
            ctx.shadowOffsetX = 1
            ctx.shadowOffsetY = 1
            ctx.font = '39px "Poppins-Bold"'
            ctx.fillText(Username, 390, 80)
            ctx.restore()

            ctx.save()
            RoundedBox(ctx, 390, 305, 660, 70, Number(20))
            ctx.strokeStyle = '#BFC85A22'
            ctx.stroke()
            ctx.clip()
            ctx.fillStyle = '#ffffff'
            ctx.font = `${fsiz} "Poppins-Bold"`
            ctx.textAlign = 'center'
            ctx.fillText(guild.name, 60 + 660, 355)
            ctx.globalAlpha = '0.2'
            ctx.fillRect(390, 305, 660, 70)
            ctx.restore()

            ctx.save()
            RoundedBox(ctx, 390, 145, 660, 50, Number(BarRadius))
            ctx.strokeStyle = '#BFC85A22'
            ctx.stroke()
            ctx.clip()
            ctx.fillStyle = LevelBarBackground
            ctx.globalAlpha = '0.2'
            ctx.fillRect(390, 145, 660, 50, 50)
            ctx.restore()

            const percent = (100 * CurrentXP) / NeededXP
            const progress = (percent * 660) / 100

            ctx.save()
            RoundedBox(ctx, 390, 145, progress, 50, Number(BarRadius))
            ctx.strokeStyle = '#BFC85A22'
            ctx.stroke()
            ctx.clip()
            ctx.fillStyle = LevelBarFill
            ctx.globalAlpha = '0.5'
            ctx.fillRect(390, 145, progress, 50, 50)
            ctx.restore()

            ctx.save()
            ctx.textAlign = 'left'
            ctx.fillStyle = '#ffffff'
            ctx.globalAlpha = '0.8'
            ctx.font = '30px "Poppins-Bold"'
            ctx.fillText('Next Level: ' + shortener(NeededXP) + ' xp', 390, 230)
            ctx.restore()

            const latestXP = Number(CurrentXP) - Number(NeededXP)
            const textXPEdited = TextXpNeded.replace(/{needed}/g, shortener(NeededXP))
                .replace(/{current}/g, shortener(CurrentXP))
                .replace(/{latest}/g, latestXP)
            ctx.textAlign = 'center'
            ctx.fillStyle = '#474747'
            ctx.globalAlpha = 1
            ctx.font = '30px "Poppins-Bold"'
            ctx.fillText(textXPEdited, 730, 180)

            const attachment = new MessageAttachment(
                canvas.toBuffer(),
                AttachmentName
            )

            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor("BLUE")
                        .setDescription("✅ - Your request is being processed, please keep patience")
                ],
                ephemeral: true
            })

            return channel.send({
                files: [attachment]
            })

        } else return interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setColor('BLUE')
                    .setDescription('‼️ - Leveling System is disabled!')
            ],
            ephemeral: true
        })

    }
}