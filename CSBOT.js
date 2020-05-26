const Discord = require('discord.js');
const client = new Discord.Client();
const intent = require("./intents.json");
const unirest = require("unirest");
const fetch = require("node-fetch");
const ytdl = require("ytdl-core");


client.on('ready', () => {
    console.log("Connectecd as " + client.user.tag);

    client.user.setActivity("listening to", {
        type: "Your requests"
    })

    client.guilds.cache.forEach((guild) => {
        console.log(guild.name)
        guild.channels.cache.forEach((channel => {
            console.log(` - ${channel.name} ${channel.type} ${channel.id} `)
        }))
        // General Text Channel ID: 713585727199379478
    });

    let generalChannel = client.channels.cache.get("713585727199379478");
})

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) {
        return;
    }
    if (receivedMessage.content.startsWith("!")) {
        processCommand(receivedMessage);
    }
})

function processCommand(receivedMessage) { //- !multiply 2 10
    let fullCommand = receivedMessage.content.substr(1); //- multiply 2 10
    let splitCommand = fullCommand.split(" "); //- multiply[0] 2[1] 10[2]
    let primaryCommand = splitCommand[0]; //- multiply
    let arguments = splitCommand.slice(1); //- 2[0] 10[1]
    let cmd = fullCommand;


    if (primaryCommand == "help") {
        helpCommand(arguments, receivedMessage)
    } else if (primaryCommand == "multiply") {
        multiplyCommand(arguments, receivedMessage);
    } else if (primaryCommand == "add") {
        addCommand(arguments, receivedMessage);
    } else if (primaryCommand == "sub") {
        subCommand(arguments, receivedMessage);
    } else if (primaryCommand == "prayer") {
        prayerTimes(arguments, receivedMessage, arguments[0], arguments[1])
    } else if (primaryCommand == "covid") {
        covid(arguments, receivedMessage)
    } else if (primaryCommand == "like") {
        synonyms(arguments, receivedMessage)
    } else if (primaryCommand == "convert") {
        currency(arguments, receivedMessage)
    } else if (primaryCommand == "quote") {
        sendRandomQuote(receivedMessage)
    } else if (primaryCommand == "translate-ar") {
        translateToArabic(arguments, receivedMessage)
    } else if (primaryCommand == "genpassword") {
        generatePassword(arguments, receivedMessage)
    } else if (primaryCommand == "factnum") {
        numFact(arguments, receivedMessage)
    } else if (primaryCommand == "factyear") {
        yearFact(arguments, receivedMessage)
    } else if (primaryCommand == "factdate") {
        dayFact(arguments, receivedMessage)
    }
    //889f2387b5199702eeca4f7cb760c7d4
    else if (primaryCommand == "weather") {
        airMe(arguments, receivedMessage)
    }

    let greeting = intent.intents[0].patterns;
    for (let i = 0; i < greeting.length; i++) {
        if (cmd == greeting[i] || cmd == greeting[i].toLowerCase()) {
            greetBack(arguments, receivedMessage)
        }
    }

    let chao = intent.intents[1].patterns;
    for (let i = 0; i < chao.length; i++) {
        if (cmd == chao[i] || cmd == chao[i].toLowerCase()) {
            farewell(arguments, receivedMessage)
        }
    }

    let age = intent.intents[2].patterns;
    for (let i = 0; i < age.length; i++) {
        if (cmd == age[i] || cmd == age[i].toLowerCase()) {
            sayAge(arguments, receivedMessage)
        }
    }

    let name = intent.intents[3].patterns;
    for (let i = 0; i < name.length; i++) {
        if (cmd == name[i] || cmd == name[i].toLowerCase()) {
            sayMyName(arguments, receivedMessage)
        }
    }
}

function dayFact(arguments, receivedMessage) {
    let a = arguments[0].toString()
    let m = arguments[1].toString()

    var data = null;
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            d = JSON.parse(this.responseText)
            f = JSON.stringify(d.text)
            f = JSON.parse(f)
            e = JSON.stringify(d.year)
            e = JSON.parse(e)

            receivedMessage.channel.send("in " + a + "-" + m + "-" + e + ", " + f)
        }
    });

    xhr.open("GET", "https://numbersapi.p.rapidapi.com/" + arguments[0] + "/" + arguments[1] + "/date?fragment=true&json=true");
    xhr.setRequestHeader("x-rapidapi-host", "numbersapi.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "bfa402e841mshe491f5690cd691dp1cd587jsnc2d3df73a2fb");

    xhr.send(data);
}

function yearFact(arguments, receivedMessage) {

    var data = null;
    var x = arguments[0]
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            d = JSON.parse(this.responseText)
            f = JSON.stringify(d.text)
            f = JSON.parse(f)

            receivedMessage.channel.send("At " + x.toString() + ", " + f)
        }
    });

    xhr.open("GET", "https://numbersapi.p.rapidapi.com/" + arguments + "/year?fragment=true&json=true");
    xhr.setRequestHeader("x-rapidapi-host", "numbersapi.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "bfa402e841mshe491f5690cd691dp1cd587jsnc2d3df73a2fb");

    xhr.send(data);
}

function numFact(arguments, receivedMessage) {

    var data = null;
    var x = arguments[0]
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            d = JSON.parse(this.responseText)
            f = JSON.stringify(d.text)
            f = JSON.parse(f)

            receivedMessage.channel.send("Number " + x.toString() + " Fact: " + f)
        }
    });

    xhr.open("GET", "https://numbersapi.p.rapidapi.com/" + arguments + "/math?fragment=true&json=true");
    xhr.setRequestHeader("x-rapidapi-host", "numbersapi.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "bfa402e841mshe491f5690cd691dp1cd587jsnc2d3df73a2fb");

    xhr.send(data);
}

function generatePassword(len, receivedMessage) {
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_+.";
    retVal = "";
    for (var i = 0, n = charset.length; i < len; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    receivedMessage.channel.send("How about: " + retVal)
}

function translateToArabic(arguments, receivedMessage) {
    var s = arguments.toString().replace(/,/g, "%20");
    var data = "source=en&q=Hello%2C%20world&target=es";


    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "https://google-translate1.p.rapidapi.com/language/translate/v2");
    xhr.setRequestHeader("x-rapidapi-host", "google-translate1.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "bfa402e841mshe491f5690cd691dp1cd587jsnc2d3df73a2fb");
    xhr.setRequestHeader("accept-encoding", "application/gzip");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

    xhr.send(data);

}

function sendRandomQuote(receivedMessage) {
    var data = null;

    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            d = JSON.parse(this.responseText)
            f = JSON.stringify(d.content)
            m = JSON.stringify(d.originator.name)
            m = JSON.parse(m)
            receivedMessage.channel.send(f + " -" + m);
        }
    });

    xhr.open("GET", "https://quotes15.p.rapidapi.com/quotes/random/?language_code=en");
    xhr.setRequestHeader("x-rapidapi-host", "quotes15.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "bfa402e841mshe491f5690cd691dp1cd587jsnc2d3df73a2fb");

    xhr.send(data);
}

function currency(arguments, receivedMessage) {
    console.log(arguments[1])
    let s = arguments[1]
    var data = null;
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            d = JSON.parse(this.responseText)
            f = JSON.stringify(d.rates)
            f = JSON.parse(f)
            e = f[Object.keys(f)[0]]
            console.log(d.base_currency_name)

            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#FFFB00')
                .setTitle('Live Currency Converter Updated at: ' + d.updated_date)
                .setURL("")
                .setDescription(d.base_currency_name + " to " + e.currency_name + " current rate is: " + e.rate)
                .addFields({
                    name: d.amount + " " + d.base_currency_name + " to " + " " + e.currency_name + " is: ",
                    value: e.rate_for_amount + " " + s.toUpperCase()
                })
                .setTimestamp()
                .setFooter('May Allah bless you and your beloved ones', );
            receivedMessage.channel.send(exampleEmbed)
        }
    });

    xhr.open("GET", "https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=" + arguments[0] + "&to=" +
        arguments[1] + "&amount=" + arguments[2]);
    xhr.setRequestHeader("x-rapidapi-host", "currency-converter5.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "bfa402e841mshe491f5690cd691dp1cd587jsnc2d3df73a2fb");

    xhr.send(data);
}

function synonyms(arguments, receivedMessage) {
    var data = null;
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            f = JSON.parse(JSON.stringify(JSON.parse(this.responseText).result))
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#5AE712')
                .setTitle('Similar Words to ' + arguments[0])
                .setURL("")
                .setDescription("List of words: ");
            for (let i = 0; i < Object.keys(f).length; i++) {
                exampleEmbed.addFields({
                    name: (i + 1).toString(),
                    value: f[i],
                    inline: true,
                }, )
            }
            exampleEmbed.setTimestamp()
                .setFooter('May Allah bless you and your beloved ones. by:"omar riad" ', );
            receivedMessage.channel.send(exampleEmbed)
        }
    });

    xhr.open("GET", "https://similarwords.p.rapidapi.com/moar?query=" + arguments);
    xhr.setRequestHeader("x-rapidapi-host", "similarwords.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "bfa402e841mshe491f5690cd691dp1cd587jsnc2d3df73a2fb");

    xhr.send(data);
}

function covid(arguments, receivedMessage) {
    console.log(arguments[0])
    var data = null;
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            d = JSON.parse(this.responseText)
            f = JSON.stringify(d.response)
            f = JSON.parse(f)
            if (Object.keys(f).length > 0) {

                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#E03A16')
                    .setTitle('Coronavirus ' + f[0].day + " " + f[0].country + ' UPDATE')
                    .setURL("")
                    .setAuthor('Omar Riad')
                    .setDescription("Today's cases")
                    .addFields({
                        name: 'New cases',
                        value: f[0].cases.new,
                        inline: true,
                    }, {
                        name: 'Active cases',
                        value: f[0].cases.active,
                        inline: true,
                    }, {
                        name: 'Critical cases',
                        value: f[0].cases.critical,
                        inline: true,
                    }, {
                        name: 'Recoverd',
                        value: f[0].cases.recovered,

                    }, {
                        name: 'Total Cases',
                        value: f[0].cases.total,
                    }, {
                        name: 'New Deaths',
                        value: f[0].deaths.new,
                        inline: true,
                    }, {
                        name: 'Total Deaths',
                        value: f[0].deaths.total,
                        inline: true,
                    }, {
                        name: 'Total Tests conducted',
                        value: f[0].tests.total,
                    }, )
                    .setTimestamp()
                    .setFooter('May Allah bless you and your beloved ones', );
                receivedMessage.channel.send(exampleEmbed)
            } else {
                receivedMessage.channel.send(" make sure you typed in the name correctly")
            }
        }
    });

    xhr.open("GET", "https://covid-193.p.rapidapi.com/statistics?country=" + arguments);
    xhr.setRequestHeader("x-rapidapi-host", "covid-193.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "bfa402e841mshe491f5690cd691dp1cd587jsnc2d3df73a2fb");
    xhr.send(data);
}

function sayMyName(arguments, receivedMessage) {
    let response = intent.intents[3].responses;
    const randomElement = response[Math.floor(Math.random() * response.length)];
    receivedMessage.channel.send(randomElement);
}

function sayAge(arguments, receivedMessage) {
    let response = intent.intents[2].responses;
    const randomElement = response[Math.floor(Math.random() * response.length)];
    receivedMessage.channel.send(randomElement);
}

function farewell(arguments, receivedMessage) {
    let response = intent.intents[1].responses;
    const randomElement = response[Math.floor(Math.random() * response.length)];
    receivedMessage.channel.send(randomElement);
}

function greetBack(arguments, receivedMessage) {
    let response = intent.intents[0].responses;
    const randomElement = response[Math.floor(Math.random() * response.length)];
    receivedMessage.channel.send(randomElement);
}

function prayerTimes(arguments, receivedMessage, city, country) {
    var data = null;
    city = arguments[0]
    country = arguments[1]
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {

            d = JSON.parse(this.responseText)
            e = JSON.stringify(d['data']['timings'])
            n = JSON.stringify(d['data']['date']['readable'])
            k = JSON.parse(e)

            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Islamic Prayer Times at ' + city + ', ' + country)
                .setURL("")
                .setAuthor('Omar Riad')
                .setDescription("Today's " + n + " time schedule:")
                .addFields({
                    name: 'Sunrise',
                    value: k.Sunrise,
                }, {
                    name: 'Fajr',
                    value: k.Fajr,
                }, {
                    name: 'Dhuhr',
                    value: k.Dhuhr,
                }, {
                    name: 'Asr',
                    value: (parseInt(k.Asr.substr(0, 2)) - 12).toString() + ":" + k.Asr.substr(3, 2),
                }, {
                    name: 'Maghrib',
                    value: (parseInt(k.Maghrib.substr(0, 2)) - 12).toString() + ":" + k.Maghrib.substr(3, 2),
                }, {
                    name: 'Isha',
                    value: (parseInt(k.Isha.substr(0, 2)) - 12).toString() + ":" + k.Isha.substr(3, 2),
                }, )
                .setTimestamp()
                .setFooter('May Allah bless you and your beloved ones', );
            receivedMessage.channel.send(exampleEmbed)

        }
    });

    xhr.open("GET", "https://aladhan.p.rapidapi.com/timingsByCity?city=" + arguments[0] + "&country=" + arguments[1]);
    xhr.setRequestHeader("x-rapidapi-host", "aladhan.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "bfa402e841mshe491f5690cd691dp1cd587jsnc2d3df73a2fb");

    xhr.send(data);
}

function airMe(arguments, receivedMessage) {
    //889f2387b5199702eeca4f7cb760c7d4
    let city = arguments.toString().replace(/,/g, " ");
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=889f2387b5199702eeca4f7cb760c7d4')
        .then(response => response.json())
        .then(data => {
            var temp = data['main']['temp'];
            var desc = data['weather'][0]['description']
            var tempC = parseInt(temp)
            tempC = tempC - 273
            receivedMessage.channel.send(tempC + "c, " + desc)
        })
}

function helpCommand(arguments, receivedMessage) {
    if (arguments.length == 0) {
        receivedMessage.channel.send("I'am a bot that can do the following  : \n chat with you \n do math \n get weather for you city \n get prayer times for your city, country \n get Coronavirus daily updates for your country \n get 10 synonyms of given word \n generate a strong password with a givven length \n get a random interesting quote \n convert curreny(updated daily) \n get a fact about a day,number, or a year")
    } else {
        receivedMessage.channel.send("looks like you need help with " + arguments)
    }
}

function multiplyCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send("No enough arguments, try `!help` or `!multiply`")
        return
    }

    let product = 1
    arguments.forEach((value => {
        product = product * parseFloat(value)

    }))
    receivedMessage.channel.send("The product of " + arguments + " is " + product.toString())
}

function addCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send("No enough arguments");
        return
    }


    let product = 0
    arguments.forEach((value => {
        product = product + parseFloat(value)

    }))
    receivedMessage.channel.send("The total of " + arguments + " is " + product.toString())
}

function subCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send("No enough arguments")
        return
    }
    let product = arguments[0] * 2
    arguments.forEach((value => {
        product = product - parseFloat(value)

    }))
    receivedMessage.channel.send("The total of " + arguments + " is " + product.toString())
}

client.login("NzEzNTg3Mzg1MjQxMzA1MjEx.XsyxyA.MdxSLdWruyhDgdBMvRJSUVRsmJU");