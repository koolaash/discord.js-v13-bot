const { MessageEmbed } = require("discord.js")


module.exports = {
    name: "purge",
    aliases: ["delete"],
    description: "helps you bulk delete messages",
    category: "MODERATION",
    usage: "clear <amount | @user | bots | images>",
    userPermissions: ["MANAGE_MESSAGES"],
    botPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES"],

    async run(client, message, args) {
        await message.delete().catch(() => null);
        if (!args[0] || args[0] === "all") {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.embed.cf)
                        .setDescription(
                            `${client.emoji.fail}| Mention a \`<user>\` or \`<bots | images | amount>\``
                        )
                        .setFooter({ text: "Bot cannot purge messages older than 15 days" })
                ]
            });
        }
        try {
            if (message.mentions.users.size > 0) {
                let amountToDelete = args[1];
                if (!args[1]) amountToDelete = 50;
                if (parseInt(amountToDelete) > 100)
                    return message.channel.send(
                        `${client.emoji.fail}| Amount of message to be deleted must not exceed 100`
                    );
                let userMessages = await message.channel.messages.fetch({
                    limit: parseInt(amountToDelete),
                }),
                    userFilter = userMessages.filter(
                        (obj) => obj.author.id === message.mentions.users.first().id
                    );
                await message.channel.bulkDelete(userFilter);
                return message.channel.send({
                    embeds: [
                        new MessageEmbed({
                            color: client.embed.cr,
                            description: `${client.emoji.success}| Purged all recent messages of mentioned user`
                        })
                    ]
                }).then(m => setTimeout(() => m.delete().catch(() => null), 2500));
            } else if (args[0] === "bots") {
                let awaitBotMessages = await message.channel.messages.fetch({
                    limit: 100,
                }),
                    botFilter = awaitBotMessages.filter((obj) => obj.author.bot);
                await message.channel.bulkDelete(botFilter);
                message.channel.send({
                    embeds: [
                        new MessageEmbed({
                            color: client.embed.cr,
                            description: `${client.emoji.success}| Deleted all recent bots messages`
                        })
                    ]
                }).then(m => setTimeout(() => m.delete().catch(() => null), 2500));
                return;
            } else if (args[0] === "images") {
                let awaitImageMessages = await message.channel.messages.fetch({
                    limit: 100,
                }),
                    imageFilter = awaitImageMessages.filter(
                        (obj) => obj.attachments.size > 0
                    );
                await message.channel.bulkDelete(imageFilter);
                return message.channel.send({
                    embeds: [
                        new MessageEmbed({
                            color: client.embed.cr,
                            description: `${client.emoji.success}| Purged all recent images`
                        })
                    ]
                }).then(m => setTimeout(() => m.delete().catch(() => null), 2500));
            } else if (typeof parseInt(args[0]) == "number") {
                if (parseInt(args[0]) > 100) {
                    return message.channel.send({
                        embeds: [
                            new MessageEmbed({
                                color: client.embed.cf,
                                description: `${client.emoji.fail}| Amount of message to be deleted must not exceed 100`
                            })
                        ]
                    }).then(m => setTimeout(() => m.delete().catch(() => null), 2500));
                }
                let md = await message.channel.messages.fetch({
                    limit: parseInt(args[0]),
                });
                await message.channel.bulkDelete(md)
                message.channel.send({
                    embeds: [
                        new MessageEmbed({
                            color: client.embed.cr,
                            description: `${client.emoji.success}| Deleted **${md.size}** messages.`
                        })
                    ]
                }).then(m => setTimeout(() => m.delete().catch(() => null), 2500));
            } else if (args[0] !== "images" || args[0] !== "bots" || typeof parseInt(args[0]) !== "number" || (message.mentions.users.size <= 0)) {
                return message.channel.send({
                    embeds: [
                        new MessageEmbed({
                            color: client.embed.cf,
                            description: `${client.emoji.fail}| Mention a \`<user>\` or \`<bots | images | amount>\``
                        })
                    ]
                }).then(m => setTimeout(() => m.delete().catch(() => null), 2500));
            }
        } catch (e) {
            console.log(e);
            return message.channel.send({
                embeds: [
                    new MessageEmbed({
                        color: client.embed.cf,
                        description: `${client.emoji.fail}| Cannot purge messages older than 14 days!`
                    })
                ]
            }).then(m => setTimeout(() => m.delete().catch(() => null), 2500));
        }
    },
};
