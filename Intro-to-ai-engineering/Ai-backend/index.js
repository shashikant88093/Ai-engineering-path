import { checkEnvironment } from "./utils.js";

import OpenAI from "openai";

checkEnvironment()


const openai = new OpenAI({
    apiKey: process.env.AI_KEY,
    baseURL: process.env.AI_URL,
    dangerouslyAllowBrowser: true
})

const inputText = document.getElementById("inputText")
const viewData = document.getElementById("viewData")
const apiCall = document.getElementById("apiCall")

apiCall.addEventListener("click",async()=>{
    console.log(inputText.value.trim())
    const prompt = inputText.value.trim()
    if(!prompt) return
    try {
    const response = await openai.chat.completions.create({
        model: process.env.AI_MODEL,
        "messages": [
            {
                'role': "user",
                content: inputText.value.trim()
            }
        ],
        // max_completion_tokens:256
    })

    console.log(response, "response")                                                                                                                                                                                   
} catch (err) {
    console.log(err, "error")
}
})





