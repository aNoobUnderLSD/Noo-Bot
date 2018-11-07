const Discord = require('discord.js')
const NooBot = new Discord.Client()
const BotPfx = '*'
const reactPfx = '§react'

function RdmStatus() {
    var status = [`son developpement`, `${NooBot.guilds.size} serveurs`, `khustalk#1021`]
    var random = status[Math.floor(Math.random() * status.length)]
   NooBot.user.setActivity(random, { type: 'WATCHING' })
    }


//instance
NooBot.on('ready', function ()
{
  
    console.log("NooBot is start");
    setInterval(RdmStatus, 5000)

NooBot.user.setStatus('dnd')
  .then(console.log(`Le status est mis à jour et je suis actuellement sur ${NooBot.guilds.size} servers`))
  .catch(console.error);
}
)


    //message de bienvenue
NooBot.on("guildMemberAdd", member =>
{   
    let consolelogadd = (`${member.guild.addMember} à rejoin ${member.guild.name}`)   
    

    const JoinEmbedMP = new Discord.RichEmbed()
        .setColor("#fe09d5")
        .setAuthor(member.user.username, member.user.avatarURL)
        .setTitle("BIENVENUE")
        .addField(`Bienvenue à toi ${member.user.tag} sur ${member.guild.name}`, `Pour savoir mes commandes fais *aide sur un channel du server ${member.guild.name}`)
        .addField(`Grace à toi, ${member.guild.name} compte ${member.guild.memberCount} membres`, "Les membres ou/et le staff vont t'aider ^^")
        
    
    member.send(JoinEmbedMP).catch((err) => {
        member.client.users.get("406135526005932043").send("T'es MP sont desactiver");
    console.log(consolelogadd)
    })
    
})


//command aide
NooBot.on('message', message =>
{
    
    if(message.content.startsWith(BotPfx + 'aide')) 
    {
        let AideEmbed = new Discord.RichEmbed()
            .setTitle("Voici toutes mes commandes")
            .setColor("#fe0975")
            .addField("*aide", "Cette commande sert à connaitre l'ensemble des commandes")
            .addField("*server", "Cette commande sert à connaitres les caractéristiques du server actuel")
            .addField("*bonjour", "Me dire Bonjour")
            .addField("*Bonjour `@mention`", "Dire bonjour à un membre du server par mon intermédiaire")
            .addField("*avatar", "Pour avoir le lien de son avatar en MP")  
        message.author.send(AideEmbed).catch((err) =>
        {
            message.reply(":warning: Je peux pas t'envoyer toutes mes commands :warning:")
        })
        message.reply("Toutes mes commandes sont dans tes messages privée entre moi et toi ^^")
    }

})

    //command server
NooBot.on('message', message =>
{
    if(message.content.startsWith(BotPfx + 'server')) 
    {
        let server_name = message.guild.name
        let server_size = message.guild.members.size
        let ServerEmbed = new Discord.RichEmbed()
            .setDescription("Caractéristique de " + server_name)
            .setColor("#fe09d5")
            .addField("Nom du server : " + server_name, "////////////////////////")
            .addField("Nombres de personnes : " + server_size, "////////////////////////")
        message.channel.send(ServerEmbed)
    }
})
    

    //command bonjour
NooBot.on('message', message =>
{
    if (message.content.startsWith(BotPfx + 'bonjour'))
    {
           let BjrMtn = message.mentions.members.first();

        if (BjrMtn != null)
        {
            message.delete(100);
            message.reply('te souhaite le bonjour ' + BjrMtn)
        }

        else
        {
            message.delete(100)
            message.author.send('Je te souhaite le bonjour')
        }
   
    }
})

NooBot.on('message', message =>

{
    if (message.content === reactPfx) 
    {
        message.react('😍');
    }
})

NooBot.on('message', message =>

{
    if (message.content.startsWith(BotPfx + 'info'))
    {
        let InfoEmbed = new Discord.RichEmbed()
            .setColor("#fe09d5")
            .setTitle("Mes INFO")
            .addField(`Je suis en developpement`, "Conçus par khustalk#1021")
            .setDescription(`Je me trouve sur ${NooBot.guilds.size} servers`)
        message.channel.send(InfoEmbed)
    
    }
})

    
    //Command Avatar
NooBot.on('message', message =>
{


    if (message.content.startsWith(BotPfx + 'avatar'))
    {
        let AvtrMtn = message.mentions.members.first();
        if (AvtrMtn != null)
        {
            let AvtrMtnEmbed = new Discord.RichEmbed()
                .setTitle(":warning: Ta mention m'a conduit en ERREUR :warning:")
                .setColor("#fe0509")
            message.reply(AvtrMtnEmbed)
        }

        else
        {
        let ImgAvtr = message.author.avatarURL
        let AvtrEmbed = new Discord.RichEmbed()
            .setTitle("Votre Avatar :")
            .setAuthor(`${user.username}`, user.displayAvatarURL)
            .setDescription("clic ci-dessus pour avoir le lien.")
            .setURL(ImgAvtr)
            .setColor("#fe09d5")
            .setImage(ImgAvtr)
        message.author.send(AvtrEmbed)
        
        let AvtrEmbedComfrim = new Discord.RichEmbed()
            .setTitle("Votre Avatar a été envoyer dans vos message privé, en plus il est cool ^^")
            .setColor("#fe09d5")
        message.delete(100)
        message.reply(AvtrEmbedComfrim)
                
        }
    }
})
       
    
    //command sondage
NooBot.on('message', message =>
{
    if (message.content.startsWith(BotPfx + 'sondage')) 
    {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission");     
        let msgsondage = message.content.split(" ");
            let questsondage = msgsondage.slice(1)        
            let tte = questsondage.join(" ")
            
            if(!tte[0]) return message.channel.send("Tu dois me donner un sondage !")
            let user = message.author;
                var sondage_embed = new Discord.RichEmbed()
                    .setTitle("Sondage")
                    .setAuthor(`${user.username}`, user.displayAvatarURL)
                    .addField(tte, "Répondre avec :heavy_check_mark: ou :x:")
                    .setColor('#fe09d5')
                    .setTimestamp(new Date())
                    message.channel.send(sondage_embed)
                    .then(function (message) 
                    {
                        message.react("✔")
                        message.react("❌")
                    }).catch(function(){
                    });
        }
    
})

NooBot.on('message', message =>
{
    if(message.content.startsWith(BotPfx + 'createrole'))
    {
        let MsgCreateRole = message.content.split(" ");
            let NomRole = MsgCreateRole.slice(1)  
             
    if (!message.channel.permissionsFor(message.member).hasPermission("ADMINISTRATOR")){
        message.reply("Tu n'as pas la permission de creer un role")
    }else{
    let createrole = NomRole.join(" ")
    let ColorRole = "#fe09d5"
    message.guild.createRole({
        name: createrole,
        color: ColorRole,
        permissions:[]
      })
      let createroleEmbed = new Discord.RichEmbed()
        .setTitle("Create Role system")
        .setColor("#fe09d5")
        .addField(`${createrole} a été créer`,  `La couleur définie est ${ColorRole}`)
    message.channel.send(createroleEmbed)
    
    }
    }

})
        
        
    /* NooBot.on('message', message => 
    {
        if(message.content.startsWith(BotPfx + "play"))
        {
            if(message.member.voiceChannel)
            {
                message.member.voiceChannel.join().then(connection => 
                    {
                        connection.playConvertedStream(message[1]);
                        message.channel.send("Je suis connecter")
                    })
            }
            else
            {
                message.channel.send("Vous devez vous connecter dans un salon vocal")
            }
        }

    })

    NooBot.on('message', message => 
    {
        if(message.content.startsWith(BotPfx + "leave"))
        {
            if(message.member.voiceChannel)
            {
                
                
            }
        }

    }) */
    
        



NooBot.login(process.env.TOKEN)
