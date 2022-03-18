import { TFile, Notice } from 'obsidian';
import { ExportSelecter } from 'suggester';
import { Annotation } from 'types';
import { PluginSettings } from 'main';

export async function parse(
    settings: PluginSettings
): Promise<Annotation[]> {
    try {
        let fileChoice: TFile | void = null;
        const rootPath = settings.exportsPath; // TODO: change hardcoded path
        const currentTFile = this
            .app
            .workspace
            .getActiveFile()
            ;
        if (!currentTFile) {
            new Notice("No active file!");
            return;
        }
        const exportTFolder = this
            .app
            .vault
            .getAbstractFileByPath(rootPath)
        if (!exportTFolder) {
            new Notice("Invalid Folder Path");
            return;
        }
        const exportedFiles = exportTFolder
            .children
            ?.filter(
                (t: TFile) => t.basename && t.extension == `mrexpt`
            )
            ;
        if (!exportedFiles.length) {
            new Notice("Folder does not have any Moon+ Reader exports!");
            return;
        }
        const suggesterModal = new ExportSelecter(this.app, exportedFiles);
        const fileChoicePromise = new Promise(
            (
                resolve: (value: TFile) => void,
                reject: (reason?: string) => void
            ) => suggesterModal.openAndGetValue(resolve, reject)
        )
            ;
        fileChoice = await fileChoicePromise.catch((e) => { new Notice("Prompt cancelled!") });
        if (!fileChoice) {
            return;
        }
        /// todo: add time checking

        let highlightContent = await this
            .app
            .vault
            .read(fileChoice)
            ;
        let listOfAnnotations: Annotation[] = [];
        let regexpHighlight = /\#\n(?<id>.*)\n(?<title>.*)\n(?<path>.*)\n(?<lpath>.*)\n(?<chapter>.*)\n(?<p1>.*)\n(?<location>.*)\n(?<characters>.*)\n(?<color>.*)\n(?<timestamp>.*)\n(?<bookmarkText>.*)\n(?<noteText>.*)\n(?<highlightText>.*)\n(?<t1>.*)\n(?<t2>.*)\n(?<t3>.*)\n/g;
        let currentHighlight = regexpHighlight.exec(highlightContent);
        do {
            // todo: move to constructor?
            var annotation = new Annotation();
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
    }
    catch (e) {
        new Notice("Error: Check console for logs.");
        console.log(e);
    }
}