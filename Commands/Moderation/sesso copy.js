//  GNU General Publice Lisence v3.0 - https://www.gnu.org/licenses/gpl-3.0.en.html
//  Credit to: Wilson#0159 on Discord.
//  Removal of this header breaches the license agreement.
//  For more info, refer to the license page linked at the top.

const {CommandInteraction, MessageEmbed } = require("discord.js")

module.exports = {
    name: "sessoss",
    description: "Generate a custom embed!",
    options: [
        {
            name: "generate",
            description: "Generate a custom embed!.",
            type: "SUB_COMMAND",
            options: [
                { name: "title", description: "Provide a title for the embed.", type: "STRING"},
                { name: "description", description: "Provide a description for the embed.", type: "STRING"},
                { name: "image", description: "Provide an image for the embed.", type: "STRING"},


            ]
        },
       
    ],
    /**
     * 
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { options } = interaction;
        const subCommand = options.getSubcommand();

        switch(subCommand) {
            case "generate":
        
                const title       = options.getString("title");
                const description = options.getString("description");
                const image       = options.getString("image");
                const { guild, user } = interaction
             
               

                const embed = new MessageEmbed()
               
                .setColor("#2F3136")
                .setTimestamp()
                
                .setFooter({text: "DS Studios", iconURL: "https://cdn.discordapp.com/attachments/989230929362976828/990400243101233152/IMG-20220625-WA0017.jpg"})   
                
                 if(image && image.includes("http"))         embed.setImage(image);
                 if(title)                                   embed.setTitle(title);
                 if(description)                             embed.setDescription(description);

                

                if(!embed.title && !embed.image &&!embed.description) return interaction.reply ({
                 embeds: [
                    new MessageEmbed()
                         .setColor("#0000FF")
                         
                            .setDescription("You have not provided valid options!")
                             ],
                                ephemeral: true
                }) 
                
              
        interaction.channel.sen({embeds: [embed]})
           
            
            
                
               
            
        }
    }
}

// if(!embed.title && !embed.image &&!embed.description) return interaction.reply ({
//     embeds: [
//         new MessageEmbed()
//             .setColor("#0066FF")
//             .setDescription("You have not provided valid options!")
//     ],
//     ephemeral: true
// }) 