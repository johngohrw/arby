(!) PROCEED WITH CAUTION. This project was speed-coded in a day to meet a certain requirement for work. Things may not work as intended, and you might suffer data loss. You have been warned.


# Arby

Lightweight, bulk editor for localization files. Essentially a git client interfacing Gitlab. Edit ARB translation files and commit changes directly in the browser.

Features

- Fetch & edit translations — Load multiple ARB files from any GitLab branch into an inline data grid
- Multi-locale side-by-side editing — All locales are shown as columns, making it easy to spot missing or inconsistent translations
- Add / delete keys — Insert new rows inline or remove existing ones without touching a text editor
- Key validation — Enforces ARB key naming rules (no uppercase first letter, alphanumerals + @ + _ only)
- Smart key ordering — On save, @@ metadata keys are hoisted to the top, and @ descriptor keys are kept adjacent to their parent key
- Commit & push — Write changes back to GitLab with a custom commit message, all from the same UI
- And more to come.


[Visit site](https://arby-editor.netlify.app/)


### Usage

- Fill in your GitLab endpoint, project ID, private token, branch, and the comma-separated file paths to your ARB files
- Click Fetch Translations
- Edit values directly in the grid
- Enter a commit message and click Update


### Stack

React + AG Grid


### Required GitLab scopes when creating Project Access Token

- api
- read_repository
- write_repository
