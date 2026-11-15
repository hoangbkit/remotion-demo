# Remotion Video Template

A minimal Remotion + TypeScript project with a GitHub Actions pipeline that
renders videos and publishes them as GitHub pre-releases.

## What the template provides

- One Remotion composition with the stable ID `Main`
- `npm run build` renders to `out/main.mp4`
- A CI workflow that renders and uploads every `out/*.mp4` file
- Release assets named `<repo-name>-<output-name>-<release-tag>.mp4`
- Compatibility with `mycli remotion play`

## Create a new video

1. Create a repository from this template, or copy the project.
2. Change the `name` in `package.json`.
3. Replace the contents of `src/Video.tsx`.
4. Keep the composition ID `Main`, unless you also update the build script.
5. Run `npm install` to refresh `package-lock.json`.
6. Push to `main` or `master`, or run the **Render Remotion Video** workflow
   manually.
7. Pull and play the rendered result:

   ```bash
   mycli remotion play
   ```

## Run locally

```bash
npm install
npm run dev
```

Open the Remotion Studio preview and select the `Main` composition.

## Render an MP4

```bash
npm run build
```

The rendered video is written to `out/main.mp4`.

## Multiple videos

The workflow uploads every MP4 in `out/`. To render several compositions, add
one build script per output and chain them from `build`:

```json
{
  "scripts": {
    "build": "npm run build:main && npm run build:teaser",
    "build:main": "remotion render src/index.ts Main out/main.mp4",
    "build:teaser": "remotion render src/index.ts Teaser out/teaser.mp4"
  }
}
```

Each file becomes a separate asset in the same GitHub release.

## Release pipeline

Pushing to `main`/`master` or running the workflow manually:

1. Installs dependencies with `npm ci`.
2. Renders the video(s) with `npm run build`.
3. Stages every `out/*.mp4` as
   `<repo-name>-<output-name>-remotion-build-<run-id>-<attempt>.mp4`.
4. Verifies the assets exist and are below GitHub's 2 GiB asset limit.
5. Creates a prerelease tagged `remotion-build-<run-id>-<attempt>` with all
   videos attached.

## Consuming a release

With [mycli](https://github.com/hoangbkit/mycli):

```bash
mycli remotion play
```

`mycli remotion play` lets you choose a GitHub origin, one of the latest five
`remotion-build-*` releases, and any video in that release. Videos are cached
under `~/Developer/tmp/remotion/<owner>/<repo>/<tag>/` and reused on later runs.

You can also download manually:

```bash
gh release download <tag> --pattern '*.mp4'
```

## Composition defaults

- Resolution: 1920 × 1080
- Frame rate: 30 FPS
- Duration: 300 frames (10 seconds)

Adjust these in `src/Root.tsx`.
