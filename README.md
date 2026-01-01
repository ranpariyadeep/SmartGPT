# SmartGPT
An AI-powered conversational assistant inspired by modern large language models, designed for natural language interaction.

 All Step by Step process of Devlopment

 (1) Install Dependency in Backend
    - express
    - nodemon
    - cors
    -dotenv

 (2) Model use - OpenAI - GPT-4o mini
    
    (A) Option 1:-
     - first use npm i openai , to install
     - and also copy some basic setup code from npm website 
     - save API key in env file, that call in server2.js 
      
    (B)Using OpenAI with API endpoint
     - install express and connect with app, and port binding
     - check app.listen work 
     - use OpenAi Chat Completions  (https://platform.openai.com/docs/api-reference/chat)

     - step :
        - Endpoint: POST /test
        - Purpose: Sends a message to OpenAI GPT-4o-mini model and returns 
        - response.
        - Key steps:
            - Prepare fetch options (method, headers, body).
            - Use await fetch() to call OpenAI API.
            - Convert response to JSON.
            - Log and send response back to client.
            - Handle errors with try/catch.
