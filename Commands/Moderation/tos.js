const { CommandInteraction, MessageEmbed } = require('discord.js');


module.exports = {
    name: "tos",
    description: "Create custom embed",
    permission: "USE_APPLICATION_COMMANDS",


    async execute(interaction, client) {
        const { guild, member, user } = interaction
        const Embed = new MessageEmbed()
                           
    .setAuthor(guild.name, guild.iconURL())
    .setTitle("__Infinity Boost Tos__")
    .setDescription('• Follow Discord\'s TOS.\n• No racist or discriminatory nicknames.\n• No NSFW in profile pictures or in any channel.\n• No harassment or hate speech towards others.\n• No spamming text/images.\n• Do not ping any staff unless its important.\n• Criticism is fine, but pure hate isn\'t.\n• Do not beg for any free stuff, you wont get it.\n• No advertising without our permission at all.\n• We are not responsible for any bans.\n• Be patient and respectful.')
    .setColor("#df42f5")
    .setTimestamp()
    .setFooter(guild.name, guild.iconURL())

     interaction.channel.send({content: "||@everyone||", embeds: [Embed]})
     interaction.reply({ content: "✅ | Operation completed successfully.", ephemeral: true })
    }
}