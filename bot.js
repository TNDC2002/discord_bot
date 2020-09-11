const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const { Client, MessageEmbed } = require('discord.js');





const join = new MessageEmbed()
.setTitle("I'm in!!!!")
.setColor(3066993)
.setDescription('/play_<youtube link> để bắt\n \ đầu phát nhạc từ youtube');
const leave = new MessageEmbed()
.setTitle("bye!!!")
.setColor(10038562)
.setImage("https://img4.thuthuatphanmem.vn/uploads/2020/07/04/anh-dong-bye-bye-cuc-ky-cute-dang-yeu_095520260.gif");
const help = new MessageEmbed()
.setTitle('Hướng Dẫn Sử Dụng')
.setColor(3447003)
.setDescription('/join để gọi bot vào voice channel \n \
                 /leave để kick bot khỏi voice channel\n \
                 /leave để kick bot khỏi voice channel\n \
                 /play_<youtube link> để phát nhạc từ youtube');
const joinError = new MessageEmbed()
.setTitle("joinError")
.setColor(10038562)
.setDescription('bạn cần join 1 channel\n \ trước khi gọi bot....... ');





client.on('ready', () => {
  console.log(`  ====================================================================================================\n \ |                                                                                                  |\n \ |                                                                                                  |\n \ |                                        Bot Joinning.....                                         |\n \ |                                                                                                  |\n \ |                                                                                                  |\n \ ====================================================================================================`);

});
client.login('');





client.on('message', msg => {
  if (msg.content === '/help') {
    msg.channel.send(help);
  }


  if (msg.content === '/join') {
    if (msg.member.voice.channel) {
      msg.channel.send(join);
      msg.member.voice.channel.join().then(connected => {
        connected.client.on('message', msg =>{


          if (msg.content === '/leave'){
            msg.member.voice.channel.leave()
            msg.channel.send(leave);
          }


          else if     (msg.content.includes('/play_')) {
            let link = msg.content.slice(6,);
            connected.play(ytdl(link, { filter: 'audioonly' }));
            let play = new MessageEmbed()
            .setTitle("now playing:")
            .setColor(2067276)
            .setThumbnail(link);
            msg.channel.send(play);
          }

        })
      })
    }
    else{
      msg.channel.send(joinError);
    }
  }
})
