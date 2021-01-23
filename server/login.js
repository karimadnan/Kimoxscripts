const ObjectId = require('mongodb').ObjectID;
const DB = require('./Mongo');
const jwToken = require('./Jwt');
const bcrypt = require('bcryptjs');
const Validator = require('./validation');
const Joi = require('joi');
const { client } = require("./Discord");
const signup = Joi.object({
    Name: Joi.string().min(3).max(15).required(),
    Password: Joi.string().min(8).max(20).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,21}$/, 'must contain uppercase lowercase and number').required(),
    Email: Joi.string().email().required(),
})

const loginAPI = {
    login: async function (req, res) {
        if (!req.query.Email || !req.query.Password) {
            return res.status(400).send({ message: 'Missing fields' });
        }
        const collection = DB.dbo.collection('users');
        var doc = await collection.findOne({ Email: req.query.Email }).catch(err => {
            console.log("Error At Login ")
            console.log("Error =>", err)
            res.status(500).send({ message: 'server error' });
            return err;
        });
        if (!doc) {
            return res.status(404).send({ message: 'Email not found.' });
        }
        console.log("Found the following records");
        bcrypt.compare(req.query.Password, doc.Password, function (err, match) {
            if (err) return res.status(500).send({ message: 'failed password' });
            if (!match) return res.status(400).send({ message: 'Wrong password' });
            var payload = {
                userId: doc._id,
                name: doc.Name,
                access: doc.Access
            }
            const accessToken = jwToken.issueShortLivingToken(payload);
            const response = {};
            response._token = accessToken;
            response.Access = doc.Access;
            response.Name = doc.Name;
            return res.status(200).send({ message: 'success', data: response });

        })

    },
    // signup: function (req, res, next) {
    //     var body = req.body;
    //     const { error } = signup.validate(body);
    //     if (!error) {
    //         const collection = DB.dbo.collection('users');
    //         body.createdAt = Date.now();
    //         body.Access = 1;
    //         bcrypt.genSalt(10, function (err, salt) {
    //             bcrypt.hash(body.Password, salt, function (err, hash) {
    //                 if (err) {
    //                     console.log(err)
    //                     return res.status(500).send(err);
    //                 }
    //                 body.Password = hash;
    //                 collection.insertOne(body, (err, result) => {
    //                     if (err) {
    //                         console.log('create User Error =>', err)
    //                         return res.status(400).send({ message: 'User with same data exists' });
    //                     }
    //                     res.status(200).send({ message: 'User Created' });
    //                 });
    //             });
    //         });
    //     } else {
    //         console.log('signup validation', err)
    //         return res.status(400).send(err);
    //     };
    // },
    checkScript: async function (req, res, next) {
        const collection = DB.dbo.collection('scripts.files');
        const collection2 = DB.dbo.collection('scripts.chunks');
        if (!req.query.Script) {
            return res.status(400).send({ message: 'Missing script name.' });
        }
        let script;
        try {
            script = await collection.findOne(
                { filename: req.query.Script }
            );
        }
        catch (err) {
            return res.status(500).send({ message: 'Error finding script' });
        }
        if (!script) {
            res.status(200).send({ message: 'No script was found, Creating permission role and uploading script.' });
            if (!client.guilds.cache.get('800400016295854140').roles.cache.find(r => r.name === req.query.Script)) {
                const guild = client.guilds.cache.get('800400016295854140');
                let cont = next();
                guild.roles.create({
                    data: {
                        name: req.query.Script.slice(0, -4),
                        color: `#${req.query.Color}`,
                    },
                    reason: `Permission role for ${req.query.Script.slice(0, -4)} script.`,
                })
                    .then(function (response) {
                        console.log("Permission role created, Upload started.")
                        cont
                    })
                    .catch(function (err) {
                        console.log(err, "Error creating new role.")
                    });
            }

        } else {
            try {
                await collection.deleteOne({ _id: new ObjectId(script._id) });
            } catch (err) {
                return res.status(500).send({ message: 'Error deleting script' });
            }
            try {
                await collection2.deleteMany({ files_id: new ObjectId(script._id) });
            } catch (err) {
                return res.status(500).send({ message: 'Error deleting chuncks' });
            }
            const guild = client.guilds.cache.get('800400016295854140');
            const channel = guild.channels.cache.find(c => c.name === 'broadcasts');
            const role = guild.roles.cache.find(r => r.name === req.query.Script.slice(0, -4))
            if (channel) {
                channel.send(`<@&${role.id}> was updated :arrow_up:, Ask bot for files to update to the newest version :robot:!`)
            }
            res.status(200).send({ message: 'Script Updated!' });
            next();
        }
    },
    insertScript: async function (req, res) {
        const collection = DB.dbo.collection('products');
        try {
            await collection.updateOne(
                { name: req.body.scriptDName, bot: req.body.scriptBot, voc: req.body.scriptVoc },
                { $set: { name: req.body.scriptDName, price: req.body.scriptPrice, type: req.body.scriptType, img: req.body.scriptDP, info: req.body.scriptInfo, setupImg: req.body.scriptSetup, bot: req.body.scriptBot, voc: req.body.scriptVoc, stats: req.body.scriptStats, vid: req.body.scriptVid } },
                { upsert: true }
            );
        }
        catch (err) {
            return res.status(500).send({ message: 'Error inserting script' });
        }
        const collection2 = DB.dbo.collection('otc_users');
        let table;
        try {
            table = await collection2.findOne(
                { scriptname: req.body.scriptDName }
            );
        }
        catch (err) {
        }
        if (!table && req.body.scriptBot === 'otc') {
            const collection = DB.dbo.collection('otc_users');
            collection.insert({ scriptname: req.body.scriptDName, users: [] })
        }
        return res.status(200).send({ message: 'Script Inserted' });
    },
    updateOtcUsers: async function (req, res) {
        const collection = DB.dbo.collection('otc_users');
        let payload;
        try {
            payload = await collection.findOne(
                { scriptname: req.body.scriptname }
            );
        }
        catch (err) {
            return res.status(500).send({ message: 'Error finding script.' });
        }
        if (!payload) {
            return res.status(404).send({ message: 'No script with that name was found.' });
        } else {
            try {
                await collection.updateOne(
                    { scriptname: req.body.scriptname },
                    { $set: { users: req.body.users } },
                    { upsert: false }
                );
            }
            catch (err) {
                return res.status(500).send({ message: 'Error updating script.' });
            }
            return res.status(200).send({ message: `Otc users updated for ${req.body.scriptname}.` });
        }
    },
    getOtcScripts: async function (req, res) {
        const collection = DB.dbo.collection('otc_users');
        collection.find().toArray(function (err, docs) {
            if (err) {
                return res.status(500).send({ message: 'DB Error', error: err });
            }
            if (!docs[0]) {
                return res.status(202).send({ message: 'No Data', data: [] });
            }
            return res.status(200).send({ message: 'Scripts', data: docs });
        });
    },
    authOtcUser: async function (req, res) {
        const collection = DB.dbo.collection('otc_users');
        let payload;
        try {
            payload = await collection.findOne(
                { _id: new ObjectId(req.query.id) }
            );
        }
        catch (err) {
            return res.status(500).send({ message: 'Error finding script.' });
        }
        if (payload) {
            const chars = payload.users
            if (chars.find(c => c === req.query.char)) {
                return res.status(200).send({ message: 'Authenticated successfully.' });
            } else {
                return res.status(400).send({ message: 'Failed to authenticate.' });
            }
        } else {
            return res.status(500).send({ message: 'Script was not found in database.' });
        }
    },
    test: function (req, res) {
        res.status(200).send({ message: 'test' })
    }
}

module.exports = loginAPI;