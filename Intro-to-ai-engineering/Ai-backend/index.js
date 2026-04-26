import dotenv from "dotenv";
import express from "express";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.AI_KEY,
    baseURL: process.env.AI_URL, // optional (only if using proxy/azure)
});

// health check
app.get("/test", (req, res) => {
    res.send("I am Alive!");
});

// main API
app.post("/prompt", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const response = await openai.chat.completions.create({
            model: process.env.AI_MODEL || "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: message,
                },
            ],
            stream: true
        });
        // stream 
        for await (chunk of response) {
            console.log(JSON.stringify(chunk, null, 2))
        }
        const reply = response.choices[0]?.message?.content;

        res.json({
            success: true,
            reply,
        });

    } catch (err) {
        console.error("OpenAI Error:", err.message);

        res.status(500).json({
            error: err.message,
        });
    }
});

app.listen(4000, () => {
    console.log("Listening on port 4000");
});