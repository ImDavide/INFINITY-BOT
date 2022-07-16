const { Client, SelectMenuInteraction, MessageEmbed, ButtonInteraction } = require("discord.js")
const db = require("../../Structures/Schemas/Verification")

module.exports = {
    name: "interactionCreate",

    /**
     * @param {ButtonInteraction} interaction
     * @param {Client} client 
     */
    async execute(interaction, client) {

        if (!interaction.isButton()) return

        const { guild, customId, member, message } = interaction


        switch (interaction.customId) {
            case "verification_verify":
                {
                    const Data = await db.findOne({ Guild: guild.id }).catch(err => { })
                    //console.log(Data)
                    if (!Data) return interaction.reply({ embeds: [new MessageEmbed().setDescription("Unable to find this data.").setColor("#df42f5")] })

                    const RoleToFind = guild.roles.cache.get(Data.Role)
                    //console.log(RoleToFind)
                    if (!RoleToFind) return interaction.reply({ embeds: [new MessageEmbed().setDescription("Non ho trovato il ruolo.").setColor("#df42f5")] })

                    if (guild.me.roles.highest.position <= Data.Role.position) return interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor("#df42f5")
                                .setDescription(`Non posso verificarti. Il tuo ruolo è più alto del mio.`)
                        ], ephemeral: true
                    })

                    if (guild.me.roles.highest.position <= member.roles.highest.position) return interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor("#df42f5")
                                .setDescription(`Non posso verificarti. Il tuo ruolo è più alto del mio.`)
                        ], ephemeral: true
                    })



                    const Role = guild.roles.cache.get(Data.Role)
                    if (interaction.member.roles.cache.has(Data.Role)) {
                        return interaction.reply({
                            embeds: [new MessageEmbed()
                                .setColor("#df42f5")
                                .setDescription(`Sei già verificato!`)                         
                            ], ephemeral: true
                        }).catch(() => { });
                    }

                    await interaction.reply({ embeds: [new MessageEmbed().setColor("#df42f5").setDescription("Verificato.")], ephemeral: true })
                    return interaction.member.roles.add(Role).catch(() => { });

                }
        }
    }
}
