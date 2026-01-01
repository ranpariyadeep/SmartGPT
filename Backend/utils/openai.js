import "dotenv/config";

const getOpenAiAPIResponse = async(message) => {
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
          content: message  // The actual message content from the user
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

    
    return data.choices[0].message.content; // data.choices[0].message.content - replay from OpenAI

  } catch (err) {
    console.log(err);
  }
}

export default getOpenAiAPIResponse;