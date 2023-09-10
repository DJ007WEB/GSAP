

const rest = new Map();


// set method adds a key value pair and also returns the updated map

rest.set('name','Jyotirmoy Dutta').set(1, 'Jph').set(2, 'Bankura').set(true, ' I can');

console.log(rest);

console.log(rest.get('name'));


const question = new Map([
    ['question', 'What is the best programming language in the world?'],
    [1, 'C'],
    [2, 'Java'],
    [3, 'JavaScript'],
    ['correct', 3],
    [true, 'Correct 🎉'],
    [false, 'Try again!'],
  ]);


  console.log(question.get('question'));

  for(const [key, val] of question) {
    if(key === 'number') {
        console.log(`Answer ${key}: ${val}`);
    }
}

const reply = Number(prompt('What is Your answer?'));

if(reply === 3) {
    console.log(`Answer is ${question.get(true)}`);
} else {
    console.log(`${question.get(false)}`);
}