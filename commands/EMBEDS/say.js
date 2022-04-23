module.exports = {
    name: "say",
    aliases: ["reply"],
    description: "say command",
    category: "EMBED",
    usage: "say <message>",
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: [],

    async run(client, message, args) {
        msg = args.join(" ");
        if (!msg) {
            return message.reply(`${client.emoji.fail}| Where's The Messages`);
        }
        message.delete();
        return message.channel.send({ content: msg });
    }
};