import {Annotation} from 'types';
import integerToRGBA from './util';

export function generateOutput(
    listOfAnnotations: Annotation[]
): string {
    const sample = listOfAnnotations[0];
    console.log(sample);
    console.log(listOfAnnotations[1]);
    const frontmatter = `---\npath: ${sample.bookPath}\ntitle: ${sample.bookName}\nauthor: \n---\n`;
    var output = frontmatter;
    for (let annotation of listOfAnnotations) {
        var annotationAsString: string;
        if (annotation.highlightText) {
            annotationAsString = `\n:::\n\n`;
            annotationAsString += `color:: ${integerToRGBA(annotation.signedColor)}\n\n> ${annotation.highlightText}`;
            if (annotation.noteText) {
                annotationAsString += `\n\n${annotation.noteText}\n\n`;
                annotationAsString += ":::\n";
            } else {
                annotationAsString += `\n\n:::\n`;
            }
        }
        if (annotationAsString){
            output += annotationAsString;
        }
    }

    return output;
}