#! /usr/bin/env node

import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
import chalk from "chalk";

console.log(chalk.redBright("=").repeat(50));
console.log(
  chalk.greenBright.italic.bold(
    "\n\tWelcome to 'Kaxh' Countdown Timer Project\n"
  )
);
console.log(chalk.redBright("=").repeat(50));

const res = await inquirer.prompt([
  {
    name: "userInput",
    type: "number",
    message: chalk.green("\nplease enter the amount of second"),
    validate: (input) => {
      if (isNaN(input)) {
        return chalk.redBright("please enter valid number");
      } else if (input > 60) {
        return chalk.redBright("seconds must be in 60");
      } else {
        return true;
      }
    },
  },
]);

let input = res.userInput;

function startTime(val: number) {
  const intTime = new Date().setSeconds(new Date().getSeconds() + val);

  const intervalTime = new Date(intTime);

  setInterval(() => {
    const currentTime = new Date();
    const timeDiff = differenceInSeconds(intervalTime, currentTime);

    if (timeDiff <= 0) {
      console.log(chalk.cyanBright.bold.italic("\n \tTimer has Expired!\n"));
      process.exit();
    }
    const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
    const sec = Math.floor(timeDiff % 60);
    console.log(
      chalk.yellowBright(
        `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
      )
    );
  }, 1000);
}

startTime(input);
