import {expect, test} from "@jest/globals";
import {generateOutput} from "../exporter";
import {
	colorFilter,
	listOfAnnotations,
	mrexptTFile
} from "./json/howtotakenotes-success/exporter.generateOutput.input-2022-11-19 14-04-30.json";
import {Annotation} from "../types";
import {TFile} from "obsidian";
import {output as parsedMarkdown} from "./json/howtotakenotes-success/exporter.generateOutput.output-2022-11-19 14-04-30.json"

test("exporter.generateOutput", () => {
	const list = Array.from(listOfAnnotations);
	expect(generateOutput(list as Annotation[], mrexptTFile as unknown as TFile, colorFilter)).toBe(parsedMarkdown)
})

