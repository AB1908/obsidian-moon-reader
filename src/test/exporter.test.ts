import {expect, test} from "@jest/globals";
import {generateOutput} from "../exporter";
import {
	colorFilter,
	listOfAnnotations,
	mrexptTFile
} from "./json/howtotakenotes-success/exporter.generateOutput.input-2022-11-19 14-04-30.json";
import {Annotation} from "../types";
import {TFile} from "obsidian";

test("exporter.generateOutput", () => {
	const list = Array.from(listOfAnnotations);
	expect(generateOutput(list as Annotation[], mrexptTFile as unknown as TFile, colorFilter, false)).toMatchSnapshot();
});

test("exporter new experimental output", () => {
	const list = Array.from(listOfAnnotations);
	expect(generateOutput((list as Annotation[]), ((mrexptTFile as unknown) as TFile), colorFilter, true)).toMatchInlineSnapshot(`
"---
path: "Book Exports/Sönke Ahrens - How to Take Smart Notes_ One Simple Technique to Boost Writing,  Learning and Thinking-Sönke Ahrens (2022).mrexpt"
title: "How to Take Smart Notes. One Simple Technique to Boost Writing,  Learning and Thinking"
author: 
lastExportedTimestamp: 1665321164166
lastExportedID: 12623
---

> [!notes] 12585
> INTRODUCTION
> ***
> 

## 1 Everything You Need to Know

## 2 Everything You Need to Do: 

## 3 Everything You Need to Have

## 4 A Few Things to Keep in Mind

## 5 Writing Is the Only Thing That Matters

## 6 Simplicity Is Paramount

## 7 Nobody Ever Starts From Scratch

## 8 Let the Work Carry You Forward

## 9 Separate and Interlocking Tasks

## 10 Read for Understanding

## 11 Take Smart Notes

## 12 Develop Ideas

## 13 Share Your Insight

## 14 Make It a Habit

### 1.1 Good Solutions are Simple – and Unexpected

### 1.2 The Slip-box

### 1.3 The slip-box manual

"
`);
});
