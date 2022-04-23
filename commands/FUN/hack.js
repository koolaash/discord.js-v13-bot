const ms = module.require("ms"),
    { MessageEmbed } = require('discord.js');

module.exports = {
    name: "hack",
    category: 'FUN',
    description: "Hack anyone just for fun",
    usage: "hack <@user>",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {
        if (!args[0]) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.fail}| Woah.... Slow Down!! Who are we hacking..??`,
                        color: client.embed.cf
                    })
                ]
            });
        }
        const tohack = message.mentions.members.first();
        if (!tohack) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.fail}| Mention the user to hack..??`,
                        color: client.embed.cf
                    })
                ]
            });
        }
        if (tohack.user.bot) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.fail}| Mention the user to hack.. Not my bot fellas!!`,
                        color: client.embed.cf
                    })
                ]
            });
        }
        if (tohack.user.id === message.author.id) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.fail}| Mention the user to hack.. Not yourself!!`,
                        color: client.embed.cf
                    })
                ]
            });
        }
        if (client.config.bowner.includes(tohack.user.id)) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.fail}| Cant hack my owner..!!`,
                        color: client.embed.cf
                    })
                ]
            });
        }
        let msg = await message.channel.send(
            `\`\`\`\n⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜\n\`\`\`\`\`\`diff\n- Hacking into the accounts of ${tohack.user.tag}....\`\`\``
        );

        let time = "1s";
        setTimeout(function () {
            msg.edit(`\`\`\`\n⬛⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜\n\`\`\`\`\`\`diff\n- Finding ${tohack.user.tag} 's Email and Password.....\`\`\``);
        }, ms(time));

        let time1 = "6s";
        setTimeout(function () {
            msg.edit(`\`\`\`\n⬛⬛⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜\n\`\`\`\n\`\`\`diff\n- E-Mail: ${tohack.user.tag}@gmail.com \n- Password: ********\`\`\``);
        }, ms(time1));

        let time2 = "9s";
        setTimeout(function () {
            msg.edit(`\`\`\`\n⬛⬛⬛⬛⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜\n\`\`\`\n\`\`\`diff\n- Finding Other Accounts.....\n\`\`\``);
        }, ms(time2));

        let time3 = "15s";
        setTimeout(function () {
            msg.edit(`\`\`\`\n⬛⬛⬛⬛⬛⬛⬛⬜⬜⬜⬜⬜⬜⬜\n\`\`\`\n\`\`\`diff\n- Hacking into Epic games and tencent game account.....\`\`\``);
        }, ms(time3));

        let time4 = "21s";
        setTimeout(function () {
            msg.edit(`\`\`\`\n⬛⬛⬛⬛⬛⬛⬛⬛⬜⬜⬜⬜⬜⬜\n\`\`\`\n\`\`\`diff\n- Hacking into discord account searching dm's.....\n\`\`\``);
        }, ms(time4));

        let time5 = "28s";
        setTimeout(function () {
            msg.edit(`\`\`\`\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬜⬜⬜⬜⬜\n\`\`\`\n\`\`\`diff\n- All details from dm's collected.....\n\`\`\``);
        }, ms(time5));

        let time6 = "31s";
        setTimeout(function () {
            msg.edit(`\`\`\`\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬜⬜⬜⬜\n\`\`\`\n\`\`\`diff\n- Looking for browser history and cookies.....\n\`\`\``);
        }, ms(time6));

        let time7 = "38s";
        setTimeout(function () {
            msg.edit(`\`\`\`\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬜⬜⬜\n\`\`\`\n\`\`\`diff\n- Browser historey states watching gay/lesbian pron....\n\`\`\``);
        }, ms(time7));

        let time8 = "44s";
        setTimeout(function () {
            msg.edit(`\`\`\`\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬜\n\`\`\`\n\`\`\`diff\n- Last purchase was dildo and vibrator monsted dildo.....\`\`\``);
        }, ms(time8));

        let time9 = "50s";
        setTimeout(function () {
            msg.edit(
                `\`\`\`\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n\`\`\`\n\`\`\`diff\n- Hacked all data of ${tohack.user.tag} and sent to ${message.author.tag} Dm's.....\n\`\`\``
            );
        }, ms(time9));
    },
};