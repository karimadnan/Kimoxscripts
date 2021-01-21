const { checkScript, emoji } = require("../functions");
module.exports = {
    name: 'updatesc',
    description: 'Update a script!',
    execute(msg, para) {
        const channel = msg.guild.channels.cache.find(ch => ch.name == 'testing');
        const toMention = msg.guild.roles.cache.find(r => r.name == para[0])
        if (!msg.member.hasPermission("ADMINISTRATOR")) return;
        if (msg.channel.name !== 'admin') {
            msg.delete()
                .then(msg => msg.author.send(`Your message was deleted, this type of commands are only allowed in admin channel`))
                .catch(console.error);
            return;
        }
        if (para[0] == ``) return msg.channel.send(`Wrong command formate ex(!updatesc scriptname)`);
        if (!checkScript(para[0])) return msg.channel.send(`Script name is not valid.`);

        if (toMention) {
            channel.send(`<@&${toMention.id}> script was updated :arrow_up:, ask me for files if you want to update :eyes:`);
            msg.channel.send(`Broadcasted changes for ${para[0]} script.`)
        }
    },
};