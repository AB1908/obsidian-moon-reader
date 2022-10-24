import { App, FuzzyMatch, FuzzySuggestModal } from 'obsidian';
import integerToRGBA from './util';

export class ColorPicker extends FuzzySuggestModal<number> {
	suggestions: number[];
	private resolve: (value: number) => void;
	private reject: (reason?: string) => void;
	submitted: boolean;

	constructor(app: App, suggestions: number[]) {
		super(app);
		this.setPlaceholder("Choose your color");
		// TODO: better folder handling
		this.suggestions = suggestions;
		this.submitted = false;
	}

	getItems(): number[] {
		return this.suggestions;
	}

	getItemText(item: number): string {
		return `${integerToRGBA(item)}`;
	}

	onChooseItem(item: number ,_evt: MouseEvent | KeyboardEvent): void {
		this.resolve(item);
	}

	selectSuggestion(value: FuzzyMatch<number>, evt: MouseEvent | KeyboardEvent): void {
		this.submitted = true;
		this.onChooseSuggestion(value, evt);
		this.close();
	}

	onClose(): void {
		if (!this.submitted) {
			this.reject();
		}
	}

	async openAndGetValue(
	): Promise<number> {
		return new Promise(
			(resolve, reject) => {
				try {
					this.resolve = resolve;
					this.reject = reject;
					this.open();
				}
				catch (e) {
					console.log(e)
				}
			}
		)
	}
	
	renderSuggestion(item: FuzzyMatch<number>, el: HTMLElement): void {
		const colorDiv = el.createDiv("color-box");
		colorDiv.style.backgroundColor = `#${integerToRGBA(item.item).slice(0,6)}`;
		const div = el.createDiv();
		div.setText(`${integerToRGBA(item.item).slice(0,6)}`);
	}
}