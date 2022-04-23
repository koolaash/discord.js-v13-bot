const { MessageEmbed } = require("discord.js"),
    { parse } = require("twemoji-parser");

module.exports = {
    name: "steal",
    aliases: ["addemoji"],
    description: "adds any emoji into the server you want",
    category: "MODERATION",
    usage: "steal <emoji>",
    userPermissions: ["MANAGE_EMOJIS"],
    botPermissions: ["EMBED_LINKS", "MANAGE_EMOJIS"],

    async run(client, message, args) {
        const emoji = args[0];
        if (!emoji) return message.reply({
            embeds: [
                new MessageEmbeds({
                    description: `${client.emoji.fail}| steal <emoji> [name]`,
                    color: client.embed.cf
                })
            ]
        });

        let customemoji = discord.Util.parseEmoji(emoji);

        if (customemoji.id) {
            const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${customemoji.animated ? "gif" : "png"
                }`,
                name = args.slice(1).join(" ");
            try {
                message.guild.emojis.create(
                    `${Link}`,
                    `${name || customemoji.name}`
                )
            } catch (e) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            color: client.embed.cf,
                            description: `${client.emoji.fail}| Maybe your max emoji limit reached or its on timeout!`
                        })
                    ]
                })
            }
            let Added = new MessageEmbed()
                .setTitle(`Emoji Added`)
                .setColor(client.embed.cr)
                .setDescription(
                    client.emoji.success + `| Emoji Has Been Added! | Name: ${name ||
                    `${customemoji.name}`} | Preview: [Click Me](${Link})`
                );

            return message.reply({ embeds: [Added] });
        } else {
            let CheckEmoji = parse(emoji, { assetType: "png" });
            if (!CheckEmoji[0]) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            color: client.embed.cf,
                            description: `${client.emoji.fail}| Please Give Me A Valid Emoji!`
                        })
                    ]
                });
            }
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        color: client.embed.cf,
                        description: `${client.emoji.fail}| You Can Use Normal Emoji Without Adding In Server!`
                    })
                ]
            });
        }
    }
};
