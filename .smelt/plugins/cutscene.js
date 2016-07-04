// ----------------------
// --     cutscene     --
// ----------------------
//	Usage:
//	!cutscene <objective> <tag> <seconds> 
//	          <x_start> <y_start> <z_start> <y_rot_start> <x_rot_start> 
//			  <x_stop> <y_stop> <z_stop> <y_rot_stop> <x_rot_stop> 
//			  [<gamemode>]
//			  [<x_return> <y_return> <z_return> <y_rot_return> <x_rot_return>]

var util = require('util');


module.exports = function(args, addCommand, addSetup)
{
	var objective = args[0];
	var tag = args[1];
	var seconds = args[2];
	var ticks = seconds * 20;
	
	var x_start = args[3];
	var y_start = args[4];
	var z_start = args[5];
	var y_rot_start = args[6];
	var x_rot_start = args[7];
	
	var x_stop = args[8];
	var y_stop = args[9];
	var z_stop = args[10];
	var y_rot_stop = args[11];
	var x_rot_stop = args[12];
	
	var gamemode = (args.length > 13 ? args[13] : null);
	
	var returnTp = false;
	var x_return = null;
	var y_return = null;
	var z_return = null;
	var y_rot_return = null;
	var x_rot_return = null;
	
	if(args.length > 18)
	{
		returnTp = true;
		x_return = args[14];
		y_return = args[15];
		z_return = args[16];
		y_rot_return = args[17];
		x_rot_return = args[18];
	}
	
	var x_step = (x_stop - x_start) / ticks;
	var y_step = (y_stop - y_start) / ticks;
	var z_step = (z_stop - z_start) / ticks;
	var y_rot_step = (y_rot_stop - y_rot_start) / ticks;
	var x_rot_step = (x_rot_stop - x_rot_start) / ticks;
	
	/* COMMANDS:
	
	Start:
	/scoreboard players add @e[tag=<tag>] <objective> 0
	/execute @a[tag=<tag>,score_<objective>_min=0,score_<objective>=0] ~ ~ ~
		gamemode spectator @p
	/execute @a[tag=<tag>,score_<objective>_min=0,score_<objective>=0] ~ ~ ~
		tp @p <x_start> <y_start> <z_start> <y_rot_start> <x_rot_start>
	/execute @a[tag=<tag>,score_<objective>_min=0,score_<objective>=0] ~ ~ ~
		summon AreaEffectCloud {Duration:<ticks+2>,Tags:["cam_<tag>"]}
	/execute @a[tag=<tag>,score_<objective>_min=0,score_<objective>=0] ~ ~ ~
		tp @e[tag=cam_<tag>,c=1] @p
	
	Movement:
	/execute @a[tag=<tag>,score_<objective>_min=1,score_<objective>=<ticks>] ~ ~ ~
		tp @e[tag=cam_<tag>,c=1] ~<x_step> ~<y_step> ~<z_step> ~<y_rot_step> ~<x_rot_step>
	/execute @a[tag=<tag>,score_<objective>_min=1,score_<objective>=<ticks>] ~ ~ ~
		tp @p @e[tag=cam_<tag>,c=1]
	
	Stop:
	/execute @a[tag=<tag>,score_<objective>_min=<ticks>,score_<objective>=<ticks>] ~ ~ ~ 
		kill @e[tag=cam_<tag>,c=1]
	/execute @a[tag=<tag>,score_<objective>_min=<ticks>,score_<objective>=<ticks>] ~ ~ ~ 
		tp @p <x_stop> <y_stop> <z_stop> <y_rot_stop> <x_rot_stop>
	/execute @a[tag=<tag>,score_<objective>_min=<ticks>,score_<objective>=<ticks>] ~ ~ ~ 
		scoreboard players tag @p add leave_<tag>
	
	Leave:
	if gamemode set:
		/gamemode <gamemode> @a[tag=leave_<tag>]
		
	if return coordinates set:
		/tp @a[tag=leave_<tag>] <x_return> <y_return> <z_return> <y_rot_return> <x_rot_return>
		
	/scoreboard players reset @a[tag=leave_<tag>] <objective>
	/scoreboard players tag @a[tag=leave_<tag>] remove <tag>
	/scoreboard players tag @a[tag=leave_<tag>] remove leave_<tag>
	
	Increment:
	/scoreboard players add @a[tag=<tag>,score_<objective>_min=0,score_<objective>=<ticks>] <objective> 1
	
	Template addCommand:
	addCommand(util.format("", objects));
	addCommand(util.format("", objects), {executeAs:executeStr});
	*/
	
	var executeStr = "";
	
	// Start:
	addCommand(util.format("scoreboard players add @a[tag=%s] %s 0", tag, objective));
	executeStr = util.format("@a[tag=%s,score_%s_min=0,score_%s=0]", tag, objective, objective);
		addCommand("gamemode spectator @p", {executeAs:executeStr});
		addCommand(util.format("tp @p %s %s %s %s %s", x_start, y_start, z_start, y_rot_start, x_rot_start), {executeAs:executeStr});
		addCommand(util.format("summon AreaEffectCloud ~ ~ ~ {Duration:%s,Tags:[\"cam_%s\"]}", ticks + 2, tag), {executeAs:executeStr});
		addCommand(util.format("tp @e[tag=cam_%s,c=1] @p", tag), {executeAs:executeStr});
	
	// Movement:
	executeStr = util.format("@a[tag=%s,score_%s_min=1,score_%s=%s]", tag, objective, objective, ticks);
		addCommand(util.format("tp @e[tag=cam_%s,c=1] ~%s ~%s ~%s ~%s ~%s", tag, x_step, y_step, z_step, y_rot_step, x_rot_step), {executeAs:executeStr});
		addCommand(util.format("tp @p @e[tag=cam_%s,c=1]", tag), {executeAs:executeStr});
	
	// Finish:
	executeStr = util.format("@a[tag=%s,score_%s_min=%s,score_%s=%s]", tag, objective, ticks, objective, ticks);
		addCommand(util.format("kill @e[tag=cam_%s,c=1]", tag), {executeAs:executeStr});
		addCommand(util.format("tp @p %s %s %s %s %s", x_stop, y_stop, z_stop, y_rot_stop, x_rot_stop), {executeAs:executeStr});
		addCommand(util.format("scoreboard players tag @p add leave_%s", tag), {executeAs:executeStr});
	
	// Leave Scene:
	if(gamemode != null)
		addCommand(util.format("gamemode %s @a[tag=leave_%s]", gamemode, tag));
	if(returnTp)
		addCommand(util.format("tp @a[tag=leave_%s] %s %s %s %s %s", tag, x_return, y_return, z_return, y_rot_return, x_rot_return));
	
	addCommand(util.format("scoreboard players reset @a[tag=leave_%s] %s", tag, objective));
	addCommand(util.format("scoreboard players tag @a[tag=leave_%s] remove %s", tag, tag));
	addCommand(util.format("scoreboard players tag @a[tag=leave_%s] remove leave_%s", tag, tag));
	
	// Increment: 
	addCommand(util.format("scoreboard players add @a[tag=%s,score_%s_min=0,score_%s=%s] %s 1", tag, objective, objective, ticks, objective));	
}