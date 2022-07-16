const chalk = require("chalk"); // Importing Chalk from Chalk
const {MessageEmbed, WebhookClient} = require('discord.js') // Importing MessageEmbed from Discord.js
const {inspect} = require("util")
const s = new WebhookClient({
                id: "997150631208951978",
                token:"82ZyPhsZzR0IbCkbt1ctfJiit6TfFoIpdxjlFqvfFqlaRLxYVEcq3oqEIQiLZZ05EWuM",
            });
          

module.exports = (client) => {
    client.on('error', err => {
        // const a = client.channels.cache.get(config.ERROR_LOG_CHANNEL)
        console.log(err)
        const ErrorEmbed = new MessageEmbed()
            .setAuthor({name: "Infinity Boost", iconURL: "https://images-ext-1.discordapp.net/external/M7twldjW6_OVrFQPfOI13uhV1uVDvrARIrkFLK1w_H0/https/images-ext-1.discordapp.net/external/pCIwIlkXZ3D7ni5wRW12MXF_NKopaXyP8okYifhE-9Y/https/images-ext-1.discordapp.net/external/NG87DFNmyRqsgO9QxwgLPQf7DTGlGmbUYHsQSol-U9U/https/i.postimg.cc/xjpkWpWS/bac3d9382c97ae8d9728a38b9eb594984f64eb0f915fceeeb1daaf482831431f.gif"})
            .setTitle('Error')
            .setURL('https://discordjs.guide/popular-topics/errors.html#api-errors')
            .setColor('#2F3136')
            .setDescription(`\`\`\`${inspect(error, {depth: 0})}\`\`\``)
            
            .setTimestamp()
        return s.send({
            embeds: [ErrorEmbed]
        })
    });
    process.on("unhandledRejection", (reason, p) => {
        // const b = client.channels.cache.get(config.ERROR_LOG_CHANNEL)
        console.log(
            chalk.yellow('——————————[Unhandled Rejection/Catch]——————————\n'),
            reason, p
        )
        const unhandledRejectionEmbed = new MessageEmbed()
        .setAuthor({name: "Infinity Boost", iconURL: "https://images-ext-1.discordapp.net/external/M7twldjW6_OVrFQPfOI13uhV1uVDvrARIrkFLK1w_H0/https/images-ext-1.discordapp.net/external/pCIwIlkXZ3D7ni5wRW12MXF_NKopaXyP8okYifhE-9Y/https/images-ext-1.discordapp.net/external/NG87DFNmyRqsgO9QxwgLPQf7DTGlGmbUYHsQSol-U9U/https/i.postimg.cc/xjpkWpWS/bac3d9382c97ae8d9728a38b9eb594984f64eb0f915fceeeb1daaf482831431f.gif"})
            .setTitle('** <a:errore:986355033115353098> There was an Unhandled Rejection/Catch <a:errore:986355033115353098> **')
            .setURL('https://nodejs.org/api/process.html#event-unhandledrejection')
            .setColor('#FF0000')
            .addField('Reason', `\`\`\`${inspect(reason, { depth: 0 })}\`\`\``.substring(0, 1000))
            .addField('Promise', `\`\`\`${inspect(p, { depth: 0 })}\`\`\``.substring(0, 1000))
            .setFooter({text: "Infinity Boost", iconURL: "https://images-ext-1.discordapp.net/external/M7twldjW6_OVrFQPfOI13uhV1uVDvrARIrkFLK1w_H0/https/images-ext-1.discordapp.net/external/pCIwIlkXZ3D7ni5wRW12MXF_NKopaXyP8okYifhE-9Y/https/images-ext-1.discordapp.net/external/NG87DFNmyRqsgO9QxwgLPQf7DTGlGmbUYHsQSol-U9U/https/i.postimg.cc/xjpkWpWS/bac3d9382c97ae8d9728a38b9eb594984f64eb0f915fceeeb1daaf482831431f.gif"})
            .setTimestamp()
        return s.send({
            embeds: [unhandledRejectionEmbed]
        })
    });
    
    process.on("uncaughtException", (err, origin) => {
        // const c = client.channels.cache.get(config.ERROR_LOG_CHANNEL)
        console.log(err, origin)
        const uncaughtExceptionEmbed = new MessageEmbed()
        .setAuthor({name: "Infinity Boost", iconURL: "https://images-ext-1.discordapp.net/external/M7twldjW6_OVrFQPfOI13uhV1uVDvrARIrkFLK1w_H0/https/images-ext-1.discordapp.net/external/pCIwIlkXZ3D7ni5wRW12MXF_NKopaXyP8okYifhE-9Y/https/images-ext-1.discordapp.net/external/NG87DFNmyRqsgO9QxwgLPQf7DTGlGmbUYHsQSol-U9U/https/i.postimg.cc/xjpkWpWS/bac3d9382c97ae8d9728a38b9eb594984f64eb0f915fceeeb1daaf482831431f.gif"})
            .setTitle('** <a:errore:986355033115353098> There was an Uncaught Exception/Catch <a:errore:986355033115353098> **')
            .setColor('#FF0000')
            .setURL('https://nodejs.org/api/process.html#event-uncaughtexception')
            .addField('Error', `\`\`\`${inspect(err, { depth: 0 })}\`\`\``.substring(0, 1000))
            .addField('Origin', `\`\`\`${inspect(origin, { depth: 0 })}\`\`\``.substring(0, 1000))
            .setTimestamp()
            .setFooter({text: "Infinity Boost", iconURL: "https://images-ext-1.discordapp.net/external/M7twldjW6_OVrFQPfOI13uhV1uVDvrARIrkFLK1w_H0/https/images-ext-1.discordapp.net/external/pCIwIlkXZ3D7ni5wRW12MXF_NKopaXyP8okYifhE-9Y/https/images-ext-1.discordapp.net/external/NG87DFNmyRqsgO9QxwgLPQf7DTGlGmbUYHsQSol-U9U/https/i.postimg.cc/xjpkWpWS/bac3d9382c97ae8d9728a38b9eb594984f64eb0f915fceeeb1daaf482831431f.gif"})
        return s.send({
            embeds: [uncaughtExceptionEmbed]
        })
    });
    
    process.on("uncaughtExceptionMonitor", (err, origin) => {
        // const d = client.channels.cache.get(config.ERROR_LOG_CHANNEL)
        console.log(err, origin)
        const uncaughtExceptionMonitorEmbed = new MessageEmbed()
        .setAuthor({name: "Infinity Boost", iconURL: "https://images-ext-1.discordapp.net/external/M7twldjW6_OVrFQPfOI13uhV1uVDvrARIrkFLK1w_H0/https/images-ext-1.discordapp.net/external/pCIwIlkXZ3D7ni5wRW12MXF_NKopaXyP8okYifhE-9Y/https/images-ext-1.discordapp.net/external/NG87DFNmyRqsgO9QxwgLPQf7DTGlGmbUYHsQSol-U9U/https/i.postimg.cc/xjpkWpWS/bac3d9382c97ae8d9728a38b9eb594984f64eb0f915fceeeb1daaf482831431f.gif"})
            .setTitle('** <a:errore:986355033115353098> There was an Uncaught Exception Monitor <a:errore:986355033115353098> **')
            .setColor('#FF0000')
            .setURL('https://nodejs.org/api/process.html#event-uncaughtexceptionmonitor')
            .addField('Error', `\`\`\`${inspect(err, { depth: 0 })}\`\`\``.substring(0, 1000))
            .addField('Origin', `\`\`\`${inspect(origin, { depth: 0 })}\`\`\``.substring(0, 1000))
            .setFooter({text: "Infinity Boost", iconURL: "https://images-ext-1.discordapp.net/external/M7twldjW6_OVrFQPfOI13uhV1uVDvrARIrkFLK1w_H0/https/images-ext-1.discordapp.net/external/pCIwIlkXZ3D7ni5wRW12MXF_NKopaXyP8okYifhE-9Y/https/images-ext-1.discordapp.net/external/NG87DFNmyRqsgO9QxwgLPQf7DTGlGmbUYHsQSol-U9U/https/i.postimg.cc/xjpkWpWS/bac3d9382c97ae8d9728a38b9eb594984f64eb0f915fceeeb1daaf482831431f.gif"})
            .setTimestamp()
    
        return s.send({
            embeds: [uncaughtExceptionMonitorEmbed]
        })
    });
    
    process.on("multipleResolves", (type, promise, reason) => {
        // const e = client.channels.cache.get(config.ERROR_LOG_CHANNEL)
        console.log(type, promise, reason)
        const multipleResolvesEmbed = new MessageEmbed()
        .setAuthor({name: "Infinity Boost", iconURL: "https://images-ext-1.discordapp.net/external/M7twldjW6_OVrFQPfOI13uhV1uVDvrARIrkFLK1w_H0/https/images-ext-1.discordapp.net/external/pCIwIlkXZ3D7ni5wRW12MXF_NKopaXyP8okYifhE-9Y/https/images-ext-1.discordapp.net/external/NG87DFNmyRqsgO9QxwgLPQf7DTGlGmbUYHsQSol-U9U/https/i.postimg.cc/xjpkWpWS/bac3d9382c97ae8d9728a38b9eb594984f64eb0f915fceeeb1daaf482831431f.gif"})
            .setTitle('** <a:errore:986355033115353098> There was an Multiple Resolve <a:errore:986355033115353098> **')
            .setURL('https://nodejs.org/api/process.html#event-multipleresolves')
            .setColor('#FF0000')
            .addField('Type', `\`\`\`${inspect(type, { depth: 0 })}\`\`\``.substring(0, 1000))
            .addField('Promise', `\`\`\`${inspect(promise, { depth: 0 })}\`\`\``.substring(0, 1000))
            .addField('Reason', `\`\`\`${inspect(reason, { depth: 0 })}\`\`\``.substring(0, 1000))
            .setTimestamp()
            .setFooter({text: "Infinity Boost", iconURL: "https://images-ext-1.discordapp.net/external/M7twldjW6_OVrFQPfOI13uhV1uVDvrARIrkFLK1w_H0/https/images-ext-1.discordapp.net/external/pCIwIlkXZ3D7ni5wRW12MXF_NKopaXyP8okYifhE-9Y/https/images-ext-1.discordapp.net/external/NG87DFNmyRqsgO9QxwgLPQf7DTGlGmbUYHsQSol-U9U/https/i.postimg.cc/xjpkWpWS/bac3d9382c97ae8d9728a38b9eb594984f64eb0f915fceeeb1daaf482831431f.gif"})
        return s.send({
            embeds: [multipleResolvesEmbed]
        })
    });
    
    process.on("warning", (warn) => {
        // const f = client.channels.cache.get(config.ERROR_LOG_CHANNEL)
        console.log(warn)
        const warningEmbed = new MessageEmbed()
        .setAuthor({name: "Infinity Boost", iconURL: "https://images-ext-1.discordapp.net/external/M7twldjW6_OVrFQPfOI13uhV1uVDvrARIrkFLK1w_H0/https/images-ext-1.discordapp.net/external/pCIwIlkXZ3D7ni5wRW12MXF_NKopaXyP8okYifhE-9Y/https/images-ext-1.discordapp.net/external/NG87DFNmyRqsgO9QxwgLPQf7DTGlGmbUYHsQSol-U9U/https/i.postimg.cc/xjpkWpWS/bac3d9382c97ae8d9728a38b9eb594984f64eb0f915fceeeb1daaf482831431f.gif"})
            .setTitle('** <a:errore:986355033115353098> There was an Uncaught Exception Monitor Warning <a:errore:986355033115353098> **')
            .setColor('#FF0000')
            .setURL('https://nodejs.org/api/process.html#event-warning')
            .addField('Warn', `\`\`\`${inspect(warn, { depth: 0 })}\`\`\``.substring(0, 1000))
            .setTimestamp()
            .setFooter({text: "Infinity Boost", iconURL: "https://images-ext-1.discordapp.net/external/M7twldjW6_OVrFQPfOI13uhV1uVDvrARIrkFLK1w_H0/https/images-ext-1.discordapp.net/external/pCIwIlkXZ3D7ni5wRW12MXF_NKopaXyP8okYifhE-9Y/https/images-ext-1.discordapp.net/external/NG87DFNmyRqsgO9QxwgLPQf7DTGlGmbUYHsQSol-U9U/https/i.postimg.cc/xjpkWpWS/bac3d9382c97ae8d9728a38b9eb594984f64eb0f915fceeeb1daaf482831431f.gif"})
        return s.send({
            embeds: [warningEmbed]
        })
    });
    
}