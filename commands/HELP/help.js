const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");

module.exports = {
    name: "help",
    description: "show help menu",
    category: "HELP",
    usage: "help [page number | command name]",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    async run(client, message, args) {
        let damon = client.users.cache.get(client.config.damon_id),
            mer = args.join(" "),
            arg = mer.toLowerCase().split(/ +/g);

        const defprefix = `${client.config.prefix}`;

        let p = defprefix;

        if (!damon) {
            damon = await client.users.fetch('922796780071051304').catch(() => null);
        }

        let pages = 7,
            em0 = new MessageEmbed()
            .setTitle(`${client.user.username} Help Menu`)
            .setColor(client.embed.cm)
            .setImage(client.gif.cm)
            .setFooter({
                text: `Made with  by Damon 🖤#6667`,
                iconURL: damon.displayAvatarURL({ dynamic: true })
            })
            .setDescription(
                `• Prefix for this server is ${p}\n` +
                `• Total commands: ${client.config.commands}\n` +
                `• [Get Marvel](${client.config.binvite}) | [Support server](${client.config.bserver}) | [Vote Marvel](${client.commands.length})\n` +
                `• Type \`${p}help <command | module>\` for more info.`
            )
            .addField(
                "MAIN COMMANDS",
                "**" +
                client.emoji.extra + "Information\n" +
                client.emoji.channels + "Channels\n" +
                client.emoji.mod + "Mod\n" +
                client.emoji.tool + "Embed\n" +
                client.emoji.discord + "Server\n" +
                client.emoji.members + 'Fun\n' +
                client.emoji.servers + "Avatar**" +
                true
            )
            .setImage(client.gif.main),
            em1 = new MessageEmbed()
            .setColor(client.embed.cm)
            .setFooter({
                text: `${message.author.tag} : Page 1/${pages}`,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .addField(
                "INFORMATION" + "\n━━━━━━━━━━━━━━━━━",
                "`" +
                p +
                "invite` - bots invite & support\n`" +
                p +
                "ping ` - check the ping of the bot\n`" +
                p +
                "serverinfo` - get details about the server\n`" +
                p +
                "whois <@user/user_id>` - get details about any user\n`" +
                p +
                "stats` - get the stats of the bot\n`" +
                p +
                "roleinfo <@role>` - to check info of any role`" +
                +"\n**━━━━━━━━━━━━━━━━━**"
            )
            .addField(`${client.emoji.ar}NOTE :`, "<> [] - DO NOT INCLUDE THESE WHILE EXECUTING A COMMAND")
            .setImage(client.gif.useful),
            em2 = new MessageEmbed()
            .setColor(client.embed.cm)
            .setFooter({
                text: `${message.author.tag} : Page 2/${pages}`,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .addField(
                "CHANNELS" + "\n━━━━━━━━━━━━━━━━━",
                "`" +
                p +
                "hide or hide @user/@role` - hide the channel command is used in for any role or member\n`" +
                p +
                "unhide or unhide @user/@role` - unhide the channel for everyone command is used in\n`" +
                p +
                "lock or lock @user/@role` - hide the channel command is used in for any role or member\n`" +
                p +
                "unlock or unlock @user/@role` - hide the channel command is used in for any role or member\nYou Can Provide Id Also Instead Of Mention\n`" +
                "\n**━━━━━━━━━━━━━━━━━**"
            )
            .addField(`${client.emoji.ar}NOTE :`, "<> [] - DO NOT INCLUDE THESE WHILE EXECUTING A COMMAND")
            .setImage(client.gif.channel),
            em3 = new MessageEmbed()
            .setColor(client.embed.cm)
            .setFooter({
                text: `${message.author.tag} : Page 3/${pages}`,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .addField(
                "MODERATION" + "\n━━━━━━━━━━━━━━━━━",
                "`" +
                p + "kick <user> [reason]` - to kick any user from the server\n`" +
                p + "ban <user> [reason]` - to ban any user from the server\n`" +
                p + "mute <user> <time> [reason]` - to mute any user in the server\n`" +
                p + "unmute <user> [reason]` - to unmute any user in the server\n`" +
                p + "addrole` - gives role to someone use command to know more usages\n`" +
                p + "removerole` - takes role from someone use command to know more usages\n`" +
                p + "mmode <on|off>` - to turn on or off the mantainance mode`\n" +
                p + "nick <user> <nickname>` - changes nickname of users\n`" +
                p + "purge <amount | user | bots | images>` - purge messages in a channel\n`" +
                p + "roleicon <@role> <emoji>` - to set the icon of any role\n`" +
                p + "steal <emoji>` - to add any emoji from other srver to yours" +
                "\n**━━━━━━━━━━━━━━━━━**"
            )
            .addField(`${client.emoji.ar}NOTE :`, "<> [] - DO NOT INCLUDE THESE WHILE EXECUTING A COMMAND")
            .setImage(client.gif.mod),
            em4 = new MessageEmbed()
            .setColor(client.embed.cm)
            .setFooter({
                text: `${message.author.tag} : Page 4/${pages}`,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            }).setImage(client.gif.embeds)
            .addField(
                "EMBED" + "\n━━━━━━━━━━━━━━━━━",
                "`" +
                p + "announce #channel <follow process>` - to announce something in embed with modefied way\n`" +
                p + "emb <message>` - to send quick embed in same channel\n`" +
                p + "idp #channel`- to announce something in embed with modefied way\n`" +
                p + "qidp [room-id] [room-pass]` - to send quick idp in message channel\n`" +
                p + "say <message>` - to send any message via bot in non embed form`" +
                "\n**━━━━━━━━━━━━━━━━━**"
            )
            .addField(`${client.emoji.ar}NOTE :`, "<> [] - DO NOT INCLUDE THESE WHILE EXECUTING A COMMAND"),
            em5 = new MessageEmbed()
            .setColor(client.embed.cm)
            .setFooter({
                text: `${message.author.tag} : Page 5/${pages}`,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .addField(
                "AVATAR" + "\n━━━━━━━━━━━━━━━━━",
                "`" +
                p +
                "avatar <@user>` - to get user main avatar\n`" +
                p +
                "avs <@user>` - to get user server avatar\n`" +
                p +
                "sav` - to get user server avatar\n`" +
                p +
                "banner <@user>` - to get user main banner" +
                "\n**━━━━━━━━━━━━━━━━━**"
            )
            .addField(`${client.emoji.ar}NOTE :`, "<> [] - DO NOT INCLUDE THESE WHILE EXECUTING A COMMAND")
            .setImage(client.gif.avatar),
            em6 = new MessageEmbed()
            .setColor(client.embed.cm)
            .setFooter({
                text: `${message.author.tag} : Page 6/${pages}`,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setImage(client.gif.fun)
            .addField("FUN" + "\n━━━━━━━━━━━━━━━━━",
                "`" +
                p + "8ball <text>` -  check your fortune for your question\n`" +
                p + "ascii <text>` - convert something into ascii\n`" +
                p + "emojify <text>` - convert some text into emojis\n`" +
                p + "fliptext <text>` - flip some text for fun\n`" +
                p + "hack @user` - hack someone you wants to\n`" +
                p + "howgay @user` - check how much of a gay they are\n**━━━━━━━━━━━━━━━━━**"
            )
            .addField(`${client.emoji.ar}NOTE :`, "<> [] - DO NOT INCLUDE THESE WHILE EXECUTING A COMMAND")

        if (arg[0]) {
            let command = client.commands.get(arg[0]);
            if (!command) command = client.commands.get(client.aliases.get(arg[0]));
            if (command) {
                let usg = command.usage,
                    des = command.description,
                    ali = command.aliases,
                    cat = command.category,
                    ali1,
                    usg1,
                    des1,
                    cat1;

                if (!usg || usg === null || usg === undefined) {
                    usg1 = "`None`";
                } else {
                    usg1 = "`" + p + usg + "`";
                }
                if (!des || des === null || des === undefined) {
                    des1 = "`None`";
                } else {
                    des1 = "`" + des + "`";
                }
                if (!ali || ali === null || ali === undefined) {
                    ali1 = "`None`";
                } else {
                    ali1 = "`" + ali + "`";
                }
                if (!cat || cat === null || cat === undefined) {
                    cat1 = "Uncategorized";
                } else {
                    cat1 = cat;
                }

                const hel = new MessageEmbed()
                    .setTitle(cat1.toUpperCase())
                    .setDescription(
                        "```diff\n- [] = optional argument!\n" +
                        "- <> = required argument!\n" +
                        "- | = means or like red or blue!\n" +
                        "- Do NOT type these when using commands!\n```\n> " +
                        des1
                    )
                    .addField("Aliases", ali1)
                    .addField("Usage", usg1)
                    .setColor(client.embed.cm);

                return message.reply({ embeds: [hel], allowedMentions: { repliedUser: false } })
            }
        }

        let options = [],
            startButton = new MessageButton()
            .setStyle("SUCCESS")
            .setEmoji(client.emoji.first_id)
            .setCustomId("help_home"),
            backButton = new MessageButton()
            .setStyle("PRIMARY")
            .setEmoji(client.emoji.back_id)
            .setCustomId('help_back'),
            forwardButton = new MessageButton()
            .setStyle("PRIMARY")
            .setEmoji(client.emoji.next_id)
            .setCustomId('help_forward'),
            endButton = new MessageButton()
            .setStyle("SUCCESS")
            .setEmoji(client.emoji.last_id)
            .setCustomId('help_end'),
            delButton = new MessageButton()
            .setStyle("DANGER")
            .setEmoji(client.emoji.cross_id)
            .setCustomId('help_del');

        const option0 = { label: 'Home', value: '0', emoji: client.emoji.ar_id },
            option1 = { label: 'Info', value: '1', emoji: client.emoji.extra_id },
            option2 = { label: 'Channels', value: '2', emoji: client.emoji.channels_id },
            option3 = { label: 'Mod', value: '3', emoji: client.emoji.mod_id },
            option4 = { label: 'Embed', value: '4', emoji: client.emoji.servers_id },
            option5 = { label: 'Avatars', value: '5', emoji: client.emoji.discord_id },
            option6 = { label: 'Fun', value: '6', emoji: client.emoji.ping_id }

        options.push(
            option0, option1, option2, option3, option4,
            option5, option6
        );

        let menu = new MessageSelectMenu()
            .setPlaceholder('Select Command Category')
            .setCustomId('pagMenu')
            .addOptions(options)
            .setMaxValues(1)
            .setMinValues(1),
            allButtons = [
                startButton.setDisabled(true),
                backButton.setDisabled(true),
                forwardButton.setDisabled(false),
                endButton.setDisabled(false),
                delButton.setDisabled(false)
            ],
            group1 = new MessageActionRow().addComponents(menu),
            group2 = new MessageActionRow().addComponents(allButtons),
            helpMessage = await message.reply({
                embeds: [em0],
                components: [group1, group2],
                allowedMentions: { repliedUser: false }
            }),
            collector = helpMessage.createMessageComponentCollector({ time: 90000 }),
            embeds = [
                em0, em1, em2, em3, em4, em5, em6
            ]

        for (let i = 0; i < 0; i++) embeds.push(new MessageEmbed().setColor(client.embed.cm).setFooter(i))

        let currentPage = 0

        collector.on('collect', async(b) => {
            if (b.user.id !== message.author.id) {
                let emm = new MessageEmbed({
                    description: client.emoji.fail + client.error.menu,
                    color: client.embed.cf
                })
                return b.reply({ ephemeral: true, embeds: [emm] })
            }
            collector.resetTimer();
            switch (b.customId) {
                case "help_home":
                    currentPage = 0
                    group2 = new MessageActionRow()
                        .addComponents([
                            startButton.setDisabled(true),
                            backButton.setDisabled(true),
                            forwardButton.setDisabled(false),
                            endButton.setDisabled(false),
                            delButton.setDisabled(false)
                        ])
                    b.update({ embeds: [embeds[currentPage]], components: [group1, group2], })
                    break;
                case 'help_back':
                    --currentPage;
                    if (currentPage === 0) {
                        group2 = new MessageActionRow()
                            .addComponents([
                                startButton.setDisabled(true),
                                backButton.setDisabled(true),
                                forwardButton.setDisabled(false),
                                endButton.setDisabled(false),
                                delButton.setDisabled(false)
                            ])
                    } else {
                        group2 = new MessageActionRow()
                            .addComponents([
                                startButton.setDisabled(false),
                                backButton.setDisabled(false),
                                forwardButton.setDisabled(false),
                                endButton.setDisabled(false),
                                delButton.setDisabled(false)
                            ])
                    }
                    b.update({ embeds: [embeds[currentPage]], components: [group1, group2] })
                    break;
                case 'help_forward':
                    currentPage++;
                    if (currentPage === embeds.length - 1) {
                        group2 = new MessageActionRow()
                            .addComponents([
                                startButton.setDisabled(false),
                                backButton.setDisabled(false),
                                forwardButton.setDisabled(true),
                                endButton.setDisabled(true),
                                delButton.setDisabled(false)
                            ])
                    } else {
                        group2 = new MessageActionRow()
                            .addComponents([
                                startButton.setDisabled(false),
                                backButton.setDisabled(false),
                                forwardButton.setDisabled(false),
                                endButton.setDisabled(false),
                                delButton.setDisabled(false)
                            ])
                    }
                    b.update({ embeds: [embeds[currentPage]], components: [group1, group2] })
                    break;
                case 'help_end':
                    currentPage = embeds.length - 1;
                    group2 = new MessageActionRow().addComponents([
                        startButton.setDisabled(false),
                        backButton.setDisabled(false),
                        forwardButton.setDisabled(true),
                        endButton.setDisabled(true),
                        delButton.setDisabled(false)
                    ])
                    b.update({ embeds: [embeds[currentPage]], components: [group1, group2] })
                    break;
                case 'pagMenu':
                    currentPage = parseInt(b.values[0])
                    if (currentPage === 0) {
                        group2 = new MessageActionRow()
                            .addComponents([
                                startButton.setDisabled(true),
                                backButton.setDisabled(true),
                                forwardButton.setDisabled(false),
                                endButton.setDisabled(false),
                                delButton.setDisabled(false)
                            ])
                    } else if (currentPage === embeds.length - 1) {
                        group2 = new MessageActionRow()
                            .addComponents([
                                startButton.setDisabled(false),
                                backButton.setDisabled(false),
                                forwardButton.setDisabled(true),
                                endButton.setDisabled(true),
                                delButton.setDisabled(false)
                            ])
                    } else {
                        group2 = new MessageActionRow()
                            .addComponents([
                                startButton.setDisabled(false),
                                backButton.setDisabled(false),
                                forwardButton.setDisabled(false),
                                endButton.setDisabled(false),
                                delButton.setDisabled(false)
                            ])
                    }
                    b.update({ embeds: [embeds[currentPage]], components: [group1, group2] })
                    break;
                case 'help_del':
                    helpMessage.delete();
                    break;
                default:
                    currentPage = 0
                    b.update({ embeds: [embeds[currentPage]], components: null })
                    break;
            }
        });
        collector.on("end", (_, reason) => {
            if (reason !== "messageDelete") {
                let dis = new MessageActionRow()
                    .addComponents([
                        startButton.setDisabled(true),
                        backButton.setDisabled(true),
                        forwardButton.setDisabled(true),
                        endButton.setDisabled(true),
                        delButton.setDisabled(true)
                    ]),
                    dis2 = new MessageActionRow()
                    .addComponents(menu.setDisabled(true));
                helpMessage.edit({
                    components: [dis2, dis]
                })
            }
        });
        collector.on('error', (e) => console.log(e));
    }
};