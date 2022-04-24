const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
    name: "invite",
    aliases: ["support"],
    description: "shows the invite/support menu of bot",
    category: "INFORMATION",
    usage: "invite",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    async run(client, message, args) {
        let embed = new MessageEmbed()

        .setTitle(
                `${client.emoji.bot}| ${client.user.username}'s Invite | Support Menu`
            )
            .setDescription(
                `${client.emoji.ar}Join Our Discord Server For Any Kind Of Help`)

        .addField(
                `${client.emoji.invite}| Invite`,
                `[discord.gg/invite](${client.config.binvite})`
            )
            .addField(
                `${client.emoji.discord}| Support Server`,
                `[discord.gg/support](${client.config.bserver})`
            )
            .setThumbnail(client.user.displayAvatarURL())
            .setColor(000000)
            .setFooter({
                text: message.author.tag,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            }),
            btn1 = new MessageButton()
            .setStyle("LINK")
            .setLabel("|  SUPPORT")
            .setURL(client.config.bserver)
            .setEmoji(client.emoji.discord_id)
            .setDisabled(false),
            btn2 = new MessageButton()
            .setStyle("LINK")
            .setLabel("|  INVITE")
            .setURL(client.config.binvite)
            .setEmoji(client.emoji.invite_id)
            .setDisabled(false),
            btn3 = new MessageButton()
            .setStyle("LINK")
            .setLabel("|  WEBSITE")
            .setURL(client.config.bwebsite)
            .setEmoji(client.emoji.dm_id)
            .setDisabled(false),
            btn4 = new MessageButton()
            .setStyle("LINK")
            .setLabel("|  VOTE")
            .setURL(client.config.bvote)
            .setEmoji(client.emoji.discord_id)
            .setDisabled(false),
            row = new MessageActionRow()
            .addComponents(btn1, btn2, btn3, btn4);

        return message.reply({
            components: [row],
            embeds: [embed]
        });
    }
};