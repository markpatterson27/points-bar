# Points Bar Action

[![units-test](https://github.com/markpatterson27/points-bar/actions/workflows/test.yml/badge.svg)](https://github.com/markpatterson27/points-bar/actions/workflows/test.yml)

A GitHub action that creates an SVG points bar.

<p align="center">
    <img alt="points bar" height="36" src="../../blob/svg-build/.github/icons/points-bar.svg" />
    <br />
    <img alt="points badge" height="20" src="../../blob/svg-build/.github/icons/points-badge.svg" /> <img alt="points badge reversed" height="20" src="../../blob/svg-build/.github/icons/points-badge-reversed.svg" />
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

      # commit and push points-bar if changed
      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add 'points-bar.svg'
          git commit -m "Add/Update points bar" || exit 0
          git push

```

## Inputs

| Input Name | Required | Default | Description |
|---|---|---|---|
| `points` | yes |  | Points string separated with a / slash. |
| `path` | yes |  | File path to save the generated SVG to. |
| `type` | no | 'default' | Style of bar to generate. Can be either 'default' or 'badge'. |
| `bar-color` | no |  | Color to use for the points bar. |
| `bar-background` | no |  | Background color for the points bar. |
| `font-color` | no |  | Color to use for text. |
| `label` | no | 'Points' | Text to use for label part of points bar. |
| `width` | no |  | Bar/badge width. |
| `reverse` | no | 'false' | Reverse the progress direction of the bar. i.e. Progress bar moves from right to left. |

## Examples

### Default

<img alt="points bar" height="36" src="../../blob/svg-build/.github/icons/points-bar.svg" />

```yaml
- name: points bar
  uses: markpatterson27/points-bar@v1
  with:
    points: '25/50'
    path: '.github/icons/points-bar.svg'
```

### Badge

<img alt="points badge" height="20" src="../../blob/svg-build/.github/icons/points-badge.svg" />

```yaml
- name: points badge
  uses: markpatterson27/points-bar@v1
  with:
    points: '25/50'
    path: '.github/icons/points-badge.svg'
    type: 'badge'
```

### Text and Bar Color

<img alt="points bar color" height="36" src="../../blob/svg-build/.github/icons/points-bar-color.svg" />

```yaml
- name: points bar color
  uses: markpatterson27/points-bar@v1
  with:
    points: '25/50'
    path: '.github/icons/points-bar-color.svg'
    bar-color: 'gold'
    bar-background: '#115544'
    font-color: '#BF5700'
```

### Label

<img alt="points bar custom label" height="36" src="../../blob/svg-build/.github/icons/points-bar-custom-label.svg" />

```yaml
- name: points bar
  uses: markpatterson27/points-bar@v1
  with:
    points: '25/50'
    path: '.github/icons/points-bar-custom-label.svg'
    label: 'Score'
```

<img alt="points badge custom label" height="20" src="../../blob/svg-build/.github/icons/points-badge-custom-label.svg" />

```yaml
- name: autograde badge
  uses: markpatterson27/points-bar@v1
  with:
    points: '25/50'
    path: '.github/icons/points-badge-custom-label.svg'
    type: 'badge'
    label: 'Autograde'
```

### Width

<img alt="points bar wide" height="36" src="../../blob/svg-build/.github/icons/points-bar-wide.svg" />

```yaml
- name: points bar
  uses: markpatterson27/points-bar@v1
  with:
    points: '25/50'
    path: '.github/icons/points-bar-wide.svg'
    width: 220
```

### Reversed

<img alt="points badge reversed" height="20" src="../../blob/svg-build/.github/icons/points-badge-reversed.svg" />

```yaml
- name: points badge reversed
  uses: markpatterson27/points-bar@v1
  with:
    points: '25/50'
    path: '.github/icons/points-badge-reversed.svg'
    type: 'badge'
    bar-color: '#11BBCC'
    bar-background: '#88BBCC'
    reverse: true
```

## Alternatives

[Badge Action](https://github.com/emibcn/badge-action) creates a customizable badge with many styling options. Useful if you want a customizable badge and don't need a progress style points bar.
