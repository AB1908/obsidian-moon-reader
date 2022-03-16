import { App, Editor, MarkdownView, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { parse } from "parser";
import { generateOutput } from 'exporter';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	exportsPath: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	exportsPath: 'default'
}

export default class MoonReader extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		const ribbonIconEl = this.addRibbonIcon('book', 'Moon Reader', (evt: MouseEvent) => {
			new Notice(`I don't know how to do the popup yet. Please use the command palette.`);
		});
		this.addCommand({
			id: 'parse-exports',
			name: 'Parse an export',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				const currentTFile = this.app.workspace.getActiveFile();
				if (!currentTFile) {
					new Notice("No active file!");
				}
				await this.app.vault.append(currentTFile, generateOutput(await parse()));
			}
		});
		this.addSettingTab(new SettingsTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SettingsTab extends PluginSettingTab {
	plugin: MoonReader;

	constructor(app: App, plugin: MoonReader) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		// containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});

		new Setting(containerEl)
			.setName('Book Exports Path')
			.setDesc('This is where your mrexpt files are stored.')
			.addText(text => text
				.setPlaceholder('Book Exports')
				.setValue(this.plugin.settings.exportsPath)
				.onChange(async (value) => {
					// console.log('Secret: ' + value);
					this.plugin.settings.exportsPath = value;
					await this.plugin.saveSettings();
				}));
	}
}
