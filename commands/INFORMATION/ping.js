const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ["latency", "speed"],
    category: "INFORMATION",
    usage: "ping",
    description: "Returns latency and API ping",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {
        const blt = Date.now() - message.createdTimestamp,
            btn = new MessageButton()
                .setStyle("PRIMARY")
                .setLabel("Bot Latency")
                .setEmoji(client.emoji.ping_id)
                .setCustomId("bot_latency")
                .setDisabled(false),
            btn1 = new MessageButton()
                .setStyle("SUCCESS")
                .setLabel("Api Latency")
                .setEmoji(client.emoji.discord_id)
                .setCustomId("api_latency")
                .setDisabled(false),
            btn2 = new MessageButton()
                .setStyle("DANGER")
                .setEmoji(client.emoji.cross_id)
                .setCustomId("ping_delete")
                .setDisabled(false),
            row = new MessageActionRow()
                .addComponents(btn, btn1, btn2);

        let m = await message.reply({ content: "Pong | 🏓", components: [row] }),
            collector = m.createMessageComponentCollector({ time: 30000 });

        collector.on("collect", async (button) => {
            if (button.user.id !== message.author.id) {
                let emm = new MessageEmbed({
                    description: client.emoji.fail + client.error.menu,
                    color: client.embed.cf
                })
                return button.reply({ ephemeral: true, embeds: [emm] })
            }
            collector.resetTimer();
            if (button.customId === "bot_latency") {
                btn.setDisabled(true)
                const row1 = new MessageActionRow()
                    .addComponents(btn, btn1, btn2),
                    xyz = new MessageEmbed()
                        .setColor(client.embed.cm)
                        .setThumbnail(client.user.displayAvatarURL())
                        .addField("Latency", `\`${blt}ms\``)
                        .setFooter({
                            text: message.author.tag,
                            iconURL: message.author.displayAvatarURL({ dynamic: true })
                        });
                button.update({
                    embeds: [xyz],
                    components: [row1]
                });
            } else if (button.customId === "api_latency") {
                let abc = new MessageEmbed()
                    .setColor(client.embed.cm)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setFooter({
                        text: message.author.tag,
                        iconURL: message.author.displayAvatarURL({ dynamic: true })
                    })
                    .addField("API Latency", `\`${Math.round(client.ws.ping)}ms\``);
                btn1.setDisabled(true)
                const row2 = new MessageActionRow()
                    .addComponents(btn, btn1, btn2);
                button.update({
                    embeds: [abc],
                    components: [row2]
                });
            } else if (button.customId === "ping_delete") {
                button.message.delete();
            }
        });
        collector.on("end", (_, reason) => {
            if (reason !== "messageDelete") {
                let dis = new MessageActionRow()
                    .addComponents([
                        btn.setDisabled(true),
                        btn1.setDisabled(true),
                        btn2.setDisabled(true)
                    ])
                m.edit({
                    components: [dis]
                })
            }
        });
        collector.on('error', (e) => console.log(e));
    }
};
