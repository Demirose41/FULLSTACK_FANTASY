// Variable storage
let round = 1;
let turn = 0;

const checkVictory=()=>{
    gameOver()
    if($('#e1').data().hp <= 0&&$('#e2').data().hp <= 0&&$('#e3').data().hp <= 0&&$('#e4').data().hp <= 0&&$('#e5').data().hp <= 0){
       
        let buffer = setInterval(function() {chime('Victory!!!')
        $('#p1').css("background-image", "url(" + fighter.victorySprite + ")")
        $('#p2').css("background-image", "url(" + monk.victorySprite + ")")
        $('#p3').css("background-image", "url(" + whiteMage.victorySprite + ")")
        $('#p4').css("background-image", "url(" + blackMage.victorySprite + ")")
        $('audio').attr('src','audio/11.mp3')
        document.querySelector('audio').play()
        clearInterval(buffer)
    },2000)
}
}
// Round Storage
const Round1=()=>{
    $('body').css("background-image", "url(" + ' Sprites/Backgrounds/Forest.gif' + ")") 
    globalUpdate()
    for(let i = 1; i<6 ;i++){
        let letters = [' ','A','B','C','D','E']
        let enemy = new goblin(`Goblin${letters[i]}`,`${i}`)
        $(`#e${i}`).data(enemy);
    }
}
const Round2=()=>{
    $('body').css("background-image", "url(" + ' Sprites/Backgrounds/Plains.gif' + ")") 
    globalUpdate()
    for(let i = 1; i<6 ;i++){
        let letters = [' ','A','B','C','D','E']
        let enemy = new goblin(`Goblin${letters[i]}`,`${i}`)
        $(`#e${i}`).data(enemy);
    }
}
// Round Loader.. Will load in the enemies designated for each specific round
const roundSelector=(num)=>{
 if(num=1){
     Round1();
 }
}
// Master Lists of items 
const itemsMaster ={
    potion: function(obj){
         if(player.inventory.includes('potion')){
            obj.hp+=100
            console.log(`${obj.name} uses a potion\n ${obj.hp}`)
            let index = player.inventory.indexOf('potion')
            player.inventory.splice(index,1);
        }
    },
    hiPotion: function(obj){
        if(player.inventory.includes('hi-potion')){
            obj.hp+=500
            console.log(`${obj.name} uses a hi-potion`)
            let index = player.inventory.indexOf('hi-potion')
            player.inventory.splice(index,1);
        }
    },
    ether: function(obj){
        if(player.inventory.includes('ether')){
            obj.mp+=10
            console.log(`${obj.name} uses an ether`)
            let index = player.inventory.indexOf('hi-potion')
            player.inventory.splice(index,1)
        }
    }
}
// Master Spell list
const spellAnimation = (color)=>{
    let i = 0
    let frame =setInterval(function(){
        if(i==7){
            clearInterval(frame)
        }
        if(i % 2 == 0){
            $('body').css('background-color',`${color}`)
            i++
        }else{
            $('body').css('background-color','black')
            i++
        }
    },150)
}
const spellsMaster = {
    // Black Magic
    fire : function(caster,target){
       $('.listMenu').hide()
       let typeBonus = 1;
       let crit = false;
       //Makes sure the caster has MP to cast
       if(caster.data().mp == 0 || target.dead==true){
           return 
       }
       //Check for weakness
       if(target.weakness.includes('fire')){
           typeBonus = 1.5;
           crit = true;
       }
       caster.animate({'left':'-=3em'},500,"linear")
       caster.css("background-image", "url(" + caster.data().castSprite + ")")
       spellAnimation('red');
       caster.animate({'left':'+=3em'},500,'linear')
       setTimeout(function(){
       caster.css("background-image", "url(" + caster.data().idleSprite + ")")
       },1300)  
        let damage= ((caster.data().intellect * 2)+Math.floor(Math.random()*10 +55)*typeBonus)
        target.hp -=damage;
        if(crit == true){
            chime(`${target.name} takes ${damage} critical damage!!!`)
            blackMage.mp -=1; 
            globalUpdate()
            deathCheckNpc(target)
            $('#enemyBench>div').unbind('click')
            caster.data().action++
            menuWipe()
            checkVictory()
            turn++
            runTurn(turn)
            return 
        }else{
        chime(`${target.name} takes ${damage} damage`)
        globalUpdate()
        deathCheckNpc(target)
        }
        blackMage.mp -=1; 
        $('#enemyBench>div').unbind('click');
        menuWipe()
        checkVictory()
        turn++
        runTurn(turn)
        return 
    },
    thunder : function(caster,target){
        $('.listMenu').hide()
        let typeBonus = 1
        let crit = false;
        if(caster.data().mp == 0|| target.dead==true){
           return 
        }
        if(target.weakness.includes('thunder')){
            typeBonus = 1.5;
            crit = true
        }
        caster.animate({'left':'-=3em'},500,"linear")
       caster.css("background-image", "url(" + caster.data().castSprite + ")")
       caster.animate({'left':'+=3em'},500,'linear')
       setTimeout(function(){
       caster.css("background-image", "url(" + caster.data().idleSprite + ")")
       },1300) 
        let damage= ((caster.data().intellect * 2)+Math.floor(Math.random()*10 +55)*typeBonus)
        target.hp -=damage
        if(crit == true){
            chime(`${target.name} takes ${damage} critical damage!!!`)
            blackMage.mp -=1; 
            globalUpdate()
            deathCheckNpc(target)
            $('#enemyBench>div').unbind('click')
            menuWipe()
            checkVictory()
            turn++
            runTurn(turn)
            return 
        }else{
        chime(`${target.name} takes ${damage} damage`)
        globalUpdate()
        deathCheckNpc(target)
        }
        blackMage.mp -=1;
        $('#enemyBench>div').unbind('click') 
        caster.data().action++
        menuWipe()
        checkVictory()
        turn++
        runTurn(turn)
        return 
    },
    ice : function(caster,target){
        $('.listMenu').hide()
        let typeBonus = 1
        let crit = false;
        if(caster.data().mp == 0|| target.dead==true){
           return 
        }
        if(target.weakness.includes('ice')){
            typeBonus = 1.5;
            crit = true
        }
        caster.animate({'left':'-=3em'},500,"linear")
        caster.css("background-image", "url(" + caster.data().castSprite + ")")
        spellAnimation('blue')
        setTimeout(function(){
            caster.animate({'left':'+=3em'},500,'linear')
        },2000)
        setTimeout(function(){
        caster.css("background-image", "url(" + caster.data().idleSprite + ")")
        },3300) 
        let damage= ((caster.data().intellect * 2)+Math.floor(Math.random()*10 +55)*typeBonus)
        blackMage.mp-- 
        target.hp -=damage
        if(crit == true){
            chime(`${target.name} takes ${damage} critical damage!!!`)
            globalUpdate()
            deathCheckNpc(target)
            $('#enemyBench>div').unbind('click')
            caster.data().action++
            menuWipe()
            checkVictory()
            turn++
            runTurn(turn)
            return 
        }else{
        chime(`${target.name} takes ${damage} damage`)
        globalUpdate()
        deathCheckNpc(target)
        }
        $('#enemyBench>div').unbind('click')
        blackMage.mp--
        caster.data().action++
        menuWipe()
        checkVictory()
        turn++
        runTurn(turn)
        return 
    },
    // White Magic
    cure : function(caster,target){
        if(caster.data().mp <= 0|| target.dead==true){
            return 
         }
        caster.animate({'left':'-=3em'},500,"linear")
        caster.css("background-image", "url(" + caster.data().castSprite + ")")
        caster.animate({'left':'+=3em'},500,'linear')
        setTimeout(function(){
        caster.css("background-image", "url(" + caster.data().idleSprite + ")")
        },1300) 
        let healing= ((caster.data().mind * 2)+Math.floor(Math.random()*10 +40))
        whiteMage.mp--
        target.hp += healing
        if(target.hp > target.hpMax){
            target.hp = target.hpMax
        }
        chime(`${target.name} is healed for ${healing} HP`)
        healthUpdate()
        globalUpdate()
        menuWipe()
        checkVictory()
        turn++
        console.log('7')
        runTurn(turn)
        return
    },
    holy : function(caster,target){
        if(caster.data().mp <= 0|| target.dead==true){
            return 
         }
        $('.listMenu').hide()
        let typeBonus = 1
        let crit = false;
        if(caster.data().mp == 0|| target.dead==true){
           return 
        }
        if(target.weakness.includes('holy')){
            typeBonus = 1.5;
            crit = true
        }
        caster.animate({'left':'-=3em'},500,"linear")
        caster.css("background-image", "url(" + caster.data().castSprite + ")")
        caster.animate({'left':'+=3em'},500,'linear')
        setTimeout(function(){
        caster.css("background-image", "url(" + caster.data().idleSprite + ")")
        },1300) 
        let damage= ((caster.data().intellect * 2)+Math.floor(Math.random()*10 +55)*typeBonus)
        whiteMage.mp-=2
        target.hp -=damage
        if(crit == true){
            chime(`${target.name} takes ${damage} critical damage!!!`)
            globalUpdate()
            deathCheckNpc(target)
            $('#enemyBench>div').unbind('click')
            caster.data().action++
            menuWipe()
            checkVictory()
            turn++
            runTurn(turn)
            return 
        }else{
        chime(`${target.name} takes ${damage} damage`)
        globalUpdate()
        deathCheckNpc(target)
        }
        $('#enemyBench>div').unbind('click')
        whiteMage.mp -=2
        caster.data().action++
        menuWipe()
        checkVictory()
        turn++
        runTurn(turn)
        return 
    }
}
// Attack Command
const attack = (user,target)=>{

if(target.hp == 0){
    return
}    
let hits = Math.floor(1+((Math.random()*user.data().agility)/5))
let total=0;
if(target.hp>0)
{for(let i = 0;i<hits;i++){
    damage = Math.floor(Math.random()*(user.data().attack/10)+user.data().attack)
    total +=damage
} } 
target.hp -=total
if(target.hp < 0){
    target.hp = 0
}
chime(`${target.name} takes ${total} damage`)
user.animate({'left':'-=3em'},500,"linear")
user.css("background-image", "url(" + user.data().attackSprite + ")")
user.animate({'left':'+=3em'},500,'linear')
setTimeout(function(){
    user.css("background-image", "url(" + user.data().idleSprite + ")")
},1300)
// user.css("background-image", "url(" + ' Sprites/Warrior/Warrior-Walk.gif' + ")")

globalUpdate();
deathCheckNpc(target)
menuWipe()
turn++
console.log('8')
runTurn(turn)
return 
}
const npcAttack = (user,target)=>{
    
    if(target.hp == 0){
        return
    }
let hits = Math.floor(1+((Math.random()*user.data().agility)/5))
console.log(`Hits : ${hits}`)
console.log(`agi ${user.data().agility}`)
let total=0;
if(target.hp>0)
{for(let i = 0;i<hits;i++){
    damage = Math.floor(Math.random()*(user.data().attack/10)+user.data().attack)
    total +=damage
} } 
console.log(`total : ${total}`)
target.hp -=total
if(target.hp < 0){
    target.hp = 0
}
chime(`${target.name} takes ${total} damage`)
user.animate({'left':'+=3em'},500,"linear")
user.animate({'left':'-=3em'},500,"linear")
// user.css("background-image", "url(" + ' Sprites/Warrior/Warrior-Walk.gif' + ")")
healthUpdate ()
globalUpdate();
deathCheckPc()
menuWipe()
turn++
console.log('9')
// runTurn(turn)
return    
}
const menuWipe = ()=>{
    $('#commands>div').unbind('click')
    $('#enemyBench>div').unbind('click')
    $('#partyBench>div').unbind('click')
    $('.listMenu>span').unbind('click')
}
const deathCheckNpc=(target) =>{
   if(target.hp <=0){
         if(target.npc == true){
         if(target.order==1){
             $('#e1').hide()
         }else if(target.order==2){
             $('#e2').hide()
         }else if(target.order==3){
            $('#e3').hide()
        }else if(target.order==4){
            $('#e4').hide()
        }else if(target.order==5){
            $('#e5').hide()
        }
        }
    }
}
const deathCheckPc=()=>{
    if($('#p1').data().hp <=0){
        $('#p1').css("background-image", "url(" + fighter.deathSprite + ")")
    }
    if($('#p2').data().hp <=0){
    $('#p2').css("background-image", "url(" + monk.deathSprite + ")")
    }
    if($('#p3').data().hp <=0){
    $('#p3').css("background-image", "url(" + whiteMage.deathSprite + ")")
    }
    if($('#p4').data().hp <=0){
    $('#p4').css("background-image", "url(" + blackMage.deathSprite + ")")
    }
}
const gameOver = () =>{
    if($('#p1').data().hp <= 0&&$('#p2').data().hp <= 0&&$('#p3').data().hp <= 0&&$('#p4').data().hp <= 0){     
    chime('Game Over')
    $('audio').attr('src','audio/gameOver.mp3')
    document.querySelector('audio').play()
    clearInterval(buffer)
    }

}
// player stats and current inventory 
const player ={
    inventory: ['potion'],
    score: 0, 
}

// Party Members
const fighter = {
    name : 'Fighter',
    level : 1,
    attack : 40,
    hp : 140,
    hpMax:140,
    mp : 0,
    mpMax:0,
    strength : 10,
    agility : 6,
    intellect : 4,//Int will be spell damage modifier
    defense : 10,
    spellList : [],//If length is less than 1, dont show the spell option in the menu
    abilityList : [],//Melee abilities, passives 
    npc : false,
    dead:false,
    action:0,
    attackSprite:' Sprites/Warrior/Warrior-AttackL.gif',
    idleSprite: 'Sprites/Warrior/Warrior-Walk.gif',
    deathSprite: 'Sprites/Warrior/Warrior-Dead.gif',
    victorySprite: 'Sprites/Warrior/Warrior-Victory.gif',
    updateHUD(){
        $('#p1_hp').text(`HP:${this.hp}/${this.hpMax}`)
        $('#p1_mp').text(`MP:${this.mp}/${this.mpMax}`)
    }
    
}
const monk = {
    name:'Monk',
    level : 1,
    attack: 28,
    hp : 180,
    hpMax:180,
    mp : 0,
    mpMax:0,
    strength : 8,
    agility : 14,
    intellect : 4,//Int will be spell damage modifier
    mind : 6,
    defense : 7,
    sprite : '',//Get sprite for monk
    spellList : [],//If length is less than 1, don't show the spell option in the menu
    abilityList : [],//Melee abilities, passives 
    npc : false,
    dead:false,
    attackSprite:' Sprites/Monk/Monk-AttackR.gif',
    idleSprite: 'Sprites/Monk/Monk-Walk.gif',
    deathSprite: 'Sprites/Monk/Monk-Dead.gif',
    victorySprite:'Sprites/Monk/Monk-Victory.gif',
    updateHUD(){
        $('#p2_hp').text(`HP:${this.hp}/${this.hpMax}`)
        $('#p2_mp').text(`MP:${this.mp}/${this.mpMax}`)
    }
}
const whiteMage = {
    name:'WhiteMage',
    level : 1,
    attack:12,
    hp : 80,
    hpMax:80,
    mp : 10,
    mpMax:10,
    strength : 4,
    agility : 5,
    intellect : 6,
    mind : 9,
    defense : 5,
    sprite : '',
    spellList :['cure','cureII','cureIII'],
    abilityList :[],
    npc : false,
    dead:false,
    attackSprite:' Sprites/WhiteMage/WhiteMage-AttackL.gif',
    idleSprite: 'Sprites/WhiteMage/WhiteMage-Walk.gif',
    castSprite: 'Sprites/WhiteMage/WhiteMage-cast.gif',
    deathSprite: 'Sprites/WhiteMage/WhiteMage-Dead.gif',
    victorySprite: 'Sprites/WhiteMage/WhiteMage-Victory.gif',
    updateHUD(){
        $('#p3_hp').text(`HP:${this.hp}/${this.hpMax}`)
        $('#p3_mp').text(`MP:${this.mp}/${this.mpMax}`)
    }

}
const blackMage = {
    name:'BlackMage',
    level : 1,
    attack: 15,
    hp : 80,
    hpMax:80,
    mp : 10,
    mpMax:10,
    strength : 4,
    agility : 5,
    intellect : 9,
    mind : 6,
    defense : 5,
    sprite : '',
    spellList :['fire','ice','thunder'],
    abilityList :[],
    npc : false,
    dead:false,
    attackSprite:' Sprites/BlackMage/BlackMage-AttackL.gif',
    idleSprite: 'Sprites/BlackMage/BlackMage-Walk.gif',
    castSprite: 'Sprites/BlackMage/BlackMage-cast.gif',
    deathSprite: 'Sprites/BlackMage/BlackMage-Dead.gif',
    victorySprite: 'Sprites/BlackMage/BlackMage-Victory.gif',
    updateHUD(){
        $('#p4_hp').text(`HP:${this.hp}/${this.hpMax}`)
        $('#p4_mp').text(`MP:${this.mp}/${this.mpMax}`)
    }

}
// Enemies
class goblin {
    constructor(name,order){
        this.name = name;
        this.order=order;
        this.level =1
        this.attack=150
        this.hp=120
        this.mp=6
        this.strength=5
        this.agility=8
        this.intellect=2
        this.mind=6
        this.defense=3
        this.sprite =''
        this.spellList =['Goblin Punch']
        this.abilityList= []
        this.npc = true
        this.weakness = ['fire']
        this.dead = false
    }


    
}



// $('#enemyBench').children().attr('background-image',`Sprites/Enemies/Goblin.gif`)
const chime = function(message) {
    $('#messageWindow').hide(); 
    $('#messageWindow').show();
    $('#messageWindow').text(message);

}
const globalUpdate = ()=>{
    $('#p1').data(fighter)
    fighter.updateHUD();
    $('#p2').data(monk)
    monk.updateHUD();
    $('#p3').data(whiteMage)
    whiteMage.updateHUD();
    $('#p4').data(blackMage)
    blackMage.updateHUD();
}
const healthUpdate =()=>{
    fighter.hp=$(`#p1`).data().hp
    monk.hp=$(`#p2`).data().hp
    whiteMage.hp=$(`#p3`).data().hp
    blackMage.hp=$(`#p4`).data().hp
}


    
    // user will be whomever's turn it is 
    // attackCmd will be one of the possible actions the user can take and will allow them to choose any enemy that is still alive 
    // to attack
    const attackCmd=(user,order)=>{
        checkVictory()
        $('#attack').click(function(){
            $('.listMenu').hide()
            $('#attack').text('Attack')
            for(let i = 1;i < 6;i++){
                if( $(`#e${i}`).data().dead== false){
                    $(`#e${i}`).click(function(){
                    attack(user,$(`#e${i}`).data(),order)
                })
            }   
        }
        $('#commands>div').unbind('click')
        chime('Select a Target');
        document.querySelector('audio').play()
        document.querySelector('audio').loop='true'
    })
}
// magicCommand
const magicCmd=(user)=>{
    checkVictory()
    $('#magic').text('Magic')
    $('#magic').click(function(){
        chime('Select a Spell');
        if(user.data().name =='BlackMage'){
            $('#blackMenu').show();
            $('#commands').unbind('click')
        }else if(user.data().name == 'WhiteMage'){
            $('#whiteMenu').show()
            $('#commands>div').unbind('click')
        }
        console.log(user.data().spellList)
        let workingList = user.data().spellList
        for(let i =0; i<workingList.length;i++){
            $(`#${workingList[i]}Btn`).css('visibility','visible')
        }
        
        $('#fireBtn').click(function(){
            setFire(user)
        })
        $('#iceBtn').click(function(){
            setIce(user)
        })
        $('#thunderBtn').click(function(){
            setThunder(user)
        })
        $('#cureBtn').click(function(){
            setCure(user)
        })
        $('#holyBtn').click(function(){
            setHoly(user)
        })
        
        
    })
    
}
// // Magic spell Targeting functions
// Black Magic
const setFire=(caster)=>{
    for(let i = 1;i < 6;i++){
        if( $(`#e${i}`).data().dead== false){
            $(`#e${i}`).click(function(){                
                spellsMaster.fire(caster,$(`#e${i}`).data())
                
            })
        }
        
    }chime('Select a Target')
}
const setIce=(caster)=>{
    for(let i = 1;i < 6;i++){
        if( $(`#e${i}`).data().dead== false){
            $(`#e${i}`).click(function(){                
                spellsMaster.ice(caster,$(`#e${i}`).data())
            })
        }
        
    }chime('Select a Target')
}
const setThunder=(caster)=>{
    for(let i = 1;i < 6;i++){
        if( $(`#e${i}`).data().dead== false){
            $(`#e${i}`).click(function(){                
                spellsMaster.thunder(caster,$(`#e${i}`).data())
                
            })
        }
        
    }chime('Select a Target')
}
// White Magic
const setCure=(caster)=>{
    $('.listMenu').hide()
    $('#cureBtn').unbind('click')
    for(let i = 1;i < 5;i++){
        if( $(`#p${i}`).data().hp>0){
            $(`#p${i}`).click(function(){                
                spellsMaster.cure(caster,$(`#p${i}`).data())
                
            })
        }
        
    }chime('Select a Target')
}
const setHoly=(caster)=>{
    for(let i = 1;i < 6;i++){
        if( $(`#e${i}`).data().dead== false){
            $(`#e${i}`).click(function(){                
                spellsMaster.holy(caster,$(`#e${i}`).data())
                
            })
        }
        
    }chime('Select a Target')
}
const runTurn=(i)=>{
   checkVictory() 
   deathCheckPc()
    if(i<4){
         
        if(turnOrder[i].data().hp <= 0){
            turn++
            console.log('Party Member Dead')
            runTurn(turn); 
        }
        else if(turnOrder[i].data().mpMax != 0){
            magicCmd(turnOrder[i])
        }
        attackCmd(turnOrder[i])            
    }
    if(i>=4&&i<turnOrder.length){
        document.querySelector('audio').play()
        if(turnOrder[i].data().hp <= 0){
            turn++
            console.log('11')
            runTurn(turn);
            return
        }else
        if(turn==turnOrder.length){
            if(turnOrder[4].data().hp == 0&&turnOrder[5].data().hp == 0&&turnOrder[6].data().hp == 0&&turnOrder[7].data().hp == 0&&turnOrder[8].data().hp == 0){
                round++
                chime('Victory!!!')
                return 
            }else{
                $('#attack').text('Attack')
                $('#magic').text('')
                turn=0
                chime('Your Turn')
                runTurn(turn)
            }
        } else{
            $('#attack').text('Enemy')
            $('#magic').text('Turn')
            let enemyTimer =setInterval(function(){
                let selector = Math.floor(Math.random()*4)
                
                if(turnOrder[i].hp != 0){
                    npcAttack(turnOrder[i],turnOrder[selector].data())
                    clearInterval(enemyTimer)
                    runTurn(turn)
                }else{
                    clearInterval(enemyTimer)
                    turn++
                    runTurn(turn)
                    
                    
                }
            },2500)
        }
    }
   
    if (turn == turnOrder.length){
        
            $('#attack').text('Attack')
            $('#magic').text('')
            turn=0
            chime('Your Turn')
            runTurn(turn)
        
    }
    
}

// Add Round enemy selection here
// Round 1 
// RUNNING CODE

roundSelector(1);
globalUpdate()
$('.listMenu').hide()
let turnOrder = []
for(let i =0;i<4;i++){
    turnOrder[i] = $(`#p${i+1}`)
}    
for(let i = 0;i<5;i++){
    turnOrder.push($(`#e${i+1}`))
}
runTurn(turn)


