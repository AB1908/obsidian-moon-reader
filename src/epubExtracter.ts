import type {Epub} from "@gxl/epub-parser/lib/parseEpub";
import type {GeneralObject} from "@gxl/epub-parser/lib/types";

export interface Section {
	name: string,
	sectionNumber: number,
	level: number
}

export function flattenStructureOfParsedEpub(parsedEpub: Epub) {
	if (!parsedEpub.structure) {
		return;
	}
	return recursiveHelper(parsedEpub.structure)
}

function recursiveHelper(array: GeneralObject, IR: Section[] = [], level = 0) {
	let currentNode;
	while(array) {
		currentNode = array.shift();
		if (!currentNode) break;
		IR.push({
			name: currentNode.name,
			sectionNumber: Number(currentNode.playOrder),
			level: level
		})
		if (currentNode.children) {
			IR = recursiveHelper(currentNode.children, IR, level+1);
		}
	}
	return IR;
}

// Creates a key value pair using section name as the key
function createLookupFromMrexpt(parsedMrexpt: mrexptEntries[]) {
	return parsedMrexpt.reduce((acc, curr) => ({...acc, [curr.sectionName.trim()]: curr.sectionNumber}), {});
}

interface mrexptEntries {
	sectionNumber: number,
	sectionName: string,
	[key: string]: any
}

export function exportDifference(parsedMrexpt: mrexptEntries[], epubSections: Section[]): number|null {
	const lookupObject: { [key: string]: number } = createLookupFromMrexpt(parsedMrexpt);
	for (const section of epubSections) {
		if (section.name in lookupObject) {
			return section.sectionNumber - lookupObject[section.name];
		}
	}
	return null;
}
