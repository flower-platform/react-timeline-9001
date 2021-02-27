# React Timeline 9000 / Flower Platform fork

## Intro

This fork is developed and maintained by the "Flower Platform" team (which FYI has authored in the past [Gantt4Flex](http://gantt4flex.com/), a popular (at that time) commercial Gantt diagramming component during the [Adobe Flex](http://flex.apache.org/) era). The motivation of our contributions is driven by the fact that we use "react-timeline-9000" in some of our industrial projects. The intention is to develop new features that we can use ASAP in our software. ALL our contributions are meant to be integrated in the upstream repo, so they are developed having this constraint in mind. The upstream repo is the **official** one (for releases, clone, adding issues, etc.). And this is to be considered as an internal repo for us = the Flower Platform team.

Admin discussions w/ the upstream repo team are held in [this issue](https://github.com/BHP-DevHub/react-timeline-9000/issues/183).

## Process

Branch `master-flower-platform` has changed the name in `package.json` to `@crispico/react-timeline-9000`. So that we can publish it in our local NPM repo.

From time to time we merge from upstream (i.e. from https://github.com/BHP-DevHub/react-timeline-9000). If we merge from a tag (e.g. v1.1.5) => we'll use **v1.1.5**. If we merge from master which is not yet released, and last release was v1.1.5 => we'll use **v1.1.6-SNAPSHOT** (i.e. v1.1.6 in the making).

New work is always done on new branches. E.g. `my-new-branch`. At the end of the work we squash everything into a single commit and perform a pull request towards upstream. We don't need to wait for their approval to merge in `master-flower-platform`. But if we do, we'll update the version. E.g. **v1.1.6-SNAPSHOT.0**, **...1**, **v1.1.6-SNAPSHOT.1**, etc. The 4th digit means how many "internal" / flower-platform releases we have made. Currently we don't tag releases. On `master-flower-platform`, pretty much each commit == a new (internal) version. We consider as "pseudo-tags" the commits that begin w/ e.g. "v1.1.6-SNAPSHOT.0". This means that that commit was pushed to our internal repo.

New work should have a "triggering" GitHub issue on the upstream repo. So that when we deliver, we say: this is the fix for `#????`. The GitHub issue is both the spec and the doc. We should update it as we develop and enrich it w/ "Release notes" section as w/ our internal process. This way, when the PR is accepted, the associated task will be linked in the big "Change log" / "Release notes" section. And any user will be informed by the new features.

