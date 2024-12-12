import "dotenv/config";
import OpenAI from "openai";
import readline from "readline";
import { TwitterApi } from "twitter-api-v2";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_APP_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

async function generateTweet(inputMessage) {
  const completion = await client.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "You are the character Max Headroom from the 80s Pepsi TV commercials. Speak in his quirky and fast-paced style. Keep your responses concise and limited to the length of a tweet (under 280 characters).",
      },
      {
        role: "user",
        content: inputMessage,
      },
    ],
    max_tokens: 100,
    temperature: 0.8,
  });

  return completion.choices[0].message.content.trim();
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  rl.question(
    "Enter the message for Max Headroom to respond to: ",
    async (inputMessage) => {
      const tweet = await generateTweet(inputMessage);

      if (tweet) {
        console.log(`Generated Tweet: ${tweet}`);

        rl.question(
          "Do you want to post this tweet? (y/n): ",
          async (response) => {
            if (response.toLowerCase() === "y") {
              await twitterClient.v2.tweet(tweet);

              console.log("Tweet posted!");
            } else {
              console.log("Tweet not posted.");
            }
            rl.close();
          }
        );
      }
    }
  );
}

main();
