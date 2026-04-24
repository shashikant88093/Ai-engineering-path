import { checkEnvironment } from "./utils.js";

import OpenAI from "openai";

checkEnvironment()


async function start(){
console.log(process.env,".env file")
const openai = new OpenAI({
    apiKey: process.env.AI_KEY,
    baseURL: process.env.AI_URL,
    // dangerouslyAllowBrowser: true
})

const inputText = document.getElementById("inputText")
const viewData = document.getElementById("viewData")
const apiCall = document.getElementById("apiCall")

const propmt = inputText.trim()

try {
    const response = await openai.chat.completions.create({
        model: process.env.AI_MODEL,
        "messages": [
            {
                'role': "user",
                content: propmt
            }
        ],
        max_completion_tokens:256
    })

    console.log(response, "response")                                                                                                                                                                                   
} catch (err) {
    console.log(err, "error")
}

}