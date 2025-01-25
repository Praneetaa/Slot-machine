//Making a Slot Machine requirements:
//1. Deposite some money
//2. Determine the number of lines to bet on
//3. Collect the bet amount
//4. Spin the slot machine 
//5. Check if the user won
//6. give user their winnings
//7. Play again?

const prompt = require("prompt-sync")();

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
            console.log("Your placed bet per lines: ",numberBet);
            return numberBet;
        }
    }
}

let balance = deposit();
const lines = getNumberofLines();
const bet = getBet(balance, lines);
