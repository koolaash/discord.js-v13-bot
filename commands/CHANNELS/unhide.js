const discord = require("discord.js");

module.exports = {
    name: "unhide",
    description: "Unhides The Mentioned Channels for [everyone | @role | @user]",
    category: "CHANNELS",
    usage: 'unhide [@role | @user]',
    userPermissions: ["MANAGE_ROLES", "MANAGE_CHANNELS", "EMBED_LINKS"],
    botPermissions: ["MANAGE_ROLES", "EMBED_LINKS"],

    async run(client, message, args) {

        if (args[0]) {
            const item = message.mentions.members.first() ||
                message.guild.members.cache.get(args[0]) ||
                message.mentions.roles.first() ||
                message.guild.roles.cache.get(args[0])

            if (!item) {
                try {
                    item = await message.guild.members.fetch(args[0])
                } catch (e) {
                    return message.reply({
                        embeds: [
                            new discord.MessageEmbed({
                                description: client.emoji.fail + "| Cant find any user or role revelent to " + args[0],
                                color: client.color.cf
                            })
                        ]
                    })
                }
            }

            if (!item) {
                return message.reply({
                    embeds: [
                        new discord.MessageEmbed()
                            .setDescription(
                                client.emoji.fail + "| Cannot Find This User Or Role"
                            )
                            .setColor(client.embed.cf)
                    ]
                })
            }
            const nembed = new discord.MessageEmbed()
                .setDescription(
                    client.emoji.success + "| <#" +
                    message.channel +
                    "> Is Now Visible For Targated Role Or User`.!"
                )
                .setColor(client.embed.cr)
            return (
                message.channel.permissionOverwrites.edit(item, {
                    VIEW_CHANNEL: true
                }, message.author.tag) &&
                message.reply({ embeds: [nembed] })
            );

        } else {
            const embed = new discord.MessageEmbed()
                .setDescription(
                    client.emoji.success + "| <#" +
                    message.channel +
                    "> Is Now Visible For Everyone.!"
                )
                .setColor(client.embed.cr)
            return (
                message.channel.permissionOverwrites.edit(
                    message.channel.guild.roles.everyone,
                    {
                        VIEW_CHANNEL: true
                    },
                    message.author.tag
                ) && message.reply({ embeds: [embed] })
            );
        }
    }
};