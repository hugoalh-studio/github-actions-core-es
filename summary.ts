import { appendFileSync, writeFileSync } from "node:fs";
import { EOL } from "node:os";
import { isAbsolute as isPathAbsolute } from "node:path";
import env from "https://raw.githubusercontent.com/hugoalh-studio/cross-env-es/v1.1.0/env.ts";
/**
 * **\[🧪 EXPERIMENTAL\]** Handle the summary in the GitHub Actions runner.
 * 
 * > **🛡️ Permissions**
 * >
 * > | **Target** | **Type** | **Coverage** |
 * > |:--|:--|:--|
 * > | Deno | Environment Variable (`allow-env`) | Resource |
 * > | Deno | File System - Read (`allow-read`) | Resource |
 * > | Deno | File System - Write (`allow-write`) | Resource |
 */
export class GitHubActionsSummary {
	#commandPath: string;
	/**
	 * **\[🧪 EXPERIMENTAL\]** Create new instance to handle the summary in the GitHub Actions runner.
	 * 
	 * > **🛡️ Permissions**
	 * >
	 * > | **Target** | **Type** | **Coverage** |
	 * > |:--|:--|:--|
	 * > | Deno | Environment Variable (`allow-env`) | Resource |
	 * > | Deno | File System - Read (`allow-read`) | Resource |
	 * > | Deno | File System - Write (`allow-write`) | Resource |
	 */
	constructor() {
		const commandPath: string = env.get("GITHUB_STEP_SUMMARY") ?? "";
		if (commandPath.length === 0) {
			throw new Error(`Environment path \`GITHUB_STEP_SUMMARY\` is not defined!`);
		}
		if (!isPathAbsolute(commandPath)) {
			throw new Error(`\`${commandPath}\` (environment path \`GITHUB_STEP_SUMMARY\`) is not a valid absolute path!`);
		}
		this.#commandPath = commandPath;
	}
	/**
	 * Append data to the summary.
	 * @param {string} data
	 * @returns {this}
	 */
	append(data: string): this {
		appendFileSync(this.#commandPath, `${data.replace(/\r?\n/g, EOL)}${EOL}`, { encoding: "utf-8" });
		return this;
	}
	/**
	 * Clear the summary which set in the current step.
	 * @returns {this}
	 */
	clear(): this {
		writeFileSync(this.#commandPath, "", { encoding: "utf-8" });
		return this;
	}
}
