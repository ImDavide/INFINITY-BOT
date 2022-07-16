const { CommandInteraction, Client, MessageEmbed } = require(`discord.js`);
const moment = require("moment");
const emoji = [
    { name: "DISCORD_EMPLOYEE", emoji: "<:Staff:994985083633160272>" },
    { name: "DISCORD_CERTIFIED_MODERATOR", emoji: "<:CertifiedModerator:994985105724551218>" },
    { name: "PARTNERED_SERVER_OWNER", emoji: "<:ServerPartner:994985085780643850>" },
    { name: "HYPESQUARD_EVENTS", emoji: "<:HypeSquardEvents:994985103824523296>" },
    { name: "HOUSE_BRAVERY", emoji: "<:HouseBraveryMember:994985087856820345>" },
    { name: "HOUSE_BRILLIANCE", emoji: "<:HouseBrillianceMember:994985091883348048>" },
    { name: "HOUSE_BALANCE", emoji: "<:HouseBalanceMember:994985089949777920>" },
    { name: "BUGHUNTER_LEVEL_1", emoji: "<:BugHunterLvL1:994985107939147936>" },
    { name: "BUGHUNTER_LEVEL_2", emoji: "<:BigHunterLvL2:994985101580566588>" },
    { name: "EARLY_VERIFIED_BOT_DEVELOPER", emoji: "<:VerifiedDeveloper:994985099135295529>" },
    { name: "EARLY_SUPPORTER", emoji: "<:EarlyNitroSupporter:994985096706801915>" }
  ];

module.exports = {
    name: `userinfo`,
    description: `Get a persons user information`,
    usage: "/userinfo [USER]",
    options: [{
        name: 'user',
        type: 'USER',
        description: 'Select a user',
        required: true,
    }],
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const user = interaction.options.getUser('user')
        await user.fetch();
        const flags = user.flags.toArray();
        const member = interaction.options.getMember('user')
        let badges = [];
          emoji.forEach((e) => {
            if (flags.includes(e.name)) badges.push(e.emoji);
          });
        const startMessage = new MessageEmbed()
            .setTitle(`${user.tag}`)
            .setColor("#df42f5")
            .setDescription(`**Badges:** ${badges.join(" ")}`)
            .setThumbnail(user.avatarURL({ dynamic: true }))
            .addFields(
                { name: 'ID:', value: `\`\`\`${user.id}                     \`\`\`` })
            .addField('Nickname:', `\`\`\`${user.nickname || "False"}\`\`\``, true)
            .addField('Bot Account:', `\`\`\`${user.bot ? "True" : "False"}\`\`\``, true)
            .addField('Discriminator:', `\`\`\`#${user.discriminator}\`\`\``, true)
            .addField("Banner", `${user.bannerURL() ? "\`\`\`True\`\`\`" : "\`\`\`False\`\`\`"}`, true)
            .addField('Created at:', `\`\`\`${moment(user.createdAt).format('MMM Do YYYY')}\`\`\``, true)
            .setImage(user.bannerURL({ dynamic: true, size: 512 }) || "")
        await interaction.reply({ embeds: [startMessage] });
    }
}