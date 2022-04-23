const { MessageEmbed, Collection } = require("discord.js"),
    db = new Collection();

module.exports = {
    name: "announce",
    aliases: ["a", "announce"],
    category: "EMBED",
    usage: "`announce <#channel> then wait..`",
    description: "Embeds Your Given Message",
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES"],

    async run(client, message, args) {
        try {
            const inuse = db.get("announce" + message.guild.id);

            if (inuse === true) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| Command is already in use in thi guild please wait until the last command is completed or its timeout is over!`,
                            color: client.embed.cf
                        })
                    ]
                });
            }

            let chan =
                message.mentions.channels.first() ||
                message.guild.channels.cache.get(args[0]);

            if (!chan) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| You forgot to mention the channel along with the command!`
                        })
                    ]
                });
            }
            let perms = ["EMBED_LINKS", "SEND_MESSAGES", "VIEW_CHANNELS"],
                r = false;
            perms.forEach(perm => {
                if (!message.guild.me.permissionsIn(chan).has(perms)) {
                    return (
                        r = true &&
                        message.reply({
                            embeds: [
                                `${client.emoji.fail}| I NEED **\`${perms}\`** PERMISSION IN <#${chan.id}> FIRST TO EXECUTE THIS COMMAND!!`
                            ]
                        }).then((m) => m.delete({ timeout: 3000 }))
                    )
                }
            })
            if (r === true) return;
            db.set("announce" + message.guild.id, true);
            setTimeout(function () {
                db.delete("announce" + message.guild.id, true)
            }, 30000)
            let embed = new MessageEmbed(),
                msg_filter = res => res.author.id === message.author.id;
            message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.embed.cm)
                        .setDescription(
                            "Set the title of Your Embed Message? if none then type `none`"
                        )
                ]
            }).then(m => setTimeout(() => m.delete(), 4500));
            let title = await message.channel.awaitMessages({
                filter: msg_filter,
                max: 1,
                time: 30000
            })
            if (title.size) {
                if (title.first().content !== "none") {
                    if (title.first().length > 256) {
                        return (
                            db.delete("announce" + message.guild.id) &&
                            message.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor(client.embed.cf)
                                        .setDescription("Title Can Not Exceed 256 characters.\nRestart the process!")
                                ]
                            }).then(m => setTimeout(() => m.delete(), 4500))
                        );
                    }
                    embed.setTitle(title.first().content);
                }
            } else if (!title.size) {
                return (
                    db.delete("announce" + message.guild.id) &&
                    message.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor(client.embed.cf)
                                .setDescription("You didn't provide the title.\nRestart the process!")
                        ]
                    }).then(m => setTimeout(() => m.delete(), 4500))
                );
            }
            message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.embed.cm)
                        .setDescription(
                            "Set description of Your embed Message? if none then type `none`"
                        )
                ]
            }).then(m => setTimeout(() => m.delete(), 4500));
            let description = await message.channel.awaitMessages({
                filter: msg_filter,
                max: 1,
                time: 30000
            }
            );
            if (description.size) {
                if (description.first().content !== "none") {
                    if (description.first().length > 2048)
                        return (
                            db.delete("announce" + message.guild.id) &&
                            message.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor(client.embed.cf)
                                        .setDescription("Description Can Not Exceed 2048 Characters.\nRestart the process!")
                                ]
                            }).then(m => setTimeout(() => m.delete(), 4500))
                        );
                    embed.setDescription(description.first().content);
                }
            } else if (!description.size) {
                return (
                    db.delete("announce" + message.guild.id) &&
                    message.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor(client.embed.cf)
                                .setDescription("You didn't provide the description\nRestart the process!")
                        ]
                    }).then(m => setTimeout(() => m.delete(), 4500))
                );
            }
            message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.embed.cm)
                        .setDescription(
                            "Set Image You Want To Add In Embed?(Send Link Only) if none then type `none`"
                        )
                ]
            }).then(m => setTimeout(() => m.delete(), 4500));
            let image = await message.channel.awaitMessages({
                filter: msg_filter,
                max: 1,
                time: 30000
            }
            );
            if (image.size) {
                if (image.first().content !== "none") {
                    if (!/\.(jpe?g|png|gif|webp)$/i.test(image.first().content)) {
                        return (
                            db.delete("announce" + message.guild.id) &&
                            message.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor(client.embed.cf)
                                        .setDescription(client.emoji.fail + "| That was not a valid URL.\nRestart the process!")
                                ]
                            }).then(m => setTimeout(() => m.delete(), 4500))
                        );
                    }
                    embed.setImage(image.first().content);
                }
            } else if (!image.size) {
                return (
                    db.delete("announce" + message.guild.id) &&
                    message
                        .reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor(client.embed.cf)
                                    .setDescription("You didn't provide the image\nRestart the process!")
                            ]
                        }).then(m => setTimeout(() => m.delete(), 4500))
                );
            }
            message
                .reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(client.embed.cm)
                            .setDescription(
                                "Set Thumbnail You Want To Add In Embed?(Send Link Of Image) if none then type `none`"
                            )
                    ]
                })
                .then(m => setTimeout(() => m.delete(), 4500));
            let thumb = await message.channel.awaitMessages({
                filter: msg_filter,
                max: 1,
                time: 30000
            }
            );
            if (thumb.size) {
                if (thumb.first().content !== "none") {
                    if (!/\.(jpe?g|png|gif|webp)$/i.test(thumb.first().content)) {
                        return (
                            db.delete("announce" + message.guild.id) &&
                            message
                                .reply({
                                    embeds: [
                                        new MessageEmbed()
                                            .setColor(client.embed.cf)
                                            .setDescription(client.emoji.fail + "| That was not a valid URL.\nRestart the process!")
                                    ]
                                }).then(m => setTimeout(() => m.delete(), 4500))
                        );
                    }
                    embed.setThumbnail(thumb.first().content);
                }
            } else if (!thumb.size) {
                return (
                    db.delete("announce" + message.guild.id) &&
                    message.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor(client.embed.cf)
                                .setDescription("You didn't provide the thumbnail.\nRestart the process!")
                        ]
                    }).then(m => setTimeout(() => m.delete(), 4500))
                );
            }
            message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.embed.cm)
                        .setDescription(
                            "Set the Color of the Embed Message? HEX CODE (Example:`#000000`) Or coulour name Be like `RED, BLUE` All in Caps."
                        )
                ]
            }).then(m => setTimeout(() => m.delete(), 4500));
            let color = await message.channel.awaitMessages({
                filter: msg_filter,
                max: 1,
                time: 30000
            }
            );
            if (color.first().content !== "none" || color.first().content !== undefined) {
                embed.setColor(color.first().content);
            } else {
                embed.setColor("RANDOM");
            }
            message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.embed.cm)
                        .setDescription(
                            "Set The Footer of Your Embed Message? if none then type `none`"
                        )
                ]
            }).then(m => setTimeout(() => m.delete(), 4500));
            let footer = await message.channel.awaitMessages({
                filter: msg_filter,
                max: 1,
                time: 30000
            }
            );
            if (footer.size) {
                if (footer.first().content !== "none") {
                    if (footer.first().length > 2048)
                        return (
                            db.delete("announce" + message.guild.id) &&
                            message.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor(client.embed.cm)
                                        .setDescription("Footer can not exceed 2048 characters.\nRestart the process!")
                                ]
                            }).then(m => setTimeout(() => m.delete(), 4500))
                        );
                    embed.setFooter({
                        text: footer.first().content,
                        iconURL: message.author.displayAvatarURL({ dynamic: true })
                    });
                }
            } else if (!footer.size) {
                return (
                    db.delete("announce" + message.guild.id) &&
                    message.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor(client.embed.cf)
                                .setDescription("You didn't provide the footer\nRestart the process!")
                        ]
                    }).then(m => setTimeout(() => m.delete(), 4500))
                );
            }
            try {
                await chan.send({ embeds: [embed] });
            } catch (e) {
                message.channel.send({
                    embeds: [
                        new discord.MessageEmbed({
                            color: client.embed.cf,
                            description: `${client.emoji.fail}| Some error occured try againg with correct format\nCheck if the bot have permissions in that channels!`
                        })
                    ]
                })
            }
            db.delete("announce" + message.guild.id);
        } catch (e) {
            return console.log(e)
        }
    }
};