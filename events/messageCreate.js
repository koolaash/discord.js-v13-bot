const Discord = require("discord.js"),
    { MessageEmbed, MessageActionRow, MessageButton, Collection, Permissions } = require("discord.js"),
    db = require("quick.db"),
    discord = require("discord.js"),
    Timeout = new Collection(),
    ms = require("ms");

module.exports.run = async (client, message) => {
    if (message.author.bot || !message.guild) return;
    let dis = db.get(`disabeled${message.channel.id}`),
        prefixModel = client.prefixModel,
        prefixData = await prefixModel.findOne({
            GuildID: message.guild.id,
        }).catch(err => console.log(err))

    if (prefixData) {
        var prefix = prefixData.Prefix
    } else if (!prefixData) {
        prefix = client.config.prefix
    }

    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
        let mention = new MessageEmbed({
            description:
                `Hey, Marvel here!\n\nPrefix for this server is \`${prefix}\`\n\nIf you have any problem regarding bot join : \n[discord.gg/marvel](${client.config.bserver})`,
            color: client.embed.cm
        })
        let p1 = ["SEND_MESSAGES", "EMBED_LINKS"]
        if (!message.guild.me.permissionsIn(message.channel).has(p1)) {
            return message.author.send({
                embeds: [
                    new MessageEmbed({
                        description: `I need \`${p1.join(", ")}\` permissions in **\`${message.guild.name}\`**`,
                        color: client.embed.cf,
                        thumbnail: message.guild.iconURL({ dynamic: true })
                    })
                ]
            }).catch(() => null)
        }
        return message.reply({ embeds: [mention] })
            .then(m => setTimeout(() => m.delete().catch(() => null), 10000));
    }

    // For user with prefix  
    // normal users
    const marvelMention = new RegExp(`^<@!?${client.user.id}>`),
        marvel = message.content.match(marvelMention) ? message.content.match(marvelMention)[0] : prefix;

    if (message.content.startsWith(marvel)) {
        try {
            const modOnly = db.get("modOnly" + message.guild.id);
            if (!message.member)
                message.member = await message.guild.fetchMember(message);
            let m = message.content.toLowerCase(),
                args = message.content.slice(marvel.length).trim().split(/ +/g),
                arg = m.slice(marvel.length).trim().split(/ +/g),
                cmd = args.shift().toLowerCase();
            if (cmd.length === 0) return;
            let command = client.commands.get(cmd);
            if (!command) command = client.commands.get(client.aliases.get(cmd));
            if (command) {
                if (dis === true) {
                    return message.reply({ content: "My commands in this channel are disabeled!" })
                        .then((m) => setTimeout(() => m.delete().catch(() => null), 2500));
                }

                let p1 = ["SEND_MESSAGES", "EMBED_LINKS"]
                if (!message.guild.me.permissionsIn(message.channel).has(p1)) {
                    return message.author.send({
                        embeds: [
                            new MessageEmbed({
                                description: `I need \`${p1.join(", ")}\` permissions in ${message.guild.name}`,
                                color: client.embed.cf,
                                thumbnail: message.guild.iconURL({ dynamic: true })
                            })
                        ]
                    }).catch(() => null)
                }

                if (!command.er) {
                    var milliseconds = client.time;
                    var millisecondsInDay = 8.64e7;
                    var futureDate = new Date(milliseconds + 28 * millisecondsInDay);
                    var tit = Date.now();
                    if (futureDate - tit <= 0) {
                        return message.reply('Your subscription expired.\nhttps://discord.gg/djrPQaczPw')
                    }
                }

                let cooldown = 5000;
                if (Timeout.has(`cooldown${message.author.id}`)) {
                    return message.reply(
                        `You are on a \`${ms(
                            Timeout.get(`cooldown${message.author.id}`) - Date.now(),
                            { long: true }
                        )}\` cooldown.`
                    ).then((m) => setTimeout(() => m.delete().catch(() => null), 3000));
                }
                let r = false;
                if (!client.config.bowner.includes(message.member.id)) {
                    if (modOnly === true) {
                        if (!message.member.permissionsIn(message.channel).has(Permissions.FLAGS.ADMINISTRATOR)) {
                            return message.reply(
                                `${client.emoji.fail}| Bot is mod only in this guild that means you need \`ADMINISTRATOR\``
                            ).then((m) => setTimeout(() => m.delete().catch(() => null), 3000));
                        }
                    }
                    command.userPermissions.forEach((permission) => {
                        if (r === true) return;
                        if (!message.member.permissionsIn(message.channel).has(permission)) {
                            r = true;
                            return message.reply(
                                `${client.emoji.fail}| YOU NEED **\`${permission}\`** PERMISSION FIRST TO EXECUTE THIS COMMAND!!`
                            ).then((m) => setTimeout(() => m.delete().catch(() => null), 3000));
                        }
                    });
                }
                command.botPermissions.forEach((permission) => {
                    if (r === true) return;
                    if (!message.guild.me.permissionsIn(message.channel).has(permission)) {
                        r = true;
                        return message.reply(
                            `${client.emoji.fail}| I NEED **\`${permission}\`** PERMISSION FIRST TO EXECUTE THIS COMMAND!!`
                        ).then((m) => setTimeout(() => m.delete().catch(() => null), 3000));
                    }
                });
                if (r === false) {
                    try {
                        await command.run(client, message, args, arg) &&
                            Timeout.set(`cooldown${message.author.id}`, Date.now() + cooldown) &&
                            setTimeout(() => {
                                Timeout.delete(`cooldown${message.author.id}`);
                            }, cooldown);
                    } catch (e) {
                        return client.errweb.send(`\`\`\`js\nCOMMAND : ${command.name}\n${e.stack}\n\`\`\``);
                    }
                }
            }
        } catch (e) {
            return client.errweb.send(`\`\`\`js\nCOMMAND : ${command.name}\n${e.stack}\n\`\`\``);
        }
    }
}