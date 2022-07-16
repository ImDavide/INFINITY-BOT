const { Client, MessageEmbed, CommandInteraction } = require("discord.js")

// This is our new layout for executing the slash commands
module.exports = {
    name: "ping",
    description: "Displays the bot's latency",
    permission: "ADMINISTRATOR",

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    async execute(interaction, client) {

        return interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setColor("#df42f5")
                    .setDescription(`⌚ - The current Websocket ping is: \`${client.ws.ping} ms\``)
            ]
        })

    }

}