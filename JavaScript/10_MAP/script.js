

const rest = new Map();


// set method adds a key value pair and also returns the updated map

rest.set('name','Jyotirmoy Dutta').set(1, 'Jph').set(2, 'Bankura').set(true, ' I can');

// console.log(rest);

// console.log(rest.get('name'));


const question = new Map([
    ['question', 'What is the best programming language in the world?'],
    [1, 'C'],
    [2, 'Java'],
    [3, 'JavaScript'],
    ['correct', 3],
    [true, 'Correct 🎉'],
    [false, 'Try again!'],
  ]);


//   console.log(question.get('question'));

//   for(const [key, val] of question) {
//     if(key === 'number') {
//         console.log(`Answer ${key}: ${val}`);
//     }
// }

// const reply = Number(prompt('What is Your answer?'));

// if(reply === 3) {
//     console.log(`Answer is ${question.get(true)}`);
// } else {
//     console.log(`${question.get(false)}`);
// }


const gameEvents = new Map([
    [17, '⚽️ GOAL'],
    [36, '🔁 Substitution'],
    [47, '⚽️ GOAL'],
    [61, '🔁 Substitution'],
    [64, '🔶 Yellow card'],
    [69, '🔴 Red card'],
    [70, '🔁 Substitution'],
    [72, '🔁 Substitution'],
    [76, '⚽️ GOAL'],
    [80, '⚽️ GOAL'],
    [92, '🔶 Yellow card'],
  ]);


  const events = new Set([...gameEvents.values()]);

  console.log(events);

  gameEvents.delete(64);

  console.log(gameEvents);


  const time = [...gameEvents.keys()].pop();

  console.log(`An event happen on an average of ${time/gameEvents.size}`);


  for(const [min, event] of gameEvents) {
    console.log(`${min <= 45 ? 'FIRST' : 'SECOND'} HALF : ${event}`);
}

