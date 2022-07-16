const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js");
const intents = new Discord.Intents(32767)
const client = new Discord.Client({
    intents,
    partials: ["CHANNEL", "GUILD_MEMBER", "REACTION", "MESSAGE", "GUILD_SCHEDULED_EVENT", "USER"],
    allowedMentions: { parse: ["users", "everyone", "roles"] },
})

require("dotenv").config()

const { promisify } = require("util")
const { glob } = require("glob")
const PG = promisify(glob)
const Ascii = require("ascii-table")

const { DisTube } = require("distube")
const { SpotifyPlugin } = require("@distube/spotify")

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
})

module.exports = client

client.commands = new Discord.Collection();

// Require the files inside handler and pass "client, PG & Ascii" through them
// Remember, maintaining the order is important
["Events", "Commands"].forEach(handler => {

    require(`./Handlers/${handler}`)(client, PG, Ascii)

});
require("./Handlers/Anti-Crash")(client, Discord); 
require(`./Handlers/Events_N`)(client, Discord)

//process.on('unhandledRejection', (reason, p) => {
//     let c = client.channels.cache.get("996705932664909865")
  
//         c.send({content: `Erro: ${reason} ${p}`});
//     });



//     process.on("uncaughtException", (err, origin) => {

  
//     }) 



//     process.on('uncaughtExceptionMonitor', (err, origin) => {
//      let c = client.channels.cache.get("996705932664909865")
  
//         c.send({content: `Erro: ${err} ${origin}`});
//     });


//     process.on('multipleResolves', (type, promise, reason) => {
//     let c = client.channels.cache.get("996705932664909865")
  
//         c.send({content: `Erro: ${type} ${promise} ${reason}`});

//     });

client.login(process.env.DISCORD_TOKEN)