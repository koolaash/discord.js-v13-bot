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

        if (message.guild.region === "india") message.guild.region = "ð®ð³ India";
        if (message.guild.region === "brazil") message.guild.region = "ð§ð· Brazil";
        if (message.guild.region === "japan") message.guild.region = "ð¯ðµ Japan";
        if (message.guild.region === "russia") message.guild.region = "ð·ðº Russia";
        if (message.guild.region === "europe") message.guild.region = "ðªðº Europe";
        if (message.guild.region === "sydney") message.guild.region = "ð¦ðº Sydney";
        if (message.guild.region === "singapore") message.guild.region = "ð¸ð¬ Singapore";
        if (message.guild.region === "hongkong") message.guild.region = "ð­ð° Hong Kong";
        if (message.guild.region === "southafrica") message.guild.region = "ð¿ð¦ South Africa";
        if (message.guild.region === "us-east") message.guild.region = "ðºð¸ US East";
        if (message.guild.region === "us-west") message.guild.region = "ðºð¸ US West";
        if (message.guild.region === "us-central") message.guild.region = "ðºð¸US Central";
        if (message.guild.region === "us-south") message.guild.region = "ðºð¸ US South";

        let embed = new discord.MessageEmbed()
            .setTitle(`ABOUT ${message.guild.name}`)
            .addField(`${client.emoji.ar}| OWNER`, `â${message.guild.owner}`)
            .addField(`${client.emoji.ar}| SERVER ID`, `â${message.guild.id}`)
            //     .addField(client.emoji.ar + "| REGION", `â${message.guild.region}`)
            .addField(`${client.emoji.ar}| TOTAL MEMBERS`, `â${message.guild.memberCount}`)
            .addField(`${client.emoji.ar}| TOTAL CHANNELS`, `â${message.guild.channels.cache.size}`)
            .addField(`${client.emoji.ar}| TOTAL ROLES`, `â${message.guild.roles.cache.size}`)
            .addField(`${client.emoji.ar}| TOTAL EMOJI`, `â${message.guild.emojis.cache.size}`)
            .addField(
                `${client.emoji.ar}| SERVER CREATED AT`,
                `â<t:${Math.round(message.guild.createdAt / 1000)}:R>`
            )
            .addField(
                `${client.emoji.ar}| SERVER BOOST`,
                `â${message.guild.premiumSubscriptionCount}`
            )
            .addField(`${client.emoji.ar}| BOOST LEVEL`, `â${boostlevel}`)
            .addField(`${client.emoji.ar}| Security`, `â${message.guild.verificationLevel}`)
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
            .setColor(client.embed.cm)
            .setFooter({
                text: message.author.tag,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            });
        return message.reply({ embeds: [embed] });
    }
};
