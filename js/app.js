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
    fire : function(caster,target){
       let typeBonus = 1
       if(target.weakness.includes('fire')){
           typeBonus = 1.5;
       }
        let damage= ((caster.intellect * 2)+Math.floor(Math.random()*10 +55)*typeBonus)
        caster.mp-- 
        target.hp -=damage
        console.log(`${target.hp} Target HP \n ${caster.mp} Caster MP `)
       return damage
    },
    thunder : function(caster,target){
        let typeBonus = 1
        if(target.weakness.includes('thunder')){
            typeBonus = 1.5;
        }
         let damage= ((caster.intellect * 1.5)+Math.floor(Math.random()*10 +55)*typeBonus)
         caster.mp-- 
         target.hp -=damage
         console.log(`${target.hp} Target HP \n ${caster.mp} Caster MP `)
        return damage
    },
    ice : function(caster,target){
        let typeBonus = 1
        if(target.weakness.includes('ice')){
            typeBonus = 1.5;
        }
         let damage= ((caster.intellect * 2)+Math.floor(Math.random()*10 +55)*typeBonus)
         caster.mp-- 
         target.hp -=damage
         console.log(`${target.hp} Target HP \n ${caster.mp} Caster MP `)
        return damage
    }
}
// Attack Command
const attack = (user,target)=>{
let hits = Math.floor(1+((Math.random()*user.agility)/5))
for(let i = 0;i<hits;i++){
    damage = Math.floor(Math.random()*(user.attack/10)+user.attack)
    target.hp -=damage
    console.log(`enemy takes ${damage} damage`)
}   
}

// player stats and current inventory 
const player ={
    inventory: ['potion'],
    score: 0 // This is to toggle player control during transitional screens
}

// Party Members
const fighter = {
    name : 'fighter',
    level : 1,
    attack : 40,
    hp : 100,
    mp : 0,
    strength : 10,
    agility : 6,
    intellect : 4,//Int will be spell damage modifier
    defense : 10,
    sprite : 'Sprites/Warrior-Walk.gif',//Get sprite for fighter
    spellList : [],//If length is less than 1, dont show the spell option in the menu
    abilityList : [],//Melee abilities, passives 
    npc : false,
}
const monk = {
    level : 1,
    attack: 28,
    hp : 80,
    mp : 0,
    strength : 8,
    agility : 9,
    intellect : 4,//Int will be spell damage modifier
    mind : 6,
    defense : 7,
    sprite : '',//Get sprite for monk
    spellList : [],//If length is less than 1, don't show the spell option in the menu
    abilityList : [],//Melee abilities, passives 
    npc : false,
}
const whiteMage = {
    level : 1,
    attack:12,
    hp : 60,
    mp : 10,
    strength : 4,
    agility : 5,
    intellect : 6,
    mind : 9,
    defense : 5,
    sprite : '',
    spellList :['cure','cureII','cureIII'],
    abilityList :[],
    npc : false

}
const blackMage = {
    level : 1,
    attack: 15,
    hp : 60,
    mp : 10,
    strength : 4,
    agility : 5,
    intellect : 9,
    mind : 6,
    defense : 5,
    sprite : '',
    spellList :['fire','ice','thunder'],
    abilityList :[],
    npc : false

}
// Enemies
class goblin {
    constructor(name){
        this.name = name;
        level:1
        attack:12
        hp:120
        mp:6
        strength:5
        agility:8
        intellect:2
        mind: 6
        defense:3
        sprite :''
        spellList :['Goblin Punch']
        abilityList: []
        npc : true
        weakness: ['fire']
    }
    
}
// Combat   
const combat = () =>{
    //load in characters in sceen while 
    // $transition.show()
    // loadSet()
    // $transition.hide()


}

// $('#enemyBench').children().attr('background-image',`Sprites/Enemies/Goblin.gif`)
const alert = (message) =>{
     $('#messageWindow').text(message);
     $('#messageWindow').show();
     setTimeout(function(){$('#messageWindow').hide()},3000)
}
// alert('help');


