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
      - uses: actions/checkout@v3

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

## GitHub Classroom Use

The points bar was original written to be used with GitHub Classroom's autograding feature to provide grade score feedback to students. To use the points bar with GitHub Classroom, replace (or edit) the `.github/workflow/classroom.yml` workflow file used by Autograding with the following:

```yaml
name: GitHub Classroom Workflow

on: 
  push:
    branches:
    - '*'
    - '!badges'

jobs:
  build:
    name: Autograding
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0 # otherwise, you will fail to push refs to dest repo

      # add id to action so outputs can be used
      - uses: education/autograding@v1
        id: autograder
        continue-on-error: true

      # switch to badges branch
      - run: git checkout badges || git checkout -b badges

      # create points bar
      - name: points bar
        uses: markpatterson27/points-bar@v1
        with:
          points: ${{ steps.autograder.outputs.points }}
          path: '.github/badges/points-bar.svg'

      # commit and push badges if badges have changed
      - name: Commit changes to points bar
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add '.github/badges/points-bar.svg'
          git commit -m "Add/Update points bar" || exit 0
          git push origin badges
```

To display the points bar, add the following to the top of the assignment README:

```
![Points bar](../../blob/badges/.github/badges/points-bar.svg)
```

If you want to float the points bar to the right, use the following instead:

```html
<img alt="points bar" align="right" height="36" src="../../blob/badges/.github/badges/points-bar.svg" />
```

## Using the Reusable Points Bar Workflow

This repository includes a [reusable workflow](https://docs.github.com/en/actions/using-workflows/reusing-workflows) for generating a points bar. The workflow includes steps to commit and push the updated points bar back to the repository.

An example of how to use the reusable workflow:

```yaml
name: My Workflow
on:
  push:
    branches:
    - '*'
    - '!badges'

jobs:
  update-points-bar:
    uses: markpatterson27/points-bar/.github/workflows/reusable-workflow.yml@main
    permissions:
      contents: write
    with:
      points: '10/20'
      path: '.github/badges/points-bar.svg'
      type: 'bar'
      bar-color: '#4c1'
      bar-background: '#555'
      font-color: '#aaa'
      label: 'Points'
      width: '100'
      reverse: false
      branch: badges
    secrets:
      token: ${{ secrets.GITHUB_TOKEN }}
```

Inputs for the reusable workflow follow the action inputs described above with the following additional inputs:

| Input Name | Required | Default | Description |
|---|---|---|---|
| `branch` | yes | 'main' | Name of branch to commit the points bar to. |
| `token` | yes |  | Token with permissions to commit and push updated points bar back to the repository. |

## Alternatives

[Badge Action](https://github.com/emibcn/badge-action) creates a customizable badge with many styling options. Useful if you want a customizable badge and don't need a progress style points bar.
