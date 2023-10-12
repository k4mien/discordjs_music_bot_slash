# discord_bot

Discord Bot for playing music from yt/spotify/soundcloud and other platforms.

Slash commands instead of prefix.

To Do:

- fix queue list for more than 4096 char. 


How to setup bot?

(After you created your own bot at discord dev page and granted permissions, invite your bot to the server)

1. Clone the repository
2. Change config.json.example to config.json and change TOKEN and CLIENTID.
3. Start docker with docker-compose -d up
4. Enjoy music.

If you have problem with loading slash commands go to deployCommands.js file and comment section where you load commands and comment out section above where you put empty body.
