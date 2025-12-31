import express from "express";
import "dotenv/config";

//Browsers security માટે restrict કરે છે requests, જો frontend અને backend different origin / port હોય.
// Example:
// Frontend: http://localhost:3000
// Backend: http://localhost:5000
// Without CORS → browser request block કરી દે છે.
import cors from "cors";

const app = express();
const PORT = 8000;

//Convert JSON data in req.body
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});


// setup of User Prompt or question send to openai APi as content: req.body.message 
//   and recive respone  as choices[0].message.content 
app.post("/test", async (req, res) => {
  const options = {
    method: "POST", // We are sending data to OpenAI, so method is POST
    headers: {
      "Content-Type": "application/json", // Tell the server we're sending JSON
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      // The body of the request must be a JSON string
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user", // Role can be 'user', 'assistant', or 'system'
          content: req.body.message  // The actual message content from the user
        }
      ]
    })
  };

  try {
    // Make the request to OpenAI API and wait for the response
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );

    // Convert the response to JSON
    // This is necessary because fetch returns a Response object, not JSON directly
    const data = await response.json();

    console.log(data.choices[0].message.content);
    res.send(data.choices[0].message.content); // data.choices[0].message.content - replay from OpenAI

  } catch (err) {
    console.log(err);
  }
});
