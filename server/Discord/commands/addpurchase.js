const { checkScript, emoji } = require("../functions");
module.exports = {
    name: 'addpurchase',
    cooldown: 1,
    description: 'add a script to user!',
    execute(msg, para) {
        let toAdd = msg.guild.roles.cache.find(r => r.name == para[1]);
        const user = msg.mentions.members.first();
        const channel = msg.guild.channels.cache.find(ch => ch.name == 'broadcasts');
        const randomEmoji = [`:star_struck:`, `:partying_face:`, `:heart_eyes:`, `:sunglasses:`]
        const randomMsg = [`Happy botting`, `Let the grinding start!`, `Time to bot`, `Don't forget your imbues`]
        if (!msg.member.hasPermission("ADMINISTRATOR")) return;
        if (msg.channel.name !== 'admin') {
            msg.delete()
                .then(msg => msg.author.send(`Your message was deleted, this type of commands are only allowed in admin channel`))
                .catch(console.error);
            return;
        }
        if (para.length < 2) return msg.channel.send(`Wrong command formate ex(!addpurchase user scriptname)`);
        if (!user) return msg.channel.send(`User was not found.`);
        if (!msg.guild.roles.cache.find(r => r.name === para[1])) return msg.channel.send(`Script name is not valid.`);
        if (user._roles.find(r => r == toAdd.id)) return msg.channel.send(`User already own this script.`)

        if (channel) {
            channel.send(`${user} just purchased \`${para[1]}\` script, ${randomMsg[Math.floor(Math.random() * randomMsg.length)]} ${randomEmoji[Math.floor(Math.random() * randomEmoji.length)]}.`);
        }
        user.roles.add(toAdd.id)
        user.send(`Hey ${user} thanks for your purchase :star_struck:, Your script is now available for download at our discord server just use type (!script ${para[1]}) in general channel to get the files, or use (!scripts) to see a list of all scritps you own :wink:.`)
        msg.channel.send(`${para[1]} scrript was added to ${user} collection.`)
    },
};