# React Timeline 10000 (forked by the Flower Platform team)

## About `demo-app`

Previously, there was a single project containing the lib + demo app. Now, the demo, scenarios, tests are demo: exist in the `demo-app` subproject. This way, `demo-app` can depend on `foundation`, which itself depends on this lib. Thanks to the separation, we don't have a dependency cycle.

Currently the dependency towards `foundation` is done by using its source dir. Hence 1/ `foundation` needs to be cloned from git, next to this repo. And 2/ one should run from `foundation-react`: `yarn install`. `foundation` can be also be used as a lib. This is experimental. Look in `demo-app/vite.config.ts` for info.

In `demo-app/tsconfig.json` and `demo-app/vite.config.ts`, we created the `@famiprog-foundation/react-gantt` alias. This means that from `demo-app` source files:

```ts
// we can do this
import { Timeline, ItemRenderer } from "@famiprog-foundation/react-gantt";

// instead of this 
import { ItemRenderer } from "../../src";
```

---

## Intro

This fork is developed and maintained by the "Flower Platform" team (which FYI has authored in the past [Gantt4Flex](http://gantt4flex.crispico.com/), a popular (at that time) commercial Gantt diagramming component during the [Adobe Flex](http://flex.apache.org/) era). The motivation of our contributions is driven by the fact that we use "react-timeline-9000" in some of our industrial projects. The intention is to develop new features that we can use ASAP in our software. ALL our contributions are meant to be integrated in the upstream repo, so they are developed having this constraint in mind. The upstream repo is the **official** one (for releases, clone, adding issues, etc.). And this is to be considered as an internal repo for us = the Flower Platform team.

Admin discussions w/ the upstream repo team are held in [this discussion](https://github.com/React9k/react-timeline-9000/discussions/255).

## Process and versioning

`package.json` on the **upstream repo** / `master` branch looks like this:

```
{
  "name": "react-timeline-9000",
  "version": "1.1.3",
  ...
```

But in **this repo** / `master-flower-platform` branch (which is considered to be the main branch of this repo) we have:

```
{
  "name": "@crispico/react-timeline-10000",
  "version": "1.1.3-fp-ver-3",
  ...
```

The `name` is changed so that we can publish it in our local NPM repo. We append to the original `version` the suffix `-fp-ver-N`. Where N is the version from Flower Platform. E.g. 3 means we added 3 commits compared to the original upstream. When a new contribution is added to our main branch = `master-flower-platform`, we increment this number. So we'll have e.g.: *1.1.3-fp-ver-**4***, *1.1.3-fp-ver-**5***, *1.1.**4**-fp-ver-**5***, *1.1.**4**-fp-ver-**6***, etc.

Before we begin new work, we should first create an issue in the upstream repo:
* we prefix it w/ *[rt10000]*, like in this [example](https://github.com/React9k/react-timeline-9000/issues/190);
* we explain what we want to do and ask for advice if needed.

New work is always done on new branches. E.g. `my-new-branch`. At the end of the work we **squash everything into a single commit** and perform a pull request towards upstream (mentioning the original issue cf. above). If we need the commit ASAP into our main branch:
* we don't need to wait for their approval of the PR;
* we make a PR and/or merge it into `master-flower-platform`;
* then, we increment *fp-ver-N* to *fp-ver-N+1* cf. above.

## Working with linked libraries in development

Sometimes even if I ```yarn link``` a library, when running storybook it doesn't take into account the linked library. 
This was noticed working with the ```fixed-data-table-2``` libray as a linked library.

The solution for this problem was mentioned here: https://dev.to/hontas/using-vite-with-linked-dependencies-37n7: it should be added in the ```vite.config.ts``` file, on the ```optimizeDeps``` section: ```exclude: ["fixed-data-table-2"]```

Even the above solution worked for our case, we don't understand very good from were the old library version was taken from. Because in our case, even if we removed the ```node_modules/.cached```, an old version of the library was used (could be that it was requested from the npm registry, because in ```package.json``` the old version was referenced). 

## Tracking of the pull requests submitted to the upstream repo

We prefix our issues in the upstream repo w/ `[rt10000]`.

| Issue (mouse hover for title) | Pull request | Merged |
| - | - | - |
| React9k/react-timeline-9000#190 | React9k/react-timeline-9000#243 | yes |
| React9k/react-timeline-9000#196 | React9k/react-timeline-9000#239 | yes |
| React9k/react-timeline-9000#221 | React9k/react-timeline-9000#241 | yes |
| React9k/react-timeline-9000#234 | React9k/react-timeline-9000#237 | yes |
| minor | React9k/react-timeline-9000#257 | yes |
| minor | React9k/react-timeline-9000#260 | yes |
| React9k/react-timeline-9000#271 | React9k/react-timeline-9000#272 |  |

## Original `README.md` of the upstream repo is below

---

A performance focused timeline component in react
## Build Status
[![Build Status](https://travis-ci.org/BHP-DevHub/react-timeline-9000.svg?branch=master)](https://travis-ci.org/BHP-DevHub/react-timeline-9000)
[![CodeFactor](https://www.codefactor.io/repository/github/bhp-devhub/react-timeline-9000/badge)](https://www.codefactor.io/repository/github/bhp-devhub/react-timeline-9000)
[![npm (scoped)](https://img.shields.io/npm/v/react-timeline-9000.svg)](https://www.npmjs.com/package/react-timeline-9000)

## Demo
* http://react-timeline-9000.s3-website-ap-southeast-2.amazonaws.com/

## Documentation
* http://react-timeline-9000.s3-website-ap-southeast-2.amazonaws.com/docs/


## Getting Started

| Action         | Command                               |
| -------------- | ------------------------------------- |
| Build          | `$ make`                              |
| Test           | `$ make test` or  `$ make test-watch` |
| Run dev server | `$ make run`                          |

* Add `import react-timeline-9000/lib/style.css` (or use your own styles based on this file)

## Contributing
Feel free to make a PR :)

# Interaction

Default interaction for multiple selection is largely governed by the leading item, which is defined as the item that is directly interacted with when multiple items are selected.

## Dragging

All items will move by the same horizontal delta and row changes will be calculated by the row delta of the leading item

## Resizing

All items will gain the resize delta from the leading item.

### Overriding the default behaviour

TBA

`onInteraction(type, changes, leadTimeDelta, leaderGroupDelta,selectedItems)` 

# Props Summary

See http://react-timeline-9000.s3-website-ap-southeast-2.amazonaws.com/docs/ for detailed docs

## Props
| Name               | Default     | Description                                                                                                                                              |
| ----------------   | -------     | ------------------------------------------------------------------------------------------------------------                                             |
| groupOffset        |             |                                                                                                                                                          |
| startDate          |             |                                                                                                                                                          |
| endDate            |             |                                                                                                                                                          |
| snapMinutes        |             |                                                                                                                                                          |
| showCursorTime     |             |                                                                                                                                                          |
| cursorTimeFormat   |             |                                                                                                                                                          |
| itemHeight         |             |                                                                                                                                                          |
| timelineMode       |             |                                                                                                                                                          |
| timebarFormat      |             |                                                                                                                                                          |
| itemRenderer       |             |                                                                                                                                                          |
| itemClassName      | | Class name applied to all items |
| groupRenderer      |             |                                                                                                                                                          |
| shallowUpdateCheck | False       | If true timeline will try to minimize re-renders . Set to false if items don't show up/update on prop change                                             |
| forceRedrawFunc  | () => False | Function called when `shallowUpdateCheck`==true. If returns true the timeline will be redrawn. If false the library will decide if redrawing is required |
| useMoment        | True        | If true timeline will use moment for dates (including for items and rowLayers); otherwise the type for dates is number |

## Data
| Name             |
| ---------------- |
| items            |
| groups           |
| selectedItems    |

### Items

Required props:
* key - number or string

### Groups

Required props:
* id - number - needs to be consecutive

## Callbacks
| Name                  |
| ----------------      |
| onItemClick           |
| onItemDoubleClick     |
| onItemContext         |
| onInteraction         |
| onRowClick            |
| onRowContext          |
| onRowDoubleClick      |
| onItemHover           |
| onItemLeave           |
| onGroupRowClick       |
| onGroupRowDoubleClick |

# Styling
* View `src/style.css` for styling examples.
* For the default styles, import `react-timeline-9000/lib/style.css`

### Default Z-indexes
| Item                                  | Index |
| ------------------------------------- | ----- |
| Row Layers                            | 1     |
| Vertical markers                      | 2     |
| Timeline items                        | 3     |
| Timeline items when dragging/resizing | 4     |
| Selection box (for multi-select)      | 5     |

