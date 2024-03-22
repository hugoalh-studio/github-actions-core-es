import { readFileSync } from "node:fs";
import { isAbsolute as isPathAbsolute } from "node:path";
import { getEnv } from "https://raw.githubusercontent.com/hugoalh-studio/cross-env-ts/v1.0.1/mod.ts";
import { type JSONValueExtend } from "https://raw.githubusercontent.com/hugoalh-studio/is-json-ts/v1.0.0/mod.ts";
/**
 * Get the URL of the GitHub API.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @returns {URL} URL of the GitHub API.
 * @example
 * getGitHubAPIURL();
 * //=> https://api.github.com
 */
export function getGitHubAPIURL(): URL {
	return new URL(getEnv("GITHUB_API_URL") ?? "https://api.github.com");
}
/**
 * Get the URL of the GitHub GraphQL.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @returns {URL} URL of the GitHub GraphQL.
 * @example
 * getGitHubGraphQLURL();
 * //=> https://api.github.com/graphql
 */
export function getGitHubGraphQLURL(): URL {
	return new URL(getEnv("GITHUB_GRAPHQL_URL") ?? "https://api.github.com/graphql");
}
/**
 * Get the URL of the GitHub server.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @returns {URL} URL of the GitHub server.
 * @example
 * getGitHubServerURL();
 * //=> https://github.com
 */
export function getGitHubServerURL(): URL {
	return new URL(getEnv("GITHUB_SERVER_URL") ?? "https://github.com");
}
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
 * @returns {boolean} Debug status.
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
 * Get the name of the workflow; If the workflow file does not specify a name, the value is the full path of the workflow file in the repository.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @returns {string} Name of the workflow.
 * @example
 * getWorkflowName();
 * //=> "My test workflow"
 */
export function getWorkflowName(): string {
	const value: string | undefined = getEnv("GITHUB_WORKFLOW");
	if (typeof value === "undefined") {
		throw new ReferenceError(`Unable to get the GitHub Actions workflow name, environment variable \`GITHUB_WORKFLOW\` is not defined!`);
	}
	return value;
}
/**
 * Get the reference path of the workflow.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @returns {string} Reference path of the workflow.
 * @example
 * getWorkflowPath();
 * //=> "octocat/hello-world/.github/workflows/my-workflow.yml@refs/heads/my_branch"
 */
export function getWorkflowReferencePath(): string {
	const value: string | undefined = getEnv("GITHUB_WORKFLOW_REF");
	if (typeof value === "undefined") {
		throw new ReferenceError(`Unable to get the GitHub Actions workflow reference path, environment variable \`GITHUB_WORKFLOW_REF\` is not defined!`);
	}
	return value;
}
/**
 * Get the action ID of the workflow run.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @returns {string} Action ID of the workflow run.
 * @example
 * getWorkflowRunActionID();
 * //=> "__repo-owner_name-of-action-repo"
 */
export function getWorkflowRunActionID(): string {
	const value: string | undefined = getEnv("GITHUB_ACTION");
	if (typeof value === "undefined") {
		throw new ReferenceError(`Unable to get the GitHub Actions workflow run action ID, environment variable \`GITHUB_ACTION\` is not defined!`);
	}
	return value;
}
/**
 * Get the actor ID of the workflow run.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @returns {number} Actor ID of the workflow run.
 * @example
 * getWorkflowRunActorID();
 * //=> 1234567
 */
export function getWorkflowRunActorID(): number {
	const value: string | undefined = getEnv("GITHUB_ACTOR_ID");
	if (typeof value === "undefined") {
		throw new ReferenceError(`Unable to get the GitHub Actions workflow run actor ID, environment variable \`GITHUB_ACTOR_ID\` is not defined!`);
	}
	return Number.parseInt(value, 10);
}
/**
 * Get the actor name of the workflow run.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @returns {string} Actor name of the workflow run.
 * @example
 * getWorkflowRunActorName();
 * //=> "octocat"
 */
export function getWorkflowRunActorName(): string {
	const value: string | undefined = getEnv("GITHUB_ACTOR");
	if (typeof value === "undefined") {
		throw new ReferenceError(`Unable to get the GitHub Actions workflow run actor name, environment variable \`GITHUB_ACTOR\` is not defined!`);
	}
	return value;
}
/**
 * Get the commit SHA that triggered the workflow run.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @returns {string} Commit SHA of the workflow run.
 * @example
 * getWorkflowRunCommitSHA();
 * //=> "ffac537e6cbbf934b08745a378932722df287a53"
 */
export function getWorkflowRunCommitSHA(): string {
	const value: string | undefined = getEnv("GITHUB_SHA");
	if (typeof value === "undefined") {
		throw new ReferenceError(`Unable to get the GitHub Actions workflow run commit SHA, environment variable \`GITHUB_SHA\` is not defined!`);
	}
	return value;
}
const eventsName = [
	"branch_protection_rule",
	"check_run",
	"check_suite",
	"create",
	"delete",
	"deployment",
	"deployment_status",
	"discussion",
	"discussion_comment",
	"fork",
	"gollum",
	"issue_comment",
	"issues",
	"label",
	"merge_group",
	"milestone",
	"page_build",
	"project",
	"project_card",
	"project_column",
	"public",
	"pull_request",
	"pull_request_review",
	"pull_request_review_comment",
	"pull_request_target",
	"push",
	"registry_package",
	"release",
	"repository_dispatch",
	"schedule",
	"status",
	"watch",
	"workflow_call",
	"workflow_dispatch",
	"workflow_run"
] as const;
/**
 * GitHub Actions event name.
 */
export type GitHubActionsEventName = typeof eventsName[number];
/**
 * Get the event name of the workflow run.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @returns {GitHubActionsEventName} Event name of the workflow run.
 * @example
 * getWorkflowRunEventName();
 * //=> "workflow_dispatch"
 */
export function getWorkflowRunEventName(): GitHubActionsEventName {
	const value: string | undefined = getEnv("GITHUB_EVENT_NAME");
	if (typeof value === "undefined") {
		throw new ReferenceError(`Unable to get the GitHub Actions workflow run event name, environment variable \`GITHUB_EVENT_NAME\` is not defined!`);
	}
	if (!eventsName.includes(value as GitHubActionsEventName)) {
		throw new Error(`\`${value}\` is not a known GitHub Actions workflow run event name!`);
	}
	return value as GitHubActionsEventName;
}
/**
 * Get the ID of the workflow run; This is a unique number for each workflow run within a repository, and does not change when re-run the workflow run.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @returns {number} ID of the workflow run.
 * @example
 * getWorkflowRunID();
 * //=> 1658821493
 */
export function getWorkflowRunID(): number {
	const value: string | undefined = getEnv("GITHUB_RUN_ID");
	if (typeof value === "undefined") {
		throw new ReferenceError(`Unable to get the GitHub Actions workflow run ID, environment variable \`GITHUB_RUN_ID\` is not defined!`);
	}
	return Number.parseInt(value, 10);
}
/**
 * Get the job ID of the workflow run.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @returns {string} Job ID of the workflow run.
 * @example
 * getWorkflowRunJobID();
 * //=> "greeting_job"
 */
export function getWorkflowRunJobID(): string {
	const value: string | undefined = getEnv("GITHUB_JOB");
	if (typeof value === "undefined") {
		throw new ReferenceError(`Unable to get the GitHub Actions workflow run job ID, environment variable \`GITHUB_JOB\` is not defined!`);
	}
	return value;
}
/**
 * Get the run number of the workflow; This is a unique number for each run of a particular workflow in a repository, begins at `1` for the workflow's first run, and increments with each new run; This number does not change when re-run the workflow run.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @returns {number} Run number of the workflow.
 * @example
 * getWorkflowRunNumber();
 * //=> 3
 */
export function getWorkflowRunNumber(): number {
	const value: string | undefined = getEnv("GITHUB_RUN_NUMBER");
	if (typeof value === "undefined") {
		throw new ReferenceError(`Unable to get the GitHub Actions workflow run number, environment variable \`GITHUB_RUN_NUMBER\` is not defined!`);
	}
	return Number.parseInt(value, 10);
}
const referenceTypes = [
	"branch",
	"tag"
] as const;
/**
 * GitHub reference type.
 */
export type GitHubReferenceType = typeof referenceTypes[number];
export interface GitHubReferenceMeta {
	/**
	 * The name of the base reference or target branch of the pull request of the workflow run, only available when the event that trigger the workflow run is either `pull_request` or `pull_request_target`.
	 * @example "main"
	 */
	base?: string;
	/**
	 * The fully formed reference of the branch or tag that trigger the workflow run.
	 * 
	 * | **Event** | **Format** | **Description** |
	 * |:-:|:-:|:--|
	 * | `push` | `refs/heads/<branch_name>` | The branch or tag reference that was pushed. |
	 * | `pull_request` | `refs/pull/<pr_number>/merge` | The pull request merge branch. |
	 * | `release` | `refs/tags/<tag_name>` | The release tag created. |
	 * | Other | `refs/heads/<branch_name>` | The branch or tag reference that trigger the workflow run. |
	 * @example "refs/heads/feature-branch-1"
	 */
	full: string;
	/**
	 * The name of the head reference or source branch of the pull request of the workflow run, only available when the event that trigger the workflow run is either `pull_request` or `pull_request_target`.
	 * @example "feature-branch-1"
	 */
	head?: string;
	/**
	 * Whether branch protections or rulesets are configured for the reference that trigger the workflow run.
	 */
	protected: boolean;
	/**
	 * The short reference name of the branch or tag that trigger the workflow run, this value matches the branch or tag name shown on GitHub.
	 * 
	 * For pull requests, the format is `<pr_number>/merge`.
	 * @example "feature-branch-1"
	 */
	short: string;
	/**
	 * The type of reference that trigger the workflow run.
	 * @example "branch"
	 */
	type: GitHubReferenceType;
}
/**
 * Get the reference of the workflow run.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @returns {GitHubReferenceMeta} Reference of the workflow run.
 */
export function getWorkflowRunReference(): GitHubReferenceMeta {
	const full: string | undefined = getEnv("GITHUB_REF");
	if (typeof full === "undefined") {
		throw new ReferenceError(`Unable to get the GitHub Actions workflow run reference, environment variable \`GITHUB_REF\` is not defined!`);
	}
	const short: string | undefined = getEnv("GITHUB_REF_NAME");
	if (typeof short === "undefined") {
		throw new ReferenceError(`Unable to get the GitHub Actions workflow run reference, environment variable \`GITHUB_REF_NAME\` is not defined!`);
	}
	const type: string | undefined = getEnv("GITHUB_REF_TYPE");
	if (typeof type === "undefined") {
		throw new ReferenceError(`Unable to get the GitHub Actions workflow run reference, environment variable \`GITHUB_REF_TYPE\` is not defined!`);
	}
	if (!referenceTypes.includes(type as GitHubReferenceType)) {
		throw new Error(`\`${type}\` is not a known GitHub Actions workflow run reference type!`);
	}
	return {
		base: getEnv("GITHUB_BASE_REF"),
		full,
		head: getEnv("GITHUB_HEAD_REF"),
		protected: getEnv("GITHUB_REF_PROTECTED") === "true",
		short,
		type: type as GitHubReferenceType
	};
}
/**
 * Get the run attempt of the workflow run; This is a unique number for each attempt of a particular workflow run in a repository, begins at `1` for the workflow run's first attempt, and increments with each re-run.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @returns {number} Run attempt of the workflow run.
 * @example
 * getWorkflowRunRunAttempt();
 * //=> 3
 */
export function getWorkflowRunRunAttempt(): number {
	const value: string | undefined = getEnv("GITHUB_RUN_ATTEMPT");
	if (typeof value === "undefined") {
		throw new ReferenceError(`Unable to get the GitHub Actions workflow run run attempt, environment variable \`GITHUB_RUN_ATTEMPT\` is not defined!`);
	}
	return Number.parseInt(value, 10);
}
/**
 * Get the URL of the workflow run.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @returns {URL} URL of the workflow run.
 * @example
 * getWorkflowRunURL();
 * //=> https://github.com/octocat/Hello-World/actions/runs/1658821493
 */
export function getWorkflowRunURL(): URL {
	const repository: string | undefined = getEnv("GITHUB_REPOSITORY");
	if (typeof repository === "undefined") {
		throw new ReferenceError(`Unable to get the GitHub Actions workflow run URI, environment variable \`GITHUB_REPOSITORY\` is not defined!`);
	}
	const serverURLString: string = getGitHubServerURL().toString();
	return new URL(`${serverURLString}${serverURLString.endsWith("/") ? "" : "/"}${repository}/actions/runs/${getWorkflowRunID()}`);
}
export interface GitHubWebhookPayloadRepository {
	full_name?: string;
	html_url?: string;
	name: string;
	owner: {
		login: string;
		name?: string;
		[key: string]: JSONValueExtend | undefined;
	};
	[key: string]: JSONValueExtend | undefined;
}
/**
 * GitHub Actions webhook event payload.
 */
export interface GitHubActionsWebhookEventPayload {
	action?: string;
	comment?: {
		id: number;
		[key: string]: JSONValueExtend | undefined;
	};
	installation?: {
		id: number;
		[key: string]: JSONValueExtend | undefined;
	};
	issue?: {
		number: number;
		html_url?: string;
		body?: string;
		[key: string]: JSONValueExtend | undefined;
	};
	pull_request?: {
		number: number;
		html_url?: string;
		body?: string;
		[key: string]: JSONValueExtend | undefined;
	};
	repository?: GitHubWebhookPayloadRepository;
	sender?: {
		type: string;
		[key: string]: JSONValueExtend | undefined;
	};
	[key: string]: JSONValueExtend | undefined;
}
/**
 * Get the webhook event payload of the workflow run.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * > - File System - Read (`allow-read`)
 * @returns {GitHubActionsWebhookEventPayload} Webhook event payload of the workflow run.
 */
export function getWorkflowRunWebhookEventPayload(): GitHubActionsWebhookEventPayload {
	const path: string | undefined = getEnv("GITHUB_EVENT_PATH");
	if (typeof path === "undefined") {
		throw new ReferenceError(`Unable to get the GitHub Actions workflow run webhook event payload, environment variable \`GITHUB_EVENT_PATH\` is not defined!`);
	}
	if (!isPathAbsolute(path)) {
		throw new ReferenceError(`Unable to get the GitHub Actions workflow run webhook event payload, \`${path}\` (environment variable \`GITHUB_EVENT_PATH\`) is not a valid absolute path!`);
	}
	return JSON.parse(readFileSync(path, { encoding: "utf-8" })) as GitHubActionsWebhookEventPayload;
}
/**
 * Get the SHA of the workflow.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @returns {string} SHA of the workflow.
 */
export function getWorkflowSHA(): string {
	const value: string | undefined = getEnv("GITHUB_WORKFLOW_SHA");
	if (typeof value === "undefined") {
		throw new ReferenceError(`Unable to get the GitHub Actions workflow SHA, environment variable \`GITHUB_WORKFLOW_SHA\` is not defined!`);
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
