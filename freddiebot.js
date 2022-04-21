const Discord = require('discord.js')
const client = new Discord.Client()

// Defining my variables. I think this is important?
const {
	token, 
	prefix, 
	lyric, 
	quote, 
	command, 
	kiss, 
	interject, 
	interject2, 
	endearment, 
	greeting,
	intensifier, 
	intensifier2,
	react,
	nicething, 
	adjective,
	hearts,
	randomemoji, 
	cat,
	bless, 
	protect,
	cleanse
} = require('./config.json');

client.on('ready', () => {
    console.log("Connected as " + client.user.tag),
    client.user.setActivity("with your heart. &&help for help.") // Set status
})

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user || !receivedMessage.content.startsWith(prefix)) { // Prevent Freddie from responding to his own messages
        return
    }

	processCommand(receivedMessage) // Makes sure Freddie only responds to commands targeted at him
})

function processCommand(receivedMessage) {
    const fullCommand = receivedMessage.content.substr(2) // Remove the leading ampersands
    const splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    const primaryCommand = splitCommand[0] // The first word directly after the ampersands is the command
    const arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command; this is currently unused functionality

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments (currently all arguments are irrelevant)

	switch(primaryCommand){
		case "help":
			receivedMessage.channel.send("I'll `sing`, `talk`, or give you a `kiss`, dear; I'll `greet` or `compliment` you too! I'll respond with a picture if you `meow`, and for a little magic I will `bless`, `protect`, or `cleanse` whatever you want. Asking for `dice` will show you three random emoji. Just don't forget to start with &&.")
		break;
		case "sing":
			const song = lyric[Math.floor(Math.random() * lyric.length)]
			receivedMessage.channel.send(`:musical_note: ${song} :notes:`)
		break;
		case "meow":
			receivedMessage.channel.send(cat[Math.floor(Math.random() * cat.length)])
		break;
		case "protect":
			receivedMessage.react(protect[Math.floor(Math.random() * protect.length)]);
			receivedMessage.react(protect[Math.floor(Math.random() * protect.length)]);
			receivedMessage.react(protect[Math.floor(Math.random() * protect.length)]);
		break;
		case "bless":
			receivedMessage.react(bless[Math.floor(Math.random() * bless.length)]);
			receivedMessage.react(bless[Math.floor(Math.random() * bless.length)]);
			receivedMessage.react(bless[Math.floor(Math.random() * bless.length)]);
		break;
		case "cleanse":
			receivedMessage.react(cleanse[Math.floor(Math.random() * cleanse.length)]);
			receivedMessage.react(cleanse[Math.floor(Math.random() * cleanse.length)]);
			receivedMessage.react(cleanse[Math.floor(Math.random() * cleanse.length)]);
		break;
		case "talk":
			receivedMessage.channel.send(quote[Math.floor(Math.random() * quote.length)])
		break;
		case "kiss":
			receivedMessage.channel.send(kiss[Math.floor(Math.random() * kiss.length)])
		break;
		case "greet":
			receivedMessage.channel.send(`${interject[Math.floor(Math.random() * interject.length)]}, ${greeting[Math.floor(Math.random() * greeting.length)]}, ${endearment[Math.floor(Math.random() * endearment.length)]}!`)
		break;
		case "dice":
			receivedMessage.channel.send(`You roll the dice: \n:${randomemoji[Math.floor(Math.random() * randomemoji.length)]}:  :${randomemoji[Math.floor(Math.random() * randomemoji.length)]}:  :${randomemoji[Math.floor(Math.random() * randomemoji.length)]}:`)
		break;
		case "compliment":
			const first = interject[Math.floor(Math.random() * interject.length)]
			const second = interject2[Math.floor(Math.random() * interject2.length)]
			const third = intensifier[Math.floor(Math.random() * intensifier.length)]
			const fourth = react[Math.floor(Math.random() * react.length)]
			const fifth = adjective[Math.floor(Math.random() * adjective.length)]
			const sixth = nicething[Math.floor(Math.random() * nicething.length)]
			const seventh = endearment[Math.floor(Math.random() * endearment.length)]
			const eighth = intensifier2[Math.floor(Math.random() * intensifier2.length)]
			const ninth = hearts[Math.floor(Math.random() * hearts.length)]
			const final = ["" + first +", you're just " + eighth + " " + sixth + ", " + seventh + " " + ninth + "",
				 "Don't you know you're " + eighth + "ly " + fifth + " " + sixth + ", " + seventh + "?",
				 "Let me tell you, you're just the most " + fifth + " " + sixth + "! I'm " + fourth + " " + ninth + "",
				 "Don't ever forget just how " + third + "ly " + fifth + " you are, you " + third + " " + sixth + " " + ninth + "",
				 "" + first + ", " + second + " you're just " + eighth + " " + sixth + " and that's all there is to it, " + seventh + "!",
				 "I'm just " + third + "ly " + fourth + " by how " + fifth + " you are, you " + sixth + ", you! " + ninth + ""]
			receivedMessage.channel.send(final[Math.floor(Math.random() * final.length)])
		break;
		default:
			receivedMessage.channel.send("I haven't a clue what you want, darling. Try `&&help` instead.")
		break;
	}
}

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"

client.login(token)