import { Notice, Plugin, TFolder, TFile, TAbstractFile } from 'obsidian';
import { ExportSelecter } from 'src/suggester';
import { parse } from "src/parser";
import { generateOutput } from 'src/exporter';
import { SettingsTab } from './settings';
import { ColorPicker } from 'src/colorpicker';

export interface MoonReaderSettings {
	exportsPath: string
}

const MOONREADER_DEFAULT_SETTINGS: MoonReaderSettings = {
	exportsPath: 'Book Exports'
}

export default class MoonReader extends Plugin {
	settings: MoonReaderSettings;

	async onload() {
		await this.loadSettings();

		this.addRibbonIcon('book', 'Moon Reader', async () => await this.start());

		this.addCommand({
			id: 'parse-exports',
			name: 'Parse an export',
			editorCallback: async () =>
				await this.start()
		});
		this.addSettingTab(new SettingsTab(this.app, this));
	}

	async start() {
		const currentTFile = this.app.workspace.getActiveFile();
		if (!currentTFile) {
			new Notice("No active file!");
		}
		const rootPath: string = this.settings.exportsPath;
		const exportTFolder: TAbstractFile = this
			.app
			.vault
			.getAbstractFileByPath(rootPath);
		let exportedFiles: TFile[];
		if (exportTFolder instanceof TFolder) {
			exportedFiles = exportTFolder
				.children
				?.filter(
					(t) => (t instanceof TFile) && t.basename && t.extension == `mrexpt`
				)
				.map(t => t as TFile);
		} else {
			//sanity check
			new Notice("Invalid Folder Path");
			return;
		}
		if (!exportedFiles.length) {
			new Notice("Folder does not have any Moon+ Reader exports!");
			return;
		}
		const suggesterModal = new ExportSelecter(this.app, exportedFiles);
		//TODO: raise error for no input?
		const mrexptChoice = await suggesterModal.openAndGetValue().catch(e => { new Notice("Prompt cancelled"); }) as TFile;
		if (!mrexptChoice) {
			return;
		}
		const parsedOutput = await parse(mrexptChoice);
		if (parsedOutput) {
			const colorChoices = new Set<number>();
			parsedOutput.forEach(t => colorChoices.add(t.signedColor))
			const colorModal = new ColorPicker(this.app, Array.from(colorChoices));
			const colorChoice = await colorModal.openAndGetValue()
			// .catch(e=>console.log(e));
			await this.app.vault.append(currentTFile, generateOutput(parsedOutput, mrexptChoice, colorChoice, this.settings.enableSRSSupport));
		} else {
			new Notice("Nothing added!");
		}
	}

	async loadSettings() {
		this.settings = Object.assign({}, MOONREADER_DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
