import { Annotation } from 'src/types';
import integerToRGBA from './util';
import { TFile } from 'obsidian';

export function generateOutput(listOfAnnotations: Annotation[], mrexptTFile: TFile, colorFilter: number): string {
    const sample = listOfAnnotations[0];
    //TODO: extract into template
    const frontmatter = `---\npath: "${mrexptTFile.path}"\ntitle: "${sample.bookName}"\nauthor: \nlastExportedTimestamp: ${mrexptTFile.stat.mtime}\nlastExportedID: ${listOfAnnotations.last().indexCount}\n---\n`;
    let output = frontmatter;

    for (let annotation of listOfAnnotations.filter(t=>t.signedColor == colorFilter)) {
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