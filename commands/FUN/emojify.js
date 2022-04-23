const mapping = {
    " ": "   ",
    0: ":zero:",
    1: ":one:",
    2: ":two:",
    3: ":three:",
    4: ":four:",
    5: ":five:",
    6: ":six:",
    7: ":seven:",
    8: ":eight:",
    9: ":nine:",
    "!": ":grey_exclamation:",
    "?": ":grey_question:",
    "#": ":hash:",
    "*": ":asterisk:",
},
    { MessageEmbed } = require('discord.js');

"abcdefghijklmnopqrstuvwxyz".split("").forEach((c) => {
    mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
});

module.exports = {
    name: "emojify",
    aliases: [],
    category: "FUN",
    usage: "emojify <text>",
    description: "Returns provided text in emojify (emotes) form.",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {
        if (args.length < 1) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.fail}| Provide some text to emojify!`,
                        color: client.embed.cf
                    })
                ]
            });
        }
        if (args.length > 75) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.fail}| You cannot emojify more than 75 alphabets/numbers!`,
                        color: client.embed.cf
                    })
                ]
            })
        }
        return message.reply(
            args.join(" ").split("")
                .map((c) => mapping[c] || c)
                .join("")
        );
    },
};