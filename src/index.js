const client = require("./discord");
const error = require("./events/utils/error");
const deployCommands = require("./handlers/deployCommands");
const handleCommands = require("./handlers/commandHandler");
const handleEvents = require("./handlers/eventHandler");

error(client);
deployCommands(client);
handleCommands(client);
handleEvents(client);
