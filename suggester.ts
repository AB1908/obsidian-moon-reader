import { App, TFile, FuzzyMatch, FuzzySuggestModal } from 'obsidian';

export class ExportSelecter extends FuzzySuggestModal<TFile> {
	suggestions: TFile[];
	private resolve: (value: TFile) => void;
	private reject: (reason?: string) => void;
	submitted: boolean;

	constructor(app: App, suggestions: TFile[]) {
		super(app);
		this.setPlaceholder("Choose your export file");
		// TODO: better folder handling
		this.suggestions = suggestions;
		this.submitted = false;
	}

	getItems(): TFile[] {
		return this.suggestions;
	}

	getItemText(item: TFile): string {
		return `${item.basename}`;
	}

	onChooseItem(item: TFile, evt: MouseEvent | KeyboardEvent): void {
		this.resolve(item);
	}

	selectSuggestion(value: FuzzyMatch<TFile>, evt: MouseEvent | KeyboardEvent): void {
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
	): Promise<TFile> {
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
}