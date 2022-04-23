const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "maintenance",
    aliases: ["mm", "mmode"],
    description: "enables and disables maintenance mode in the server",
    category: "MODERATION",
    usage: "maintenance <on | off> [@role]",
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["EMBED_LINKS", "MANAGE_CHANNELS", "MANAGE_ROLES", "VIEW_CHANNELS"],

    async run(client, message, args) {
        if (!client.config.bowner.includes(message.author.id)) {
            if (message.member !== message.guild.owner) {
                if (
                    message.member.roles.highest.position <=
                    message.guild.me.roles.highest.position
                )
                    return message.reply({
                        embeds: [
                            new MessageEmbed({
                                color: client.embed.cf,
                                description:
                                    client.emoji.fail + "| Your Role isn't High Enough"
                            })
                        ]
                    });
            }
        }
        if (!args[0]) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        color: client.embed.cf,
                        description: "mmode <on | off>"
                    })
                ]
            });
        }

        let item

        if (args[1]) {
            item = message.mentions.roles.first() ||
                message.guild.roles.cache.get(args[1]) ||
                message.guild.roles.cache.find(
                    r => r.name.toLowerCase() === args[1].toLocaleLowerCase()
                );

            if (!item) return message.reply({
                embeds: [
                    new MessageEmbed({
                        color: client.embed.cf,
                        description: "Unable to find the role with id " + args[1]
                    })
                ]
            })
        } else {
            item = message.guild.roles.everyone
        }

        const mode = new MessageEmbed({
            color: client.embed.cm,
            description: "Ar you sure you want to\n**TOGGLE MAINTENANCE MODE**"
        }),
            ok = new MessageButton()
                .setStyle("SUCCESS")
                .setEmoji(client.emoji.tick_id)
                .setCustomId("mmode_ok" + args[0])
                .setDisabled(false),
            cancel = new MessageButton()
                .setStyle("DANGER")
                .setEmoji(client.emoji.cross_id)
                .setCustomId("mmode_cancel" + args[0])
                .setDisabled(false),
            row = new MessageActionRow()
                .addComponents(ok, cancel)

        if (args[0] === `on`) {
            let m = await message.reply({
                embeds: [mode],
                components: [row],
            }),
                collector = m.createMessageComponentCollector({ time: 30000 });

            collector.on('collect', async (b) => {
                if (b.user.id !== message.author.id) {
                    let emm = new MessageEmbed({
                        description: client.emoji.fail + client.error.menu,
                        color: client.embed.cf
                    })
                    return b.reply({ ephemeral: true, embeds: [emm] })
                }
                try {
                    if (b.customId === "mmode_ok" + args[0]) {
                        m.delete();
                        message.guild.channels.cache.forEach((ch) => {
                            ch.permissionOverwrites.edit(item, {
                                VIEW_CHANNEL: false,
                            });
                        });
                        message.reply({
                            embeds: [
                                new MessageEmbed({
                                    description: client.emoji.success + `| Maintenance Mode ON`,
                                    color: client.embed.cr
                                })
                            ]
                        }).then(
                            message.guild.channels.create("maintenance-chat", {
                                type: "text",
                                position: 0,
                                permissionOverwrites: [
                                    {
                                        id: message.guild.id,
                                        allow: [
                                            "SEND_MESSAGES",
                                            "VIEW_CHANNEL",
                                            "READ_MESSAGE_HISTORY",
                                        ],
                                    },
                                ],
                            })
                        )
                            .then(
                                message.guild.channels.create("MAINTENANCE VOICE", {
                                    type: "voice",
                                    position: 1,
                                    permissionOverwrites: [
                                        {
                                            id: message.guild.id,
                                            allow: ["VIEW_CHANNEL", "CONNECT", "SPEAK"],
                                        },
                                    ],
                                })
                            );

                    } else if (b.customId === "mmode_cancel" + args[0]) {
                        m.delete();
                    } else {
                        return;
                    }
                } catch (e) {
                    return message.reply({ content: e })
                }
            })
            collector.on("end", (_, reason) => {
                if (reason !== "messageDelete") {
                    m.delete();
                    return message.reply({
                        embeds: [
                            new MessageEmbed({
                                description: client.emoji.fail + "| Command timed out!",
                                color: client.embed.cf
                            })
                        ]
                    })
                }
            });
            collector.on('error', (e) => console.log(e));
        } else if (args[0] === "off") {
            let msg = await message.reply({
                embeds: [mode],
                components: [row],
            }),
                col = msg.createMessageComponentCollector({ time: 30000 });

            col.on('collect', async (b) => {
                if (b.user.id !== message.author.id) {
                    let emm = new MessageEmbed({
                        description: client.emoji.fail + client.error.menu,
                        color: client.embed.cf
                    })
                    return b.reply({ ephemeral: true, embeds: [emm] })
                }
                try {
                    if (b.customId === "mmode_ok" + args[0]) {
                        msg.delete();
                        message.guild.channels.cache.forEach((ch) => {
                            ch.permissionOverwrites.edit(item, {
                                VIEW_CHANNEL: true,
                            });
                        });
                        message.reply({
                            embeds: [
                                new MessageEmbed({
                                    description: client.emoji.success + `| Maintenance Mode OFF`,
                                    color: client.embed.cr
                                })
                            ]
                        })
                    } else if (b.customId === "mmode_cancel" + args[0]) {
                        msg.delete();
                    } else {
                        return;
                    }
                } catch (e) {
                    return console.log(e);
                }
            })
            col.on("end", (_, reason) => {
                if (reason !== "messageDelete") {
                    msg.delete();
                    return message.reply({
                        embeds: [
                            new MessageEmbed({
                                description: `${client.emoji.fail}| Command timed out!`,
                                color: client.embed.cf
                            })
                        ]
                    })
                }
            });
            col.on('error', (e) => console.log(e));
        }
    },
};
