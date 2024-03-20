import { getEnv } from "https://raw.githubusercontent.com/hugoalh-studio/cross-env-ts/v1.0.0/mod.ts";
import { isStringSingleLine } from "https://raw.githubusercontent.com/hugoalh-studio/is-string-singleline-ts/v1.0.0/mod.ts";
import { GitHubActionsFileMapCommand, type GitHubActionsFileCommandOptions } from "./command/file.ts";
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
	return getEnv(`STATE_${key.replaceAll(" ", "_").toUpperCase()}`);
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
 * Handle the states in the GitHub Actions runner.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * > - File System - Read (`allow-read`)
 * > - File System - Write (`allow-write`)
 */
export class GitHubActionsState {
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
	 * Set the state.
	 * @param {string} key Key of the state.
	 * @param {string} value Value of the state.
	 * @returns {this}
	 */
	set(key: string, value: string): this;
	/**
	 * Set the states.
	 * @param {{ [key: string]: string; } | Map<string, string> | Record<string, string>} pairs Pairs of the state.
	 * @returns {this}
	 */
	set(pairs: { [key: string]: string; } | Map<string, string> | Record<string, string>): this;
	set(param0: string | { [key: string]: string; } | Map<string, string> | Record<string, string>, param1?: string): this {
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
 * Clear the states which set in the current step.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * > - File System - Read (`allow-read`)
 * > - File System - Write (`allow-write`)
 * @returns {void}
 */
export function clearStates(): void {
	new GitHubActionsState().clear();
}
/**
 * Optimize the states which set in the current step to reduce size whenever possible.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * > - File System - Read (`allow-read`)
 * > - File System - Write (`allow-write`)
 * @returns {void}
 */
export function optimizeStates(): void {
	new GitHubActionsState().optimize();
}
/**
 * Set the state.
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
	const instance: GitHubActionsState = new GitHubActionsState();
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
 * @param {{ [key: string]: string; } | Map<string, string> | Record<string, string>} pairs Pairs of the state.
 * @param {GitHubActionsFileCommandOptions} [options={}] Options.
 * @returns {void}
 */
export function setStates(pairs: { [key: string]: string; } | Map<string, string> | Record<string, string>, options: GitHubActionsFileCommandOptions = {}): void {
	const instance: GitHubActionsState = new GitHubActionsState();
	instance.set(pairs);
	if (options.optimize) {
		instance.optimize();
	}
}
