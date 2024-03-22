import { getEnv } from "https://raw.githubusercontent.com/hugoalh-studio/cross-env-ts/v1.0.1/mod.ts";
const runnerArchitectures = [
	"ARM",
	"ARM64",
	"X64",
	"X86"
] as const;
/**
 * GitHub Actions runner architecture.
 */
export type GitHubActionsRunnerArchitecture = typeof runnerArchitectures[number];
/**
 * Get the architecture of the GitHub Actions runner.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @returns {GitHubActionsRunnerArchitecture} Architecture of the GitHub Actions runner.
 * @example
 * getRunnerArchitecture();
 * //=> "X64"
 */
export function getRunnerArchitecture(): GitHubActionsRunnerArchitecture {
	const value: string | undefined = getEnv("RUNNER_ARCH");
	if (typeof value === "undefined") {
		throw new ReferenceError(`Unable to get the GitHub Actions runner architecture, environment variable \`RUNNER_ARCH\` is not defined!`);
	}
	if (!runnerArchitectures.includes(value as GitHubActionsRunnerArchitecture)) {
		throw new Error(`\`${value}\` is not a known GitHub Actions runner architecture!`);
	}
	return value as GitHubActionsRunnerArchitecture;
}
export {
	getRunnerArchitecture as getRunnerArch
};
/**
 * Get the debug status of the GitHub Actions runner.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @returns {boolean} Debug status of the GitHub Actions runner.
 */
export function getRunnerDebugStatus(): boolean {
	return (getEnv("RUNNER_DEBUG") === "1");
}
export {
	getRunnerDebugStatus as isRunnerDebug
};
/**
 * Get the name of the GitHub Actions runner.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @returns {string} Name of the GitHub Actions runner.
 * @example
 * getRunnerName();
 * //=> "Hosted Agent"
 */
export function getRunnerName(): string {
	const value: string | undefined = getEnv("RUNNER_NAME");
	if (typeof value === "undefined") {
		throw new ReferenceError(`Unable to get the GitHub Actions runner name, environment variable \`RUNNER_NAME\` is not defined!`);
	}
	return value;
}
const runnerOSes = [
	"Linux",
	"macOS",
	"Windows"
] as const;
/**
 * GitHub Actions runner OS.
 */
export type GitHubActionsRunnerOS = typeof runnerOSes[number];
/**
 * Get the OS of the GitHub Actions runner.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @returns {GitHubActionsRunnerOS} OS of the GitHub Actions runner.
 * @example
 * getRunnerOS();
 * //=> "Windows"
 */
export function getRunnerOS(): GitHubActionsRunnerOS {
	const value: string | undefined = getEnv("RUNNER_OS");
	if (typeof value === "undefined") {
		throw new ReferenceError(`Unable to get the GitHub Actions runner OS, environment variable \`RUNNER_OS\` is not defined!`);
	}
	if (!runnerOSes.includes(value as GitHubActionsRunnerOS)) {
		throw new Error(`\`${value}\` is not a known GitHub Actions runner OS!`);
	}
	return value as GitHubActionsRunnerOS;
}
/**
 * Get the path of the `TEMP` of the GitHub Actions runner; This directory is emptied at the beginning and end of each job, files will not be removed if the runner's user account does not have permission to delete them.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @returns {string} Path of the `TEMP` of the GitHub Actions runner.
 * @example
 * getRunnerTempPath();
 * //=> "D:\a\_temp"
 */
export function getRunnerTempPath(): string {
	const value: string | undefined = getEnv("RUNNER_TEMP");
	if (typeof value === "undefined") {
		throw new ReferenceError(`Unable to get the GitHub Actions runner TEMP path, environment variable \`RUNNER_TEMP\` is not defined!`);
	}
	return value;
}
/**
 * Get the path of the tool cache of the GitHub hosted GitHub Actions runner.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @returns {string | undefined} Path of the tool cache of the GitHub hosted GitHub Actions runner.
 * @example
 * getRunnerToolCachePath();
 * //=> "C:\hostedtoolcache\windows"
 */
export function getRunnerToolCachePath(): string | undefined {
	return getEnv("RUNNER_TOOL_CACHE");
}
/**
 * Get the path of the workspace of the GitHub Actions runner; The default working directory on the runner for steps.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @returns {string} Path of the workspace of the GitHub Actions runner.
 * @example
 * getRunnerWorkspacePath();
 * //=> "/home/runner/work/my-repo-name/my-repo-name"
 */
export function getRunnerWorkspacePath(): string {
	const value: string | undefined = getEnv("GITHUB_WORKSPACE");
	if (typeof value === "undefined") {
		throw new ReferenceError(`Unable to get the GitHub Actions runner workspace path, environment variable \`GITHUB_WORKSPACE\` is not defined!`);
	}
	return value;
}
interface GitHubActionsDefaultEnvironmentVariableMeta {
	name: string;
	need?: boolean;
	value?: string;
}
const defaultEnvironmentVariables: GitHubActionsDefaultEnvironmentVariableMeta[] = [
	{ name: "CI", value: "true" },
	{ name: "GITHUB_ACTION" },
	{ name: "GITHUB_ACTIONS", value: "true" },
	{ name: "GITHUB_ACTOR" },
	{ name: "GITHUB_ACTOR_ID" },
	{ name: "GITHUB_API_URL" },
	{ name: "GITHUB_ENV" },
	{ name: "GITHUB_EVENT_NAME" },
	{ name: "GITHUB_EVENT_PATH" },
	{ name: "GITHUB_GRAPHQL_URL" },
	{ name: "GITHUB_JOB" },
	{ name: "GITHUB_OUTPUT" },
	{ name: "GITHUB_PATH" },
	{ name: "GITHUB_REF_NAME" },
	{ name: "GITHUB_REF_TYPE" },
	{ name: "GITHUB_REPOSITORY" },
	{ name: "GITHUB_REPOSITORY_ID" },
	{ name: "GITHUB_REPOSITORY_OWNER" },
	{ name: "GITHUB_REPOSITORY_OWNER_ID" },
	{ name: "GITHUB_RETENTION_DAYS" },
	{ name: "GITHUB_RUN_ATTEMPT" },
	{ name: "GITHUB_RUN_ID" },
	{ name: "GITHUB_RUN_NUMBER" },
	{ name: "GITHUB_SERVER_URL" },
	{ name: "GITHUB_SHA" },
	{ name: "GITHUB_STATE" },
	{ name: "GITHUB_STEP_SUMMARY" },
	{ name: "GITHUB_WORKFLOW" },
	{ name: "GITHUB_WORKFLOW_REF" },
	{ name: "GITHUB_WORKFLOW_SHA" },
	{ name: "GITHUB_WORKSPACE" },
	{ name: "RUNNER_ARCH" },
	{ name: "RUNNER_NAME" },
	{ name: "RUNNER_OS" },
	{ name: "RUNNER_TEMP" },
	{ name: "RUNNER_TOOL_CACHE" }
];
export interface GitHubActionsRunnerTestOptions {
	/**
	 * Also test whether have artifact resources.
	 * @default false
	 */
	artifact?: boolean;
	/**
	 * Also test whether have cache resources.
	 * @default false
	 */
	cache?: boolean;
	/**
	 * Also test whether have OpenID Connect (OIDC) resources.
	 * @default false
	 */
	oidc?: boolean;
	/**
	 * Also test whether have tool cache resources.
	 * @default false
	 */
	toolCache?: boolean;
}
/**
 * Test the current process whether is executing inside the GitHub Actions runner.
 * 
 * If this test is mandatory, use function {@linkcode validateInRunner} instead.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @param {GitHubActionsRunnerTestOptions} [options={}] Options.
 * @returns {boolean} Test result.
 */
export function isInRunner(options: GitHubActionsRunnerTestOptions = {}): boolean {
	const { artifact = false, cache = false, oidc = false }: GitHubActionsRunnerTestOptions = options;
	return !(
		[
			...defaultEnvironmentVariables,
			{ name: "ACTIONS_RUNTIME_TOKEN", need: artifact || cache },
			{ name: "ACTIONS_RUNTIME_URL", need: artifact },
			{ name: "ACTIONS_CACHE_URL", need: cache },
			{ name: "ACTIONS_ID_TOKEN_REQUEST_TOKEN", need: oidc },
			{ name: "ACTIONS_ID_TOKEN_REQUEST_URL", need: oidc }
		].filter(({ need }: GitHubActionsDefaultEnvironmentVariableMeta): boolean => {
			return (need ?? true);
		}).map<boolean>(({ name, value: valueExpected }: GitHubActionsDefaultEnvironmentVariableMeta): boolean => {
			const valueCurrent: string | undefined = getEnv(name);
			if (
				typeof valueCurrent === "undefined" ||
				(typeof valueExpected !== "undefined" && valueCurrent !== valueExpected)
			) {
				console.warn(`Unable to get the GitHub Actions resources, environment variable \`${name}\` is not defined, or not contain an expected value!`);
				return false;
			}
			return true;
		}).includes(false)
	);
}
/**
 * Validate the current process whether is executing inside the GitHub Actions runner.
 * 
 * If this test is optional, use function {@linkcode isInRunner} instead.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @param {GitHubActionsRunnerTestOptions} [options={}] Options.
 * @returns {void}
 */
export function validateInRunner(options: GitHubActionsRunnerTestOptions = {}): void {
	if (!isInRunner(options)) {
		throw new Error("This process requires to invoke inside the GitHub Actions environment!");
	}
}
