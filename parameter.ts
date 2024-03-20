import { getEnv } from "https://raw.githubusercontent.com/hugoalh-studio/cross-env-ts/v1.0.1/mod.ts";
import { isStringSingleLine } from "https://raw.githubusercontent.com/hugoalh-studio/is-string-singleline-ts/v1.0.0/mod.ts";
import { GitHubActionsFileMapCommand, type GitHubActionsFileCommandOptions } from "./command/file.ts";
export interface GitHubActionsInputOptions {
	/**
	 * Whether the input is require.
	 * @default false
	 */
	require?: boolean;
}
/**
 * Get the raw value of an input.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @param {string} key Key of the input.
 * @returns {string | undefined} Raw value of the input.
 */
export function getInputRaw(key: string): string | undefined {
	if (!isStringSingleLine(key)) {
		throw new SyntaxError(`\`${key}\` is not a valid GitHub Actions input key!`);
	}
	return getEnv(`INPUT_${key.replaceAll(" ", "_").toUpperCase()}`);
}
/**
 * Get the value of an input.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @param {string} key Key of the input.
 * @param {GitHubActionsInputOptions} [options={}] Options.
 * @returns {string} Value of the input.
 */
export function getInput(key: string, options: GitHubActionsInputOptions = {}): string {
	const value: string | undefined = getInputRaw(key);
	if (typeof value === "undefined") {
		if (options.require) {
			throw new ReferenceError(`Input \`${key}\` is not defined!`);
		}
		return "";
	}
	return value;
}
/**
 * Get the big integer value of an input.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @param {string} key Key of the input.
 * @param {GitHubActionsInputOptions} [options={}] Options.
 * @returns {bigint} Big integer value of the input.
 */
export function getInputBigInt(key: string, options: GitHubActionsInputOptions = {}): bigint {
	const value: string = getInput(key, options);
	if (value.length === 0) {
		if (options.require) {
			throw new ReferenceError(`Input \`${key}\` is not defined!`);
		}
		return 0n;
	}
	return BigInt(value.replace(/n$/, ""));
}
/**
 * Get the boolean value of an input.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @param {string} key Key of the input.
 * @param {GitHubActionsInputOptions} [options={}] Options.
 * @returns {boolean} Boolean value of the input.
 */
export function getInputBoolean(key: string, options: GitHubActionsInputOptions = {}): boolean {
	const value: string = getInput(key, options);
	if (value.length === 0) {
		if (options.require) {
			throw new ReferenceError(`Input \`${key}\` is not defined!`);
		}
		return false;
	}
	if (/^[Ff]alse$|^FALSE$/.test(value)) {
		return false;
	}
	if (/^[Tt]rue$|^TRUE$/.test(value)) {
		return true;
	}
	throw new SyntaxError(`\`${value}\` (input \`${key}\`) is not a valid boolean!`);
}
/**
 * Get the number value of an input.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @param {string} key Key of the input.
 * @param {GitHubActionsInputOptions} [options={}] Options.
 * @returns {number} Number value of the input.
 */
export function getInputNumber(key: string, options: GitHubActionsInputOptions = {}): number {
	const value: string = getInput(key, options);
	if (value.length === 0) {
		if (options.require) {
			throw new ReferenceError(`Input \`${key}\` is not defined!`);
		}
		return 0;
	}
	return Number(value);
}
/**
 * **\[🧪 EXPERIMENTAL\]** Get the regular expression value of an input.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @param {string} key Key of the input.
 * @param {GitHubActionsInputOptions} [options={}] Options.
 * @returns {RegExp} Regular expression value of the input.
 */
export function getInputRegExp(key: string, options: GitHubActionsInputOptions = {}): RegExp {
	const value: string = getInput(key, options);
	if (value.length === 0) {
		if (options.require) {
			throw new ReferenceError(`Input \`${key}\` is not defined!`);
		}
		return /.*/m;
	}
	const matches: RegExpMatchArray | null = value.match(/^\/(?<expression>.+)\/(?<flag>.*)$/);
	if (matches !== null && typeof matches.groups !== "undefined" && typeof matches.groups.expression !== "undefined" && typeof matches.groups.flag !== "undefined") {
		return new RegExp(matches.groups.expression, matches.groups.flag);
	}
	throw new SyntaxError(`\`${value}\` (input \`${key}\`) is not a valid regular expression!`);
}
/**
 * Handle the outputs in the GitHub Actions runner.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * > - File System - Read (`allow-read`)
 * > - File System - Write (`allow-write`)
 */
export class GitHubActionsOutput {
	#command: GitHubActionsFileMapCommand = new GitHubActionsFileMapCommand("GITHUB_OUTPUT");
	/**
	 * Clear the outputs which set in the current step.
	 * @returns {this}
	 */
	clear(): this {
		this.#command.clear();
		return this;
	}
	/**
	 * Optimize the outputs which set in the current step to reduce size whenever possible.
	 * @returns {this}
	 */
	optimize(): this {
		this.#command.optimize();
		return this;
	}
	/**
	 * Set the output.
	 * @param {string} key Key of the output.
	 * @param {string} value Value of the output.
	 * @returns {this}
	 */
	set(key: string, value: string): this;
	/**
	 * Set the outputs.
	 * @param {{ [key: string]: string; } | Map<string, string> | Record<string, string>} pairs Pairs of the output.
	 * @returns {this}
	 */
	set(pairs: { [key: string]: string; } | Map<string, string> | Record<string, string>): this;
	set(param0: string | { [key: string]: string; } | Map<string, string> | Record<string, string>, param1?: string): this {
		const pairs: Map<string, string> = new Map<string, string>();
		if (typeof param0 === "string") {
			if (!isStringSingleLine(param0)) {
				throw new SyntaxError(`\`${param0}\` is not a valid GitHub Actions output key!`);
			}
			pairs.set(param0, param1!);
		} else {
			for (const [key, value] of ((param0 instanceof Map) ? param0.entries() : Object.entries(param0))) {
				if (!isStringSingleLine(key)) {
					throw new SyntaxError(`\`${key}\` is not a valid GitHub Actions output key!`);
				}
				pairs.set(key, value);
			}
		}
		if (pairs.size > 0) {
			this.#command.append(pairs);
		}
		return this;
	}
}
/**
 * Clear the outputs which set in the current step.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * > - File System - Read (`allow-read`)
 * > - File System - Write (`allow-write`)
 * @returns {void}
 */
export function clearOutputs(): void {
	new GitHubActionsOutput().clear();
}
/**
 * Optimize the outputs which set in the current step to reduce size whenever possible.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * > - File System - Read (`allow-read`)
 * > - File System - Write (`allow-write`)
 * @returns {void}
 */
export function optimizeOutputs(): void {
	new GitHubActionsOutput().optimize();
}
/**
 * Set the output.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * > - File System - Read (`allow-read`)
 * > - File System - Write (`allow-write`)
 * @param {string} key Key of the output.
 * @param {string} value Value of the output.
 * @param {GitHubActionsFileCommandOptions} [options={}] Options.
 * @returns {void}
 */
export function setOutput(key: string, value: string, options: GitHubActionsFileCommandOptions={}): void {
	const instance: GitHubActionsOutput = new GitHubActionsOutput();
	instance.set(key,value);
	if (options.optimize) {
		instance.optimize();
	}
}
/**
 * Set the outputs.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * > - File System - Read (`allow-read`)
 * > - File System - Write (`allow-write`)
 * @param {{ [key: string]: string; } | Map<string, string> | Record<string, string>} pairs Pairs of the output.
 * @param {GitHubActionsFileCommandOptions} [options={}] Options.
 * @returns {void}
 */
export function setOutputs(pairs: { [key: string]: string; } | Map<string, string> | Record<string, string>, options: GitHubActionsFileCommandOptions={}): void{
	const instance: GitHubActionsOutput = new GitHubActionsOutput();
	instance.set(pairs);
	if (options.optimize) {
		instance.optimize();
	}
}
