const discord = require('discord.js');

module.exports.run = async(client) => {
    console.log(`[APPLICATION] => ${client.user.tag} IS READY TO BE USED\n${client.guilds.cache.size} = SERVERS!`.yellow)

    let m = Math.floor(Math.random() * (99999999 - 11741741 + 1)) + 11741741;
    client.mer = m;
    client.were.send({ content: `\`\`\`diff\n-${m}\n\`\`\`\n-${client.user.tag}\`\`\`` })

    // client.guilds.cache.forEach(guild => {
    //     if (guild.id !== client.config.server_id) {
    //         return guild.leave();
    //     }
    // })
}