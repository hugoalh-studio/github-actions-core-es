import { appendFileSync, readFileSync, writeFileSync } from "node:fs";
import { EOL } from "node:os";
import { isAbsolute as isPathAbsolute } from "node:path";
import { getEnv } from "https://raw.githubusercontent.com/hugoalh-studio/cross-env-ts/v1.0.1/mod.ts";
import { isStringSingleLine } from "https://raw.githubusercontent.com/hugoalh-studio/is-string-singleline-ts/v1.0.0/mod.ts";
import { type KeyValueLike } from "../common.ts";
const commandsFile: Set<string> = new Set<string>([
	"GITHUB_ENV",
	"GITHUB_OUTPUT",
	"GITHUB_PATH",
	"GITHUB_STATE",
	"GITHUB_STEP_SUMMARY"
]);
const regexpCommandFile = /^(?:[\dA-Z][\dA-Z_-]*)?[\dA-Z]$/;
/**
 * **\[🅰️ ADVANCED\]** Communicate with the GitHub Actions runner via file command.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * > - File System - Read (`allow-read`)
 * > - File System - Write (`allow-write`)
 * @access private
 */
class GitHubActionsFileCommandBase {
	#commandPath: string;
	/**
	 * **\[🅰️ ADVANCED\]** Create new instance to communicate with the GitHub Actions runner via file command.
	 * 
	 * > **🛡️ Require Permission**
	 * >
	 * > - Environment Variable (`allow-env`)
	 * > - File System - Read (`allow-read`)
	 * > - File System - Write (`allow-write`)
	 * @param {string} command File command.
	 */
	constructor(command: string) {
		if (!(
			commandsFile.has(command) ||
			regexpCommandFile.test(command)
		)) {
			throw new SyntaxError(`\`${command}\` is not a valid GitHub Actions file command!`);
		}
		const commandPath: string = getEnv(command) ?? "";
		if (commandPath.length === 0) {
			throw new Error(`Environment path \`${command}\` is not defined!`);
		}
		if (!isPathAbsolute(commandPath)) {
			throw new Error(`\`${commandPath}\` (environment path \`${command}\`) is not a valid absolute path!`);
		}
		this.#commandPath = commandPath;
	}
	/**
	 * Path of the file command.
	 * @return {string} Path of the file command.
	 */
	get commandPath(): string {
		return this.#commandPath;
	}
	/**
	 * Clear the file command which set in the current step.
	 * @returns {this}
	 */
	clear(): this {
		writeFileSync(this.commandPath, "", { encoding: "utf-8" });
		return this;
	}
}
export interface GitHubActionsFileCommandOptions {
	/**
	 * Whether to optimize the file command to reduce size whenever possible.
	 * @default false
	 */
	optimize?: boolean;
}
/**
 * **\[🅰️ ADVANCED\]** Communicate with the GitHub Actions runner via file line command.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * > - File System - Read (`allow-read`)
 * > - File System - Write (`allow-write`)
 */
export class GitHubActionsFileLineCommand extends GitHubActionsFileCommandBase {
	/**
	 * Append value to the file line command.
	 * @param {...string} values Value of the file line command.
	 * @returns {this}
	 */
	append(...values: string[]): this {
		values.forEach((value: string): void => {
			if (!(isStringSingleLine(value) && value.length > 0)) {
				throw new SyntaxError(`\`${value}\` is not a valid GitHub Actions file line command value!`);
			}
		});
		if (values.length > 0) {
			appendFileSync(this.commandPath, `${Array.from<string>(new Set<string>(values).values()).join(EOL)}${EOL}`, { encoding: "utf-8" });
		}
		return this;
	}
	/**
	 * Optimize the file line command to reduce size whenever possible.
	 * @returns {this}
	 */
	optimize(): this {
		const content: Set<string> = new Set<string>(readFileSync(this.commandPath, { encoding: "utf-8" }).split(/\r?\n/g).map<string>((value: string): string => {
			return value.trim();
		}).filter((value: string): boolean => {
			return (value.length > 0);
		}));
		writeFileSync(this.commandPath, (content.size > 0) ? `${Array.from<string>(content.values()).join(EOL)}${EOL}` : "", { encoding: "utf-8" });
		return this;
	}
}
/**
 * Format GitHub Actions file map command.
 * @access private
 * @param {Map<string, string>} inputs Inputs.
 * @returns {string}
 */
function formatFileMapCommand(inputs: Map<string, string>): string {
	return Array.from<[string, string], string>(inputs.entries(), ([key, value]: [string, string]): string => {
		if (isStringSingleLine(value)) {
			return `${key}=${value}`;
		}
		let delimiter: string;
		do {
			delimiter = crypto.randomUUID().replaceAll("-", "");
		} while (
			key.search(delimiter) !== -1 ||
			value.search(delimiter) !== -1
		);
		return `${key}<<${delimiter}${EOL}${value.replace(/\r?\n/g, EOL)}\n${delimiter}`;
	}).join(EOL);
}
/**
 * **\[🅰️ ADVANCED\]** Communicate with the GitHub Actions runner via file map command.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * > - File System - Read (`allow-read`)
 * > - File System - Write (`allow-write`)
 */
export class GitHubActionsFileMapCommand extends GitHubActionsFileCommandBase {
	/**
	 * Append pair to the file map command.
	 * @param {string} key Key of the pair of the file map command.
	 * @param {string} value Value of the pair of the file map command.
	 * @returns {this}
	 */
	append(key: string, value: string): this;
	/**
	 * Append pairs to the file map command.
	 * @param {KeyValueLike} pairs Pairs of the file map command.
	 * @returns {this}
	 */
	append(pairs: KeyValueLike): this;
	append(param0: string | KeyValueLike, param1?: string): this {
		const pairs: Map<string, string> = new Map<string, string>();
		if (typeof param0 === "string") {
			if (!isStringSingleLine(param0)) {
				throw new SyntaxError(`\`${param0}\` is not a valid GitHub Actions file map command pair key!`);
			}
			pairs.set(param0, param1!);
		} else {
			for (const [key, value] of ((param0 instanceof Map) ? param0.entries() : Object.entries(param0))) {
				if (!isStringSingleLine(key)) {
					throw new SyntaxError(`\`${key}\` is not a valid GitHub Actions file map command pair key!`);
				}
				pairs.set(key, value);
			}
		}
		if (pairs.size > 0) {
			appendFileSync(this.commandPath, `${formatFileMapCommand(pairs)}${EOL}`, { encoding: "utf-8" });
		}
		return this;
	}
	/**
	 * Optimize the file map command to reduce size whenever possible.
	 * @returns {this}
	 */
	optimize(): this {
		const pairs: Map<string, string> = new Map<string, string>();
		const content: string[] = readFileSync(this.commandPath, { encoding: "utf-8" }).split(/\r?\n/g);
		for (let index = 0; index < content.length; index += 1) {
			const line: string = content[index];
			if (/^[\s\t]*$/.test(line)) {
				continue;
			}
			if (/^.+<<.+?$/.test(line)) {
				const lineSplit: string[] = line.split("<<");
				const key: string = lineSplit.slice(0, lineSplit.length - 1).join("<<");
				const delimiter: string = lineSplit[-1];
				const value: string[] = [];
				let indexOffset: number = index;
				while (true) {
					indexOffset += 1;
					if (indexOffset >= content.length) {
						/* File may contain issue, abort optimization. */
						return this;
					}
					const lineOffset: string = content[indexOffset];
					if (lineOffset === delimiter) {
						break;
					}
					value.push(lineOffset);
				}
				pairs.set(key, value.join("\n"));
				index = indexOffset;
				continue;
			}
			if (/^.+?=.+$/.test(line)) {
				const [key, value]: string[] = line.split("=", 1);
				pairs.set(key, value);
				continue;
			}
			/* File may contain issue, abort optimization. */
			return this;
		}
		writeFileSync(this.commandPath, (pairs.size > 0) ? `${formatFileMapCommand(pairs)}${EOL}` : "", { encoding: "utf-8" });
		return this;
	}
}
