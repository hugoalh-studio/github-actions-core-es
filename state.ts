import env from "https://raw.githubusercontent.com/hugoalh-studio/cross-env-ts/v1.1.0/env.ts";
import { isStringSingleLine } from "https://raw.githubusercontent.com/hugoalh-studio/is-string-singleline-ts/v1.0.0/mod.ts";
import { GitHubActionsFileMapCommand, type GitHubActionsFileCommandOptions } from "./command/file.ts";
import type { KeyValueLike } from "./common.ts";
/**
 * Get the raw value of a state.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @param {string} key Key of the state.
 * @returns {string | undefined} Raw value of the state.
 */
export function getStateRaw(key: string): string | undefined {
	if (!isStringSingleLine(key)) {
		throw new SyntaxError(`\`${key}\` is not a valid GitHub Actions state key!`);
	}
	return env.get(`STATE_${key.replaceAll(" ", "_").toUpperCase()}`);
}
/**
 * Get the value of a state.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @param {string} key Key of the state.
 * @returns {string} Value of the state.
 */
export function getState(key: string): string {
	return getStateRaw(key) ?? "";
}
/**
 * **\[🅰️ ADVANCED\]** Handle the exportation of states in the GitHub Actions runner.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * > - File System - Read (`allow-read`)
 * > - File System - Write (`allow-write`)
 */
export class GitHubActionsStateExportation {
	#command: GitHubActionsFileMapCommand = new GitHubActionsFileMapCommand("GITHUB_STATE");
	/**
	 * Clear the states which set in the current step.
	 * @returns {this}
	 */
	clear(): this {
		this.#command.clear();
		return this;
	}
	/**
	 * Optimize the states which set in the current step to reduce size whenever possible.
	 * @returns {this}
	 */
	optimize(): this {
		this.#command.optimize();
		return this;
	}
	/**
	 * Set a state.
	 * @param {string} key Key of the state.
	 * @param {string} value Value of the state.
	 * @returns {this}
	 */
	set(key: string, value: string): this;
	/**
	 * Set the states.
	 * @param {KeyValueLike} pairs Pairs of the state.
	 * @returns {this}
	 */
	set(pairs: KeyValueLike): this;
	set(param0: string | KeyValueLike, param1?: string): this {
		const pairs: Map<string, string> = new Map<string, string>();
		if (typeof param0 === "string") {
			if (!isStringSingleLine(param0)) {
				throw new SyntaxError(`\`${param0}\` is not a valid GitHub Actions state key!`);
			}
			pairs.set(param0, param1!);
		} else {
			for (const [key, value] of ((param0 instanceof Map) ? param0.entries() : Object.entries(param0))) {
				if (!isStringSingleLine(key)) {
					throw new SyntaxError(`\`${key}\` is not a valid GitHub Actions state key!`);
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
 * Set a state.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * > - File System - Read (`allow-read`)
 * > - File System - Write (`allow-write`)
 * @param {string} key Key of the state.
 * @param {string} value Value of the state.
 * @param {GitHubActionsFileCommandOptions} [options={}] Options.
 * @returns {void}
 */
export function setState(key: string, value: string, options: GitHubActionsFileCommandOptions = {}): void {
	const instance: GitHubActionsStateExportation = new GitHubActionsStateExportation();
	instance.set(key, value);
	if (options.optimize) {
		instance.optimize();
	}
}
/**
 * Set the states.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * > - File System - Read (`allow-read`)
 * > - File System - Write (`allow-write`)
 * @param {KeyValueLike} pairs Pairs of the state.
 * @param {GitHubActionsFileCommandOptions} [options={}] Options.
 * @returns {void}
 */
export function setStates(pairs: KeyValueLike, options: GitHubActionsFileCommandOptions = {}): void {
	const instance: GitHubActionsStateExportation = new GitHubActionsStateExportation();
	instance.set(pairs);
	if (options.optimize) {
		instance.optimize();
	}
}
