# Objects
Currently the biggest issue I am seeing is game logic and basic rendering instruction are intertwined. 

I propose the fix to this be confine each component not by its game object but by its definition array. subsequently all methods or behaviors should be added to this paradigm without a parent scope playing a factor.

- Update

testentity is a proof of concept that both methods and functions ultimately inherit the game object. 
additionally this means that event listeners can be confined to these modifiers but need to be initialized. as such each "interact" object (any game object that utilizes event handlers will have an init)