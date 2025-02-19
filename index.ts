import OpenAI from "openai";
import { NewMessageEvent } from "telegram/events";
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { NewMessage } from "telegram/events";
import input from "input";
import dotenv from "dotenv";

dotenv.config();
const stringSession = new StringSession(process.env.TELEGRAM_SESSION || "");

const userMessages = {};

(async () => {
    console.log("Starting self-bot...");
    const client = new TelegramClient(stringSession, Number(process.env.APP_ID), process.env.API_HASH!, {
        connectionRetries: 5,
    });

    const clientAi = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    await client.start({
        phoneNumber: async () => await input.text("Enter your phone number:"),
        password: async () => await input.text("Enter your password (if set):"),
        phoneCode: async () => await input.text("Enter the verification code:"),
        onError: (err) => console.log("Login error:", err),
    });

    client.addEventHandler(async (event: NewMessageEvent) => {
        try {
            const message = event.message;

            if (event.isPrivate) {
                const sender = await message.getSender();

                if (!sender) {
                    console.error("Sender is undefined.");
                    return;
                }
                const senderId = Number(sender?.id);

                if (!userMessages[senderId]) {
                    userMessages[senderId] = [];
                }

                userMessages[senderId].push(message.text);

                const params: OpenAI.Chat.ChatCompletionCreateParams = {
                    messages: [{ role: "system", content: "You are assistant"}, { role: "user", content: message.text }],
                    model: "gpt-4o",
                };
                const chatCompletion: OpenAI.Chat.ChatCompletion = await clientAi.chat.completions.create(params);

                await client.sendMessage(sender, {
                    message: chatCompletion.choices[0].message.content as string,
                });

                console.log(userMessages);
            }
        } catch (err) {
            console.error("Error handling message:", err);
        }
    }, new NewMessage());

    console.log("Bot is listening for messages...");
})();
