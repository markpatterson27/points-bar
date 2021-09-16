# Points Bar Action

A GitHub action that creates an SVG points bar.

<p align="center">
    <img alt="points bar" height="36" src="../../blob/status/.github/icons/points-bar.svg" />
</p>

## Usage

```yaml
name: Update Points Bar

on:
  push:

jobs:
  update:
    name: Update points bar
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      # create points bar
      - name: points bar
        uses: markpatterson27/points-bar@v1
        with:
          points: '25/50'
          path: 'points-bar.svg'

      # commit and push activity icons if statuses have changed
      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add 'points-bar.svg'
          git commit -m "Add/Update activity icons" || exit 0
          git push

```

## Inputs

| Input Name | Required | Default | Description |
|---|---|---|---|
| `points` | yes |  | Points string separated with a / slash. |
| `path` | yes |  | File path to save the generated SVG to. |
