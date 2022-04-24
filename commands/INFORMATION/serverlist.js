const Discord = require("discord.js");
const ownerid = ["672027578181353473"];
const ownerid2 = ["672027578181353473"];
module.exports = {

    name: "serverlist",
    aliases: ["slt"],
    category: "owner",
    description: "Displays the list of servers the bot is in!",
    usage: " ",
    accessableby: "Owner",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    run: async(client, message, args) => {
        let bot = client;
        if (message.author.id == ownerid || ownerid2) {


            let i0 = 0;
            let i1 = 10;
            let page = 1;

            let description =
                `Total Servers - ${bot.guilds.cache.size}\n\n` +
                bot.guilds.cache
                .sort((a, b) => b.memberCount - a.memberCount)
                .map(r => r)
                .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
                .slice(0, 10)
                .join("\n");

            let embed = new Discord.MessageEmbed()
                .setAuthor({
                    name: message.author.tag,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                })
                .setColor(bot.embed.cm)
                .setFooter({ text: bot.user.username })
                .setTitle(`Page - ${page}/${Math.ceil(bot.guilds.cache.size / 10)}`)
                .setDescription(description);

            let msg = await message.channel.send({
                embeds: [embed]
            });

            await msg.react("⬅");
            await msg.react("➡");
            await msg.react("❌");

            let collector = msg.createReactionCollector(
                (reaction, user) => user.id === message.author.id
            );

            collector.on("collect", async(reaction, user) => {
                if (reaction._emoji.name === "⬅") {
                    // Updates variables
                    i0 = i0 - 10;
                    i1 = i1 - 10;
                    page = page - 1;

                    // if there is no guild to display, delete the message
                    if (i0 + 1 < 0) {
                        console.log(i0)
                        return msg.delete();
                    }
                    if (!i0 || !i1) {
                        return msg.delete();
                    }

                    description =
                        `Total Servers - ${bot.guilds.cache.size}\n\n` +
                        bot.guilds.cache
                        .sort((a, b) => b.memberCount - a.memberCount)
                        .map(r => r)
                        .map(
                            (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members`
                        )
                        .slice(i0, i1)
                        .join("\n");

                    // Update the embed with new informations
                    embed
                        .setTitle(
                            `Page - ${page}/${Math.round(bot.guilds.cache.size / 10 + 1)}`
                        )
                        .setDescription(description);

                    // Edit the message
                    msg.edit({
                        embeds: [embed]
                    });
                }

                if (reaction._emoji.name === "➡") {
                    // Updates variables
                    i0 = i0 + 10;
                    i1 = i1 + 10;
                    page = page + 1;

                    // if there is no guild to display, delete the message
                    if (i1 > bot.guilds.cache.size + 10) {
                        return msg.delete();
                    }
                    if (!i0 || !i1) {
                        return msg.delete();
                    }

                    description =
                        `Total Servers - ${bot.guilds.cache.size}\n\n` +
                        bot.guilds.cache
                        .sort((a, b) => b.memberCount - a.memberCount)
                        .map(r => r)
                        .map(
                            (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members`
                        )
                        .slice(i0, i1)
                        .join("\n");

                    // Update the embed with new informations
                    embed
                        .setTitle(
                            `Page - ${page}/${Math.round(bot.guilds.cache.size / 10 + 1)}`
                        )
                        .setDescription(description);

                    // Edit the message
                    msg.edit({
                        embeds: [embed]
                    });
                }

                if (reaction._emoji.name === "❌") {
                    return msg.delete();
                }

                // Remove the reaction when the user react to the message
                await reaction.users.remove(message.author.id);
            });
        } else {
            return;
        }
    }
};