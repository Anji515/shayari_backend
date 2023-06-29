const express = require('express');
const app = express();
require("dotenv").config()
const cors = require("cors")
app.use(cors())
const { Configuration, OpenAIApi } = require('openai');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Replace with your OpenAI API key

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get('/generate', async (req, res) => {
  const keyword = req.query.keyword;
  const category = req.query.category;
  console.log(category)
  console.log(keyword)
  let Prompt ='';

  if (category=='shayari') {
      Prompt = `Write a Shayari about ${keyword}\n\nOutput:`
    }
    else if(category=='joke'){
    Prompt = `Tell a joke about ${keyword}\n\nOutput:`;
  }

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt:Prompt,
    temperature: 0.5,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0.8,
    presence_penalty: 0,
  });
  console.log(response.data)

  res.send(response.data.choices[0]?.text.trim());
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server connected on ${port}`);
});

