// ----------------------
// --     givebook     --
// ----------------------
// Usage: !givebook <selector> <path-to-book-file>
// Book file data should be NBT/JSON data in the same format as used in Minecraft 'give' command.

var fs = require('fs');
var util = require('util');

module.exports = function(args, addCommand, addSetup)
{
	var selector = args[0];
	var bookfile = args[1];
	
	var bookdataRaw = fs.readFileSync(bookfile).toString().trim();
	var lines = bookdataRaw.split("\n");
	var bookdata = "";
	lines.forEach(function(line){
		bookdata += line.trim();
	});
	
	// give [SELECTOR] written_book 1 0 [BOOKDATA]
	var cmdFormat = "give %s written_book 1 0 %s";
	
	var cmdFormatted = util.format(cmdFormat, selector, bookdata);
	addCommand(cmdFormatted);
}