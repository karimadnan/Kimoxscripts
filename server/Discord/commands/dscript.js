const { checkScript, emoji } = require("../functions");
var mongodb = require('mongodb');
var ddb = require('../../Mongo')
var fs = require('fs');

module.exports = {
    name: 'script',
    cooldown: 30,
    description: 'Download a script!',
    async execute(msg, para) {
        if (para[0] === '') return msg.channel.send(`You need to provide a script name, ${msg.author}!`);
        if (para.length > 1) return msg.channel.send(`Please provide only 1 script name at a time, ${msg.author}!`);

        if (msg.member.roles.cache.find(element => element.name == para)) {
            var bucket = new mongodb.GridFSBucket(ddb.dbo, {
                bucketName: 'scripts'
            });

            const collection = ddb.dbo.collection('scripts.files');
            let script;
            try {
                script = await collection.findOne({
                    filename: `${para}.rar`
                })
            }
            catch (err) {
                return msg.channel.send(`There was an error while trying to look for the script please contact @karimm#2447`);
            }
            if (script) {
                bucket.openDownloadStreamByName(`${para}.rar`).
                    pipe(fs.createWriteStream(`${para}.rar`)).
                    on('error', function (error) {
                        console.log(error, "Error downloading script")
                    }).
                    on('finish', async function () {
                        await msg.author.send("Here is your script :wink:.", {
                            files: [
                                `./${para}.rar`,
                            ]
                        });
                        msg.channel.send(`${msg.author}, ${para} script was sent to you in a private message.`)
                        fs.unlink(`./${para}.rar`, (err) => {
                            if (err) {
                                console.error(err)
                                return
                            }
                        })
                    });
            } else {
                msg.delete()
                    .then(msg => msg.author.send(`Script was not found in our database please contact @karimm#2447`))
                    .catch(console.error);
                return;
            }

        } else {
            msg.channel.send(`This script is not found in your purchase list, Use \`${`!scripts`}\` command to see your scripts list, ${msg.author}!`);
        }

    },
};