# Release markers from GitHub Actions

One complete workflow creates an Amplitude release after a successful production deployment. It records the deployed commit SHA and a link to the deployment run. No application code or SDK is included.

## Prerequisites

- An existing GitHub repository with default branch `main` and a production deployment workflow named `Deploy production`, triggered by pushes to `main`.
- That deployment workflow succeeds only after production is deployed. Do not attach the marker to a build-only workflow or one that reports success after skipping deployment.
- An Amplitude project with releases access (Plus, Growth, or Enterprise), its project API key, and an existing secret key. Use an existing key from project key management if it offers Show; otherwise ask the project administrator for its securely stored value.
- GitHub CLI authenticated to the target repository for setup and log inspection.

## Install

From the target repository, store credentials at repository scope. Each secret command prompts for its value; do not paste values into shell commands or commit them.

```sh
gh secret set AMPLITUDE_API_KEY
gh secret set AMPLITUDE_SECRET_KEY
gh variable set AMPLITUDE_SERVER_ZONE --body US
```

Use `EU` for an EU project. Copy `annotate-release.yml` to `.github/workflows/annotate-release.yml` in the target repository. Change the upstream workflow name and branch if your deployment uses different values. Merge the new file into the default branch using your normal review process. Leave the existing deployment workflow unchanged.

The marker job accepts only successful, same-repository, push-triggered deployment runs on the configured branch. It executes no upstream code or artifacts and requests no GitHub token permissions. The two-minute job uses the runner's Bash, curl, and jq. Each API call has a five-second connection timeout and a 15-second total timeout; there is no automatic retry.

## Verify

After a successful production deployment, inspect the annotation workflow in the Actions tab. The successful step prints the returned release ID, deployed SHA, UTC start timestamp, and chart visibility. It checks both HTTP 200 and `success: true` with a string release ID.

Open the same Amplitude project's Releases tab and find `Production ` followed by the first 12 characters of the deployed SHA. Confirm its version, description link, and visibility, then inspect a time-series chart covering the marker's date with release annotations enabled.

`release_start` records when the annotation step begins, after deployment; queue delays move the marker later. The API creates release metadata, not analytics events or version-adoption data. Re-running a successful annotation job can create another release; check Amplitude before retrying an uncertain result.

## Local contract test

Requires Python 3, Ruby with Psych (YAML parser), Bash, jq, and curl. No Python packages or installation step are needed.

```sh
python3 test_contract.py
```

The test extracts the exact workflow shell and sends its request through real curl to a localhost HTTP fixture. It checks US/EU routing, Basic authentication, UTC formatting, quoted metadata, success and rejection responses, malformed JSON, missing secrets, cleanup, and simulated transport failure. It does not test hosted GitHub scheduling, Amplitude acceptance, or chart rendering.

## References

- [Amplitude Releases API](https://amplitude.com/docs/apis/analytics/releases)
- [Amplitude API authentication](https://amplitude.com/docs/apis/authentication)
- [Releases and plan availability](https://amplitude.com/docs/analytics/releases)
- [GitHub workflow_run trigger](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#workflow_run)
- [GitHub CLI secret setup](https://cli.github.com/manual/gh_secret_set)
