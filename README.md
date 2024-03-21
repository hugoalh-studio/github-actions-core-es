# GitHub Actions - Core (TypeScript)

[**⚖️** MIT](./LICENSE.md)

**🗂️**
[![GitHub: hugoalh-studio/github-actions-core-ts](https://img.shields.io/badge/hugoalh--studio/github--actions--core--ts-181717?logo=github&logoColor=ffffff&style=flat "GitHub: hugoalh-studio/github-actions-core-ts")](https://github.com/hugoalh-studio/github-actions-core-ts)
[![JSR: @hugoalh/github-actions-core](https://img.shields.io/badge/JSR-@hugoalh/github--actions--core-F7DF1E?labelColor=F7DF1E&logoColor=000000&style=flat "JSR: @hugoalh/github-actions-core")](https://jsr.io/@hugoalh/github-actions-core)

**🆙** ![Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/github-actions-core-ts?sort=semver&color=2187C0&label=&style=flat "Latest Release Version") (![Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/github-actions-core-ts?color=2187C0&label=&style=flat "Latest Release Date"))

A TypeScript module to provide a better and easier way for GitHub Actions to communicate with the runner, and the toolkit for developing GitHub Actions in TypeScript.

## ⚠️ Important

[official-toolkit]: https://github.com/actions/toolkit

This is a partial refactor of [the official toolkit][official-toolkit], not all of the features in [the official toolkit][official-toolkit] are available here, and not all of the features in here are available in [the official toolkit][official-toolkit].

## 🌟 Feature

- Ability to use directly on GitHub Actions with Deno runtime without extra setup.
- Compatible with bundler.
- Full ModuleJS.

## 🎯 Target

- Bun ^ v1.0.0
- Deno >= v1.34.0 / >= v1.41.1 *(Via JSR)*
  > **🛡️ Require Permission**
  >
  > *N/A*
- NodeJS >= v16.13.0

> **💽 Require Software**
>
> - GitHub Actions Runner

## 🔰 Usage

### Via HTTPS

> **🎯 Supported Target**
>
> - Deno

1. Import at the script (`<ScriptName>.ts`):
    - Via DenoPKG
      ```ts
      import ... from "https://denopkg.com/hugoalh-studio/github-actions-core-ts[@<Tag>]/mod.ts";
      ```
    - Via GitHub Raw (Require Tag)
      ```ts
      import ... from "https://raw.githubusercontent.com/hugoalh-studio/github-actions-core-ts/<Tag>/mod.ts";
      ```
    - Via Pax
      ```ts
      import ... from "https://pax.deno.dev/hugoalh-studio/github-actions-core-ts[@<Tag>]/mod.ts";
      ```
    > **ℹ️ Note**
    >
    > Although it is recommended to import the entire module with the main path `mod.ts`, it is also able to import part of the module with sub path if available, but do not import if:
    >
    > - it's file path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
    > - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
    > - it's symbol has an underscore prefix (e.g.: `export function _baz() {}`).
    >
    > These elements are not considered part of the public API, thus no stability is guaranteed for them.

### Via JSR With Native Support

> **🎯 Supported Target**
>
> - Deno

1. Import at the script (`<ScriptName>.ts`):
    ```ts
    import ... from "jsr:@hugoalh/github-actions-core[@<Tag>]";
    ```
    > **ℹ️ Note**
    >
    > Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.

### Via JSR With NPM Compatibility Layer Support

> **🎯 Supported Target**
>
> - Bun
> - NodeJS

1. Install via console/shell/terminal:
    - Via Bun
      ```sh
      bunx jsr add @hugoalh/github-actions-core[@<Tag>]
      ```
    - Via NPM
      ```sh
      npx jsr add @hugoalh/github-actions-core[@<Tag>]
      ```
    - Via PNPM
      ```sh
      pnpm dlx jsr add @hugoalh/github-actions-core[@<Tag>]
      ```
    - Via Yarn
      ```sh
      yarn dlx jsr add @hugoalh/github-actions-core[@<Tag>]
      ```
2. Import at the script (`<ScriptName>.ts`):
    ```ts
    import ... from "@hugoalh/github-actions-core";
    ```
    > **ℹ️ Note**
    >
    > Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.

## 🧩 API (Excerpt)

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
- `getGitHubGraphQLURL`
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
- `getState`
- `getStateRaw`
- `getWorkflowName`
- `getWorkflowReferencePath`
- `getWorkflowRunActionID`
- `getWorkflowRunActorID`
- `getWorkflowRunActorName`
- `getWorkflowRunCommitSHA`
- `getWorkflowRunEventName`
- `getWorkflowRunID`
- `getWorkflowRunJobID`
- `getWorkflowRunNumber`
- `getWorkflowRunReference`
- `getWorkflowRunRunAttempt`
- `getWorkflowRunURL`
- `getWorkflowRunWebhookEventPayload`
- `getWorkflowSHA`
- `isInRunner`
- `removeProblemMatcher`
- `setEnvironmentVariable`
- `setEnvironmentVariables`
- `setOutput`
- `setOutputs`
- `setState`
- `setStates`
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
- `GitHubActionsRunnerMachineTestOptions`
- `GitHubActionsRunnerOS`
- `GitHubReferenceMeta`
- `GitHubReferenceType`

## ✍️ Example

- ```ts
  writeNotice("Hello, world!");
  //=> ::notice::Hello, world!
  ```
