import OpenAI from 'openai';
import 'dotenv/config';

// setup using Npm
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
  });

  const response = await client.responses.create({
    model: 'gpt-4o-mini',
    //instructions: 'You are a coding assistant that talks like a pirate',
    input: 'Joke related to indain meme',
  });

  console.log(response.output_text);
