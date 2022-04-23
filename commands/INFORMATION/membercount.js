const discord = require("discord.js");

module.exports = {
    name: "membercount",
    aliases: ['members', 'mc', 'users', 'member-count'],
    description: "shows the total members of a guild",
    category: "INFORMATION",
    usage: "membercount",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    async run(client, message, args) {
        const embed = new discord.MessageEmbed({
            description: message.guild.memberCount,
            color: client.embed.cm,
            title: `Total Members`,
            timestamp: Date.now()
        })
        message.reply({ embeds: [embed] });
    }
};
