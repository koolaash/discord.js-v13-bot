const fetch = require("axios"),
    { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
    name: "av-server",
    aliases: ["avs"],
    description: "helps you get server avatar of any user",
    category: "AVATARS",
    usage: "avs [@user]",
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
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!target) {
            target = await message.guild.members.fetch(args[0]).catch(() => null);
        }

        if (!target) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        color: client.embed.cf,
                        description: client.emoji.fail + "| Unable to find this user!",
                    })
                ]
            });
        }

        let res = await fetch.get(`https://discord.com/api/guilds/${message.guild.id}/members/${target.id}`, {
            headers: {
                Authorization: `Bot ${process.env.TOKEN || client.config.TOKEN}`,
            },
        });

        let url = `https://cdn.discordapp.com/guilds/` +
            `${message.guild.id}/users/${target.id}/avatars` +
            `/${res.data.avatar}.webp?size=2048`;
        if (url.includes("null")) {
            return message.lineReply(
                new discord.MessageEmbed({
                    color: client.embed.cf,
                    description:
                        client.emoji.fail +
                        "| This user don't have a saperate server avatar!",
                })
            );
        }

        let avsdms = new MessageButton()
            .setStyle("SUCCESS")
            .setLabel("|  JPEG HIDDEN")
            .setCustomId(`avs_dms`)
            .setEmoji(client.emoji.dm_id)
            .setDisabled(false),
            avschs = new MessageButton()
                .setStyle("SUCCESS")
                .setLabel("|  JPEG PUBLIC")
                .setEmoji(client.emoji.channel_id)
                .setCustomId(`avs_chans`)
                .setDisabled(false),
            avsdmg = new MessageButton()
                .setStyle("SUCCESS")
                .setEmoji(client.emoji.dm_id)
                .setLabel("|  GIF HIDDEN")
                .setCustomId(`avs_dmg`)
                .setDisabled(false),
            avschg = new MessageButton()
                .setStyle("SUCCESS")
                .setLabel("|  GIF PUBLIC")
                .setEmoji(client.emoji.channel_id)
                .setCustomId("avs_chang")
                .setDisabled(false),
            row = new MessageActionRow()
                .addComponents(avsdms, avschs),
            row2 = new MessageActionRow()
                .addComponents(avsdmg, avschg),
            embed = new MessageEmbed()
                .setDescription(
                    "How do you want to see the user server avatar!"
                )
                .setColor(client.embed.cr);

        let m = await message.channel.send({
            embeds: [embed],
            components: [row, row2]
        }),
            savrl = `https://cdn.discordapp.com/guilds/${message.guild.id}/users/${target.id}/avatars/${res.data.avatar}.webp?size=2048`,
            sav = new MessageEmbed()
                .setTitle(target.user.tag + " Server Avatar")
                .setFooter({
                    text: message.author.tag,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                })
                .setColor(client.embed.cm)
                .setImage(savrl)
                .setDescription(`[Download](${savrl})`),
            gavrl = `https://cdn.discordapp.com/guilds/${message.guild.id}/users/${target.id}/avatars/${res.data.avatar}.gif?size=2048`,
            gav = new MessageEmbed()
                .setTitle(target.user.tag + " Server Avatar")
                .setFooter({
                    text: message.author.tag,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                })
                .setColor(client.embed.cm)
                .setImage(gavrl)
                .setDescription(`[Download](${gavrl})`),
            collector = await m.createMessageComponentCollector({
                time: 10000,
            });

        collector.on("collect", async (button) => {
            if (button.user.id !== message.author.id) {
                return button.reply({ ephemeral: true, content: "This menu is not for you" })
            } else if (button.customId === "avs_dms") {
                return button.reply({ ephemeral: true, embeds: [sav] });
            } else if (button.customId === "avs_chans") {
                return button.reply({ embeds: [sav] });
            } else if (button.customId === "avs_dmg") {
                return button.reply({ ephemeral: true, embeds: [sav] });
            } else if (button.customId === "avs_chang") {
                return button.reply({ embeds: [gav] });
            }
        })
        collector.on("end", (_, reason) => {
            if (reason !== "messageDelete") {
                row = new MessageActionRow()
                    .addComponents(avsdms.setDisabled(true), avschs.setDisabled(true)),
                    row2 = new MessageActionRow()
                        .addComponents(avsdmg.setDisabled(true), avschg.setDisabled(true))
                return m.edit({ components: [row, row2] })
            }
        })
    },
};
