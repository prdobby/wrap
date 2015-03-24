var wrap = require('./wrap');
var program = require('commander');
var error = require('chalk').red.bold("[ERROR]: ");

function interpret(args) {
	program
		.version('0.0.1')
		.usage('[OPTIONS] <file...>')
		.option('-d, --destination <dirname>', 'Output directory to place wrapped files')
		.option('-t, --template <filename>', 'Template to use for wrapping the files')
		.parse(args);

	if (!program.args.length) {
		program.help();
	} else if (!program.template) {
		console.log(error, "--template required");
		program.help();
	} else {
		var opts = program.opts();
		opts.sources = program.args;
		opts.errorHandler = function(err) {
			console.log(error, err.stack);
		};
		wrap(opts);
	}
}

module.exports = {
	"interpret": interpret
};
