const { MessageEmbed, Collection } = require("discord.js"),
    idpuse = new Collection()

module.exports = {
    name: "idp",
    aliases: ["idpass", "shareidp", "share-idp"],
    category: "EMBED",
    usage: "`idp <#channel> then wait..`",
    description: "Embeds Your Given Idp",
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {
        const inuse = idpuse.get("idp" + message.guild.id);

        if (inuse === true) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description:
                            client.emoji.fail +
                            "| Command is already in use in thi guild please " +
                            "wait until the last command is completed or its " +
                            "timeout is over!",
                        color: client.embed.cf
                    })
                ]
            });
        }
        let chan = message.mentions.channels.first() ||
            message.guild.channels.cache.get(args[0]);

        if (!chan) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `**Usage:** \`shareidp #channel or idp #channel then follow the procedure\``,
                        color: client.embed.cf
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
                        content: `${client.emoji.fail}| I NEED **\`${perms}\`** PERMISSION IN <#${chan.id}> FIRST TO EXECUTE THIS COMMAND!!`
                    }).then(m => setTimeout(() => m.delete(), 3000))
                )
            }
        })
        if (r === true) return;
        idpuse.set("idp" + message.guild.id, true)
        setTimeout(function () {
            idpuse.delete("idp" + message.guild.id, true)
        }, 300000)
        let embed = new MessageEmbed(),
            msg_filter = res => res.author.id === message.author.id;
        message.reply({
            embeds: [
                new MessageEmbed()
                    .setColor(client.embed.cm)
                    .setDescription(`${client.emoji.ar}| Set the title of Your Idp Message.! Type \`none\` for default`)
            ]
        }).then(m => setTimeout(() => m.delete(), 4500));
        let title = await message.channel.awaitMessages({
            filter: msg_filter,
            max: 1,
            time: 30000
        });
        if (title.size) {
            if (title.first().content !== "none") {
                if (title.first().length > 256) {
                    return (
                        idpuse.delete("idp" + message.guild.id, true) &&
                        message.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor(client.embed.cf)
                                    .setDescription(client.emoji.fail + "| " + "Title Can Not Exceed 256 characters.")
                            ]
                        }).then(m => setTimeout(() => m.delete(), 4500))
                    );
                }
                embed.setTitle(title.first().content);
            } else {
                embed.setTitle("NEW CUSTOM");
            }
            embed.setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setFooter({
                    text: "Shared By : " + message.author.tag,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                });
        } else {
            embed.setTitle("NEW CUSTOM")
        }
        message.reply({
            embeds: [
                new MessageEmbed()
                    .setColor(client.embed.cm)
                    .setDescription(client.emoji.ar + "| " + "PROVIDE THE ROOM ID")
            ]
        }).then(m => setTimeout(() => m.delete(), 4500))
        let roomid = await message.channel.awaitMessages({
            filter: msg_filter,
            max: 1,
            time: 30000
        });
        if (!roomid.first().content) {
            return (
                message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: client.emoji.fail + "| " + "Please Provide Room Id First!\nRestart the process!",
                            color: client.embed.cf
                        })
                    ]
                }) && idpuse.delete("idp" + message.guild.id, true)
            );
        }
        message.reply({
            embeds: [
                new MessageEmbed()
                    .setColor(client.embed.cm)
                    .setDescription(client.emoji.ar + "| " + "PROVIDE THE ROOM PASSWORD")
            ]
        }).then(m => setTimeout(() => m.delete(), 4500))
        let roompass = await message.channel.awaitMessages({
            filter: msg_filter,
            max: 1,
            time: 30000
        });
        if (!roompass.first().content) {
            return (
                message.reply({
                    embeds: [
                        new MessageEmbed()
                            .setDescription(client.emoji.fail + "| " + "Please Provide Room Password First!\nRestart the process!")
                            .setColor(client.embed.cf)
                    ]
                }) &&
                idpuse.delete("idp" + message.guild.id, true)
            );
        }
        message.reply({
            embeds: [
                new MessageEmbed()
                    .setColor(client.embed.cm)
                    .setDescription(client.emoji.ar + "| " + "PROVIDE THE ROOM MAP")
            ]
        }).then(m => setTimeout(() => m.delete(), 4500))
        let roommap = await message.channel.awaitMessages({
            filter: msg_filter,
            max: 1,
            time: 30000
        });
        if (!roommap.first().content) {
            return (
                message.reply({
                    embeds: [
                        new MessageEmbed()
                            .setDescription(client.emoji.fail + "| " + "Please Provide Room Map First!\nRestart the process!")
                            .setColor(client.embed.cf)
                    ]
                }) &&
                idpuse.delete("idp" + message.guild.id, true)
            );
        }
        message.reply({
            embeds: [
                new MessageEmbed()
                    .setColor(client.embed.cm)
                    .setDescription(client.emoji.ar + "| " + "PROVIDE THE ROOM START TIME")
            ]
        }).then(m => setTimeout(() => m.delete(), 4500))
        let roomtime = await message.channel.awaitMessages({
            filter: msg_filter,
            max: 1,
            time: 30000
        });
        if (!roomtime.first().content) {
            return (
                message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| Please Provide Room Start Time First!\nRestart the process!`,
                            color: client.embed.cf
                        })
                    ]
                }) &&
                idpuse.delete("idp" + message.guild.id, true)
            );
        }
        message.reply({
            embeds: [
                new MessageEmbed()
                    .setColor(client.embed.cm)
                    .setDescription(client.emoji.ar + "| " + "PROVIDE THE ROOM RULES. ELSE TYPE `none`")
            ]
        }).then(m => setTimeout(() => m.delete(), 4500))
        let roomrules = await message.channel.awaitMessages({
            filter: msg_filter,
            max: 1,
            time: 30000
        });
        if (roomrules.size) {
            if (roomrules.first().content !== "none") {
                if (roomrules.first().length > 1800) {
                    return (
                        client.inuse.set(message.guild.id, {
                            idp: false,
                        }) &&
                        message.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor(client.embed.cf)
                                    .setDescription(`${client.emoji.fail}| Rules Can Not Exceed 1800 characters.\nRestart the process!`)
                            ]
                        }).then(m => setTimeout(() => m.delete(), 4500))
                    );
                }
                embed.addField("RULES", roomrules.first().content);
            }
        }
        embed.setColor(client.embed.cm);
        embed.setDescription(
            "**ROOM ID : `" +
            roomid.first().content +
            "`\nROOM PASS : `" +
            roompass.first().content +
            "`\nROOM MAP : `" +
            roommap.first().content +
            "`\nSTART TIME : `" +
            roomtime.first().content +
            "`**"
        );
        try {
            chan.send({ embeds: [embed] });
        } catch (e) {
            message.reply({
                embeds: [
                    new MessageEmbed({
                        color: client.embed.cf,
                        description: client.emoji.fail +
                            "| Some error occured try againg with correct format" +
                            "\nRestart the process!\nCheck if bot hav3e permissons in the channel you want to share idp!"
                    })
                ]
            })
        }
        return idpuse.delete("idp" + message.guild.id);
    }
};
