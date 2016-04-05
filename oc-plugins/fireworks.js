var fs = require('fs');
var util = require('util');

module.exports = function(args, addCommand, addSetup)
{
	var x = args[0];
	var y = args[1];
	var z = args[2];
	var fireworksfile = args[3];
	
	var fireworksRaw = fs.readFileSync(fireworksfile).toString().trim();
	var lines = fireworksRaw.split("\n");
	var fireworksData = "";
	lines.forEach(function(line){
		fireworksData += line.trim();
	});
	
	// summon FireworksRocketEntity [X] [Y] [Z] [BOOKDATA]
	var cmdFormat = "summon FireworksRocketEntity %s %s %s %s";
	
	var cmdFormatted = util.format(cmdFormat, x, y, z, fireworksData);
	addCommand(cmdFormatted);
}