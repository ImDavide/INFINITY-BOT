const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'offline',
  description: 'Manda offline il bot',
  permission: "MANAGE_GUILD",
  async execute (interaction, client) {
    interaction.reply({
      content: 'Chiudendo il bot . . .'

    }).then(() => {
      process.on('exit', () => {
        require('child_process').spawn(process.argv.shift(), process.argv, {
          cwd: process.cwd(),
          detached: true,
          stdio: 'inherit'
        })
      })
      process.exit()
    })
  }
}