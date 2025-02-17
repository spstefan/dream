import * as dotenv from 'dotenv';
dotenv.config();

import {OpenAI} from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI,
});

import express from 'express';
import cors from 'cors';

const app = express ();
app.use(cors()); 
app.use(express.json());

app.post('/dream', async(req, res) => {

    try {
        const prompt = req.body.prompt;

        const aiResponse = await openai.images.generate({
            prompt,
            n: 1,
            size: '1024x1024'
        });

        const image = aiResponse.data[0].url;
        console.log('Generated image URL:', image); // Log the generated image URL
        res.send({image});
    } catch (error) {
        console.error(error)
        res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }
});

app.listen(8080, () => console.log('make art on http://localhost:8080/dream'));

