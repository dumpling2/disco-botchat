const openai = require("../config/openai");

async function command(interaction) {
    if (interaction.isChatInputCommand()){
        const { commandName } = interaction
        if (commandName === "chat"){
          interaction.deferReply();
            const chat = interaction.options.getString("質問");
            try {
                const completion = await openai.createCompletion({
                  model: "text-davinci-003",
                  prompt: `${chat}`,
                  max_tokens: 1024,
                  stop: null,
                  n: 1,
                  temperature: 0.5,
                });
                answer = completion.data.choices[0].text;
                if (answer === undefined) throw new Error();

                return await interaction.editReply("質問内容\n"+chat+answer)
                } catch (err) {
                    return err
                }   
        }
        if (commandName === "hello"){
            const source = {
                ja: (name) => `こんにちは、${name}さん。`,
                en: (name) => `Hello, ${name}!`
            }
            const name = interaction.member?.displayName ?? interaction.user.username;
            const lang = interaction.options.get("language");
            return interaction.reply(source[lang.value](name));
        }
    }
  }
  
  module.exports = command;