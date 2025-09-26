// user input 
const prompt = require('prompt-sync')();

// 
const ROWS = 3 ;
const COLS =3 ;
const SYMBOL_COUNT =  {
    "A": 2,
    "B": 4,
    "C":6,
    "D":8
}
const SYMBOL_VALUES=  {
    "A": 5,
    "B": 4,
    "C":3,
    "D":2
}



// function to get deposit ammount of user 
const deposit = ()=> {
    while(true){
        const depositAmmount = parseFloat(prompt("Enter a deposite ammount : "));
        if(isNaN(depositAmmount) || depositAmmount <=0){
            console.log(" Invalid ammmount :( , Try again ");
        }else{
            return depositAmmount;
        }
    }
}
// function for the number of lines input 
const numberOfLines = ()=> {
    while(true){
        const number = parseFloat(prompt("Enter the number of lines (1-3)  : "));
        if(isNaN(number) || number <=0 || number>3){
            console.log(" Invalid number of lines  :( , Try again ");
        }else{
            return number;
        }
    }
}
// collect the bet ammmount 
const getBet = (balance, lines) => {
    while(true){
        const bet = parseFloat(prompt("Enter the total bet  : "));
        if(isNaN(bet) || bet <=0 || bet>balance/lines){
            console.log(" Invalid bet  :( , Try again ");
        }else{
            return bet;
        }
    }
}
 

// SPinner 

const spin = () =>{
    const symbols = [];
    for(const[symbol,count] of Object.entries(SYMBOL_COUNT)){
        for(let i =0 ; i< count; i++){
            symbols.push(symbol);
        }
    }

    const reels= [[],[],[]];
    for(let i =0 ; i <COLS; i++){
        const reelSymbol = symbols;
        for(let j =0 ; j <ROWS; j++){
            const randomIndex = Math.floor(Math.random()*reelSymbol.length);
            const selectedSymbol= reelSymbol[randomIndex];
            reels[i].push(selectedSymbol); 
            reelSymbol.slice(randomIndex, 1);
        }
    }
    return reels ;
}


//  transpose the array()

const transpose = (reels)=> {
    const rows = [];
    for (let i=0 ; i< ROWS ; i++){
        rows.push([]);
        for(let j =0 ; j< COLS ; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows ;
}

const printRows = (rows)=> {
    for(const row of rows ){
        let rowString = "";
        for( const [i ,symbol] of row.entries()){
            rowString+= symbol;
            if( i!= row.length-1){
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
}

// check winnings ?

const getWinnings= (rows,bet, lines) => {
    let winnigs = 0 ;
    for(let row =0 ; row < lines ;row++){
        const arr = rows[row];
        let allSame = true ;
        for(let j  of arr){
            if (j !== arr[0]){
                allSame = false;

                break;
            }
        }
        if(allSame){
            winnigs += bet * SYMBOL_VALUES[arr[0]];
        }
    }
    return winnigs;
}
let balance = deposit();
const game = () => {
    while(true){
        console.log(" balance left : ", balance );
        const lines = numberOfLines();
        const bet = getBet(balance, lines);
        balance -= bet * lines;
        const reels = spin();
        const rows =transpose(reels)
        printRows(rows)
        const wins = getWinnings(rows , bet, lines);
        balance += wins ;
        console.log(` your winnings are : ${wins}`)
        if(balance<= 0 ){
            console.log(" you ran out of money :( ");
            break;
        }
        const playAgain = prompt(" want to play again ? (y/n) ");
        if(playAgain === "n") break;
    }
}
game();