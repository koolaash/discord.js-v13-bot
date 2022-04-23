const { MessageEmbed, version } = require('discord.js'),
    cpuStat = require('cpu-stat'),
    moment = require('moment');
bowner = "672027578181353473"
require('moment-duration-format'),
    ms = require("ms");

module.exports = {
    name: 'stats',
    description: 'Shows the bot information',
    category: "INFORMATION",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    aliases: ['about', 'ping', 'info'],

    run: async (client, message) => {
        cpuStat.usagePercent(async function (err, percent, seconds) {
            if (err) {
                return console.log(err);
            }
            const duration = moment
                .duration(message.client.uptime)
                .format(
                    ' D[ day(s)], H[ hour(s)], m[ minute(s)], s[ second(s)]'
                );
            let mem = process.memoryUsage(),
                ar = mem.heapUsed + mem.heapTotal + mem.external + mem.arrayBuffers + mem.rss;
            let memory = (ar / 1024 / 1024).toFixed(2) + ' mb';
            const embed = new MessageEmbed();
            embed.setColor(client.embed.cm)
                .setTitle(`${client.user.username} STATS`)
                .addField(
                    client.emoji.dev + "| DEVELOPER",
                    `[${client.config.owner_tag}](${client.config.owner_profile}) [<@!${bowner}>]`
                )
                .addFields(
                    {
                        name: client.emoji.uptime + '| Uptime',
                        value: `┕\`${duration}\``,
                        inline: true
                    },
                    {
                        name: client.emoji.mod + '| Memory',
                        value: `┕\`${memory}\``,
                        inline: true
                    },
                    {
                        name: client.emoji.channels + "| Channels",
                        value: `┕\`${client.channels.cache.size}\``,
                        inline: true
                    }
                )
                .addFields(
                    {
                        name: client.emoji.servers + '| Servers',
                        value: `┕\`${client.guilds.cache.size}\``,
                        inline: true
                    },
                    {
                        name: client.emoji.members + '| Users',
                        value: `┕\`${client.guilds.cache.reduce(
                            (p, n) => p + n.memberCount,
                            0)}\` Total\n` +
                            `┕\`${client.users.cache.size}\` Cached`,
                        inline: true
                    },
                    {
                        name: client.emoji.support + '| API Latency',
                        value: `┕\`${message.client.ws.ping}ms\``,
                        inline: true
                    }
                )
                .addFields(
                    {
                        name: client.emoji.bot + '| Version',
                        value: `┕\`v${require('../../package.json').version}\``,
                        inline: true
                    },
                    {
                        name: client.emoji.js + '| Discord.js',
                        value: `┕\`${version}\``,
                        inline: true
                    },
                    {
                        name: client.emoji.extra + '| Node',
                        value: `┕\`${process.version}\``,
                        inline: true
                    }
                )
            embed.setThumbnail(client.user.displayAvatarURL())
                .setFooter({
                    text: message.author.tag,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                });

            return message.channel.send({ embeds: [embed] });
        });
    }
};