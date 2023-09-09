import {expect, test} from "@jest/globals";
import parserOutput from "./json/parseMrexptContents.parseMrexptContents.output-2022-11-25 22-07-41.json";
import {highlightContent} from "./json/parseMrexptContents.parseMrexptContents.input-2022-11-25 22-07-41.json";
import {parseMrexptContents} from "../parseMrexptContents";

test("regular MoonReader import parsing", () => {
	expect(parseMrexptContents(highlightContent)).toEqual(parserOutput);
})
