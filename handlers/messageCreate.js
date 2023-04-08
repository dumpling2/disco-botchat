const openai = require("../config/openai");

async function handleMessageCreate(msg) {
  console.log(msg);
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${msg}`,
      max_tokens: 1024,
      stop: null,
      n: 1,
      temperature: 0.5,
    });

    console.log(completion.data.choices[0].text);
    const text = completion.data.choices[0].text
    if (text === undefined) throw new Error();
    return text;
  } catch (err) {

  }
}

module.exports = handleMessageCreate;
