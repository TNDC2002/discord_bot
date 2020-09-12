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
                 /play_<youtube link> để phát nhạc từ youtube\n \
                 /volume_<0 - 100> để set volume\n \
                 /pause để tạm dừng\n \
                 /resume để tiếp tục phát\n \
                 /stop để dừng phát');
const joinError = new MessageEmbed()
.setTitle("joinError")
.setColor(10038562)
.setDescription('bạn cần join 1 channel\n \ trước khi gọi bot....... ');
const pause = new MessageEmbed()
.setTitle("Pausing.......")
.setColor(10038562)
.setDescription('/resume để tiếp tục....... ');
const stop = new MessageEmbed()
.setTitle("Stoped.......")
.setColor(10038562)
const Finished = new MessageEmbed()
.setTitle("Finished.......")
.setColor(10038562)




client.on('ready', () => {
  console.log(`  ====================================================================================================\n \
 |                                                                                                  |\n \
 |                                                                                                  |\n \
 |                                        Bot Joinning.....                                         |\n \
 |                                                                                                  |\n \
 |                                                                                                  |\n \
 ====================================================================================================`);

});
client.login('');





client.on('message', async msg => {
  if (msg.content === '/help') {
    msg.channel.send(help);
  }


  if (msg.content.includes('/play_')) {
    if (msg.member.voice.channel) {
      msg.channel.send(join);
      var connection = await msg.member.voice.channel.join();
      let link = msg.content.slice(6,);
      
      var dispatcher = await connection.play(ytdl(link, { filter: 'audioonly' }));
      let play = new MessageEmbed()
      .setTitle("now playing:")
      .setColor(2067276)
      .setThumbnail(link);
      msg.channel.send(play);
      client.on('message', async msg => {
        if (msg.content.includes('/volume_')){
          let volume = parseFloat(msg.content.slice(8,))/100;
          await dispatcher.setVolume(volume);
          const vol = new MessageEmbed()
          .setTitle('Âm lượng hiện tại:')
          .setColor(3447003)
          .setDescription(volume*100)
          msg.channel.send(vol)
        }
        if (msg.content === '/pause'){
          await dispatcher.pause()
          msg.channel.send(pause)
          client.on('message', async msg => {
            if(msg.content === '/resume'){
              dispatcher.resume()
              const resume = new MessageEmbed()
              .setTitle("Resuming......")
              .setColor(2067276)
              .setDescription('now playing: ')
              .setThumbnail(link);
              msg.channel.send(resume);
            }
          })
        }
        if (msg.content === '/stop'){
          dispatcher.destroy();
          msg.channel.send(stop)
        }
        dispatcher.on('finish', () => {
          msg.channel.send(Finished);
        });
      })
    }
    else{
      msg.channel.send(joinError);
    }
  }

  if (msg.content === '/join') {
    if (msg.member.voice.channel) {
      msg.channel.send(join);
      var connection = await msg.member.voice.channel.join();
    }
  }
  if (msg.content === '/leave' && connection != ''){ 
    msg.member.voice.channel.leave()
    msg.channel.send(leave)
  }
})