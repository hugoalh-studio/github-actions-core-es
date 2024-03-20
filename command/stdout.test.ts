import { assertEquals } from "TEST/assert_equals.ts";
import { GitHubActionsStdOutCommand } from "./stdout.ts";
Deno.test("Echo Off", { permissions: "none" }, () => {
	assertEquals(new GitHubActionsStdOutCommand("echo", "off").toString(), "::echo::off");
});
Deno.test("Echo On", { permissions: "none" }, () => {
	assertEquals(new GitHubActionsStdOutCommand("echo", "on").toString(), "::echo::on");
});
Deno.test("Escape", { permissions: "none" }, () => {
	assertEquals(new GitHubActionsStdOutCommand("test", { foo: "q\nw\ne\nr\nt\ny" }, "foo\nbar").toString(), "::test foo=q%0Aw%0Ae%0Ar%0At%0Ay::foo%0Abar");
});
