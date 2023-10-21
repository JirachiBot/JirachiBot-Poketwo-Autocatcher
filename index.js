//check out README.md
const express = require('express')
const app = express();
const port = 3000

app.get('/', (req, res) => res.send('uwu'))

app.listen(port, () =>
  console.log(`Bot getting ready...`)
);
const Discord = require('discord.js-selfbot');
const client = new Discord.Client();
const prefix = process.env.prefix;
const ownerID = process.env.ownerID;
const botID = process.env.botID;
const logID = process.env.logID;
const Hunt = process.env.Hunt;
const Pname = "874910942490677270";
const P2 = "716390085896962058";
var gg = new Array('gg', 'nice', 'cool', 'wow', 'thanks', 'lol');

client.on("ready", () => {
  console.log(`​\nBot Created by @JirachiBot\nInspired/Forked from @verysussy's "24/7 Dc Spem bot"\n​\nBot is ready!`);
  client.channels.fetch(logID)
    .then(channel => {
      channel.send(`Bot is On!`)
    })
})

//1. shows your shinyhunt streak
client.on('message', msg => {
  if (!msg.content.startsWith(prefix)) return;
  if (msg.author.id != (ownerID)) return;
  let args = msg.content.toLowerCase().slice(prefix.length).trim().split(" ");
  let cmd = args.shift();
  if (cmd == "sh") {
    //msg.delete(); //[Deletes the message you sent, needs "Manage Messages" perm. Delete the "//" at the beginning to enable, do not touch if you don't understand :P]
      return msg.channel.send(`<@${P2}> sh`)
  }
});

//2. Pokename's shinyhunt ping response
client.on('message', msg => {
  if (!msg.content.startsWith("**✨Shiny Hunt Pings:** ")) return;
  if (!msg.content.includes(`<@${botID}>`)) return;
  if (msg.author.id != Pname) return;
    setTimeout(function(){
      return msg.channel.send(`<@${P2}> c ${Hunt}`)
    },1000 * 2.83 ) 
});

//3. Pokename's collection ping response
client.on('message', msg => {
  if (!msg.content.startsWith("**Collection Pings:** ")) return;
  if (!msg.content.includes(`<@${botID}>`)) return;
  if (msg.author.id != Pname) return;
    setTimeout(function(){
      return msg.channel.send(`<@${P2}> c ${Hunt}`)
    },1000 * 2.84 ) 
});

//4. +1 Streak log
client.on('message', msg => {
  if (!msg.content.includes("+1 Shiny chain!")) return;
  if (!msg.content.includes(`<@${botID}>`)) return;
  if (msg.author.id != P2) return;
    client.channels.fetch(logID)
    .then(channel => {
      channel.send(`+1 ${Hunt} caught!`)
    })
});

//5. Shiny caught log + response
client.on('message', msg => {
  if (!msg.content.includes("These colors seem unusual...")) return;
  if (!msg.content.includes(`<@${botID}>`)) return;
  if (msg.author.id != P2) return;
  setTimeout(function(){
  return msg.channel.send(gg[Math.floor(Math.random() * ((gg.length - 1) - 0 + 1))])
  },1000 * 1.57 )
    client.channels.fetch(logID)
    .then(channel => {
      channel.send(`Shiny Hunt Caught! ||<@${ownerID}>||`)
    });
});


client.login(process.env.token);