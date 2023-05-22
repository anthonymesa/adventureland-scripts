//import('file:///C:/path/to/your/bot/main.js?t='+Date.now());

load_code(1);
// autorerun

var auto = {
  attack: false,
  move: false,
};

var local_enemies = [];
var curr_target = null;

function autoMoveCharacter() {
  if (!auto.move) return;
  if (!curr_target) return;

  if (!is_in_range(curr_target)) {
    set_message("moving...");
    move(
      character.x + (curr_target.x - character.x) / 2,
      character.y + (curr_target.y - character.y) / 2
    );
  }
}

function findLocalEnemies() {
  set_message("Scanning...");
  curr_target = get_nearest_monster({
    min_xp: 100,
    max_att: 120,
  });
  if (!curr_target) {
    set_message("No Monsters.");
    return;
  }
  change_target(curr_target);
}

function autoAttack() {
  if (!auto.attack || character.rip || !curr_target) return;
  if (!is_in_range(curr_target)) return;
  if (!can_attack(curr_target)) return;

  set_message("Attacking...");
  attack(curr_target);

  if (
    is_in_range(curr_target, "burst") &&
    !is_on_cooldown("burst") &&
    character.mp >= G.skills.burst.mp
  ) {
    use_skill("burst", curr_target);
  }
}

setInterval(function () {
  use_hp_or_mp();
  loot();
}, 1000 / 4);

setInterval(function () {
  autoMoveCharacter();
}, 1000 / 10);

setInterval(function () {
  findLocalEnemies();
}, 1000 / 10);

setInterval(function () {
  autoAttack();
}, 1000 / 10);

setInterval(function () {
  const monsters = Object.keys(parent.entities)
    .filter((key) => parent.entities[key].type === "monster")
    .map((key) => ({
      name: parent.entities[key].name,
      x: parent.entities[key].x,
      y: parent.entities[key].y,
    }));
  postMonsters(monsters);
}, 1000);

//
//
//runFetchTest();
