import {Annotation} from 'src/types';
import {TFile} from 'obsidian';
import integerToRGBA from "./util";

export function generateOutput(listOfAnnotations: Annotation[], mrexptTFile: TFile, colorFilter: number, enableNewExporter: boolean): string {
    const sample = listOfAnnotations[0];
    //TODO: extract into template
    // TODO: last exported ID is likely broken
	let output = `---
path: "${mrexptTFile.path}"
title: "${sample.bookName}"
author: 
lastExportedTimestamp: ${mrexptTFile.stat.mtime}
lastExportedID: ${listOfAnnotations[listOfAnnotations.length - 1].indexCount}
---

`;

    for (const annotation of listOfAnnotations.filter(t=>t.signedColor == colorFilter)) {
        let annotationAsString: string;
        if (annotation.highlightText) {
            annotationAsString = `${template(annotation, enableNewExporter)}\n`;
        }
        if (annotationAsString) {
            output += annotationAsString;
        }
    }

    return output;
}

function template(annotation: Annotation, enableNewExporter: boolean) {
	let {indexCount, highlightText: highlight, noteText: note} = annotation;
	if (enableNewExporter) {
		if (note.trim() === "#") {
			return `# ${highlight.replace("\n", ": ")}\n`;
		}
		if (note.trim() === "##") {
			return `## ${highlight.replace("\n", ": ")}\n`;
		}
		if (note.trim() === "###") {
			return `### ${highlight.replace("\n", ": ")}\n`;
		}
		return `> [!notes] ${indexCount}
${highlight.split("\n").map(t=>`> ${t}`).join("\n")}
> ***
${note.split("\n").map(t=>`> ${t}`).join("\n")}
`;
	} else {
		if (highlight.includes("\n")) {
			highlight = highlight.replaceAll("\n", "\n> ");
		}
		return `> [!${(integerToRGBA(annotation.signedColor))}]
> ${highlight}
> ***
> ${note}
`;
	}
}
