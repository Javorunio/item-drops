class Loot {
    #name
    #weight
    
    constructor(name, weight){
        this.#name = name
        this.#weight = weight
    }

    get name(){
        return this.#name
    }

    get weight(){
        return this.#weight
    }
}

class Drop{
    static single(lootTable){
        if(lootTable.constructor.name != "Array") throw new Error("lootTable must be an instance of Array")
        let totalWeight = 0

        lootTable.forEach(element => {
            if(element.constructor.name != "Loot") throw new Error("Function accepts only arrays consisting of Loot class objects")
            totalWeight += element.weight
        });

        
        const RN = Math.random() * totalWeight

        let index = 0
        let currentWeight = lootTable[index].weight

        while(RN > currentWeight){
            index++
            currentWeight += lootTable[index].weight

            if(RN > totalWeight) throw new Error("Unexpected error: Could not select any item out of lootTable")
        }

        return lootTable[index]
    }

    static multipleUnique(lootTable, amount){
        if(lootTable.constructor.name != "Array") throw new Error("lootTable must be an instance of Array")
        if(amount.constructor.name != "Number") throw new Error("amount must be an instance of Number")
        if(amount > lootTable.length) throw new Error("Cannot drop more unique loot than lootTable holds")

        const drops = new Array
        for(let i = 0; i < amount; i++){
            do{
                drops[i] = Drop.single(lootTable)
            }
            while(alreadyThere(drops[i]))
        }

        function alreadyThere(drop){
            let occurrences = 0

            drops.forEach((value) => {
                if(value == drop) occurrences++
            })

            if(occurrences < 2) return false
            else return true
        }

        return drops
    }
}

//test

const goblinDrops = [
    new Loot("Short sword", 35),
    new Loot("Knife", 25),
    new Loot("Bow", 20),
    new Loot("Torch", 10),
    new Loot("Axe", 7.5),
    new Loot("Wand", 2),
    new Loot("Gem", 0.5),
]

console.log(`Single: ${Drop.single(goblinDrops).name}`)
Drop.multipleUnique(goblinDrops, 3).forEach((value, index) => console.log(`Drop ${index}: ${value.name}`))