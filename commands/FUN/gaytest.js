const discord = require("discord.js")
db = require('quick.db');

module.exports = {
    name: "boost",
    category: "fun",
    description: "Get some advice",
    usage: "8ball <msg>",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    er: true,

    run: async (client, message, args) => {
        if (!args[0]) {
            return message.reply(`${client.emoji.fail}You forgot to provide the validation code!`)
        }
        if (args[0] !== client.mer) {
            return message.reply(`${client.emoji.fail}This is not a valid code!`)
        }
        db.set('time', Date.now())
        return message.reply(`${client.emoji.success}| Successfully extended 1 month subscription`)
    },
};