// ----------------------
// --     run_loop     --
// ----------------------
// Usage: !run_loop <loopName>


module.exports = function(args, addCommand, addSetup)
{
	var name = args[0];
	if(name)
	{
		addCommand("/scoreboard players tag @e[type=ArmorStand,name=SYSTEM] add loop_" + name);
	}
}