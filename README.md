## Obsidian Moon Reader

**NOTE: This plugin is in alpha so please ensure you have _backed up your vault_ and have _file recovery_ turned on!**

### How To Use

1. Install this plugin using [TfTHacker's BRAT](https://github.com/TfTHacker/obsidian42-brat).

   - Install BRAT from Community Plugins

   - Use this repo's URL (https://github.com/AB1908/obsidian-moon-reader) to install a plugin from URL in BRAT.

2. Configure the folder where `.mrexpt` exports from Moon+ Reader are stored.
   I use a root folder named "Book Exports".

   **Note: This must be in your Obsidian Vault.**

3. Navigate to an open file where you want to dump the markdown. This can be an existing file or a new file. Text will be appended at the end of the file.

4. Use the command palette to parse an export from Moon+ Reader. The command is named "Parse an export".

5. Choose the color of which annotations you want to import.

Note that this is a one time processing and will keep being appended to if you rerun it. 
Incremental processing (i.e. processing only the change) will come at a later time.

### What is currently supported?

Very little to be honest.
You can only import a single color's worth of highlights at the moment.
The export format uses Obsidian callouts and looks like so:

```
> [!color hexcode]
> highlight text
> ***
> note text
```

Sample output:
```
> [!FF33AA]
> Down the rabbit hole
> ***
> Here we go!
```

## To do

This is by no means a guarantee of what will be implemented. There are no timelines whatsoever.

- [ ] Allow importing all colors of annotations at once
- [ ] Allow filtering by annotation types (underlines vs highlights)
- [ ] Export templates
- [ ] API support
- [ ] Better export file handling (only supports a single folder for now)
- [ ] Use frontmatter more effectively
- [ ] Better incremental exports