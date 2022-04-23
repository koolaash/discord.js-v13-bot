const discord = require("discord.js"),
    moment = require("moment");

module.exports = {
    name: "roleinfo",
    aliases: ['ri'],
    description: "shows the information about a role of a guild",
    category: "INFORMATION",
    usage: "roleinfi @role/role_id",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    async run(client, message, args) {
        if (!args[0]) {
            return message.reply({
                embeds: [
                    new discord.MessageEmbed({
                        description: `${client.emoji.fail}| You forgot to provide the role!`,
                        color: client.embed.cf
                    })
                ]
            })
        }
        message.channel.sendTyping()
        await message.guild.members.fetch();
        let role = await message.mentions.roles.first() || await message.guild.roles.cache.get(args[0])
            || await message.guild.roles.cache.find(r => r.name === args.join(" "));

        if (!role) {
            return message.reply({
                embeds: [
                    new discord.MessageEmbed({
                        description: `${client.emoji.fail}| You forgot to provide the valid role!`,
                        color: client.embed.cf
                    })
                ]
            })
        }
        let mem = role.members.map(m => m);
        if (role.members.size > 50) {
            mem = `Members Size Exceeds The Value OF [50]`
        }

        const embed = new discord.MessageEmbed({
            color: role.hexColor || client.embed.cm,
            title: `${role.name}'s Information`,
            description: `**Role ID : **${role.id}\n` +
                `**Role Display Name : **${role.name}\n` +
                `**Role Mentionable : **${role.mentionable ? 'Yes' : 'No'}\n` +
                `**Role Color : **${role.hexColor || 'Default'}\n` +
                `**Role Display Saperately : **${role.hoist ? 'Yes' : 'No'}\n` +
                `**Role Position : **${role.position}\n` +
                `**Role Members : **${role.members.size || '0'}\n` +
                `**Role Is Integration : **${role.managed ? 'Yes' : 'No'}\n` +
                `**Role Deletable : **${role.editable ? 'Yes' : 'No'}\n` +
                `**Role Created : **<t:${Math.round(moment.utc(role.createdTimestamp) / 1000)}:R>\n` +
                `**Role Custom Icon : **${role.iconURL() ? `Yes\n**Role Icon : **[Download Here](${role.iconURL({ format: 'png' })})` : "No"}\n` +
                `**Role Permissions : **\n\`'${role.permissions.toArray().join("', '") || "None"}'\`\n` +
                `**Members : **\n${mem}`,
            footer: {
                text: message.author.tag,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            }
        })
            .setThumbnail(role.iconURL() || message.guild.iconURL({ dynamic: true }));
        return message.reply({ embeds: [embed] })
    }
};
