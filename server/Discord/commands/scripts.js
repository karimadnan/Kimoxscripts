const Discord = require('discord.js');
const { client } = require("../../Discord");
module.exports = {
    name: 'scripts',
    cooldown: 10,
    description: 'List of scripts owned!',
    execute(msg, args) {
        let rolemap = msg.member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(r => r.name != '@everyone' ? `${r.name}` : undefined)
        if (rolemap.length > 1024) rolemap = "To many roles to display";
        if (rolemap.length == 1) rolemap = "You don't own any scripts yet!";
        const embed = new Discord.MessageEmbed()
            .setTitle('Scripts you currently own:')
            .setColor(0xffff00)
            .setDescription('To download a script simply ask me with !script name')
            .addField("Scripts:", rolemap, true)
        msg.channel.send(embed);
    },
};