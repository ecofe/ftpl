#!/usr/bin/env node

"use strict";

const path = require("path");

const program = require("commander");

const ftpl = require("../");

// @see http://patorjk.com/software/taag/#p=testall&h=3&v=3&f=Star%20Wars&t=FIFE

const logo = [
	"    //  ) )                   ",
	" __//__  __  ___  ___     //  ",
	"  //      / /   //   ) ) //   ",
	" //      / /   //___/ / //    ",
	"//      / /   //       //     "
].join("\n");

const pkg = require("../package.json");

program
	.version(
		[
			"",
			"  " + pkg.description.info,
			("  v" + pkg.version).info,
			"",
			logo.replace(/_/g, " ").verbose,
			""
		].join("\n")
	)
	.usage("<command> [options]");

program
	.command("list")
	.description("templates list")
	.action(() => {
		ftpl.list();
	});

program
	.command("init <template-name> [project-path]")
	.description("generate a new project from a template")
	.action((template, projPath) => {
		ftpl.init(template, projPath || "");
	});

let argv = process.argv;
let cmd = argv[2];

if (argv.length < 3) return program.help();

if (!/^-/.test(cmd) && !(cmd in program._events))
	console.log("\n error: unknown command `%s`\n".error, cmd);

program.parse(process.argv);
