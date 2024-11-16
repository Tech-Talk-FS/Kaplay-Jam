# Level Creation

* [The basic Model](#the-basic-model)
	* [Level.title](#leveltitle)
	* [Level.floor](#levelfloor)
	* [Level.dungeon](#leveldungeon)
	* [Level.ornaments](#levelornaments)
		* [Extending tiles](#extending-tiles)
	* [Interactions](#interactions)
	* [Increasing Stats](#increasing-stats)
	* [Replacing objects](#replacing-items)

Level creation is an attempt at being declarative but simple. Basically a level is made of up 2-3 layers (the ornaments layer is optional) + an additional fixed layer for the hud. 

I will try to make a sprite kit cheat sheet for everyone so they know what symbols do what. 


### The basic model
```ts
type Level = {
	title: string
	floor: string[]
	dungeon: string[]
	ornaments?: string[]
	setup?: ()=>void
	tiles?: {
		[k:string]: ()=>CompList
	}
}
```

#### Level.title
The name of the map. 

#### Level.floor
A an array of strings where spaces represent spots floor tiles are necessary. The floor is rendered differently from the dungeon and ornaments layer and only has a definition for a space. All other characters will be ignored

#### Level.dungeon
The dungeon is also an array of strings used to make a symbolic representation of the sprites within the scene. I am working on a helper sheet to help visualize the symbols but for now see [MAIN_SHEET.tiles](../charSheets.js)

#### Level.ornaments
*optional*

The ornaments layer is used to add sprites that are intended to be on top of an object in the dungeon level. for example a candle on a table. a banner on a wall. 

#### Level.setup
*optional*
The setup method is used to add in more complex interactions or custom behavior to tiles. 

While the setup method may be necessary it is advised utilizing the tiles object when possible.

#### Level.tiles
*optional*
The tiles object is a character sheet that can be used on conjuction with the default character sheet to modify existing objects or add new objects prior to the tiling system rendering the tiles. 

##### Extending tiles
**lets assume you have a default character sheet of:**
```ts
const charsheet = {
	tileWidth: 16,
	tileHeight: 16,
	tiles: {
		"@": () => [
			sprite('character'),
			area(),
			body(),
			anchor(),
			health(1),
			damage({damageAmount:10, attackSpeed: 1})
		],
		"$": () => [
			sprite('enemy'),
			area(),
			body(),
			anchor(),
			health(1),
			damage({damageAmount:1, attackSpeed: 0.5}),
			mobile({speed: 1})
		],
		
		"^": ()=>[
			sprite('torch')
		]
	}
}
```

So we can make a player, an enemy, a potion and a torch. Well if we use this same sprite definition every round the game will never get any harder. and may be boring. 

what if we made the torch interactible on one level

```ts
const level = {
	title: "torchy",
	floor: [
		"   ",
		"   ",
		"   ",
	],
	dungeon: [
		"^ ^",
		" @ ",
		"^$^"
	],
	tiles: {
		"^": ()=>[
			interact(async (player) => {
				if(chance(0.1)){
					player.heal(100); //big boost in health
				} else {
					const s = player.speed;
					player.speed = 0.1; //super slow
					await wait(5); //5 seconds
					player.speed = s;
				}
			},
			true //this argument is optional and defaults to false if true the object is destroyed after the interaction. 
			)
		]
	}
}
```
So here we added an interact component to the character sheet for the page. 

**Adding a duplicate component or property name will cause an error**

If you want to update a propery set by one of our components (a corner case has been added to handle health modifications as well.) you can utilize the **mod** component.

This component can only be used in the dungeons tiles object. this component is removed from the end GameObj build instructions. 

this property attempts to locate the property names provided and replace the original values with an updated value. 

```ts
//level.js
const level = {
	//...(see above)
	tiles: {
		//...
		"$": () => [
			mod({
				health: 200,
				damageAmount: 100,
				attackSpeed: 10
			})
		]
	}
}
```

### Interactions
Any component with an interact method can be interacted with. as a convenience the interact component makes this more readable. the interact object passes the player object to the method's first argument. 


### Increasing Stats
Currently on health and damage can be increased. Convenience methods *increaseHealth* and *increaseDamage* have been added. both will update the current player and store this information so it persists to the next level.

```ts
player.increaseHealth(amount);
player.increaseDamage(amount);
```

### Replacing items. 
Currently I dont have a great method for replacing items however this works. 

```ts

for(const item of DM.dungeon.get('item')){
	const p = item.pos;
	
	const newObj = DM.dungeon.add([...DM.tiles["^"](), pos(p)]);
	item.destroy();
}
```
