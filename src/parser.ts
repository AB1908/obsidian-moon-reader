import {TFile, Notice} from 'obsidian';
import {Annotation} from 'src/types';

export async function parse(
	mrexptChoice: TFile
): Promise<Annotation[]> {
	try {
		const currentTFile = this
			.app
			.workspace
			.getActiveFile()
		;
		if (!currentTFile) {
			//TODO: Handle by giving file prompt?
			new Notice("No active file!");
			return;
		}
// todo fix hardcoding
		const parsedFileFrontmatter = this
			.app
			.metadataCache
			.getFileCache(currentTFile)
			?.frontmatter
		;
		if (!parsedFileFrontmatter) { //todo: refactor
			//TODO: Raise exception
			new Notice("File Metadata Missing!");
		}
		/// todo: add time checking

		const highlightContent = await this
			.app
			.vault
			.read(mrexptChoice)
		;
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
			annotation.unixTimestamp = extractedRegexMatch.unixtime;
			annotation.signedColor = Number(extractedRegexMatch.color);
			annotation.characterCount = Number(extractedRegexMatch.characters);
			annotation.bookName = extractedRegexMatch.title;
			annotation.bookPath = extractedRegexMatch.path;
			listOfAnnotations.push(annotation);
			currentHighlight = regexpHighlight.exec(highlightContent)
		} while (currentHighlight !== null);
		return listOfAnnotations;
	} catch (e) {
		new Notice("Error: Check console for logs.");
		console.log(e);
	}
}
