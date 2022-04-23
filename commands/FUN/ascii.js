const { MessageEmbed } = require("discord.js"),
    figlet = require("figlet");

module.exports = {
    name: "ascii",
    // aliases: [],
    category: "Fun",
    usage: "ascii <text>",
    description: "Returns provided text in ascii format.",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {
        let text = args.join(" ");
        if (!text) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.cross}| Please provide text for the ascii conversion!`,
                        color: client.embed.cf
                    })
                ]
            });
        }
        if (text.length > 20) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.cross}| Please put text that has 20 characters or less because the conversion won't be good!`,
                        color: client.embed.cf
                    })
                ]
            });
        }
        figlet(text, function (err, data) {
            message.channel.send({
                content: "```\n" + data + '\n```'
            });
        });
    }
};