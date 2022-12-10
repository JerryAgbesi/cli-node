#!usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';



let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r,ms));

async function welcome(){
    const rainbowTitle = chalkAnimation.rainbow('Who wants to be a Techie?\n')

    await sleep();
    rainbowTitle.stop();
   

    console.log(`
        ${chalk.bgBlue("HOW TO PLAY")}

        I am a process in your computer.
        If you get a question wrong, ${chalk.bgRed("My blood is on your hands ")},
        So get all the questions right,please.
               
    `);
}

async function askName() {
    const answers = await inquirer.prompt({
        name:'player_name',
        type:'input',
        message:'Enter your name',
        default(){
            return 'Player1';
        }
    });

    playerName = answers.player_name
   
}


async function question1() {
    const answers = await inquirer.prompt({
        name:'question1',
        type:'list',
        message:'Javascript was created in 10 days then released on\n',
        choices:[
            'May 23rd 1995',
            'Nov 24th 1995',
            'Dec 4th 1995',
            'Dec 17th 1995',
        ],

        
    });

    return handleAnswer(answers.question1 == 'Dec 4th 1995');
}

async function question2() {
    const answers = await inquirer.prompt({
        name:'question2',
        type:'list',
        message:'what is x? var x = 12 + "1" + Number(6)\n',
        choices:[
            '19',
            '"19"',
            '"1216"',
            '12955',
        ],

        
    });

    return handleAnswer(answers.question2 == '"1216"');
}

async function question3() {
    const answers = await inquirer.prompt({
        name:'question3',
        type:'list',
        message:'what element will be at index 4 in this array? [12,6,5,7]\n',
        choices:[
            '7',
            '6',
            'undefined',
            '12',
        ],

        
    });

    return handleAnswer(answers.question3 == 'undefined');
}

async function question4() {
    const answers = await inquirer.prompt({
        name:'question4',
        type:'list',
        message:'Node.Js is a Javascript library\n',
        choices:[
            'True',
            'False',
        ],

        
    });

    return handleAnswer(answers.question4 == 'False');
}

async function question5() {
    const answers = await inquirer.prompt({
        name:'question5',
        type:'list',
        message:'JS is a high-level single-threaded, garbage-collected,\n' +
        'interpreted(or just-in-time compiled), prototype-based,\n' +
        'multi-paradigm, dynamic language with a ____ event loop\n',
      choices: ['multi-threaded', 'non-blocking', 'synchronous', 'promise-based'],

        
    });

    return await handleAnswer(answers.question5 == 'non-blocking');
}

async function handleAnswer(isCorrrect){
    const spinner = createSpinner("checking answer...").start();
    await sleep();

    if(isCorrrect){
        spinner.success({text:`Nice Work ${playerName}. On to the next`});
    }
    else{
        spinner.error({text:`💀💀💀 Game over, you lose ${playerName}!`});
        process.exit(1);
         
    }

}

function winner(){
                  
    const msg = `Congrats, ${playerName}! \n You are officially a techie! `;

    figlet(msg,(err,data) => {
        console.log(gradient.pastel.multiline(data) + '\n');

        process.exit(0);
});

}


const init = async() => {
console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();

}

init();


