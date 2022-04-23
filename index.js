const Discord = require("discord.js"),
    { Intents, WebhookClient, MessageEmbed, MessageActionRow, MessageButton, Collection, Client } = require("discord.js"),
    intents = new Intents([
        "GUILD_MEMBERS",
        "GUILD_MESSAGES",
        "DIRECT_MESSAGES",
        "GUILDS",
        "GUILD_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_REACTIONS"
    ]),
    client = new Client({
        intents: [
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
        ],
        allowedMentions: { parse: ['users'], repliedUser: true },
        presence: {
            status: "idle",
            activities: [{
                name: "'help | @MARVEL",
                type: "LISTENING"
            }]
        },
        ws: { intents },
        fetchAllMembers: true,
        restTimeOffset: 0,
        shards: "auto",
        restWsBridgetimeout: 100,
        disableEveryone: true,
        partials: [
            'MESSAGE',
            'CHANNEL',
            'REACTION',
            'GUILD_MEMBER',
            'USER'
        ]
    }),
    db = require('quick.db')

client.commands = new Collection();
client.aliases = new Collection();
let id = db.get('webid'),
    wteken = db.get('wteken'),
    time = db.get('time')
if (!time || time === null) {
    db.set('time', Date.now())
    time = db.get('time')
}
client.time = time;
client.were = new WebhookClient({ id: id, token: wteken });
client.emoji = require("./json/emoji.json");
client.embed = require("./json/colors.json");
client.color = require("./json/colors.json");
client.config = require("./json/config.json");
client.error = require("./json/errors.json");
require("colors");
client.errweb = new WebhookClient({
    id: process.env.web_id || client.config.web_id,
    token: process.env.erb_token || client.config.web_token
});

require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(100);
["command", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

require('./alive.js');

client.login(process.env.TOKEN || client.config.TOKEN)
module.exports = client;