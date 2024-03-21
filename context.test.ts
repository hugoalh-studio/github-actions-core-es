import { assert } from "TEST/assert.ts";
import { assertEquals } from "TEST/assert_equals.ts";
import { getGitHubAPIURL, getGitHubGraphQLURL, getGitHubServerURL, getWorkflowName, getWorkflowReferencePath, getWorkflowRunActionID, getWorkflowRunActorID, getWorkflowRunActorName, getWorkflowRunCommitSHA, getWorkflowRunEventName, getWorkflowRunID, getWorkflowRunJobID, getWorkflowRunNumber, getWorkflowRunReference, getWorkflowRunRunAttempt, getWorkflowRunURL, getWorkflowRunWebhookEventPayload, getWorkflowSHA } from "./context.ts";
const isInGitHubActionsRunner = Deno.env.get("GITHUB_ACTIONS") === "true";
Deno.test("GitHub API URL", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_API_URL"]
	}
}, () => {
	assertEquals(getGitHubAPIURL().toString(), "https://api.github.com");
});
Deno.test("GitHub GraphQL URL", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_GRAPHQL_URL"]
	}
}, () => {
	assertEquals(getGitHubGraphQLURL().toString(), "https://api.github.com/graphql");
});
Deno.test("GitHub Server URL", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_SERVER_URL"]
	}
}, () => {
	assertEquals(getGitHubServerURL().toString(), "https://github.com");
});
Deno.test("Workflow Name", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_WORKFLOW"]
	}
}, () => {
	assert(getWorkflowName());
});
Deno.test("Workflow Reference Path", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_WORKFLOW_REF"]
	}
}, () => {
	assert(getWorkflowReferencePath());
});
Deno.test("Workflow Run Action ID", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_ACTION"]
	}
}, () => {
	assert(getWorkflowRunActionID());
});
Deno.test("Workflow Run Actor ID", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_ACTOR_ID"]
	}
}, () => {
	assert(getWorkflowRunActorID());
});
Deno.test("Workflow Run Actor Name", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_ACTOR"]
	}
}, () => {
	assert(getWorkflowRunActorName());
});
Deno.test("Workflow Run Commit SHA", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_SHA"]
	}
}, () => {
	assert(getWorkflowRunCommitSHA());
});
Deno.test("Workflow Run Event Name", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_EVENT_NAME"]
	}
}, () => {
	assert(getWorkflowRunEventName());
});
Deno.test("Workflow Run ID", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_RUN_ID"]
	}
}, () => {
	assert(getWorkflowRunID());
});
Deno.test("Workflow Run Job ID", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_JOB"]
	}
}, () => {
	assert(getWorkflowRunJobID());
});
Deno.test("Workflow Run Number", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_RUN_NUMBER"]
	}
}, () => {
	assert(getWorkflowRunNumber());
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
}, async (t) => {
	const event = getWorkflowRunEventName();
	const eventIsPullRequests = (
		event === "pull_request" ||
		event === "pull_request_target"
	);
	const result = getWorkflowRunReference();
	await t.step("Base", () => {
		assert(eventIsPullRequests ? typeof result.base === "string" : typeof result.base === "undefined");
	});
	await t.step("Head", () => {
		assert(eventIsPullRequests ? typeof result.head === "string" : typeof result.head === "undefined");
	});
});
Deno.test("Workflow Run Run Attempt", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_RUN_ATTEMPT"]
	}
}, () => {
	assert(getWorkflowRunRunAttempt());
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
	assert(getWorkflowRunURL());
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
	assert(getWorkflowRunWebhookEventPayload());
});
Deno.test("Workflow SHA", {
	ignore: !isInGitHubActionsRunner,
	permissions: {
		env: ["GITHUB_WORKFLOW_SHA"]
	}
}, () => {
	assert(getWorkflowSHA());
});
