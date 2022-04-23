const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
    name: "server-avatar",
    aliases: ["sav"],
    description: "helps you get avatar of any user",
    category: "AVATARS",
    usage: "avatar [@user]",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    async run(client, message, args) {
        let avatar = message.guild.iconURL({ dynamic: true, size: 2048 }),
            av = new MessageEmbed()
                .setTitle(
                    "Avatar Of " + message.guild.name
                )
                .setDescription(
                    `[Download](${avatar})`
                )
                .setImage(`${avatar}`)
                .setColor(client.embed.cm)
                .setFooter({
                    text: message.author.tag,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                });
        const next = new MessageButton()
            .setStyle("SUCCESS")
            .setEmoji(client.emoji.dm_id)
            .setLabel("|  HIDDEN")
            .setCustomId("dm")
            .setDisabled(false);

        const back = new MessageButton()
            .setStyle("SUCCESS")
            .setEmoji(client.emoji.channel_id)
            .setLabel("|  PUBLIC")
            .setCustomId("channel")
            .setDisabled(false);

        const row = new MessageActionRow()
            .addComponents(next, back);

        const embed = new MessageEmbed()
            .setDescription(
                "How do you want to see the avatar!"
            )
            .setColor(client.embed.cr)

        let m = await message.reply({ embeds: [embed], components: [row] }),
            collector = await m.createMessageComponentCollector({
                time: 10000
            });

        collector.on("collect", async (button) => {
            if (button.user.id !== message.author.id) {
                return button.reply({ ephemeral: true, content: "This menu is not for you" })
            } else if (button.customId === "dm") {
                button.reply({ ephemeral: true, embeds: [av] })
            } else if (button.customId === "channel") {
                return button.reply({ embeds: [av] })
            }
        })
        collector.on("end", (_, reason) => {
            if (reason !== "messageDelete") {
                let disabledRow = new MessageActionRow().addComponents(
                    next.setDisabled(true),
                    back.setDisabled(true)
                );
                return m.edit({ components: [disabledRow] })
            }
        })
    },
};
