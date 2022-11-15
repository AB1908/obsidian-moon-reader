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
lastExportedID: ${listOfAnnotations.last().indexCount}
---

`;
    let output = frontmatter;

    for (const annotation of listOfAnnotations.filter(t=>t.signedColor == colorFilter)) {
        let annotationAsString: string;
        if (annotation.highlightText) {
            annotationAsString = `${template(integerToRGBA(annotation.signedColor), annotation.highlightText, annotation.noteText)}\n`;
        }
        if (annotationAsString) {
            output += annotationAsString;
        }
    }

    return output;
}

function template(type: any, highlight: string, note: string) {
    if (highlight.includes("\n")) {
        highlight = highlight.replaceAll("\n", "\n> ");
    }
    return `> [!${type}]
> ${highlight}
> ***
> ${note}
`;
}
