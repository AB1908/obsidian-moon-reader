// import {logArgs} from "./devutils";

export default function integerToRGBA(number: number): string {
	if (number < 0) {
		number = 0xFFFFFFFF + number + 1;
	}
	const ARGB = number.toString(16).toUpperCase();

	const output = `${ARGB.slice(2,)}${ARGB.slice(0, 2)}`;
	// eslint-disable-next-line prefer-rest-params
	// logArgs(arguments, output);
	return output;
}
