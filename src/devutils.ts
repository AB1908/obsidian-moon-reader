import {moment, TFile} from "obsidian";
import {readFile, readdir, writeFile} from "fs/promises";

const basePath = "D:\\GitHub\\obsidian-moon-reader";
const sourcePath = "src";
const testPath = "src\\test\\json";
const path = `${basePath}\\${sourcePath}`;
let files: LogFile[];

interface LogFile {
	fileName: string;
	contents: string;
	base: string;
}

function removeCircular(obj: any) {
	let copy;
	if ((typeof obj) == "object") {
		copy = Object.assign({}, obj);
		for (const key of Object.keys(copy)) {
			if (copy[key] instanceof TFile) {
				copy[key].vault = {}
				copy[key].parent = {}
			}
		}
	}
	return copy || {output: obj};
}

async function writeJSON(obj: any, name?: string) {
	const normalizedObj = removeCircular(obj);
	await writeFile(`${basePath}\\${testPath}\\${name}.json`, JSON.stringify(normalizedObj, undefined, 2))
}

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;

// eslint-disable-next-line @typescript-eslint/ban-types
export function getParamNames(func: Function) {
	const fnStr = func.toString().replace(STRIP_COMMENTS, '');
	let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
	if (result === null)
		result = [];
	return result;
}

export async function logArgs(inputArgs: IArguments, outputArgs: any) {
	const paramNames = getParamNames(inputArgs.callee);
	const args = {};
	// @ts-ignore
	paramNames.forEach((elem, index) => args[elem] = inputArgs[index]);
	const funcName = inputArgs.callee.name;
	// @ts-ignore
	const m = moment()
	const fileName = (await findWhichFile(funcName)).fileName;
	const inputname = `${fileName.replace(".ts", "")}.${funcName}.input-${m.format("YYYY-MM-DD HH-mm-ss")}`;
	const outputname = `${fileName.replace(".ts", "")}.${funcName}.output-${m.format("YYYY-MM-DD HH-mm-ss")}`;
	await writeJSON(args, inputname);
	await writeJSON(outputArgs, outputname);
}

async function generateFileContentsArray(path: string) {
	const listOfFiles = (await readdir(path)).filter(t => t.endsWith(".ts"));
	const output = [];
	for (const fileName of listOfFiles) {
		output.push({fileName: `${fileName}`, contents: (await readFile(`${path}\\${fileName}`)).toString(), base: basePath});
	}
	return output;
}

async function findWhichFile(funcName: string) {
	if (!files) {
		files = await generateFileContentsArray(path);
	}
	for (const file of files) {
		const index = file.contents.indexOf(`function ${funcName}`);
		if (index != -1) {
			return {...file, location: index};
		}
	}
	return null;
}
