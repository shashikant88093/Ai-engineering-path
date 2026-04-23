import { checkEnvironment } from "./utils.js";

import OpenAI from "openai";

checkEnvironment()


const openai = new OpenAI({
    apiKey: process.env.AI_KEY,
    // baseURL: process.env.AI_URL,
    dangerouslyAllowBrowser: true
})

const propmt = "Suggest some gifts for someone who loves hiphop music"

try {
    const response = await openai.chat.completions.create({
        model: process.env.AI_MODEL,
        "messages": [
            {
                'role': "user",
                content: propmt
            }
        ]
    })

    console.log(response, "response")
} catch (err) {
    console.log(err, "error")
}