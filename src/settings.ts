import { App, PluginSettingTab, Setting } from 'obsidian';
import MoonReader from 'src/main';

export class SettingsTab extends PluginSettingTab {
	plugin: MoonReader;

	constructor(app: App, plugin: MoonReader) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

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
