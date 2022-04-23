const Discord = require("discord.js");

module.exports = {
    name: "howgay",
    category: "FUN",
    description: "Sends a random image of a cat",
    usage: "howgay <@user>",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {
        let target = message.mentions.members.first();

        let rng = Math.floor(Math.random() * 101);

        const howgayembed = new Discord.MessageEmbed()
            .setTitle(`Gay Machine Calculator`)
            .setDescription(`${target.user.username} is ${rng}% Gay🌈`)
            .setColor(client.embed.cm);
        message.reply({ embeds: [howgayembed] });
    }
};