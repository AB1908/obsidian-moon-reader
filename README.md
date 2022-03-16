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

Note that this is a one time processing and will keep being appended to if you rerun it. 
Incremental processing (i.e. processing only the change) will come at a later time.

### What is currently supported?

Very little to be honest.
The export format looks like this:

```
:::

color:: (RGBA hex code)

> This is highlighted text.

This is the note for that highlight.

:::
```

Sample output:
```
:::

color:: #FF33AA44

> Down the rabbit hole

Here we go!

:::
```