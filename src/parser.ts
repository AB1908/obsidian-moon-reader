import {Notice, TFile} from 'obsidian';
import {Annotation} from 'src/types';
import {parseMrexptContents} from "./parseMrexptContents";

// import {logArgs} from "./devutils";

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
		;const listOfAnnotations = parseMrexptContents(highlightContent);
		// eslint-disable-next-line prefer-rest-params
		// logArgs(arguments, listOfAnnotations)
		return listOfAnnotations;
	} catch (e) {
		new Notice("Error: Check console for logs.");
		console.log(e);
	}
}
