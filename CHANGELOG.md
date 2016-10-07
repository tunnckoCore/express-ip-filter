

## 2.0.0 - 2016-10-07

**POSSIBLY BREAKING CHANGES**

Mainly bump to `ip-filter@2` which fixes some wrong behaving. Also you should notice
that signle `*` would not work in some cases, so you should `**`, because basically `ip-filter`
converts IPs to filepaths to be able to use `micromatch` as matching library behind the scenes.

So one way is to pass such `filter: ['*.*.*.*', '!111.??.244.*']`, another is
the `filter: ['**', '!111.??.244.*']` to match any IPs except `111.22.244.31` for example.

**MISC STUFF**

Boilerplate stuff. Update contributing guide, dotfiles, license year, npm scripts, release/publish flow and etc. Replace `assertit` with `mukla` which is drop-in replacement. Using `verb` for generating the README.md and API docs. Travis builds, and flow et all.

## 1.0.0 - 2015-06-21
- Release v1.0.0 / npm@v1.0.0
- update tests titles
- add docs
- update readme
- add keywords
- add tests
- add `ip-filter`
- lets get started
- boilerplate

## 0.0.0 - 2015-06-20
- first commits