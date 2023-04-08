require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: Object.values(GatewayIntentBits).reduce((a, b) => a | b)
});

client.on("ready", () => {
  console.log(`${client.user.tag} でログインしています。`);
});

client.on("messageCreate", async msg => {
  if (msg.content === "!ping") {
    msg.reply("Pong!");
  }
});

client.on("messageCreate", async msg => {
  if (msg.mentions.users.has(client.user.id)) {
    console.log(msg.content);
    const requestStr = (Str) => {
      return Str.substring(Str.indexOf(">")+ 1, Str.length);
    };
    const Str = requestStr(msg.content);
    console.log(Str);
    try {
      // メッセージをPromptに設定してAPIを叩く
      const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${Str}`,
        max_tokens: 1024,
        stop: null,
        n: 1,
        temperature: 0.5,
      });
      
      console.log(completion)

      if (completion.data.choices[0].text === undefined) throw new Error();
      
      // 結果をDiscordに送信
      await msg.reply(completion.data.choices[0].text);
    } catch (err) {
      console.log(err);
    };
  }
})


client.login(process.env.BOT_TOKEN);