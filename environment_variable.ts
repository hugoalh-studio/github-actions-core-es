import env from "https://raw.githubusercontent.com/hugoalh-studio/cross-env-ts/v1.1.0/env.ts";
import envPath from "https://raw.githubusercontent.com/hugoalh-studio/cross-env-ts/v1.1.0/path.ts";
import { isStringSingleLine } from "https://raw.githubusercontent.com/hugoalh-studio/is-string-singleline-ts/v1.0.0/mod.ts";
import { GitHubActionsFileLineCommand, GitHubActionsFileMapCommand, type GitHubActionsFileCommandOptions } from "./command/file.ts";
import type { KeyValueLike } from "./common.ts";
const regexpEnvironmentVariableKeyForbidden = /^(?:CI|PATH)$|^(?:ACTIONS|GITHUB|RUNNER)_/i;
/**
 * Validate the item is a valid GitHub Actions environment variable key.
 * @access private
 * @param {string} item Item that need to determine.
 * @returns {void}
 */
function validateEnvironmentVariableKey(item: string): void {
	if (!(isStringSingleLine(item) && item.length > 0)) {
		throw new SyntaxError(`\`${item}\` is not a valid environment variable key!`);
	}
	if (regexpEnvironmentVariableKeyForbidden.test(item)) {
		throw new Error(`Modify environment variable \`${item}\` is forbidden!`);
	}
}
export interface GitHubActionsEnvironmentVariableOptions {
	/**
	 * Whether to set for the current step.
	 * @default true
	 */
	scopeCurrent?: boolean;
	/**
	 * Whether to set for all of the subsequent steps.
	 * @default true
	 */
	scopeSubsequent?: boolean;
}
/**
 * **\[🅰️ ADVANCED\]** Handle the exportation of environment variables in the GitHub Actions runner.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * > - File System - Read (`allow-read`)
 * > - File System - Write (`allow-write`)
 */
export class GitHubActionsEnvironmentVariableExportation {
	#command: GitHubActionsFileMapCommand = new GitHubActionsFileMapCommand("GITHUB_ENV");
	#scopeCurrent: boolean;
	#scopeSubsequent: boolean;
	/**
	 * **\[🅰️ ADVANCED\]** Create new instance to handle the exportation of environment variables in the GitHub Actions runner.
	 * 
	 * > **🛡️ Require Permission**
	 * >
	 * > - Environment Variable (`allow-env`)
	 * > - File System - Read (`allow-read`)
	 * > - File System - Write (`allow-write`)
	 * @param {GitHubActionsEnvironmentVariableOptions} [options={}] Options.
	 */
	constructor(options: GitHubActionsEnvironmentVariableOptions = {}) {
		this.#scopeCurrent = options.scopeCurrent ?? true;
		this.#scopeSubsequent = options.scopeSubsequent ?? true;
	}
	/**
	 * Clear the environment variables for all of the subsequent steps which set in the current step.
	 * @returns {this}
	 */
	clearSubsequent(): this {
		if (this.#scopeSubsequent) {
			this.#command.clear();
		}
		return this;
	}
	/**
	 * Optimize the environment variables for all of the subsequent steps which set in the current step to reduce size whenever possible.
	 * @returns {this}
	 */
	optimizeSubsequent(): this {
		if (this.#scopeSubsequent) {
			this.#command.optimize();
		}
		return this;
	}
	/**
	 * Set an environment variable.
	 * @param {string} key Key of the environment variable.
	 * @param {string} value Value of the environment variable.
	 * @returns {this}
	 */
	set(key: string, value: string): this;
	/**
	 * Set the environment variables.
	 * @param {KeyValueLike} pairs Pairs of the environment variable.
	 * @returns {this}
	 */
	set(pairs: KeyValueLike): this;
	set(param0: string | KeyValueLike, param1?: string): this {
		const pairs: Map<string, string> = new Map<string, string>();
		if (typeof param0 === "string") {
			validateEnvironmentVariableKey(param0);
			pairs.set(param0, param1!);
		} else {
			for (const [key, value] of ((param0 instanceof Map) ? param0.entries() : Object.entries(param0))) {
				validateEnvironmentVariableKey(key);
				pairs.set(key, value);
			}
		}
		if (pairs.size > 0) {
			if (this.#scopeCurrent) {
				for (const [key, value] of pairs.values()) {
					env.set(key, value);
				}
			}
			if (this.#scopeSubsequent) {
				this.#command.append(pairs);
			}
		}
		return this;
	}
}
/**
 * Set an environment variable.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * > - File System - Read (`allow-read`)
 * > - File System - Write (`allow-write`)
 * @param {string} key Key of the environment variable.
 * @param {string} value Value of the environment variable.
 * @param {GitHubActionsEnvironmentVariableOptions & GitHubActionsFileCommandOptions} [options={}] Options.
 * @returns {void}
 */
export function setEnvironmentVariable(key: string, value: string, options: GitHubActionsEnvironmentVariableOptions & GitHubActionsFileCommandOptions = {}): void {
	const instance: GitHubActionsEnvironmentVariableExportation = new GitHubActionsEnvironmentVariableExportation(options);
	instance.set(key, value);
	if (options.optimize) {
		instance.optimizeSubsequent();
	}
}
/**
 * Set the environment variables.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * > - File System - Read (`allow-read`)
 * > - File System - Write (`allow-write`)
 * @param {KeyValueLike} pairs Pairs of the environment variable.
 * @param {GitHubActionsEnvironmentVariableOptions & GitHubActionsFileCommandOptions} [options={}] Options.
 * @returns {void}
 */
export function setEnvironmentVariables(pairs: KeyValueLike, options: GitHubActionsEnvironmentVariableOptions & GitHubActionsFileCommandOptions = {}): void {
	const instance: GitHubActionsEnvironmentVariableExportation = new GitHubActionsEnvironmentVariableExportation(options);
	instance.set(pairs);
	if (options.optimize) {
		instance.optimizeSubsequent();
	}
}
/**
 * **\[🅰️ ADVANCED\]** Handle the exportation of `PATH` in the GitHub Actions runner.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * > - File System - Read (`allow-read`)
 * > - File System - Write (`allow-write`)
 */
export class GitHubActionsPATHExportation {
	#command: GitHubActionsFileLineCommand = new GitHubActionsFileLineCommand("GITHUB_PATH");
	#scopeCurrent: boolean;
	#scopeSubsequent: boolean;
	/**
	 * **\[🅰️ ADVANCED\]** Create new instance to handle the exportation of `PATH` in the GitHub Actions runner.
	 * 
	 * > **🛡️ Require Permission**
	 * >
	 * > - Environment Variable (`allow-env`)
	 * > - File System - Read (`allow-read`)
	 * > - File System - Write (`allow-write`)
	 * @param {GitHubActionsEnvironmentVariableOptions} [options={}] Options.
	 */
	constructor(options: GitHubActionsEnvironmentVariableOptions = {}) {
		this.#scopeCurrent = options.scopeCurrent ?? true;
		this.#scopeSubsequent = options.scopeSubsequent ?? true;
	}
	/**
	 * Add the `PATH`.
	 * @param {...string} paths
	 * @returns {this}
	 */
	add(...paths: string[]): this {
		paths.forEach((path: string): void => {
			if (!(isStringSingleLine(path) && path.length > 0)) {
				throw new SyntaxError(`\`${path}\` is not a string which is non-empty and single line!`);
			}
		});
		if (paths.length > 0) {
			if (this.#scopeCurrent) {
				envPath.add(...paths);
			}
			if (this.#scopeSubsequent) {
				this.#command.append(...paths);
			}
		}
		return this;
	}
	/**
	 * Clear the `PATH` for all of the subsequent steps which set in the current step.
	 * @returns {this}
	 */
	clearSubsequent(): this {
		if (this.#scopeSubsequent) {
			this.#command.clear();
		}
		return this;
	}
	/**
	 * Optimize the `PATH` for all of the subsequent steps which set in the current step to reduce size whenever possible.
	 * @returns {this}
	 */
	optimizeSubsequent(): this {
		if (this.#scopeSubsequent) {
			this.#command.optimize();
		}
		return this;
	}
}
/**
 * Add the `PATH`.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * > - File System - Read (`allow-read`)
 * > - File System - Write (`allow-write`)
 * @param {string} path
 * @param {GitHubActionsEnvironmentVariableOptions & GitHubActionsFileCommandOptions} [options={}] Options.
 * @returns {void}
 */
export function addPATH(path: string, options: GitHubActionsEnvironmentVariableOptions & GitHubActionsFileCommandOptions = {}): void {
	const instance: GitHubActionsPATHExportation = new GitHubActionsPATHExportation(options);
	instance.add(path);
	if (options.optimize) {
		instance.optimizeSubsequent();
	}
}
