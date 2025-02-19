# Telegram Self-Bot with OpenAI
A Telegram self-bot powered by GPT-4o that automatically responds to private messages using OpenAI.

## Features
- Automatically responds to private messages  
- Uses GPT-4o for intelligent conversations  
- Secure authentication using Telegram's API  
- Stores message history per user  

## Setup & Installation

### 1. Clone the Repository
```sh
git clone https://github.com/yourusername/telegram-selfbot.git
cd telegram-selfbot
```
### 2. Install Dependencies
```sh
npm install
```

### Fill a .env File
Create a `.env` file in the project root and add the following environment variables:
```sh
TELEGRAM_SESSION=your_telegram_session_string
APP_ID=your_telegram_app_id
API_HASH=your_telegram_api_hash
OPENAI_API_KEY=your_openai_api_key
```
How to get these values?
- Get your `APP_ID` and `API_HASH` from my.telegram.org
- Generate a `TELEGRAM_SESSION` using telegram.sessions.StringSession
- Get an `OPENAI_API_KEY` from OpenAI

### Running the Bot
To start the bot, run:

```sh
npx tsx index.ts
```

### First-Time Setup
On the first, the bot will ask for:
- Your **phone number** (linked to your Telegram account)
- Your **Telegram login code** (sent via Telegram)
- Your **Telegram password** (if 2FA is enabled)

Once logged in, the bot will start listening for private messages and responding automatically.

### How It Works

1. The bot listens for **new private messages**.
2. It stores **message history per user**.
3. It sends user messages to **OpenAI's GPT-4o**.
4. The AI-generated response is **sent back to the user**.


