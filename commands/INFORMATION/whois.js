const discord = require("discord.js"),
    moment = require("moment");

module.exports = {
    name: "userinfo",
    aliases: ["whois"],
    description: "All the details about any user",
    category: "INFORMATION",
    usage: "userinfo [@user]",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    async run(client, message, args) {
        let inline = true,
            member =
                message.mentions.members.first() ||
                message.guild.members.cache.get(args[0]) ||
                message.member,
            bot = 'No'

        if (member.user.bot === true) {
            bot = "Yes";
        }

        let embed = new discord.MessageEmbed()
            .setTitle(`About ${member.user.username}`)
            .setFooter({
                text: message.author.tag,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setThumbnail(
                member.user.displayAvatarURL({ dynamic: true })
            )
            .setColor(client.embed.cm)
            .addField(
                `${client.emoji.ar}| Full Username`, "```" + `${member.user.tag}` + "```", inline, true
            )
            .addField(
                `${client.emoji.ar}| ID`, member.user.id, inline, true
            )
            .addField(
                `${client.emoji.ar}| Nickname`,
                `${member.nickname !== null ? `${member.nickname}` : "None"}`, inline, true
            )
            .addField(
                `${client.emoji.ar}| Bot`, `${bot}`, inline, true
            )
            .addField(
                `${client.emoji.ar}| Joined Server At`,
                `<t:${Math.round(moment.utc(member.joinedAt) / 1000)}:R>`, inline, true
            )
            .addField(
                `${client.emoji.ar}| Joined Discord At`,
                `<t:${Math.round(member.user.createdAt / 1000)}:R>`, inline, true
            )
            .addField(
                `${client.emoji.ar}| Roles`,
                member.roles.cache.map(roles => `${roles}`).join(', '), true
            );
        return message.reply({ embeds: [embed] });
    }
};