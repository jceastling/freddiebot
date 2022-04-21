const Discord = require("discord.js");
const InfiniteLoop = require('infinite-loop');

const {quotes, prefix, command, token} = require('./config.json');
const il = new InfiniteLoop;
const bot = new Discord.Client();

function randomQuote() {
	return quotes[Math.floor(Math.random() * quotes.length)];
};
il.add(randomQuote, []);

il.run();

console.log(randomQuote());

bot.on("message", (message) => {
  if (message.content.startsWith(prefix)) {
    switch(message.content){
      case `${prefix}quote`:
        message.channel.sendMessage(randomQuote());
      break;
      case `${prefix}ping`:
        message.channel.sendMessage("Pong!");
      break;
    }
  }
});

bot.login(token);