import { getEnv } from "https://raw.githubusercontent.com/hugoalh-studio/cross-env-ts/v1.0.1/mod.ts";
/**
 * Get the debug status of the GitHub Actions runner.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @returns {boolean} Debug status.
 */
export function getDebugStatus(): boolean {
	return (getEnv("RUNNER_DEBUG") === "1");
}
export {
	getDebugStatus as isDebug
};
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
export interface GitHubActionsRunnerMachineTestOptions {
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
 * @param {GitHubActionsRunnerMachineTestOptions} [options={}] Options.
 * @returns {boolean} Test result.
 */
export function isInRunner(options: GitHubActionsRunnerMachineTestOptions = {}): boolean {
	const { artifact = false, cache = false, oidc = false }: GitHubActionsRunnerMachineTestOptions = options;
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
 * @param {GitHubActionsRunnerMachineTestOptions} [options={}] Options.
 * @returns {void}
 */
export function validateInRunner(options: GitHubActionsRunnerMachineTestOptions = {}): void {
	if (!isInRunner(options)) {
		throw new Error("This process requires to invoke inside the GitHub Actions environment!");
	}
}
