const { CommandInteraction, MessageEmbed} = require('discord.js');


module.exports = {
    name: "price",
    description: "Create custom embed",
    permission: "USE_APPLICATION_COMMANDS",


    async execute(interaction, client) {
        const { guild, member, user } = interaction
        const Embed = new MessageEmbed()

    .setTitle("INFINITY BOOST SERVICE")
    .setDescription("<:boost:997085004456808469> **BOOST PRICING** <:boost:997085004456808469>\n\n<a:sssssss:997220010672005202>\`6\` Server Boosts ➜ **$5**\n<a:sssssss:997220010672005202>\`8\` Server Boosts ➜ **$6**\n<a:sssssss:997220010672005202>\`14\` Server Boosts ➜ **$9**\n<a:sssssss:997220010672005202>\`30\` Server Boosts ➜ **$25**\n\n<:images:989454277367988224> **PAYMENT METHODS** <:images:989454277367988224>\n\n<a:sssssss:997220010672005202> PayPal\n\n<:emoji:997137164234141746> OPEN A **TICKET** IN <#995827856343052379> AND BUY NOW! <:emoji:997137164234141746>")
    .setThumbnail(guild.iconURL())
    .setColor("#df42f5")
    .setTimestamp()
    .setFooter(guild.name, guild.iconURL())
     interaction.channel.send({ embeds: [Embed], content: "||@everyone||"})
     interaction.reply({ content: "✅ | Operation completed successfully.", ephemeral: true })
    }
}   