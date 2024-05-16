# GitHub Actions - Core (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh-studio/github-actions-core-es](https://img.shields.io/github/v/release/hugoalh-studio/github-actions-core-es?label=hugoalh-studio/github-actions-core-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh-studio/github-actions-core-es")](https://github.com/hugoalh-studio/github-actions-core-es)
[![JSR: @hugoalh/github-actions-core](https://img.shields.io/jsr/v/@hugoalh/github-actions-core?label=JSR%20@hugoalh/github-actions-core&labelColor=F7DF1E&logoColor=000000&style=flat "JSR: @hugoalh/github-actions-core")](https://jsr.io/@hugoalh/github-actions-core)
[![NPM: @hugoalh/github-actions-core](https://img.shields.io/npm/v/@hugoalh/github-actions-core?label=@hugoalh/github-actions-core&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/github-actions-core")](https://www.npmjs.com/package/@hugoalh/github-actions-core)

An ES (JavaScript & TypeScript) module to provide a better and easier way for GitHub Actions to communicate with the runner, and the toolkit for developing GitHub Actions.

## ⚠️ Important

[official-toolkit]: https://github.com/actions/toolkit

This is a partial refactor of [the official toolkit][official-toolkit], not all of the features in [the official toolkit][official-toolkit] are available here, and not all of the features in here are available in [the official toolkit][official-toolkit].

## 🌟 Features

- Ability to use directly on GitHub Actions with Deno runtime without complex setup.
- Compatible with bundler.
- Full ModuleJS.

## 🔰 Begin

### 🎯 Targets

|  | **Registry - JSR** | **Registry - NPM** | **Remote Import** |
|:--|:--|:--|:--|
| **[Bun](https://bun.sh/)** >= v1.1.0 | [✔️ `node_modules`](https://jsr.io/docs/npm-compatibility) | [✔️ Specifier `npm:`](https://bun.sh/docs/runtime/autoimport) | ❌ |
| **[Deno](https://deno.land/)** >= v1.42.0 | [✔️ Specifier `jsr:`](https://jsr.io/docs/with/deno) | [✔️ Specifier `npm:`](https://docs.deno.com/runtime/manual/node/npm_specifiers) | [✔️](https://docs.deno.com/runtime/manual/basics/modules/#remote-import) |
| **[NodeJS](https://nodejs.org/)** >= v16.13.0 | [✔️ `node_modules`](https://jsr.io/docs/with/node) | [✔️ `node_modules`](https://docs.npmjs.com/using-npm-packages-in-your-projects) | ❌ |

> **ℹ️ Note**
>
> It is possible to use this module in other methods/ways which not listed in here, however it is not officially supported.

### #️⃣ Registries Identifier

- **JSR:**
  ```
  @hugoalh/github-actions-core
  ```
- **NPM:**
  ```
  @hugoalh/github-actions-core
  ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to use this module with tag for immutability.

### #️⃣ Remote Import Paths

- **GitHub Raw:** (Require Tag)
  ```
  https://raw.githubusercontent.com/hugoalh-studio/github-actions-core-es/${Tag}/mod.ts
  ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module with the main path `mod.ts`, it is also able to import part of the module with sub path if available, but do not import if:
>
>   - it's file path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
>   - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
>   - it's symbol has an underscore prefix (e.g.: `export function _baz() {}`).
>
>   These elements are not considered part of the public API, thus no stability is guaranteed for them.
> - Although there have 3rd party services which provide enhanced, equal, or similar methods/ways to remote import the module, beware these services maybe inject unrelated elements and thus affect the security.

### 🛡️ Permissions

*This module does not require any permission.*

## 🧩 APIs (Excerpt)

> **ℹ️ Note**
>
> For the prettier documentation, can visit via:
>
> - [Deno CLI `deno doc`](https://deno.land/manual/tools/documentation_generator)
> - [JSR](https://jsr.io/@hugoalh/github-actions-core)

### Class

- `GitHubActionsSummary`

### Function

- `addPATH`
- `addProblemMatcher`
- `addSecretMask`
- `disableEchoStdOutCommand`
- `disableProcessStdOutCommand`
- `enableEchoStdOutCommand`
- `enableProcessStdOutCommand`
- `endLogGroup`
- `getGitHubAPIURL`
- `getGitHubGraphQLAPIURL`
- `getGitHubServerURL`
- `getInput`
- `getInputBigInt`
- `getInputBoolean`
- `getInputNumber`
- `getInputRaw`
- `getInputRegExp`
- `getRunnerArchitecture`
- `getRunnerDebugStatus`
- `getRunnerName`
- `getRunnerOS`
- `getRunnerTempPath`
- `getRunnerToolCachePath`
- `getRunnerWorkspacePath`
- `getState`
- `getStateRaw`
- `getWorkflowName`
- `getWorkflowReferencePath`
- `getWorkflowRepository`
- `getWorkflowRepositoryID`
- `getWorkflowRepositoryOwner`
- `getWorkflowRepositoryOwnerID`
- `getWorkflowRunActionID`
- `getWorkflowRunActorID`
- `getWorkflowRunActorName`
- `getWorkflowRunCommitSHA`
- `getWorkflowRunEventName`
- `getWorkflowRunID`
- `getWorkflowRunJobID`
- `getWorkflowRunNumber`
- `getWorkflowRunReference`
- `getWorkflowRunRetentionDays`
- `getWorkflowRunRunAttempt`
- `getWorkflowRunURL`
- `getWorkflowRunWebhookEventPayload`
- `getWorkflowSHA`
- `isInRunner`
- `removeProblemMatcher`
- `setEnvironmentVariable`
- `setOutput`
- `setState`
- `startLogGroup`
- `validateInRunner`
- `writeAnnotation`
- `writeDebug`
- `writeError`
- `writeNotice`
- `writeWarn`

### Enum / Interface / Type

- `GitHubActionsAnnotationProperties`
- `GitHubActionsAnnotationType`
- `GitHubActionsEnvironmentVariableOptions`
- `GitHubActionsEventName`
- `GitHubActionsFileCommandOptions`
- `GitHubActionsInputOptions`
- `GitHubActionsRunnerArchitecture`
- `GitHubActionsRunnerOS`
- `GitHubActionsRunnerTestOptions`
- `GitHubActionsWebhookEventPayload`
- `GitHubActionsWebhookEventPayloadRepository`
- `GitHubReferenceMeta`
- `GitHubReferenceType`

## ✍️ Examples

- ```ts
  writeNotice("Hello, world!");
  //=> ::notice::Hello, world!
  ```
