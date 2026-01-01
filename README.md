# SmartGPT
An AI-powered conversational assistant inspired by modern large language models, designed for natural language interaction.

 All Step by Step process of Devlopment

 (1) Install Dependency in Backend
    - express
    - nodemon
    - cors
    -dotenv

 (2) Model use - OpenAI - GPT-4o mini   
    (A)Option 1
     - first use npm i openai , to install
     - and also copy some basic setup code from npm website 
     - save API key in env file, that call in server2.js 
      
    (B)Using OpenAI with API endpoint
     - install express and connect with app, and port binding
     - check app.listen work 
     - use OpenAi Chat Completions  (https://platform.openai.com/docs/api-reference/chat)


(3) Now we Create Models for define Schema
   - install mongoos
   - Thread.js for MessageSchema & ThreadSchema 

(4)Now We Create Util folder for core logic
   - Create getOpenAiAPIResponse function in openai.js, that conect with OpenAi send user message and return response of OpenAi.

(5) we create new Database in Atlas  and connect with our project in server.js in function connectBD.

(6) Now we create all Routes in chat.js
  - GET /thread.  for frontend , to show all histroy of all chat 
  - GET /thread/:threadId  any specific Chat's all messages
  - DELETE /thread/:threadId yo delete any specific Chat
  - POST /chat.      for send new messages
