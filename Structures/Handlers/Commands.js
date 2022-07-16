const { Perms } = require("../Validation/Permissions")
const { Client } = require("discord.js")
const ms = require("ms")

/**
 * @param { Client } client
 */
module.exports = async (client, PG, Ascii) => {

    const Table = new Ascii("Commands Loaded")

    CommandsArray = [];

    (await PG(`${process.cwd()}/Commands/*/*.js`)).map(async (file) => {

        const command = require(file)

        if (!command.name)
            return Table.addRow(file.split("/")[7], "🔸 FAILED", "Missing a name")

        if (!command.context && !command.description)
            return Table.addRow(command.name, "🔸 FAILED", "Missing a description")

        if (command.permission) {

            if (Perms.includes(command.permission))
                command.default_member_permissions = false
            else
                return Table.addRow(command.name, "🔸 FAILED", "User Permission is invalid")

        }

        client.commands.set(command.name, command)
        CommandsArray.push(command)

        await Table.addRow(command.name, "🔹 SUCCESSFUL")

    })

    console.log(Table.toString())

    // PERMISSIONS CHECK //

    client.on("ready", async () => {

        setInterval(async () => {

            await client.guilds.cache.forEach(MainGuild => {

                // const MainGuild = await client.guilds.cache.get("936585039498592306")

                MainGuild.commands.set(CommandsArray)

            })

        }, ms("5s"))

    })

}