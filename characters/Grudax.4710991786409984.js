load_code("orbit_movement");

var grudax_target = null;
var target_enemies = false;

function findLocalEnemies() {
  set_message("Scanning...");

  if (!grudax_target) {
    grudax_target = get_nearest_monster({});
  }

  if (!grudax_target) {
    set_message("No Monsters.");
    return;
  }

  if (grudax_target.dead) {
    game_log("target dead");
    grudax_target = get_nearest_monster({});
  }

  return grudax_target.id;
}

function toggleTargetEnemies() {
  target_enemies = !target_enemies;
}

function increaseOrbitRadius() {
  send_cm(["Kerrigor", "Abbhorsen", "Emmowen"], {
    function: "inc_rad",
  });
}

function decreaseOrbitRadius() {
  send_cm(["Kerrigor", "Abbhorsen", "Emmowen"], {
    function: "dec_rad",
  });
}

function startOrbit() {
  send_cm(["Kerrigor", "Abbhorsen", "Emmowen"], {
    function: "do_orbit",
  });
}

function stopOrbit() {
  send_cm(["Kerrigor", "Abbhorsen", "Emmowen"], {
    function: "no_orbit",
  });
}

map_key("A", "snippet", "toggleTargetEnemies()");
map_key("S", "snippet", "decreaseOrbitRadius()");
map_key("D", "snippet", "increaseOrbitRadius()");
map_key("F", "snippet", "startOrbit()");
map_key("G", "snippet", "stopOrbit()");

setInterval(() => {
  if (!target_enemies) return;
  const monster_id = findLocalEnemies();
  send_cm(["Kerrigor", "Abbhorsen", "Emmowen"], {
    function: "target",
    target: monster_id,
  });
}, 1000 / 10);

setInterval(() => {
  send_cm(["Kerrigor", "Abbhorsen", "Emmowen"], {
    function: "move",
    name: character.name,
    x: parent.character.real_x,
    y: parent.character.real_y,
  });
}, 1000 / 1);
