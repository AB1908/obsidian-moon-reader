import {App, PluginSettingTab, Setting} from 'obsidian';
import MoonReader, {MoonReaderSettings} from 'src/main';

export class SettingsTab extends PluginSettingTab {
	plugin: MoonReader;

	constructor(app: App, plugin: MoonReader) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Experimental Support for SRS')
			.setDesc(createFragment((frag) => {
				frag.appendText("Enable support for ");
				frag.createEl(
					"a",
					{
						text: "AB1908's new SRS plugin",
						href: "https://github.com/AB1908/obsidian-spaced-repetition/",
					},
					(a) => {
						a.setAttr("target", "_blank");
					}
				);
				frag.appendText(
					". This will change the output format."
				);
			}))
			.addToggle(toggle =>
				toggle
					.setValue(this.plugin.settings.enableSRSSupport)
					.onChange(async value => await this.updateSettings({enableSRSSupport: value}))
			).descEl.innerHTML = "Enable support for <a href=\"https://github.com/AB1908/obsidian-spaced-repetition\">AB1908\'s new SRS plugin</a>. This changes the output format.";

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

	async updateSettings(settings: Partial<MoonReaderSettings>) {
		Object.assign(this.plugin.settings, settings);
		await this.plugin.saveSettings();
	}
}

