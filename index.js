/**
 * Botodoya - The worst Twitch Bot
 * Look upon him in awe.
 */

require('dotenv').config();

const request = require('request');
const querystring = require("querystring")

const regexpCommand = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/);

kraken = request.defaults({
  baseUrl: 'https://api.twitch.tv/kraken/',
  json: true,
  headers: {
      'Client-ID': process.env.TWITCH_CLIENT_ID,
      Accept: 'application/vnd.twitchtv.v5+json'
  }
});



const tmi = require('tmi.js');
const countdown = require('countdown');

const client = new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true
  },
  identity: {
    username: process.env.TWITCH_BOT_USERNAME,
    password: process.env.TWITCH_OAUTH_TOKEN
  },
  channels: ['dotodoya']
});



client.connect();

var commandList = ['uptime', 'discord', 'botodoya', 'commands', 'tsrp', 'game', 'emotes', 'merch', 'patchnotes', 'blacklist', 'unblacklist'];
//var responseList = ['!uptime', '!discord', '!botodoya', ''];
var coolDown = 10000;
var startTime = Date.now() - coolDown;
var blacklistTime = Date.now() - coolDown;
var lastUseTime = [startTime, startTime, startTime, startTime, startTime, startTime, startTime, startTime, startTime, startTime, startTime, startTime, startTime];
var blacklist = ['imjuniorbingo'];

client.on('message', (channel, tags, message, self) => {
  // Ignore echoed messages.
  if(self || message[0]!== '!' || (message.length>1 && (message[0]==message[1] || message[1]==' '))) return;

  var blacklisted = false;

  for (var i=0; i<blacklist.length; i++)
  {
    if (`${tags.username}` == blacklist[i])
    {
      blacklisted = true;
    }
  }

  if (!blacklisted){

    const [raw, command, argument] = message.match(regexpCommand);

    var toUser = tags.username;

    if (argument != null)
    {
      toUser = argument;
    }

    switch (commandList.indexOf(command.toLowerCase())) {
      case (0):
          if (Date.now()-lastUseTime[0] >= coolDown)
          {
              //client.say(channel, `@${tags.username} ` + (Date.now() - channel.started_at.parseInt()));
              //uptimeHandler(channel, userstate);

              let target = '191556021';

              kraken({
                url: `streams/${target}`,
                qs: {
                    _: querystring.stringify
                },
                dataType: 'json'
              }, (err, res, body) => {
                if(err) {
                    console.log(`ERROR`, err);
                    client.say(channel, `Errror`);
                }
                else if(res.statusCode !== 200) {
                    client.say(channel, `User not found`);
                    console.log(res.statusCode);
                }
                else if(body.stream === null) {
                    client.say(channel, `${target} is offline. :(`);
                }
                else
                {
                  var uptime = countdown(new Date(body.stream.created_at).getTime(), Date.now(), 158);
                  client.say(channel, `@${toUser} DotoDoya has been live for ${uptime}! doyaMain`);
                }
              

              });
              lastUseTime[0] = Date.now();
          }
          break;
      case (1):
        if (Date.now()-lastUseTime[1] >= coolDown)
        {
          client.say(channel, `@${toUser} https://discord.gg/dBhy4sWNaX`);
          lastUseTime[1] = Date.now();
        }
        break;
      case (2):
        if (Date.now()-lastUseTime[2] >= coolDown)
        {
          client.say(channel, `@${toUser} I am a bot created by NamelessNathan to help moderate Doto's channel! doyaGrammy`);
          lastUseTime[2] = Date.now();
        }
        break;
      case (3):
        if (Date.now()-lastUseTime[3] >= coolDown)
        {
          client.say(channel, `@${toUser} The current commands are: !uptime, !discord, !botodoya, !commands, !tsrp, !merch, !game doyaCheese`);
          lastUseTime[3] = Date.now();
        }
        break;
      case (4):
        if (Date.now()-lastUseTime[4] >= coolDown)
        {
          client.say(channel, `@${toUser} The Squad Role Play is a GTA V server where everyone can come together and role play as any character they want! If you'd like to apply to join the server, click here: https://docs.google.com/forms/d/1aL_OHrF9gxC7tPYtQ_-fDKhSp81GTDgojp-xbtcClh4/viewform?edit_requested=true . Doto streams it on the weekends when the server is online. doyaPic`);
          lastUseTime[4] = Date.now();
        }
        break;
      case (5):
        if (Date.now()-lastUseTime[5] >= coolDown)
          {
              let target = '191556021';

              kraken({
                url: `streams/${target}`,
                qs: {
                    _: querystring.stringify
                },
                dataType: 'json'
              }, (err, res, body) => {
                if(err) {
                    console.log(`ERROR`, err);
                    client.say(channel, `Errror`);
                }
                else if(res.statusCode !== 200) {
                    client.say(channel, `User not found`);
                    console.log(res.statusCode);
                }
                else if(body.stream === null) {
                    client.say(channel, `Dotodoya is offline. doyaCry`);
                }
                else
                {
                  var currentGame = body.stream.game;
                  client.say(channel, `@${toUser} DotoDoya is currently playing ${currentGame}! doyaBlush`);
                }
              

              });
              lastUseTime[5] = Date.now();
          }
          break;
        case (6):
          if (Date.now()-lastUseTime[6] >= coolDown)
          {
            client.say(channel, `@${toUser} Get access to these sick emotes by subbing to the channel!: doyaOh doyaIQ doyaAngry doyaGO doyaGeorge doyaSmile doyaSorrybro doyaBro doyaFunny doyaDrink doyaMix doyaMash doyaDrop doyaToxic doyaHUH doyaOk doyaDraw doyaRage doyaMain doyaCry doyaHEHE doyaParty doyaScript doyaBlush doyaSpeed doyaMind doyaSweat doyaFishin doyaBlind doyaGrammy doyaPic doyaScared doyaCheese doyaPeace`);
            lastUseTime[6] = Date.now();
          }
          break;
        case (7):
          if (Date.now()-lastUseTime[7] >= coolDown)
          {
            client.say(channel, `@${toUser} Check out Doto's Merch Store here!: https://crowdmade.com/collections/dotodoya doyaPic`);
            lastUseTime[7] = Date.now();
          }
          break;
        case (8):
          if (Date.now()-lastUseTime[8] >= coolDown)
          {
            client.say(channel, `@${toUser} Check out the patch notes listed here!: https://twitter.com/KenXyro/status/1424822430959210496?s=20 doyaMain`);
            lastUseTime[8] = Date.now();
          }
          break;
        case (9):
          if (Date.now()-lastUseTime[9] >= coolDown && tags.username == 'namelessnathan' && toUser != tags.username)
          {
            
            lastUseTime[9] = Date.now();
            if (!blacklist.includes(toUser.toLowerCase()))
            {
              blacklist.push(toUser.toLowerCase());
              client.say(channel, `@${toUser} has now been added to my blacklist doyaRage`);
            }
            for (let i=0; i< blacklist.length; i++)
            {
                console.log(blacklist[i]);
            }
          }
          break;
        case (10):
          if (Date.now()-lastUseTime[10] >= coolDown && tags.username == 'namelessnathan' && toUser != tags.username)
          {
            
            lastUseTime[10] = Date.now();
            if (blacklist.includes(toUser.toLowerCase()))
            {
              client.say(channel, `@${toUser} is being removed from the bot blacklist! doyaMain`);
              for (let i=0; i< blacklist.length; i++)
              {
                if (blacklist[i]==toUser.toLowerCase())
                {
                  blacklist.splice(i,1);
                }
              }
            }
            
            for (let i=0; i< blacklist.length; i++)
            {
                console.log(blacklist[i]);
            }
          }
          break;
      }
  }
  else
  {
    if (Date.now()-blacklistTime >= coolDown)
      {
        client.say(channel, `@${tags.username} Not answering doyaRage`);
        lastUseTime[3] = Date.now();
        
      }
    
  }
});

