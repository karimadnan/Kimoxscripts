const express = require('express')
require('dotenv').config()
const fs = require('fs');
const app = express()
const normalizePort = (port) => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 4000);
const http = require("http");
const server = http.createServer(app);
const morgan = require("morgan");
const path = require("path");
var Routers = require('./server/Routes/routes');
var userRoutes = require('./server/Routes/userRoutes');
const cors = require('cors')
const url = process.env.MONGODB_URI;
const dbname = process.env.DBName;
const { prefix, token } = require('./server/Discord/config.json');
let DB = require('./server/Mongo');
const { Discord, client } = require('./server/Discord');
var bodyParser = require('body-parser');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./server/Discord/commands').filter(file => file.endsWith('.js'));
const cooldowns = new Discord.Collection();
const redirectSSL = require('redirect-ssl')
const compression = require('compression');

app.use(redirectSSL)
app.use(compression());
app.use(cors())
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "build")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 100000, limit: "50mb" }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.use('/', userRoutes)
app.use('/server', Routers);

//Discord Code
for (const file of commandFiles) {
  const command = require(`./server/Discord/commands/${file}`);
  client.commands.set(command.name, command);
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const now = Date.now();
  const timestamps = cooldowns.get(commandName);
  const command = client.commands.get(commandName);
  const commandsChannel = ['actions', 'admin']

  if (!message.content.startsWith(prefix) && !command && commandsChannel.find(s => s === message.channel.name) && !message.author.bot) {
    return message.delete()
      .then(msg => msg.author.send(`${msg.author}, Only commands are allowed in action channel, Please use general for chat.`))
      .catch(console.error);
  }

  if (message.content.startsWith(prefix) && !command && commandsChannel.find(s => s === message.channel.name)) {
    return message.delete()
      .then(msg => msg.author.send(`${msg.author}, This is not a valid command.`))
      .catch(console.error);
  }

  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (!client.commands.has(commandName)) return;

  const cooldownAmount = (command.cooldown) * 1000;
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.delete()
        .then(msg => msg.author.send(`${msg.author}, please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${commandName}\` command.`))
        .catch(console.error);
    }
  } else {
    try {
      if (message.channel.name === 'actions' || message.channel.name === 'admin') {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        command.execute(message, args);
      }
      else {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        message.delete()
          .then(msg => msg.channel.send(`${msg.author}, Commands are only allowed in \`${`actions`}\` channel.`))
          .catch(console.error);
      }
    } catch {

    }
  }
});

DB.connect(url, dbname).then(success => {
  console.log("Server Connected  ---!")
  server.listen(PORT);
  client.login(token);
}, err => {
  console.log('Failed To connect DB', err);
  process.exit(1);
})