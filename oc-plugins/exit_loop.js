module.exports = function(args, addCommand, addSetup)
{
	var name = args[0];
	if(name)
	{
		addCommand("/scoreboard players tag @e[type=ArmorStand,name=SYSTEM] remove loop_" + name);
	}
}