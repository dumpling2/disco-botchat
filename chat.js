require("dotenv").config();
 // コマンド設定部分
 const { SlashCommandBuilder } = require("discord.js");

 const chat = new SlashCommandBuilder()
    .setName('chat')
    .setDescription('chat-gptに質問します')
    .addStringOption(option =>
        option
            .setName('質問')
            .setDescription('内容を入力')
            .setRequired(true)
        );
 const hello = new SlashCommandBuilder()
    .setName('hello')
    .setDescription('挨拶をします。')
    .addStringOption(option =>
        option
            .setName('language')
            .setDescription('言語を指定します。')
            .setRequired(true) //trueで必須、falseで任意
            .addChoices(
              	{name:'Japanese', value:'ja'},
              	{name:'English', value:'en'}
            )
    );
 
 const commands = [chat, hello]
 
 //登録用関数
 const { REST, Routes } = require("discord.js")
 const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN)
 async function main(){
 	await rest.put(
		Routes.applicationCommands("1093484155968421928"),
		{ body: commands }
	)
 }
 
 main().catch(err => console.log(err))