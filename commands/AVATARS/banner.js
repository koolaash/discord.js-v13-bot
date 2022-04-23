const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js"),
    axios = require("axios");

module.exports = {
    name: "banner",
    description: "helps you get banner of any user",
    category: "AVATARS",
    usage: "banner [@user]",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    vote: true,

    run: async (client, message, args) => {
        if (!args[0]) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        color: client.embed.cf,
                        description:
                            `${client.emoji.fail}| Please mention a user or provide a user id first!`,
                    })
                ]
            });
        }
        let target =
            message.guild.members.cache.get(args[0]) ||
            message.mentions.members.first();

        if (!target || target === undefined) {
            target = await message.guild.members.fetch(args[0]).catch(() => null);
        }
        if (!target) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        color: client.embed.cf,
                        description:
                            `${client.emoji.fail}| Please provide valid a user first!`,
                    })
                ]
            });
        }
        const bannerUrl = await getUserBannerUrl(target.id, { size: 4096 });
        async function getUserBannerUrl(userId, { dynamicFormat = true, defaultFormat = "webp", size = 4096 } = {}) {

            // Supported image sizes, inspired by 'https://discord.js.org/#/docs/main/stable/typedef/ImageURLOptions'.
            if (![16, 32, 64, 128, 256, 512, 1024, 2048, 4096].includes(size)) {
                throw new Error(`The size '${size}' is not supported!`);
            }
            if (!["webp", "png", "jpg", "jpeg"].includes(defaultFormat)) {
                throw new Error(`The format '${defaultFormat}' is not supported as a default format!`);
            }
            const user = await client.api.users(userId).get();
            if (!user.banner) return null;
            const query = `?size=${size}`,
                baseUrl = `https://cdn.discordapp.com/banners/${userId}/${user.banner}`;
            if (dynamicFormat) {
                const { headers } = await axios.head(baseUrl);
                if (headers && headers.hasOwnProperty("content-type")) {
                    return baseUrl + (headers["content-type"] == "image/gif" ? ".gif" : `.${defaultFormat}`) + query;
                }
            }
            return baseUrl + `.${defaultFormat}` + query;
        }
        let embed = new MessageEmbed();
        if (bannerUrl) {
            embed.setImage(bannerUrl)
                .setDescription(
                    "[Download](" + bannerUrl + ")"
                );
        } else {
            embed.setImage(
                "https://media.discordapp.net/attachments/932678968170152077/953921336739246110/null-500x259.png"
            )
                .setDescription(
                    "[Download](https://media.discordapp.net/attachments/932678968170152077/953921336739246110/null-500x259.png)"
                );
        }
        embed.setTitle("Banner Of " + target.user.tag)
            .setColor(client.embed.cm)
            .setFooter({
                text: message.author.tag,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            });

        const next = new MessageButton()
            .setStyle("SUCCESS")
            .setEmoji(client.emoji.dm_id)
            .setLabel("|  HIDDEN")
            .setCustomId("banner_dm")
            .setDisabled(false);

        const back = new MessageButton()
            .setStyle("SUCCESS")
            .setEmoji(client.emoji.channel_id)
            .setLabel("|  PUBLIC")
            .setCustomId("banner_ch")
            .setDisabled(false);

        const row = new MessageActionRow()
            .addComponents(next, back);

        const ee = new MessageEmbed()
            .setDescription(
                "How do you want to see the banner!"
            )
            .setColor(client.embed.cr);

        let m = await message.channel.send({
            embeds: [ee],
            components: [row],
        }),
            collector = await m.createMessageComponentCollector({
                time: 10000,
            });

        collector.on("collect", async (button) => {
            if (button.user.id !== message.author.id) {
                return button.reply({ ephemeral: true, content: "This menu is not for you" })
            } else if (button.customId === "banner_dm") {
                button.reply({ ephemeral: true, embeds: [embed] });
            } else if (button.customId === "banner_ch") {
                return button.reply({ embeds: [embed] });
            }
        });
        collector.on("end", (_, reason) => {
            if (reason !== "messageDelete") {
                let disabledRow = new MessageActionRow()
                    .addComponents(
                        next.setDisabled(true),
                        back.setDisabled(true)
                    );
                return m.edit({ components: [disabledRow] })
            }
        })
    },
};
