const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
      [
        'Neuer',
        'Pavard',
        'Martinez',
        'Alaba',
        'Davies',
        'Kimmich',
        'Goretzka',
        'Coman',
        'Muller',
        'Gnarby',
        'Lewandowski',
      ],
      [
        'Burki',
        'Schulz',
        'Hummels',
        'Akanji',
        'Hakimi',
        'Weigl',
        'Witsel',
        'Hazard',
        'Brandt',
        'Sancho',
        'Gotze',
      ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
      team1: 1.33,
      x: 3.25,
      team2: 6.5,
    },
  };
  


  const [players1, players2] = game.players;

//   console.log(players1);
//   console.log(players2);

  const [goalkeeper1 , ...others1] = players1;
  const [goalkeeper2 , ...others2] = players2;

  console.log(goalkeeper1,goalkeeper2);

//   console.log(others1);
//   console.log(others2);

  const allPlayers = [...players1,...players2];

  console.log(allPlayers);


  // This is One Way
//   const {team1, x: draw, team2} = game.odds;

//   console.log(team1);
//   console.log(draw);
//   console.log(team2);

  // This is the another way

  const {odds: {team1, x: draw, team2}} = game;

  console.log(team1);
  console.log(draw);
  console.log(team2);


  const printGoals = function(...players) {
    console.log(`${players.length} goals scored`);
};

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich','Maradona');

printGoals(...game.scored);

team1 < team2 && console.log(`Team 1 is more likely to win the game`);