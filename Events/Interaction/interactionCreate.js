const { Client, CommandInteraction, MessageEmbed } = require("discord.js")

module.exports = {
    name: "interactionCreate",

    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client 
     */

    async execute(interaction, client) {

        // Create interactions for context menu and for slash commands
        if (interaction.isCommand() || interaction.isContextMenu()) {

            // This part is basically the same as previous videos
            const command = client.commands.get(interaction.commandName)

            // If there is no command it will delete the command
            if (!command) return interaction.reply({

                embeds: [
                    new MessageEmbed()
                        .setColor("#df42f5")
                        .setDescription("‼️ - C'è stato un errore nel comando")
                ], ephemeral: true

            }) && client.commands.delete(interaction.commandName)

            if (command.permission) {
                if (!interaction.member.permissions.has(command.permission)) return interaction.reply({
                
                                embeds: [
                                    new MessageEmbed()
                                        .setColor("#df42f5")
                                        .setDescription("<:close:996881146795266209> - Non hai i permessi!")
                                ], ephemeral: true
                
                            })
                }
            // Executing the command
            command.execute(interaction, client)

        }

    }

}