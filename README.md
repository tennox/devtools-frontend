# Chrome DevTools frontend
## PATCHED TO OPEN FILES IN VSCOD{IUM,E}

**Disclaimer**: This is in a hacked-together Proof-of-concept state. YMMV

Clicking on Filenames in the console will open the location via `vscodium://file/project/path`:

![Screenshot](https://user-images.githubusercontent.com/2084639/169710810-96332c9e-ca06-41d2-9d03-d255c82accc2.png)

[Screencast](./docs/Screencast%20Devtools%20vscodium.webm)


### Setup
1. `wget release.zip`
2. `unzip release.zip -o ~/.vscode/devtools-frontend` (suggested location)
3. In your project, add `.vscode/devtools-editor-config.json`:
    ```json5
    {
      "urlHandler": "vscodium",
      "appCodeURLs": [
        {
          "match": "meteor://💻app/",
          "replace": ""
        }
      ]
    }
    ```
4. Add to your `.vscode/launch.json` the chrome arg
    ```
    --custom-devtools-frontend=file://${env:HOME}/.vscode/devtools-frontend/
    ```
    example:
    ```json5
      {
          "version": "0.2.0",
          "configurations": [
              {
                  "type": "chrome",
                  "runtimeExecutable": "custom",
                  "request": "launch",
                  "name": "Frontend",
                  "url": "http://localhost:3000",
                  "webRoot": "${workspaceFolder}",
                  "userDataDir": "${env:HOME}/.vscode/chrome-data",
                  "runtimeArgs": [
                      "--custom-devtools-frontend=file://${env:HOME}/dev/stuff/devtools-frontend/"
                  ],
                  "sourceMaps": true,
                  "timeout": 5000,
              }
          ]
      }
    ```
5. Launch chromium
6. Open Devtools
7. In devtools settings, add your project directory as Workspace  
    (the directory must contain `.vscode/devtools-editor-config.json` file)
8. Workaround for [#1](https://github.com/tennox/devtools-frontend/issues/1):
    1. undock devtools
    2. re-dock (optional)

### Config details

- `urlHandler` - which url is handled by your instance, e.g.: `vscode`, `vscodium`, `vscode-insiders`
- `appCodeURLs` - configure how to change URLs so that they point to the file relative to your workspace root
  - `match` - which URLs to match - you see it when hovering over the filename in console
  - `replace` - replace the matched part so that the path points to the file relative from your workspace root 
- ``

# ORIGINAL README:

<!-- [START badges] -->

[![npm package](https://img.shields.io/npm/v/chrome-devtools-frontend.svg)](https://npmjs.org/package/chrome-devtools-frontend)

<!-- [END badges] -->

The client-side of the Chrome DevTools, including all JS & CSS to run the DevTools webapp.

### Source code

The frontend is available on [chromium.googlesource.com](https://chromium.googlesource.com/devtools/devtools-frontend).

### Design guidelines

Please be aware that DevTools follows additional [development guidelines](docs/design_guidelines.md).

### Issue triage

The issue triage guidelines can be found [in docs/triage_guidelines.md](docs/triage_guidelines.md).

### Workflows

Instructions to set up, use, and maintain a DevTools frontend checkout can be found [in docs/workflows.md](docs/workflows.md).

### Additional references

- DevTools documentation: [devtools.chrome.com](https://devtools.chrome.com/)
- [Debugging protocol docs](https://developer.chrome.com/devtools/docs/debugger-protocol) and [Chrome Debugging Protocol Viewer](https://chromedevtools.github.io/debugger-protocol-viewer/)
- [awesome-chrome-devtools](https://github.com/paulirish/awesome-chrome-devtools): recommended tools and resources
- Contributing to DevTools: [bit.ly/devtools-contribution-guide](https://goo.gle/devtools-contribution-guide)
- Contributing To Chrome DevTools Protocol: [docs.google.com](https://goo.gle/devtools-contribution-guide-cdp)
- DevTools Design Review Guidelines: [design_guidelines.md](docs/design_guidelines.md)

### Source mirrors

DevTools frontend repository is mirrored on [GitHub](https://github.com/ChromeDevTools/devtools-frontend).

DevTools frontend is also available on NPM as the [chrome-devtools-frontend](https://www.npmjs.com/package/chrome-devtools-frontend) package. It's not currently available via CJS or ES modules, so consuming this package in other tools may require [some effort](https://github.com/paulirish/devtools-timeline-model/blob/master/index.js).

The version number of the npm package (e.g. `1.0.373466`) refers to the Chromium commit position of latest frontend git commit. It's incremented with every Chromium commit, however the package is updated roughly daily.

### Getting in touch

- All DevTools commits: [View the log] or follow [@DevToolsCommits] on Twitter
- [All open DevTools tickets] on crbug.com
- File a new DevTools ticket: [new.crbug.com](https://bugs.chromium.org/p/chromium/issues/entry?labels=OS-All,Type-Bug,Pri-2&components=Platform%3EDevTools)
- Code reviews mailing list: [devtools-reviews@chromium.org]
- [@ChromeDevTools] on Twitter
- Chrome DevTools mailing list: [groups.google.com/forum/google-chrome-developer-tools](https://groups.google.com/forum/#!forum/google-chrome-developer-tools)

  [devtools-reviews@chromium.org]: https://groups.google.com/a/chromium.org/forum/#!forum/devtools-reviews
  [View the log]: https://chromium.googlesource.com/devtools/devtools-frontend/+log/main
  [@ChromeDevTools]: http://twitter.com/ChromeDevTools
  [@DevToolsCommits]: http://twitter.com/DevToolsCommits
  [All open DevTools tickets]: https://bugs.chromium.org/p/chromium/issues/list?can=2&q=component%3APlatform%3EDevTools&sort=&groupby=&colspec=ID+Stars+Owner+Summary+Modified+Opened
  [test waterfall]: https://ci.chromium.org/p/devtools-frontend/g/main/console
