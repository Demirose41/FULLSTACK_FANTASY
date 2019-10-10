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
            deathCheck(target)
            $('#enemyBench>div').unbind('click')
            return action++
        }else{
        chime(`${target.name} takes ${damage} damage`)
        globalUpdate()
        deathCheck(target)
        }
        blackMage.mp -=1; 
        $('#enemyBench>div').unbind('click');
       return action++
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
            deathCheck(target)
            $('#enemyBench>div').unbind('click')
            return action++
        }else{
        chime(`${target.name} takes ${damage} damage`)
        globalUpdate()
        deathCheck(target)
        }
        blackMage.mp -=1;
        $('#enemyBench>div').unbind('click') 
       return action++
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
        caster.animate({'left':'+=3em'},500,'linear')
        setTimeout(function(){
        caster.css("background-image", "url(" + caster.data().idleSprite + ")")
        },1300) 
        let damage= ((caster.data().intellect * 2)+Math.floor(Math.random()*10 +55)*typeBonus)
        blackMage.mp-- 
        target.hp -=damage
        if(crit == true){
            chime(`${target.name} takes ${damage} critical damage!!!`)
            globalUpdate()
            deathCheck(target)
            $('#enemyBench>div').unbind('click')
            return action++
        }else{
        chime(`${target.name} takes ${damage} damage`)
        globalUpdate()
        deathCheck(target)
        }
        $('#enemyBench>div').unbind('click')
        blackMage.mp--
       return action++
    },
    // White Magic
    cure : function(caster,target){
        $('.listMenu').hide()
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
        globalUpdate()
    
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
deathCheck(target)
$('#enemyBench>div').unbind('click')
return action++
}

// Makes all enemies targetable

const deathCheck=(target) =>{
    if(target.hp <=0){
        target.dead=true
        if(target.name == 'fighter'){
         $('#p1').css("background-image", "url(" + ' Sprites/Warrior/Warrior-Dead.gif' + ")");
        console.log('fighter dead')
        }
        else if(target.npc == true){
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
// player stats and current inventory 
const player ={
    inventory: ['potion'],
    score: 0, 
}

// Party Members
const fighter = {
    name : 'fighter',
    level : 1,
    attack : 40,
    hp : 100,
    hpMax:100,
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
    attackSprite:' Sprites/Warrior/Warrior-AttackL.gif',
    idleSprite: 'Sprites/Warrior/Warrior-Walk.gif',
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
    agility : 9,
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
    updateHUD(){
        $('#p2_hp').text(`HP:${this.hp}/${this.hpMax}`)
        $('#p2_mp').text(`MP:${this.mp}/${this.mpMax}`)
    }
}
const whiteMage = {
    name:'WhiteMage',
    level : 1,
    attack:12,
    hp : 60,
    hpMax:60,
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
    updateHUD(){
        $('#p3_hp').text(`HP:${this.hp}/${this.hpMax}`)
        $('#p3_mp').text(`MP:${this.mp}/${this.mpMax}`)
    }

}
const blackMage = {
    name:'BlackMage',
    level : 1,
    attack: 15,
    hp : 60,
    hpMax:60,
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
        this.attack=12
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
    randomAttack(target){
        let selector = Math.floor(Math.random()*2)
        if(selector = 1){
            attack(this.goblin,target)
     }
    }

    
}


gameOver=()=>{
    alert('Game Over')
}
// $('#enemyBench').children().attr('background-image',`Sprites/Enemies/Goblin.gif`)
const chime = function(message) {
    $('#messageWindow').hide(); 
    $('#messageWindow').show();
    $('#messageWindow').text(message);
     setTimeout(function(){$('#messageWindow').hide()},6000 )
}
const roundSelector=(num)=>{
 if(num=1){
     Round1();
 }
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
// for(let i = 0; i <11;i++){

//     let round = 1;
//     roundSelector(round)
//     // Round
//     globalUpdate();
//     while(($('#p1').hp && $('#p2').hp && $('#p3').hp&&$('#p4').hp)||$('#e1').hp &&$('#e2').hp&&$('#e3').hp&&$('#e4').hp&&$('#e5').hp != 0){
//         gameOver();
//     }
//     let action = 0;
//     while(action=0){
//         console.log('hola')
//         $('#attack').click(function(){
//             // attack(fighter,fighter);
//             attack(fighter,$('#e1').data())
//         })
//         $('#magic').click(function(){    
//             spellsMaster.fire(blackMage,$('#e3').data())
//         })
//     }
        
// }
    // Add Round enemy selection here
// Round 1 
    

// let GoblinA = new goblin(`Goblin1`,1);
// $('#e1').data(GoblinA);
// let GoblinB = new goblin(`Goblin1`,2)
// let GoblinC = new goblin(`Goblin1`,3)
// let GoblinD = new goblin(`Goblin1`,4)
// let GoblinE = new goblin(`Goblin1`,5)
// attack(fighter,gob   lin)
// user will be whoever's turn it is 
// attackCmd will be one of the possible actions the user can take and will allow them to choose any enemy that is still alive 
// to attack
const attackCmd=(user)=>{
    $('#attack').click(function(){
        $('.listMenu').hide()
        for(let i = 1;i < 6;i++){
            if( $(`#e${i}`).data().dead== false){
                $(`#e${i}`).click(function(){
                    attack(user,$(`#e${i}`).data())
                })
            }
        }
        chime('Select a Target');
    })
}
// magicCommand
const magicCmd=(user)=>{
    $('#magic').click(function(){
        chime('Select a Spell');
        if(user.data().name =='BlackMage'){
            $('#blackMenu').show();
        }else if(user.data().name == 'WhiteMage'){
            $('#whiteMenu').show()
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
                    console.log('We get this far')
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
        for(let i = 1;i < 5;i++){
            if( $(`#p${i}`).data().dead== false){
                $(`#p${i}`).click(function(){                
                    spellsMaster.cure(caster,$(`#p${i}`).data())
                    
                })
            }
                
        }chime('Select a Target')
    }
    
    
    // RUNNING CODE
    roundSelector(1);
    globalUpdate()
    $('.listMenu').hide()
    


    magicCmd($('#p3'))
    // $('#fireBtn').click(function(){
    //     setFire($('#p4'))
    // })
    attackCmd($('#p2'))
    // $('#magic').click(function(){    
        //     spellsMaster.fire($('#p4'),$('#e3').data())
        // })
        // attackCmd($('#p1'));