import {Annotation} from "./types";

export function parseMrexptContents(highlightContent: string) {
	const listOfAnnotations: Annotation[] = [];
	const regexpHighlight = /#\n(?<id>.*)\n(?<title>.*)\n(?<path>.*)\n(?<lpath>.*)\n(?<chapter>.*)\n(?<p1>.*)\n(?<location>.*)\n(?<characters>.*)\n(?<color>.*)\n(?<timestamp>.*)\n(?<bookmarkText>.*)\n(?<noteText>.*)\n(?<highlightText>.*)\n(?<t1>.*)\n(?<t2>.*)\n(?<t3>.*)\n/g;
	let currentHighlight = regexpHighlight.exec(highlightContent);
	do {
		// todo: move to constructor?
		const annotation = new Annotation();
		const extractedRegexMatch = currentHighlight.groups;
		annotation.sectionNumber = Number(extractedRegexMatch.chapter);
		annotation.location = extractedRegexMatch.location;
		annotation.highlightText = extractedRegexMatch.highlightText.replaceAll("<BR>", "\n");
		annotation.noteText = extractedRegexMatch.noteText.replaceAll("<BR>", "\n");
		annotation.indexCount = Number(extractedRegexMatch.id);
		annotation.annotType1 = Number(extractedRegexMatch.t1);
		annotation.annotType2 = Number(extractedRegexMatch.t2);
		annotation.annotType3 = Number(extractedRegexMatch.t3);
		annotation.bookmarkText = extractedRegexMatch.bookmarkText;
		annotation.unixTimestamp = extractedRegexMatch.timestamp;
		annotation.signedColor = Number(extractedRegexMatch.color);
		annotation.characterCount = Number(extractedRegexMatch.characters);
		annotation.bookName = extractedRegexMatch.title;
		annotation.bookPath = extractedRegexMatch.path;
		listOfAnnotations.push(annotation);
		currentHighlight = regexpHighlight.exec(highlightContent)
	} while (currentHighlight !== null);
	return listOfAnnotations;
}
