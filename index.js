require("dotenv").config();

const { Client, GatewayIntentBits} = require("discord.js");
const handleReady = require("./handlers/ready");
const command = require("./command/command");

const client = new Client({
  intents: Object.values(GatewayIntentBits).reduce((a, b) => a | b),
  
});

client.on("ready", () => handleReady(client));
client.on("interactionCreate", interaction => command(interaction));

client.login(process.env.BOT_TOKEN);