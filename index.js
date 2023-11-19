//check out README.md
const express = require('express')
const app = express();
const port = 3000

app.get('/', (req, res) => res.send('uwu'))

app.listen(port, () =>
  console.log(`Bot getting ready...`)
);
const Discord = require('discord.js-selfbot');
const settings = require('./config.json');
const client = new Discord.Client();
const prefix = settings.prefix;
const ownerID = settings.ownerID;
const botID = settings.botID;
const logID = settings.logID;
const Hunt = settings.Hunt;
const Pname = "874910942490677270";
const P2 = "716390085896962058";
var gg = new Array('gg', 'nice', 'cool', 'wow', 'thanks', 'lol');
var sm = false;

//0. Bot On and status
client.on("ready", () => {
  console.log(`​\nBot Created by @JirachiBot\nInspired/Forked from @verysussy's "24/7 Dc Spem bot"\n​\nBot (@${client.user.username}) is ready!`);
  client.channels.fetch(logID)
    .then(channel => {
      channel.send("> # **Bot is On!**")
    })
    client.user.setStatus("invisible");
      accountCheck = client.user.username;
})

//1. shows your shinyhunt streak
client.on('message', msg => {
  if (!msg.content.startsWith(prefix)) return;
  if (msg.author.id != (ownerID)) return;
  let args = msg.content.toLowerCase().slice(prefix.length).trim().split(" ");
  let cmd = args.shift();
  if (cmd == "sh") {
    //msg.delete();
      return msg.channel.send(`<@${P2}> sh`)
  }
});

//2. Pokename's shinyhunt ping response + Log/Safemode toggle
client.on('message', msg => {
  if (!msg.content.startsWith("**✨Shiny Hunt Pings:** ")) return;
  if (!msg.content.includes(`<@${botID}>`)) return;
  if (msg.author.id != Pname) return;

  setTimeout(function() {
    if (sm == false) {
      msg.channel.send(`<@${P2}> c ${Hunt}`).then(() => {
        const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === P2 && m.content.includes("+1 Shiny chain!") && m.content.includes(`<@${botID}>`), { time: 1000 * 5 });
        collector.on('collect', response => {
          client.channels.cache.get(logID).send(`> ### +1 ${Hunt} caught!`);
          collector.stop();
        });

        collector.on('end', collected => {
          if (collected.size === 0) {
            client.channels.cache.get(logID).send(`${prefix}safemode true`);
            setTimeout(function(){
            client.channels.cache.get(logID).send(`> ### **<@${ownerID}> Your bot has gone into safe mode, please check you bot (${client.user.username})**`);
          },1000 * 1 ) 
          }
        });
      });
    }
  }, 1000 * 3 );
});


//3. Pokename's collection ping response
client.on('message', msg => {
  if (!msg.content.startsWith("**Collection Pings:** ")) return;
  if (!msg.content.includes(`<@${botID}>`)) return;
  if (msg.author.id != Pname) return;
    setTimeout(function(){
      if (sm == false)
      return msg.channel.send(`<@${P2}> c ${Hunt}`)
    },1000 * 3 ) 
});

//4. Shiny caught log + response
client.on('message', msg => {
  if (!msg.content.includes("These colors seem unusual...")) return;
  if (!msg.content.includes(`<@${botID}>`)) return;
  if (msg.author.id != P2) return;
  setTimeout(function(){
  return msg.channel.send(gg[Math.floor(Math.random() * ((gg.length - 1) - 0 + 1))])
  },1000 * 1.57 )
    client.channels.fetch(logID)
    .then(channel => {
      channel.send(`> # **Shiny ${Hunt} Caught! ||<@${ownerID}>||**`)
    });
});

//5. Say command
client.on('message', msg => {
  if (!msg.content.startsWith(prefix)) return;
  if (msg.author.id != ownerID) return;
  let args = msg.content.toLowerCase().slice(prefix.length).trim().split(" ");
  let cmd = args.shift();
  if (cmd === "say") {
   const sayMessage = msg.content.split(' ').slice(1).join(' ');
    //msg.delete();
   msg.channel.send(sayMessage);
 }
});
//6. Safe mode toggle
client.on('message', msg => {
  if (!msg.content.startsWith(prefix)) return;
  if (msg.author.id != ownerID && msg.author.id != botID) return;
  let args = msg.content.toLowerCase().slice(prefix.length).trim().split(" ");
  let cmd = args.shift();
  if (cmd == "safemode") {
    if (args[0] === 'true') {
      sm = true;
      msg.react("✅");

      setTimeout(function() {
        if (sm == true)
        sm = false;
        msg.channel.send("> Safemode set to `FALSE` automatically after `5` minutes");
      }, 1000 * 60* 5);
    } else if (args[0] === 'false') {
      sm = false;
      msg.react("☑️");
    } else {
      msg.channel.send("> Safemode is currently set to " + "`" + `${sm}` + "`\n> " + `\n> type ${prefix}safemode ` + "`TRUE/FALSE` to toggle.");
    }
  }
});

client.login(settings.token);