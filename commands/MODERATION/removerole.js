const { MessageEmbed, Collection } = require("discord.js"),
    db = new Collection(),
    name = "removerole";

module.exports = {
    name: "removerole",
    aliases: ["-role", "rrole", "rr"],
    description: "Assigns Mentioned Role To The Members",
    category: "MODERATION",
    usage: "removerole",
    userPermissions: ["MANAGE_ROLES"],
    botPermissions: ["EMBED_LINKS", "MANAGE_ROLES"],

    async run(client, message, args) {
        const inprogress = db.get(name + message.guild.id);

        if (inprogress === true) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.fail}| Command is already in use in thi guild please wait until the last command is completed or its timeout is over!`,
                        color: client.embed.cf
                    })
                ]
            });
        }

        if (!args[0])
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.embed.cm)
                        .addField(name, `\`${name} <Role> <User(s)>\``, true)
                        .addField(name + " all", `\`${name} <Role> all\``, true)
                        .addField(name + " bots", `\`${name} <Role> bots\``, true)
                        .addField(name + " humans", `\`${name} <Role> humans\``, true)
                        .setFooter({ text: "Aliases : -role , rrole , rr" })
                ]
            });

        let count = 0;

        const role = message.mentions.roles.first() ||
            message.guild.roles.cache.get(args[0]);

        if (!role)
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.embed.cf)
                        .setDescription(client.emoji.fail + "| Cannot find [" + args[0] + "] role in this guild")
                ]
            });

        if (message.guild.me.roles.highest.position <= role.position)
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        color: client.embed.cf,
                        description: client.emoji.fail + `| My Role isn't High Enough to Assign The Role! ${role.name}`
                    })]
            });
        if (!client.config.bowner.includes(message.author.id)) {
            if (message.member !== message.guild.owner) {
                if (message.member.roles.highest.position <= role.position)
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor(client.embed.cf)
                                .setDescription(
                                    `${client.emoji.fail}| Your Role isn't High Enough to Assign The Role! ${role.name}`
                                )
                        ]
                    });
            }
        }
        await message.guild.members.fetch().catch(() => null);
        if (!args[1]) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.embed.cf)
                        .setDescription("Mention `<user(s)>` or type `<bots | humans | all>`")
                ]
            });
        } else if (args[1] === "bots") {
            db.set(name + message.guild.id, true);
            await message.guild.members.cache
                .forEach(member => {
                    if (member.roles.cache.has(role.id) && member.user.bot) {
                        member.roles.remove(role, message.author.tag) && count++;
                    }
                });
            message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.embed.cr)
                        .setDescription(
                            `${client.emoji.success}| Removing \`${role.name}\` from ${count} Bots.\nYou'll be informed when process is done`
                        )
                        .setFooter({ text: "Speed is 1 user/second" })
                ]
            });
            setTimeout(function () {
                message.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(client.embed.cr)
                            .setDescription(client.emoji.success + `| Removed \`${role.name}\` from ${count} Bots.`)
                    ]
                });
                count = 0;
                db.delete(name + message.guild.id);
            }, count + "000");
        } else if (args[1] === `humans`) {
            db.set(name + message.guild.id, true);
            await message.guild.members.cache
                .forEach(member => {
                    if (member.roles.cache.get(role.id) && !member.user.bot) {
                        member.roles.remove(role, message.author.tag) && count++;
                    }
                });
            message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.embed.cr)
                        .setDescription(
                            client.emoji.success + `| Removing \`${role.name}\` from ${count} Humans.\nYou'll be informed when process is done`
                        )
                        .setFooter("Speed is 1 user/second")
                ]
            });
            setTimeout(function () {
                message.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(client.embed.cr)
                            .setDescription(client.emoji.success + `| Removed \`${role.name}\` from ${count} Humans.`)
                    ]
                });
                count = 0;
                db.delete(name + message.guild.id);
            }, count + "000");
        } else if (args[1] === `all`) {
            db.set(name + message.guild.id, true);
            message.guild.members.cache.forEach(member => {
                if (member.roles.cache.get(role.id)) {
                    member.roles.remove(role, message.author.tag) && count++;
                }
            });
            message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.embed.cr)
                        .setDescription(
                            client.emoji.success + `| Removing \`${role.name}\` from ${count} Members.\nYou'll be informed when the process is done`
                        )
                        .setFooter("Speed is 1 user/second")
                ]
            });
            setTimeout(function () {
                message.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(client.embed.cr)
                            .setDescription(client.emoji.success + `| Removed \`${role.name}\` from ${count} members.`)
                    ]
                });
                count = 0;
                db.delete(name + message.guild.id);
            }, count + "000");
        } else {
            const user = message.mentions.members.first();
            if (!user) {
                return message.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(client.embed.cm)
                            .addField(name, `\`${name} <Role> <User(s)>\``, true)
                            .addField(name + " all", `\`${name} <Role> all\``, true)
                            .addField(name + " bots", `\`${name} <Role> bots\``, true)
                            .addField(name + " humans", `\`${name} <Role> humans\``, true)
                            .setFooter({ text: "Aliases : role+ , addrole , role" })
                    ]
                });
            }
            db.set(name + message.guild.id, true);
            message.mentions.members.forEach(member => {
                if (member.roles.cache.get(role.id)) {
                    member.roles.remove(role, message.author.tag) && count++;
                }
            });
            message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.embed.cr)
                        .setDescription(`${client.emoji.success}| Removed \`${role.name}\` from ${args.splice(1).join(", ")}`)
                ]
            });
            count = 0;
            db.delete(name + message.guild.id);
        }
    }
};
