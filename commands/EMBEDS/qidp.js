const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "quickidp",
    aliases: ["qidp"],
    description: "quickly embed your idp with default format",
    category: "EMBED",
    usage: "quickidp <message>",
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["EMBED_LINKS"],

    async run(client, message, args) {
        if (!args[0])
            return message.reply(client.emoji.fail + "| " + "Provide Room Id First")
                .then(m => setTimeout(() => m.delete(), 4500));
        if (!args[1])
            return message.reply(client.emoji.fail + "| " + "Provide Room Pass First")
                .then(m => setTimeout(() => m.delete(), 4500));

        const msg = "Room Id : " + args[0] + "\nPass : " + args[1],
            embed = new MessageEmbed()
                .setDescription(msg + "\n`Sit In Your Slot. Best Of Luck`")
                .setColor(client.embed.cm)
                .setTitle("New Room Join Fast")
                .setFooter({
                    text: "Shared By : " + message.author.tag,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                });
        return message.channel.send({ embeds: [embed] });
    }
};
