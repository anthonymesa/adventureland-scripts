async function runFetchTest() {
	const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
	const json = await response.json()
	show_json(json)
}

async function postMonsters(monsters) {
  game_log("posting monsters...")

  try {
    const response = await fetch('http://127.0.0.1:3333/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(monsters)
    }).catch((err) => {
      game_log(err.message);
      return;
    });
    game_log("finished posting")
  } catch (err) {
    game_log(err.message);
  }
}
