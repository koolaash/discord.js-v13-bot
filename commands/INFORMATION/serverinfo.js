const discord = require("discord.js");

module.exports = {
    name: "serverinfo",
    aliases: ["server"],
    description: "All the details about server",
    category: "INFORMATION",
    usage: "serverinfo",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    async run(client, message, args) {
        let boostlevel = message.guild.premiumTier
        if (boostlevel === "0") {
            boostlevel = "None";
        }
        if (boostlevel === "1") {
            boostlevel = "Level 1 <a:boost:764236056697503805>";
        }
        if (boostlevel === "2") {
            boostlevel = "Level 2 <a:BOOST:952282055536967750>";
        }
        if (boostlevel === "3") {
            boostlevel = "Level 3 <a:VLG_boost:764235935952273438>";
        }

        if (message.guild.region === "india") message.guild.region = "🇮🇳 India";
        if (message.guild.region === "brazil") message.guild.region = "🇧🇷 Brazil";
        if (message.guild.region === "japan") message.guild.region = "🇯🇵 Japan";
        if (message.guild.region === "russia") message.guild.region = "🇷🇺 Russia";
        if (message.guild.region === "europe") message.guild.region = "🇪🇺 Europe";
        if (message.guild.region === "sydney") message.guild.region = "🇦🇺 Sydney";
        if (message.guild.region === "singapore") message.guild.region = "🇸🇬 Singapore";
        if (message.guild.region === "hongkong") message.guild.region = "🇭🇰 Hong Kong";
        if (message.guild.region === "southafrica") message.guild.region = "🇿🇦 South Africa";
        if (message.guild.region === "us-east") message.guild.region = "🇺🇸 US East";
        if (message.guild.region === "us-west") message.guild.region = "🇺🇸 US West";
        if (message.guild.region === "us-central") message.guild.region = "🇺🇸US Central";
        if (message.guild.region === "us-south") message.guild.region = "🇺🇸 US South";

        let embed = new discord.MessageEmbed()
            .setTitle(`ABOUT ${message.guild.name}`)
            .addField(`${client.emoji.ar}| OWNER`, `┕${message.guild.owner}`)
            .addField(`${client.emoji.ar}| SERVER ID`, `┕${message.guild.id}`)
            //     .addField(client.emoji.ar + "| REGION", `┕${message.guild.region}`)
            .addField(`${client.emoji.ar}| TOTAL MEMBERS`, `┕${message.guild.memberCount}`)
            .addField(`${client.emoji.ar}| TOTAL CHANNELS`, `┕${message.guild.channels.cache.size}`)
            .addField(`${client.emoji.ar}| TOTAL ROLES`, `┕${message.guild.roles.cache.size}`)
            .addField(`${client.emoji.ar}| TOTAL EMOJI`, `┕${message.guild.emojis.cache.size}`)
            .addField(
                `${client.emoji.ar}| SERVER CREATED AT`,
                `┕<t:${Math.round(message.guild.createdAt / 1000)}:R>`
            )
            .addField(
                `${client.emoji.ar}| SERVER BOOST`,
                `┕${message.guild.premiumSubscriptionCount}`
            )
            .addField(`${client.emoji.ar}| BOOST LEVEL`, `┕${boostlevel}`)
            .addField(`${client.emoji.ar}| Security`, `┕${message.guild.verificationLevel}`)
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
            .setColor(client.embed.cm)
            .setFooter({
                text: message.author.tag,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            });
        return message.reply({ embeds: [embed] });
    }
};
