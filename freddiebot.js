const Discord = require('discord.js')
const client = new Discord.Client()
var CONFIG = require('./config.json');
var quotes = CONFIG.quotes;
var quotes2 = CONFIG.quotes2;
var command = CONFIG.command;
var kiss = CONFIG.kiss
var InfiniteLoop = require('infinite-loop');
var il = new InfiniteLoop;

function randomQuote() {
	return quotes[Math.floor(Math.random() * quotes.length)];
};
il.add(randomQuote, []);
function randomQuote2() {
	return quotes2[Math.floor(Math.random() * quotes2.length)];
};
il.add(randomQuote2,[]);
function randomKiss() {
	return kiss[Math.floor(Math.random() * kiss.length)];
};
il.add(randomKiss,[]);

il.run();

console.log(randomQuote());
console.log(randomQuote2());
console.log(randomKiss());

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
})

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }

    if (receivedMessage.content.startsWith("&")) {
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    if (primaryCommand == "sing") {
        receivedMessage.channel.send(randomQuote())
    } else if (primaryCommand == "talk") {
        receivedMessage.channel.send(randomQuote2())
            } else if (primaryCommand == "kiss") {
        receivedMessage.channel.send(randomKiss())
    } else {
        receivedMessage.channel.send("I don't understand the command. Try `&sing` or `&talk`")
    }
}



// function randomQuote() {
	quotes[Math.floor(Math.random() * quotes.length)]; //

function helpCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        receivedMessage.channel.send("It looks like you might need help with " + arguments)
    } else {
        receivedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`")
    }
}

function multiplyCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send("Not enough values to multiply. Try `!multiply 2 4 10` or `!multiply 5.2 7`")
        return
    }
    let product = 1
    arguments.forEach((value) => {
        product = product * parseFloat(value)
    })
    receivedMessage.channel.send("The product of " + arguments + " multiplied together is: " + product.toString())
}

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"


client.login(process.env.CLIENT_TOKEN)
