import { readFileSync } from "node:fs";
import { isAbsolute as isPathAbsolute } from "node:path";
import { getEnv } from "https://raw.githubusercontent.com/hugoalh-studio/cross-env-ts/v1.0.1/mod.ts";
import { type JSONObject } from "https://raw.githubusercontent.com/hugoalh-studio/is-json-ts/v1.0.0/mod.ts";
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
 * @returns {URL} URL of the GitHub API.
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
* Get the ID of the workflow run.
* 
* > **🛡️ Require Permission**
* >
* > - Environment Variable (`allow-env`)
* @returns {number} ID of the workflow run.
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
*/
export function getWorkflowRunJobID(): string {
	const value: string | undefined = getEnv("GITHUB_JOB");
	if (typeof value === "undefined") {
		throw new ReferenceError(`Unable to get the GitHub Actions workflow run job ID, environment variable \`GITHUB_JOB\` is not defined!`);
	}
	return value;
}
/**
* Get the run number of the workflow.
* 
* > **🛡️ Require Permission**
* >
* > - Environment Variable (`allow-env`)
* @returns {number} Run number of the workflow.
*/
export function getWorkflowRunNumber(): number {
	const value: string | undefined = getEnv("GITHUB_RUN_NUMBER");
	if (typeof value === "undefined") {
		throw new ReferenceError(`Unable to get the GitHub Actions workflow run number, environment variable \`GITHUB_RUN_NUMBER\` is not defined!`);
	}
	return Number.parseInt(value, 10);
}
/**
* Get the reference of the workflow run.
* 
* > **🛡️ Require Permission**
* >
* > - Environment Variable (`allow-env`)
* @returns {string | undefined} Reference of the workflow run.
*/
export function getWorkflowRunReference(): string | undefined {
	return getEnv("GITHUB_REF");
}
/**
* Get the run attempt of the workflow run.
* 
* > **🛡️ Require Permission**
* >
* > - Environment Variable (`allow-env`)
* @returns {number} Run attempt of the workflow run.
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
	return new URL(`${getGitHubServerURL().toString()}/${repository}/actions/runs/${getWorkflowRunID()}`);
}
/**
* Get the webhook event payload of the workflow run.
* 
* > **🛡️ Require Permission**
* >
* > - Environment Variable (`allow-env`)
* > - File System - Read (`allow-read`)
* @returns {JSONObject} Webhook event payload of the workflow run.
*/
export function getWorkflowRunWebhookEventPayload(): JSONObject {
	const path: string | undefined = getEnv("GITHUB_EVENT_PATH");
	if (typeof path === "undefined") {
		throw new ReferenceError(`Unable to get the GitHub Actions workflow run webhook event payload, environment variable \`GITHUB_EVENT_PATH\` is not defined!`);
	}
	if (!isPathAbsolute(path)) {
		throw new ReferenceError(`Unable to get the GitHub Actions workflow run webhook event payload, \`${path}\` (environment variable \`GITHUB_EVENT_PATH\`) is not a valid absolute path!`);
	}
	return JSON.parse(readFileSync(path, { encoding: "utf-8" })) as JSONObject;
}
