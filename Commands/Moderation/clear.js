// const { CommandInteraction, MessageEmbed } = require("discord.js");

// module.exports = {
//     name: "clear",
//     description: "Delete MEssages",
//     permission: "MANAGE_MESSAGES",
//     options: [
//         {
//             name: "amount", 
//             description: "Amount of messages you want to eliminate",
//             type: "NUMBER",
//             required: true
//         }
//     ],
//     /**
//      * 
//      * @param {CommandInteraction} interaction 
//      */
//     async execute(interaction, client) {
//         const { channel, options } = interaction;

//         const Amount = options.getNumber("amount");
//         const Target = options.getMember("target");

//         const Messages = await channel.messages.fetch();

//         const Response = new MessageEmbed()
//         .setColor("#df42f5")

//         if(Target) {
//             let i = 0;
//             const filtered = [];
//             (await Messages).filter((m) => {
//                 if(m.author.id === Target.id && Amount > i) {
//                     filtered.push(m);
//                     i++;
//                 }
//             })

//             await channel.bulkDelete(filtered, true).then(messages => {
//                 Response.setDescription(`🧹 Eliminated ${messages.size} messages from ${Target}`);
//                 return interaction.reply({
//                     embeds: [Response], fetchReply: true, ephemeral: true
//                 }).then(m => {
//                     setTimeout(() => {
//                         m.delete();
//                     }, 5 * 1000)
//                 }).catch(() => { });
//             })
//         } else {
//             await channel.bulkDelete(Amount, true).then(messages => {
//                 Response.setDescription(`🧹 Eliminated \`${messages.size}\` messages`);
//                 return interaction.reply({
//                     embeds: [Response], fetchReply: true, ephemeral: true
//                 }).then(m => {
//                     setTimeout(() => {
//                         m.delete();
//                     }, 5 * 1000)
//                 }).catch(() => { });
//             })
//         }
//     }
// }
const Discord = require('discord.js');
const { CommandInteraction, MessageEmbed, Client } = require("discord.js"); 
const { log2Dependencies } = require('mathjs');
module.exports = {
    name: "clear",
    description: "Elimina un número específico de mensajes de un canal o un destino.",
    permission: "MANAGE_MESSAGES",
    options: [
        {
            name: "amount",
            description: "Seleccione la cantidad de mensajes para eliminar de un canal o un objetivo.",
            type: "NUMBER",
            required: true
        },
        {
            name: "target",
            description: "Seleccione un objetivo para borrar sus mensajes.",
            type: "USER",
            required: false
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { channel, options } = interaction;
        const { user, guild } = interaction;
        const Amount = options.getNumber("amount");
        const Target = options.getMember("target");
        
        const Messages = await channel.messages.fetch();

        const Response = new MessageEmbed()
        .setColor("#df42f5");

        if(Target) {
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
                if(m.author.id === Target.id && Amount > i) {
                    filtered.push(m);
                    i++;
                }
            })

            await channel.bulkDelete(filtered, true).then(messages => {
                Response.setDescription(`🧹 \`${messages.size}\` Messaggi di ${Target} eliminati `);
                interaction.reply({embeds: [Response], ephemeral: true});
                
            })
                
            
        } else {
            await channel.bulkDelete(Amount, true).then(messages => {
                Response.setDescription(`🧹 \`${messages.size}\` Messaggi eliminati`);
                interaction.reply({embeds: [Response], ephemeral: true});
               
            })
        }
    }
}