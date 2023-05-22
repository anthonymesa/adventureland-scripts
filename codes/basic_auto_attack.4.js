
var curr_target=null;

character.on("cm", function(m) {
	if((!m.message.function) || (m.message.function != "target")) return;
  game_log("recieved target...")
  curr_target = get_monster(m.message.target)
	change_target(curr_target);	
});

function autoAttack() {
	if(character.rip || !curr_target) return;
	if(!is_in_range(curr_target)) return;
	if(!can_attack(curr_target)) return;

	set_message("Attacking...");
	attack(curr_target);

//	if(is_in_range(curr_target, "burst") && !is_on_cooldown("burst")
//	   && character.mp >= G.skills.burst.mp) {
//		use_skill("burst", curr_target);
//	}
}

setInterval(function(){
	use_hp_or_mp();
	loot();
}, 1000/4);

setInterval(function(){
	autoAttack();
},1000/10);
