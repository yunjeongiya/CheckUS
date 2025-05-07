# CheckUS Discord Bot

A Discord bot for the CheckUS project.

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   DISCORD_TOKEN=your_discord_bot_token_here
   CLIENT_ID=your_discord_application_id_here
   GUILD_ID=your_discord_server_id_here
   ```

## Discord Developer Portal Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to the "Bot" tab and click "Add Bot"
4. Under the TOKEN section, click "Reset Token" and copy your token to the `.env` file
5. Enable the following Privileged Gateway Intents:
   - SERVER MEMBERS INTENT
   - MESSAGE CONTENT INTENT
6. Go to the "OAuth2" tab, then "URL Generator"
7. Select the following scopes:
   - bot
   - applications.commands
8. Select the following bot permissions:
   - Send Messages
   - Embed Links
   - Read Messages/View Channels
   - Use Slash Commands
9. Copy the generated URL and use it to invite the bot to your server

## Register Commands

To register slash commands with Discord:

```
node deploy-commands.js
```

## Run the Bot

To start the bot:

```
npm start
```

For development with auto-restart:

```
npm run dev
```

## Available Commands

- `/ping`: Check the bot's latency 