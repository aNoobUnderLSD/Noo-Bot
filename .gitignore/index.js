const Discord = require('discord.js')
const NooBot = new Discord.Client()
const BotPfx = '*'
const reactPfx = '§react'
//const meteo = require("weather-js");

function RdmStatus() {
    var status = [`son developpement`, `${NooBot.guilds.size} serveurs`, `khustalk#1021`]
    var random = status[Math.floor(Math.random() * status.length)]
   NooBot.user.setActivity(random, { type: 'WATCHING' })
    }


//instance
NooBot.on('ready', function ()
{
  
    console.log("NooBot is start");
    setInterval(RdmStatus, 3000)

NooBot.user.setStatus('DND')
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
        member.guild.owner.send(`${member.nickname} viens de join`);
    console.log(consolelogadd)
    })

    

    
})

NooBot.on("message", message => 
{
    //anti @everyone
    if(message.content.startsWith('@everyone'))
    {
        if (!message.guild.member(NooBot.user).hasPermission('MANAGE_MESSAGES'))
        {
            message.guild.owner.send(`Je n'ai pas la permission de gérer les messages sur ${message.guild.name} car ${message.author} a fait un @here`)
        }
        else
        {
            message.delete(100)
            message.guild.owner.send(`${message.author} à fais un @everyone sur ${message.guild.name}`)
            message.author.send(`Tu n'as pas le droit de faire des @everyone sur ${message.guild.name}`)
            console.log(`le @everyone à été supprimer de ${message.author} sur ${message.guild.name}`)
        }
    }

    //anti @here
    if(message.content.startsWith('@here'))
    {
        if (!message.guild.member(NooBot.user).hasPermission('MANAGE_MESSAGES'))
        {
            message.guild.owner.send(`Je n'ai pas la permission de gérer les messages sur ${message.guild.name} car ${message.author} a fait un @here`)
        }
        else
        {
            message.delete(100)
            message.guild.owner.send(`${message.author} à fais un @here sur ${message.guild.name}`)
            message.author.send(`Tu n'as pas le droit de faire des @here sur ${message.guild.name}`)
            console.log(`le @here à été supprimer de ${message.author} sur ${message.guild.name}`)
        }
    }

    //command stats
    if (message.content.startsWith(BotPfx + 'stats'))
    {
        if (!message.guild.member(NooBot.user).hasPermission('SEND_MESSAGES')) return message.guild.owner.send(`Je n'ai pas la permission de parler sur ${message.guild.name}`)
        
        let StatsEmbed = new Discord.RichEmbed()
            .setTitle(`stats de : ${message.author.username}`)
            .addField(`Nombre de message envoyer sur ${message.guild.name}`, `Ton compte a été créer le ${message.author.createdAt}`, `Ton ID : ${message.author.id}`)

        message.reply("tes stats son dans t'es MP ^^")
        message.author.send(StatsEmbed).catch((err) =>
        {
            message.reply(":warning: Je peux pas t'envoyer toutes mes commands tu dois activé les messages privés provenant de membres de serveurs dans tes paramètres :warning:")
            
        })
    }


//command aide
    
    if(message.content.startsWith(BotPfx + 'aide')) 
    {
        if (!message.guild.member(NooBot.user).hasPermission('SEND_MESSAGES')) return message.guild.owner.send(`Je n'ai pas la permission de parler sur ${message.guild.name}`)
        
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
            message.reply(":warning: Je peux pas t'envoyer toutes mes commands tu dois activé les messages privés provenant de membres de serveurs dans tes paramètres :warning:")
        })
        message.reply("Toutes mes commandes sont dans tes messages privée entre moi et toi ^^")
    }



    //command server

    if(message.content.startsWith(BotPfx + 'server')) 
    {
        if (!message.guild.member(NooBot.user).hasPermission('SEND_MESSAGES')) return message.guild.owner.send(`Je n'ai pas la permission de parler sur ${message.guild.name}`)

        let server_name = message.guild.name
        let server_size = message.guild.members.size
        let ServerEmbed = new Discord.RichEmbed()
            .setDescription("Caractéristique de " + server_name)
            .setColor("#fe09d5")
            .addField("Nom du server : " + server_name, "////////////////////////")
            .addField("Nombres de personnes : " + server_size, "////////////////////////")
        message.channel.send(ServerEmbed)
    }
    

    //command bonjour

    if (message.content.startsWith(BotPfx + 'bonjour'))
    {
        if (!message.guild.member(NooBot.user).hasPermission('SEND_MESSAGES')) return message.guild.owner.send(`Je n'ai pas la permission de parler sur ${message.guild.name}`)

           let BjrMtn = message.mentions.members.first();

        if (BjrMtn != null)
        {
            message.delete(100);
            message.reply('te souhaite le bonjour ' + BjrMtn)
        }

        else
        {
            message.delete(100)
            message.author.send('Je te souhaite le bonjour').catch((err) =>
            {
                message.reply(":warning: Je peux pas t'envoyer toutes mes commands tu dois activé les messages privés provenant de membres de serveurs dans tes paramètres :warning:")
            })
        }
   
    }


    // commande info

    if (message.content.startsWith(BotPfx + 'info'))
    {
        if (!message.guild.member(NooBot.user).hasPermission('SEND_MESSAGES')) return message.guild.owner.send(`Je n'ai pas la permission de parler sur ${message.guild.name}`)

        let InfoEmbed = new Discord.RichEmbed()
            .setColor("#fe09d5")
            .setTitle("Mes INFO")
            .addField(`Je suis en developpement`, "Conçus par khustalk#1021")
            .setDescription(`Je me trouve sur ${NooBot.guilds.size} servers`)
        message.channel.send(InfoEmbed)
    
    }


    
    //Command Avatar

    if (message.content.startsWith(BotPfx + 'avatar'))
    {
        if (!message.guild.member(NooBot.user).hasPermission('SEND_MESSAGES')) return message.guild.owner.send(`Je n'ai pas la permission de parler sur ${message.guild.name}`)

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
        let user = message.author

        let AvtrEmbedComfrim = new Discord.RichEmbed()
            .setTitle("Votre Avatar a été envoyer dans vos message privé, en plus il est cool ^^")
            .setColor("#fe09d5")

        let AvtrEmbed = new Discord.RichEmbed()
            .setTitle("Votre Avatar :")
            .setAuthor(`${user.username}`, user.displayAvatarURL)
            .setDescription("clic ci-dessus pour avoir le lien.")
            .setURL(ImgAvtr)
            .setColor("#fe09d5")
            .setImage(ImgAvtr)
        message.delete(100)
        message.author.send(AvtrEmbed)
            .catch((err) =>
        {
            message.reply(":warning: Je peux pas t'envoyer toutes mes commands tu dois activé les messages privés provenant de membres de serveurs dans tes paramètres :warning:")
        })
        
        
                
        }
    }

       
    
    //command sondage 

    if (message.content.startsWith(BotPfx + 'sondage')) 
    {
        if (!message.guild.member(NooBot.user).hasPermission('SEND_MESSAGES')) return message.guild.owner.send(`Je n'ai pas la permission de parler sur ${message.guild.name}`)
        if (!message.guild.member(NooBot.user).hasPermission('MANAGE_EMOJIS')) return message.guild.owner.send(`Je n'ai pas la permission d'utiliser les emojis sur ${message.guild.name}`)

  
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


NooBot.login(process.env.TOKEN)
