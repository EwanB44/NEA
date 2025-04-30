document.addEventListener('DOMContentLoaded', setup);



let tileSequence; 
let allTiles;
let currentClick = 0;



function setup() {
    console.log('Setting up the game...');
    tileSequence = new Map();
    allTiles = document.querySelectorAll('td');
    console.log(allTiles);
    addtoSequence();  //calls game functions
    lightSequence();
 
    if (allTiles.length === 0) {
        console.error('No tiles found in the DOM.');
        return;
    }
    allTiles.forEach(element => {
        element.addEventListener('click', evt => clickTile(evt)); //calls clickTile function when click tile
    });
}



function randomNum() {
    return Math.floor(Math.random() * allTiles.length) + 1; 
}



function addtoSequence(initialSize = 3) {
    
    for (let i = 0; i < initialSize; i++) {
        let randomTileNumber = randomNum();
        while (randomTileNumber >= allTiles.length) {
            randomTileNumber = randomNum(); // Regenerate if out of bounds
        }
        tileSequence.set(i + 1, `tile${randomTileNumber}`); // sets key and random tile in sequence
        console.log('Initial sequence:', tileSequence);
    }
    console.log(tileSequence); //checks tile sequence
    
}



function lightSequence() {
    console.log('Lighting sequence...');
    
    tileSequence.forEach((value, key) => { //goes through each value and key in sequence
        const tileIndex = parseInt(value.replace('tile', '')) - 1; //sets tile index to tile number(value) - 1 for 0 based index
        console.log(`Tile index: ${tileIndex}`); //checks tile index
        const tile = allTiles[tileIndex]; // sets tile to the tile of index 'tileIndex' in first array of all td's
        console.log(`Tile at index ${tileIndex}:`, tile); //checks if tile at 'tileIndex' is correct
        
        if (!tile) {
            console.error(`No tile found at index ${tileIndex}`); //if tile at 'tileIndex doesn't exist then stop
            return;
        }
        console.log(`Lighting tile: ${value} at key: ${key}`);
        
        setTimeout(() => {
            lightTile(tile); //calls lightTile function with tile
        }, key * 1000);
    }
    );
    
}



function lightTile(tile) {
    if (!tile) {
        console.error("Tile is undefined"); //checks if tile exists
        return;
    }
    console.log("Lighting tile:", tile); //checks function works
    tile.style.backgroundColor = 'blue'; //lights tile
    setTimeout(() => {
        tile.style.backgroundColor = 'rgb(7, 7, 97)'; 
    }, 500); //leaves tile lit for 0.5s
}



function incorrectTile(tile) {
    if (!tile) {
        console.error("Tile is undefined"); //checks if tile exists
        return;
    }
    console.log("Lighting tile:", tile); //checks function works
    tile.style.backgroundColor = 'rgb(255, 0 ,0)'; //lights tile
    setTimeout(() => {
        tile.style.backgroundColor = 'rgb(7, 7, 97)'; 
    }, 500); //leaves tile lit for 0.5s
}


//text display after game ends
function lose(){
    document.getElementById("text").innerHTML = "Incorrect. Try again.";
    setTimeout (() => {
        document.getElementById("text").innerHTML = "";
    }, 4000)
}

function win(){
    document.getElementById("text").innerHTML = "Correct. Good job.";
    setTimeout (() => {
        document.getElementById("text").innerHTML = "";
    }, 4000)
}
//text display functions end


function clickTile(evt) { //function for clicking tile
    const tile = evt.target;
    const expectedTile = tileSequence.get(currentClick + 1) //sets expected tile to tile in sequence at key 1, 2, 3, ...
    
    if (tile.id === expectedTile){
        console.log(`Correct tile clicked: ${tile.id}`)
        console.log(tile.id) //checks tile id correct
        lightTile(tile); //lights tile when clicked
        currentClick++; //moves on to the next click

        if (currentClick === tileSequence.size) {
            win()
            console.log('Sequence completed successfully!'); //checks if all tiles have been clicked
            setTimeout (() => { //gives time for functions
                resetGame();
            }, 500);
        }

    } else {
        incorrectTile(tile);
        lose();
        console.error(`Incorrect tile clicked: ${tile.id}`); //checks if correct tiles are clicked
        setTimeout (() => { //gives time for functions
            resetGame();
        }, 500);
        
    }

    
    
    setTimeout(() => {
        tile.style.backgroundColor = 'rgb(7, 7, 97)';
    }, 250);
}



function resetGame() { //resets game
    console.log('Resetting game...');
    tileSequence.clear(); //clears sequence
    currentClick = 0; //resets clicks to 0
    allTiles.forEach(tile => {
        tile.style.backgroundColor = 'rgb(7, 7, 97)'; //resets all tile colours
    });

    setTimeout(() => {
        addtoSequence(3); //remakes sequence
        lightSequence();  //calls lightSequence function
    }, 5000); //delays 5 secs so other parts of code in if statement can work
   
}


       