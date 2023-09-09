import { Annotation } from 'src/types';
import integerToRGBA from './util';
import { TFile } from 'obsidian';

export function generateOutput(listOfAnnotations: Annotation[], mrexptTFile: TFile, colorFilter: number): string {
    const sample = listOfAnnotations[0];
    //TODO: extract into template
    // TODO: last exported ID is likely broken
    const frontmatter = `---
path: "${mrexptTFile.path}"
title: "${sample.bookName}"
author: 
lastExportedTimestamp: ${mrexptTFile.stat.mtime}
lastExportedID: ${listOfAnnotations[listOfAnnotations.length-1].indexCount}
---

`;

    for (const annotation of listOfAnnotations.filter(t=>t.signedColor == colorFilter)) {
        let annotationAsString: string;
        if (annotation.highlightText) {
            annotationAsString = `${template(annotation)}\n`;
        }
        if (annotationAsString) {
            output += annotationAsString;
        }
    }

    return output;
}

function template(annotation: Annotation) {
	const {indexCount, highlightText: highlight, noteText: note} = annotation;
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
}
