const discord = require('discord.js');

module.exports.run = async (client) => {
    console.log(`[APPLICATION] => ${client.user.tag} IS READY TO BE USED`.yellow)

    let m = Math.floor(Math.random() * (99999999 - 11741741 + 1)) + 11741741;
    client.mer = m;
    client.were.send({ content: `\`\`\`diff\n-${m}\n-${client.user.tag}\`\`\`` })
}