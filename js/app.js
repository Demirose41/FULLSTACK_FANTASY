// Master Lists of items 
const itemList ={
    potion: function(obj){
         if(player.inventory.includes('potion')){
            obj.hp+=100
            console.log(`${obj.name} uses a potion\n ${obj.hp}`)
            let index = player.inventory.indexOf('potion')
            player.inventory.splice(index,1);
        }else{
            console.log('You dont have anymore')
        }

    },
    hiPotion: function(obj){
        obj.hp+=500
        console.log(`${obj.name} uses a hi-potion`)
    },
    ether: function(obj){
        obj.mp+=10
        console.log(`${obj.name} uses an ether`)
    }
}
// player stats and current inventory 
const player ={
    inventory: ['potion'],
    score: 0,
    active:true, // This is to toggle player control during transitional screens
}

// Characters
const fighter = {
    name : 'fighter',
    level : 1,
    hp : 100,
    mp : 0,
    strength : 8,
    agility : 6,
    intellect : 4,//Int will be spell damage modifier
    defense : 10,
    sprite : '',//Get sprite for fighter
    spellList : [],//If length is less than 1, dont show the spell option in the menu
    abilityList : [],//Melee abilities, passives 
    npc : false,
}
const monk = {
    level : 1,
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
// Player
const combat = () =>{
    //load in characters in sceen while 
    // $transition.show()
    // loadSet()
    // $transition.hide()
    itemList.potion

}
itemList.potion(fighter)
itemList.potion(fighter)