// 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
const dotenv = require('dotenv');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');



const { Configuration, OpenAIApi } = require("openai");


const configuration = new Configuration({
    organization: "org-55SkxDWcZjnMS2kl82JZSIbG",
    apiKey: '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',
});

const openai = new OpenAIApi(configuration);
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(cors());


const port = 5000;

app.get('/', (req, res) => {
    res.send('Welcome to Chat GPT')
});

app.post('/', async (req, res) => {

    try {
        const message = req.body.message;

        console.log(message);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${message}`,
            max_tokens: 100,
            temperature: 0.8,
        });

        res.json({
            status: "success",
            code: 200,
            message: response.data.choices[0].text
        })

    } catch (error) {
        res.json({
            status: "failed",
            code: 500,
            message: error.message
        })
    }
});


app.listen(port, () => {
    console.log('listening on port 5000 || http://localhost:5000');
});