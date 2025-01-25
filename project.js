//Making a Slot Machine requirements:
//1. Deposite some money
//2. Determine the number of lines to bet on
//3. Collect the bet amount
//4. Spin the slot machine 
//5. Check if the user won
//6. give user their winnings
//7. Play again?

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
}

const SYMBOLS_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
}



const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit number. Please enter again.");
        } else {
            return numberDepositAmount;
        }
    }
};

const getNumberofLines = () => {
    while (true) {
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines. Please enter again.");
        } else {
            return numberOfLines;
        }
    }

}

const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter the total bet per lines: ");
        const numberBet = parseFloat(bet);

        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log("Invalid bet. Please enter again.");
        } else {
            return numberBet;
        }
    }
}

const spin = () => {
    const symbols = [];
    for (const [symbol, count]  of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);

        }
    }
    const reels = [];
    for (let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];   
        for (let j = 0; j< ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length );
            const selectedSymbol =reelSymbols [randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++ ){
        rows.push([]);
        for (let j = 0; j < COLS; j++ ){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

const printRows = (rows) =>{
    for(const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol
            if (i != row.length -1) {
                rowString += " | "
            }

        }
        console.log(rowString);
    }
}

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]){
                allSame = false;
                break;
            }
        }
        if (allSame) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }

    }

    return winnings;

}

const game = () => {
    let balance = deposit();
    
    while (true) {
        console.log("You have a balance of $" + balance);
        const lines = getNumberofLines();
        const bet = getBet(balance, lines);
        balance -= bet * lines;
        const reels = spin(); 
        const rows = transpose(reels);
        printRows (rows);
        const winnings = getWinnings (rows, bet, lines);
        balance += winnings;
        console.log("You Won! $", + winnings.toString());
        
        if (balance <= 0) {
            console.log ("Sorry, you ran out of money!");
            
            const depositAgain = prompt("Do you want to deposit more money? (y/n)").toLowerCase();
            
            if (depositAgain === 'y' || depositAgain === 'yes') {
                balance += deposit();
                continue;
                } 
                else {
                    console.log("Thank you for playing!");
                    break;
                }
            }

                const playAgain = prompt("Do you want to play again (y/n)? ").toLowerCase();
                if (playAgain !== 'y' && playAgain !== 'yes') break;
        }
    }

game();