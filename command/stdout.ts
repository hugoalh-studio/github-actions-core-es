import { isStringSingleLine } from "https://raw.githubusercontent.com/hugoalh-studio/is-string-singleline-ts/v1.0.0/mod.ts";
const commandsStdOutCurrent: Set<string> = new Set<string>([
	"add-mask",
	"add-matcher",
	"debug",
	"echo",
	"endgroup",
	"error",
	"group",
	"notice",
	"remove-matcher",
	"stop-commands",
	"warning"
]);
const commandsStdOutLegacy: Set<string> = new Set<string>([
	"add-path",
	"save-state",
	"set-env",
	"set-output"
]);
const regexpCommandStdout = /^(?:[\da-z][\da-z._-]*)?[\da-z]$/;
/**
 * Escape GitHub Actions runner stdout command value.
 * @access private
 * @param {string} item
 * @returns {string}
 */
function escapeStdOutCommandValue(item: string): string {
	return item.replaceAll("%", "%25").replaceAll("\n", "%0A").replaceAll("\r", "%0D");
}
/**
 * Escape GitHub Actions runner stdout command property value.
 * @access private
 * @param {string} item
 * @returns {string}
 */
function escapeStdOutCommandPropertyValue(item: string): string {
	return escapeStdOutCommandValue(item).replaceAll(",", "%2C").replaceAll(":", "%3A");
}
/**
 * **\[🅰️ ADVANCED\]** Communicate with the GitHub Actions runner via stdout command.
 */
export class GitHubActionsStdOutCommand {
	#command: string;
	#message = "";
	#properties: Map<string, string> = new Map<string, string>();
	/**
	 * **\[🅰️ ADVANCED\]** Create new instance to communicate with the GitHub Actions runner via stdout command.
	 * @param {string} command StdOut command.
	 * @param {string} [message] Message of the stdout command.
	 */
	constructor(command: string, message?: string);
	/**
	 * **\[🅰️ ADVANCED\]** Create new instance to communicate with the GitHub Actions runner via stdout command.
	 * @param {string} command StdOut command.
	 * @param {{ [key: string]: string; } | Map<string, string> | Record<string, string>} properties Properties of the stdout command.
	 * @param {string} [message] Message of the stdout command.
	 */
	constructor(command: string, properties: { [key: string]: string; } | Map<string, string> | Record<string, string>, message?: string);
	constructor(command: string, param1?: string | { [key: string]: string; } | Map<string, string> | Record<string, string>, param2?: string) {
		if (!(
			commandsStdOutCurrent.has(command) ||
			regexpCommandStdout.test(command)
		)) {
			throw new SyntaxError(`\`${command}\` is not a valid GitHub Actions stdout command!`);
		}
		if (commandsStdOutLegacy.has(command)) {
			throw new Error(`\`${command}\` is a forbidden GitHub Actions stdout command!`);
		}
		this.#command = command;
		switch (typeof param1) {
			case "string":
				this.#message = param1;
				break;
			case "undefined":
				break;
			default:
				this.#message = param2 ?? "";
				this.setProperties(param1);
		}
	}
	/**
	 * Set message of the stdout command.
	 * @param {string} message Message of the stdout command.
	 * @returns {this}
	 */
	setMessage(message: string): this {
		this.#message = message;
		return this;
	}
	/**
	 * Set property of the stdout command.
	 * @param {string} key Key of the property of the stdout command.
	 * @param {string} value Value of the property of the stdout command.
	 * @returns {this}
	 */
	setProperty(key: string, value: string): this {
		if (!isStringSingleLine(key)) {
			throw new SyntaxError(`\`${key}\` is not a valid GitHub Actions stdout command property key!`);
		}
		this.#properties.set(key, value);
		return this;
	}
	/**
	 * Set properties of the stdout command.
	 * @param {{ [key: string]: string; } | Map<string, string> | Record<string, string>} properties Properties of the stdout command.
	 * @returns {this}
	 */
	setProperties(properties: { [key: string]: string; } | Map<string, string> | Record<string, string>): this {
		for (const [key, value] of ((properties instanceof Map) ? properties.entries() : Object.entries(properties))) {
			this.setProperty(key, value);
		}
		return this;
	}
	/**
	 * Stringify the stdout command.
	 * @returns {string}
	 */
	toString(): string {
		return `::${this.#command}${this.#properties.size > 0 ? " " : ""}${Array.from<[string, string], string>(this.#properties.entries(), ([key, value]: [string, string]): string => {
			return `${key}=${escapeStdOutCommandPropertyValue(value)}`;
		}).join(",")}::${escapeStdOutCommandValue(this.#message)}`;
	}
	/**
	 * Dispatch the stdout command.
	 * @returns {void}
	 */
	dispatch(): void {
		console.log(this.toString());
	}
}
const commandEchoDisable: GitHubActionsStdOutCommand = new GitHubActionsStdOutCommand("echo", "off");
/**
 * Disable echo most of the stdout commands, the log will not print the stdout command itself unless there has any issue.
 * 
 * Environment variable `ACTIONS_STEP_DEBUG` will ignore this setting.
 * @returns {void}
 */
export function disableEchoStdOutCommand(): void {
	return commandEchoDisable.dispatch();
}
const commandEchoEnable: GitHubActionsStdOutCommand = new GitHubActionsStdOutCommand("echo", "on");
/**
 * Enable echo most of the stdout commands, the log will print the stdout command itself.
 * 
 * Environment variable `ACTIONS_STEP_DEBUG` will ignore this setting.
 * @returns {void}
 */
export function enableEchoStdOutCommand(): void {
	return commandEchoEnable.dispatch();
}
/**
 * Validate the item is a valid GitHub Actions stdout command end token.
 * @access private
 * @param {string} item Item that need to determine.
 * @returns {void}
 */
function validateStdOutCommandEndToken(item: string): void {
	if (!(!commandsStdOutCurrent.has(item) && !commandsStdOutLegacy.has(item) && regexpCommandStdout.test(item) && item.length >= 4)) {
		throw new SyntaxError(`Argument \`endToken\` is not a string which is single line, more than or equal to 4 characters, and not match any GitHub Actions commands!`);
	}
}
/**
 * Disable process all of the stdout commands, to allow log anything without accidentally execute any stdout command.
 * @param {string} [endToken] An end token for re-enable stdout command process.
 * @returns {string} An end token for re-enable stdout command process.
 */
export function disableProcessStdOutCommand(endToken?: string): string {
	const commandProcessDisable: GitHubActionsStdOutCommand = new GitHubActionsStdOutCommand("stop-commands");
	if (typeof endToken === "undefined") {
		const endTokenGenerate: string = crypto.randomUUID().replaceAll("-", "");
		commandProcessDisable.setMessage(endTokenGenerate).dispatch();
		return endTokenGenerate;
	}
	validateStdOutCommandEndToken(endToken);
	commandProcessDisable.setMessage(endToken).dispatch();
	return endToken;
}
/**
 * Enable process all of the stdout commands, to allow execute any stdout command.
 * @param {string} endToken An end token from disable stdout command process.
 * @returns {void}
 */
export function enableProcessStdOutCommand(endToken: string): void {
	validateStdOutCommandEndToken(endToken);
	return new GitHubActionsStdOutCommand(endToken).dispatch();
}
