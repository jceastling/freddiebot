const Discord = require('discord.js')
const client = new Discord.Client()

// Defining my variables. I think this is important?
var CONFIG = require('./config.json');
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
var bless = CONFIG.blessing;
var purify = CONFIG.purify;
var ward = CONFIG.ward;
var cat = CONFIG.cat;
var util = require('util');
var ee = require('events').EventEmitter;

// Here comes var Infiniteloop. I don't know exactly what it does or how it does it, but it makes something like two-thirds of Freddie's code go.
var Infiniteloop = function() {
	ee.call(this);
	this.args = [];
};

Infiniteloop.prototype.add = function() {
	if ('function' === typeof arguments[0]) {
		this.handler = arguments[0];
		var args = Array.prototype.slice.call(arguments, 1);
		if (args.length > 0) {
			this.args = args;
		}
	} else {
		this.emit('error', new Error('when using add function, the first argument should be a function'));
		return 0;
	}
	return this;
};

Infiniteloop.prototype.run = function() {
	var handler = this.handler;
	var args = this.args;
	var that = this;

	function call() {
		that._immediateId = setImmediate(function() {
			if (typeof handler === 'function') {

				switch (args.length) {
					// fast cases
					case 0:
						handler.call(that);
						that.run();
						break;
					case 1:
						handler.call(that, args[0]);
						that.run();
						break;
					case 2:
						handler.call(that, args[0], args[1]);
						that.run();
						break;
						// slower
					default:
						handler.apply(that, args);
						that.run();
				}
			} else {
				//no function added
				that.emit('error', new Error('no function has been added to Infiniteloop'));
			}
		});
	}

	if (this.interval) {
		this._timeoutId = setTimeout(function() {
			call();
		}, that.interval);
	} else {
		call();
	}

	return this;

};

Infiniteloop.prototype.setInterval = function(interval) {
	if ('number' === typeof interval && interval > 0) {
		this.interval = interval;
	} else {
		this.emit('error', new Error('Interval should be a number, and must > 0 '));
	}

	return this;
};

Infiniteloop.prototype.removeInterval = function() {
	delete this.interval;
	return this;
};


Infiniteloop.prototype.onError = function(errHandler) {
	if ('function' === typeof errHandler) {
		this.on('error', errHandler);
	} else {
		this.emit('error', new Error('You should use a function to handle the error'));
	}
	return this;
};

Infiniteloop.prototype.stop = function() {
	console.log('timeout id', this._timeoutId);
	if (this._immediateId !== null && this._timeoutId === null) {
		clearImmediate(this._immediateId);
	} else if (this._timeoutId !== null) {
		clearTimeout(this._timeoutId);
	} else {
		this.emit('error', new Error('You cannot stop a loop before it has been started'));
	}
};
var il = new Infiniteloop;

function randomLyric() {
	return lyric[Math.floor(Math.random() * lyric.length)];
};
il.add(randomLyric, []);
function randomQuote() {
	return quote[Math.floor(Math.random() * quote.length)];
};
il.add(randomQuote,[]);
function randomKiss() {
	return kiss[Math.floor(Math.random() * kiss.length)];
};
il.add(randomKiss,[]);

il.run();

console.log(randomLyric());
console.log(randomQuote());
console.log(randomKiss());

client.on('ready', () => {
    console.log("Connected as " + client.user.tag),
    client.user.setActivity("with your heart. &&help for help.")
})

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }

    if (receivedMessage.content.startsWith(prefix)) {
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(2) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    if (primaryCommand == "sing") {
        receivedMessage.channel.send(randomLyric())
    } else if (primaryCommand == "talk") {
        receivedMessage.channel.send(randomQuote())
            } else if (primaryCommand == "kiss") {
        receivedMessage.channel.send(randomKiss())
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
        receivedMessage.channel.send("I'll `sing`, `talk`, or give you a `kiss`, dear; I'll `greet` or `compliment` you too! I'll respond with a picture if you `meow` or `bless` whatever you want. Just don't forget to start with &&.")
	} else if (primaryCommand == "bless" ) {
	receivedMessage.react('🌠');
	receivedMessage.react('👑');
	receivedMessage.react('🚀');
	receivedMessage.react('☀️');
	receivedMessage.react('🏆');
	receivedMessage.react('💖');
    } else if (primaryCommand == "meow") {
	    receivedMessage.channel.send(cat[Math.floor(Math.random() * cat.length)])
    } else {
        receivedMessage.channel.send("I haven't a clue what you want, darling. Try `&&help` instead.")
    }
}

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"


client.login(process.env.CLIENT_TOKEN)
