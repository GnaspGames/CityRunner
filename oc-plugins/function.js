// ----------------------
// --     function     --
// ----------------------
// Usage: !function <functionName>

module.exports = function(args, addCommand, addSetup)
{
	var name = args[0];
	if(name)
	{
		addCommand("/scoreboard players tag @e[type=ArmorStand,name=SYSTEM] remove func_" + name, {type:"repeating",auto:true,conditional:false});
		addCommand("searge", {type:"repeating",auto:true,conditional:true});
	}
}