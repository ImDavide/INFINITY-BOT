const { CommandInteraction, MessageEmbed } = require('discord.js');


module.exports = {
    name: "ciao",
    description: "Create custom embed",
    permission: "USE_APPLICATION_COMMANDS",
    options: [
        {
            name: "title",
            description: "Fornisci un nome per il tuo sondaggio",
            type: "STRING",
            required: true
        },
        {
            name: "image",
            description: "Image",
            type: "STRING",
            required: true
        },
        {
            name: "tag",
            description: "Tag user",
            type: "MENTIONABLE",
            required: true
        },
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        const { options }= interaction;
        const title = options.getString("title")
        const image = options.getString("image")
        const tag = options.getMentionable('tag')
      
        
        const embed = new MessageEmbed()
        .setTitle(`${title}`)
        .setDescription(`*By* ${interaction.member} for ${tag}`) 
        .setColor("#2F3136")
        .setTimestamp()
        .setFooter({text: "Infinity Boost", iconURL: "https://cdn.discordapp.com/attachments/989230929362976828/990400243101233152/IMG-20220625-WA0017.jpg"})  
          
        if(image && image.includes("http"))         embed.setImage(image);
         interaction.reply({ content: 'Messaggio creato ✅', fetchReply:true, ephemeral: true})
       interaction.channel.send({embeds: [embed]})
    }
} 