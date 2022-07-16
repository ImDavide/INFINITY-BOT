const { CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: "emitt",
    description: "Emetteur d'Event",
    permission: "MANAGE_GUILD",
    options: [
        {
            name: "member",
            description: "emitt",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "guildMemberAdd",
                    value: "guildMemberAdd"
                },
                {
                    name: "guildMemberRemove",
                    value: "guildMemberRemove"
                },
                {
                    name: "guildMemberUpdate",
                    value: "guildMemberUpdate"
                },
                {
                    name: "userUpdate",
                    value: "userUpdate"
                }
            ]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const choices = interaction.options.getString("member");

        switch(choices) {
            case "guildMemberAdd" : {
                client.emit("guildMemberAdd", interaction.member);
                interaction.reply({content: "Emitted the `guildMemberAdd` event.", ephemeral: true})
            }
            break;
            case "guildMemberRemove" : {
                client.emit("guildMemberRemove", interaction.member);
                interaction.reply({content: "Emitted the `guildMemberRemove` event.", ephemeral: true})
            }
            break;
            case "guildMemberUpdate" : {
                client.emit("guildMemberUpdate", interaction.member)
                interaction.reply({content: "Event émis", ephemeral: true})
            }
            break;
            case "userUpdate" : {
                client.emit("userUpdate", interaction.member)
                interaction.reply({content: "Event émis", ephemeral: true})
            }
        }
    }
}

