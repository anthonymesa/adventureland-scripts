
load_code("orbit_movement")

setInterval(() => {
send_cm(["Kerrigor", "Abbhorsen", "Emmowen"], {
	function: "move",
	name: character.name,
	x: parent.character.real_x,
	y: parent.character.real_y,
});
}, 1000/1);

var grudax_target = null;

function findLocalEnemies() {
	set_message("Scanning...");
  
  if(!grudax_target) {
    grudax_target=get_nearest_monster({
	  });
  }

  if(!grudax_target) {
		set_message("No Monsters.");
		return;
	}

  if(grudax_target.dead) {
	  game_log("target dead");
	  grudax_target=get_nearest_monster({
	  });
  }

	return grudax_target.id;
}

var target_enemies = false;
map_key("A", "snippet", "target_enemies = !target_enemies")
map_key("S", "snippet", "orbit_radius-=100")
map_key("D", "snippet", "orbit_radius+=100")

setInterval(() => {
	if(!target_enemies) return;
	const monster_id = findLocalEnemies()
	send_cm(["Kerrigor", "Abbhorsen", "Emmowen"], {
		function: "target",
		target: monster_id
	});
}, 1000,10);
