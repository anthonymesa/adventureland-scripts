
var orbit_radius = 100;

var orbit_angle = 0;
if(character.name === "Kerrigor") orbit_angle = 180;

var orbit_speed = 1;

character.on("cm", function(m) {
	
	if((!m.message.function) || (m.message.function != "move")) return;
		
	move(
		m.message.x + orbit_radius * Math.cos(orbit_angle),
		m.message.y + orbit_radius * Math.sin(orbit_angle)
	);

	orbit_angle += orbit_speed;
	if(orbit_angle > 360) orbit_angle = 0;
});
