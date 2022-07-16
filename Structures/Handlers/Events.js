// Require all the valid event names
const { Events } = require("../Validation/EventNames")
const { promisify } = require("util")
const { glob } = require("glob")
const PG = promisify(glob)
const Ascii = require("ascii-table")

module.exports = async (client, PG, Ascii) => {

    // Heading for the table
    const Table = new Ascii("Events Loaded");

    // Mapping all the Event files
    (await PG(`${process.cwd()}/Events/*/*.js`)).map(async (file) => {

        const event = require(file)

        // If somehow the event name doesn't match the validated event name or there is no event name
        if (!Events.includes(event.name) || !event.name) {

            const L = file.split("/")

            // Throw an error through the table
            await Table.addRow(`${event.name || "MISSING"}`, `⛔ Event Name is either invalid or missing: ${L[6] + `/` + L[7]}`)
            return

        }

        // If the event is once
        if (event.once) {

            client.once(event.name, (...args) => event.execute(...args, client))

        // If the event is not once i.e. on
        } else {

            client.on(event.name, (...args) => event.execute(...args, client))

        }

        // If everything is right, it will add a success message in the table
        await Table.addRow(event.name, "✅ SUCCESSFUL")

    })

    // Don't forget to log the table in console
    console.log(Table.toString())

}