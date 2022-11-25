import {expect, test} from "@jest/globals";
import parserOutput from "./json/howtotakenotes-success/parser.parse.output-2022-11-19 14-04-29.json";
import {highlightContent} from "./json/howtotakenotes-success/mrexpt.json";
import {parseMrexptContents} from "../parseMrexptContents";

test("regular MoonReader import parsing", () => {
	expect(parseMrexptContents(highlightContent)).toEqual(parserOutput);
})
