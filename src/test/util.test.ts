import {expect, test} from "@jest/globals";
import {number} from "./json/howtotakenotes-success/util.integerToRGBA.input-2022-11-19 14-04-29.json"
import {convertedRGBA} from "./json/howtotakenotes-success/util.integerToRGBA.output-2022-11-19 14-04-29.json";
import integerToRGBA from "../util";

test("util.integerToRGBA", () => {
	expect(integerToRGBA(number)).toEqual(convertedRGBA);
})
