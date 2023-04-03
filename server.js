const http = require('http');
const os =require('os');
const express = require('express');
require('dotenv').config()


const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);




const app = express();
const parser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

async function imgAI(prompt){
   let response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "256x256",
    });
    image_url = response.data.data[0].url;
    return image_url;
    
}

app.post("/submit",function(req,res){
   const prompt = req.body.textPrompt;
   console.log(prompt);
   (async () => {
      let data = await imgAI(prompt);
      console.log(data);
      let dataJson = await {
         'image_url' : data,
      };
      res.setHeader('Content-Type','application/json');
      res.status(200).json(dataJson);
   })();
   
});


app.listen(8000);
