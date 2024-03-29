const Discord = require('discord.js')
const client = new Discord.Client()

// Defining my variables. I think this is important?
var CONFIG = require('./config.json');
var CLIENT_TOKEN = CONFIG.token;
var prefix = CONFIG.prefix;
var lyric = CONFIG.lyric;
var quote = CONFIG.quote;
var command = CONFIG.command;
var kiss = CONFIG.kiss;
var interject = CONFIG.interject;
var interject2 = CONFIG.interject2;
var endearment = CONFIG.endearment;
var greeting = CONFIG.greeting;
var intensifier = CONFIG.intensifier;
var intensifier2 = CONFIG.intensifier2;
var react = CONFIG.react;
var nicething = CONFIG.nicething;
var adjective = CONFIG.adjective;
var hearts = CONFIG.hearts;
var randomemoji = CONFIG.randomemoji;
var cat = CONFIG.cat;
var bless = CONFIG.blessings;
var protect = CONFIG.protection;
var cleanse = CONFIG.cleansing;
var util = require('util');
var ee = require('events').EventEmitter;

client.on('ready', () => {
    console.log("Connected as " + client.user.tag),
    client.user.setActivity("with your heart. &&help for help.") // Set status
})

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent Freddie from responding to his own messages
        return
    }

    if (receivedMessage.content.startsWith(prefix)) {
        processCommand(receivedMessage) // Makes sure Freddie only responds to commands targeted at him
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(2) // Remove the leading ampersands
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the ampersands is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command; this is currently unused functionality

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments (currently all arguments are irrelevant)

    if (primaryCommand == "sing") {
	    var song = lyric[Math.floor(Math.random() * lyric.length)]
        receivedMessage.channel.send(":musical_note: " + song + " :notes:")
    } else if (primaryCommand == "talk") {
		var talk = quote[Math.floor(Math.random() * quote.length)]
        receivedMessage.channel.send(talk)
            } else if (primaryCommand == "kiss") {
		    var kiss = kiss[Math.floor(Math.random() * kiss.length)]
        receivedMessage.channel.send(kiss)
    } else if (primaryCommand == "greet") {
		var first = interject[Math.floor(Math.random() * interject.length)]
		var second = greeting[Math.floor(Math.random() * greeting.length)]
		var third = endearment[Math.floor(Math.random() * endearment.length)]
		receivedMessage.channel.send(first + ", " + second + ", " + third + "!")
    } else if (primaryCommand == "compliment") {
	    var first = interject[Math.floor(Math.random() * interject.length)]
	    var second = interject2[Math.floor(Math.random() * interject2.length)]
	    var third = intensifier[Math.floor(Math.random() * intensifier.length)]
	    var fourth = react[Math.floor(Math.random() * react.length)]
	    var fifth = adjective[Math.floor(Math.random() * adjective.length)]
	    var sixth = nicething[Math.floor(Math.random() * nicething.length)]
	    var seventh = endearment[Math.floor(Math.random() * endearment.length)]
	    var eighth = intensifier2[Math.floor(Math.random() * intensifier2.length)]
	    var ninth = hearts[Math.floor(Math.random() * hearts.length)]
	    var final = ["" + first +", you're just " + eighth + " " + sixth + ", " + seventh + " " + ninth + "",
			 "Don't you know you're " + eighth + "ly " + fifth + " " + sixth + ", " + seventh + "?",
			 "Let me tell you, you're just the most " + fifth + " " + sixth + "! I'm " + fourth + " " + ninth + "",
			 "Don't ever forget just how " + third + "ly " + fifth + " you are, you " + third + " " + sixth + " " + ninth + "",
			 "" + first + ", " + second + " you're just " + eighth + " " + sixth + " and that's all there is to it, " + seventh + "!",
			 "I'm just " + third + "ly " + fourth + " by how " + fifth + " you are, you " + sixth + ", you! " + ninth + ""]
	    receivedMessage.channel.send(final[Math.floor(Math.random() * final.length)])
    } else if (primaryCommand == "help") {
        receivedMessage.channel.send("I'll `sing`, `talk`, or give you a `kiss`, dear; I'll `greet` or `compliment` you too! I'll respond with a picture if you `meow`, and for a little magic I will `bless`, `protect`, or `cleanse` whatever you want. Asking for `dice` will show you three random emoji. Just don't forget to start with &&.")
	} else if (primaryCommand == "bless" ) {
	var first = bless[Math.floor(Math.random() * bless.length)]
	var second = bless[Math.floor(Math.random() * bless.length)]
	var third = bless[Math.floor(Math.random() * bless.length)]
	receivedMessage.react(first);
	receivedMessage.react(second);
	receivedMessage.react(third);
	} else if (primaryCommand == "protect" ) {
	var first = protect[Math.floor(Math.random() * protect.length)]
	var second = protect[Math.floor(Math.random() * protect.length)]
	var third = protect[Math.floor(Math.random() * protect.length)]
	receivedMessage.react(first);
	receivedMessage.react(second);
	receivedMessage.react(third);
	} else if (primaryCommand == "cleanse" ) {
	var first = cleanse[Math.floor(Math.random() * cleanse.length)]
	var second = cleanse[Math.floor(Math.random() * cleanse.length)]
	var third = cleanse[Math.floor(Math.random() * cleanse.length)]
	receivedMessage.react(first);
	receivedMessage.react(second);
	receivedMessage.react(third);
    } else if (primaryCommand == "meow") {
	    receivedMessage.channel.send(cat[Math.floor(Math.random() * cat.length)])
    } else if (primaryCommand == "dice") {
	    receivedMessage.channel.send("You roll the dice: ");
	    receivedMessage.channel.send(":" + randomemoji[Math.floor(Math.random() * randomemoji.length)] + ": " + " :" + randomemoji[Math.floor(Math.random() * randomemoji.length)] + ": " + " :" + randomemoji[Math.floor(Math.random() * randomemoji.length)] + ":")
    } else {
        receivedMessage.channel.send("I haven't a clue what you want, darling. Try `&&help` instead.")
    }
}

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"


client.login(CLIENT_TOKEN)
