import { assert } from "TEST/assert.ts";
import { getGitHubAPIURL, getGitHubGraphQLURL, getGitHubServerURL, getRunnerDebugStatus,getRunnerName, getRunnerOS, getWorkflowName, getWorkflowReferencePath, getWorkflowRunActionID, getWorkflowRunActorID, getWorkflowRunActorName, getWorkflowRunCommitSHA, getWorkflowRunEventName, getWorkflowRunID, getWorkflowRunJobID, getWorkflowRunNumber, getWorkflowRunReference, getWorkflowRunRunAttempt, getWorkflowRunURL, getWorkflowRunWebhookEventPayload, getWorkflowSHA, validateInRunner } from "./utility.ts";
const isInGitHubActionsRunner = Deno.env.get("GITHUB_ACTIONS") === "true";
Deno.test("GitHub API URL", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_API_URL"]
	}
}, () => {
	void getGitHubAPIURL();
});
Deno.test("GitHub GraphQL URL", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_GRAPHQL_URL"]
	}
}, () => {
	void getGitHubGraphQLURL();
});
Deno.test("GitHub Server URL", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_SERVER_URL"]
	}
}, () => {
	void getGitHubServerURL();
});
Deno.test("Runner Debug Status", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["RUNNER_DEBUG"]
	}
}, () => {
	void getRunnerDebugStatus();
});
Deno.test("Runner Name", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["RUNNER_NAME"]
	}
}, () => {
	void getRunnerName();
});
Deno.test("Runner OS", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["RUNNER_OS"]
	}
}, () => {
	const result = getRunnerOS();
	assert(
		(Deno.build.os === "darwin" && result === "macOS") ||
		(Deno.build.os === "linux" && result === "Linux") ||
		(Deno.build.os === "windows" && result === "Windows")
	);
});
Deno.test("Workflow Name", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_WORKFLOW"]
	}
}, () => {
	void getWorkflowName();
});
Deno.test("Workflow Reference Path", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_WORKFLOW_REF"]
	}
}, () => {
	void getWorkflowReferencePath();
});
Deno.test("Workflow Run Action ID", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_ACTION"]
	}
}, () => {
	void getWorkflowRunActionID();
});
Deno.test("Workflow Run Actor ID", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_ACTOR_ID"]
	}
}, () => {
	void getWorkflowRunActorID();
});
Deno.test("Workflow Run Actor Name", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_ACTOR"]
	}
}, () => {
	void getWorkflowRunActorName();
});
Deno.test("Workflow Run Commit SHA", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_SHA"]
	}
}, () => {
	void getWorkflowRunCommitSHA();
});
Deno.test("Workflow Run Event Name", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_EVENT_NAME"]
	}
}, () => {
	void getWorkflowRunEventName();
});
Deno.test("Workflow Run ID", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_RUN_ID"]
	}
}, () => {
	void getWorkflowRunID();
});
Deno.test("Workflow Run Job ID", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_JOB"]
	}
}, () => {
	void getWorkflowRunJobID();
});
Deno.test("Workflow Run Number", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_RUN_NUMBER"]
	}
}, () => {
	void getWorkflowRunNumber();
});
Deno.test("Workflow Run Reference", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: [
			"GITHUB_BASE_REF",
			"GITHUB_EVENT_NAME",
			"GITHUB_HEAD_REF",
			"GITHUB_REF",
			"GITHUB_REF_NAME",
			"GITHUB_REF_PROTECTED",
			"GITHUB_REF_TYPE"
		]
	}
}, () => {
	void getWorkflowRunReference();
});
Deno.test("Workflow Run Run Attempt", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_RUN_ATTEMPT"]
	}
}, () => {
	void getWorkflowRunRunAttempt();
});
Deno.test("Workflow Run URL", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: [
			"GITHUB_REPOSITORY",
			"GITHUB_RUN_ID",
			"GITHUB_SERVER_URL"
		]
	}
}, () => {
	void getWorkflowRunURL();
});
Deno.test("Workflow Run Webhook Event Payload", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: [
			"GITHUB_EVENT_PATH"
		],
		read: true
	}
}, () => {
	void getWorkflowRunWebhookEventPayload();
});
Deno.test("Workflow SHA", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_WORKFLOW_SHA"]
	}
}, () => {
	void getWorkflowSHA();
});
Deno.test("Validate In Runner", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: true
	}
}, () => {
	void validateInRunner();
});
