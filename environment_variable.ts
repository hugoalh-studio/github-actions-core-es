import { delimiter as pathDelimiter } from "node:path";
import { getEnv, setEnv } from "https://raw.githubusercontent.com/hugoalh-studio/cross-env-ts/v1.0.0/mod.ts";
import { isStringSingleLine } from "https://raw.githubusercontent.com/hugoalh-studio/is-string-singleline-ts/v1.0.0/mod.ts";
import { GitHubActionsFileLineCommand, GitHubActionsFileMapCommand, type GitHubActionsFileCommandOptions } from "./command/file.ts";
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
 * Handle the environment variables in the GitHub Actions runner.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * > - File System - Read (`allow-read`)
 * > - File System - Write (`allow-write`)
 */
export class GitHubActionsEnvironmentVariable {
	#command: GitHubActionsFileMapCommand = new GitHubActionsFileMapCommand("GITHUB_ENV");
	#scopeCurrent: boolean;
	#scopeSubsequent: boolean;
	/**
	 * Create new instance to handle the environment variables in the GitHub Actions runner.
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
	 * Set the environment variable.
	 * @param {string} key Key of the environment variable.
	 * @param {string} value Value of the environment variable.
	 * @returns {this}
	 */
	set(key: string, value: string): this;
	/**
	 * Set the environment variables.
	 * @param {{ [key: string]: string; } | Map<string, string> | Record<string, string>} pairs Pairs of the environment variable.
	 * @returns {this}
	 */
	set(pairs: { [key: string]: string; } | Map<string, string> | Record<string, string>): this;
	set(param0: string | { [key: string]: string; } | Map<string, string> | Record<string, string>, param1?: string): this {
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
					setEnv(key, value);
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
 * Clear the environment variables for all of the subsequent steps which set in the current step.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * > - File System - Read (`allow-read`)
 * > - File System - Write (`allow-write`)
 * @returns {void}
 */
export function clearEnvironmentVariables(): void {
	new GitHubActionsEnvironmentVariable().clearSubsequent();
}
/**
 * Optimize the environment variables for all of the subsequent steps which set in the current step to reduce size whenever possible.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * > - File System - Read (`allow-read`)
 * > - File System - Write (`allow-write`)
 * @returns {void}
 */
export function optimizeEnvironmentVariables(): void {
	new GitHubActionsEnvironmentVariable().optimizeSubsequent();
}
/**
 * Set the environment variable.
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
export function setEnvironmentVariable(key: string, value: string, options?: GitHubActionsEnvironmentVariableOptions & GitHubActionsFileCommandOptions): void;
/**
 * Set the environment variables.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * > - File System - Read (`allow-read`)
 * > - File System - Write (`allow-write`)
 * @param {{ [key: string]: string; } | Map<string, string> | Record<string, string>} pairs Pairs of the environment variable.
 * @param {GitHubActionsEnvironmentVariableOptions & GitHubActionsFileCommandOptions} [options={}] Options.
 * @returns {void}
 */
export function setEnvironmentVariable(pairs: { [key: string]: string; } | Map<string, string> | Record<string, string>, options?: GitHubActionsEnvironmentVariableOptions & GitHubActionsFileCommandOptions): void;
export function setEnvironmentVariable(param0: string | { [key: string]: string; } | Map<string, string> | Record<string, string>, param1?: string | GitHubActionsEnvironmentVariableOptions & GitHubActionsFileCommandOptions, param2?: GitHubActionsEnvironmentVariableOptions & GitHubActionsFileCommandOptions): void {
	const { input, options = {} } = (typeof param0 === "string") ? {
		input: [param0, param1 as string],
		options: param2
	} : {
		input: [param0],
		options: param1 as GitHubActionsEnvironmentVariableOptions & GitHubActionsFileCommandOptions
	};
	const instance: GitHubActionsEnvironmentVariable = new GitHubActionsEnvironmentVariable(options);
	//@ts-ignore Overload is correct.
	instance.set(...input);
	if (options.optimize) {
		instance.optimizeSubsequent();
	}
}
/**
 * Handle the PATH in the GitHub Actions runner.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * > - File System - Read (`allow-read`)
 * > - File System - Write (`allow-write`)
 */
export class GitHubActionsPATH {
	#command: GitHubActionsFileLineCommand = new GitHubActionsFileLineCommand("GITHUB_PATH");
	#scopeCurrent: boolean;
	#scopeSubsequent: boolean;
	/**
	 * Create new instance to handle the PATH in the GitHub Actions runner.
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
	 * Add the PATH.
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
				const context: Set<string> = new Set<string>((getEnv("PATH") ?? "").split(pathDelimiter).map<string>((value: string): string => {
					return value.trim();
				}).filter((value: string): boolean => {
					return (value.length > 0);
				}));
				for (const path of paths) {
					context.add(path);
				}
				setEnv("PATH", Array.from<string>(context.values()).join(pathDelimiter));
			}
			if (this.#scopeSubsequent) {
				this.#command.append(...paths);
			}
		}
		return this;
	}
	/**
	 * Clear the PATH for all of the subsequent steps which set in the current step.
	 * @returns {this}
	 */
	clearSubsequent(): this {
		if (this.#scopeSubsequent) {
			this.#command.clear();
		}
		return this;
	}
	/**
	 * Optimize the PATH for all of the subsequent steps which set in the current step to reduce size whenever possible.
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
 * Add the PATH.
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
	const instance: GitHubActionsPATH = new GitHubActionsPATH(options);
	instance.add(path);
	if (options.optimize) {
		instance.optimizeSubsequent();
	}
}
/**
 * Clear the PATH for all of the subsequent steps which set in the current step.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * > - File System - Read (`allow-read`)
 * > - File System - Write (`allow-write`)
 * @returns {void}
 */
export function clearPATH(): void {
	new GitHubActionsPATH().clearSubsequent();
}
/**
 * Optimize the PATH for all of the subsequent steps which set in the current step to reduce size whenever possible.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * > - File System - Read (`allow-read`)
 * > - File System - Write (`allow-write`)
 * @returns {void}
 */
export function optimizePATH(): void {
	new GitHubActionsPATH().optimizeSubsequent();
}
