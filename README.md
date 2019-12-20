# ngx-jsonapi-material

<div align="center">

[![angular jsonapi](https://user-images.githubusercontent.com/938894/34119450-fa59fec0-e400-11e7-92c1-dd2aff2ebc00.png)](https://github.com/reyesoft/ngx-jsonapi-material)

[![CircleCI](https://circleci.com/gh/reyesoft/ngx-jsonapi-material.svg?style=svg)](https://circleci.com/gh/reyesoft/ngx-jsonapi-material) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/b097196f7f544412a79a99080a41bbc1)](https://www.codacy.com/app/Swimlane/ngx-charts?utm_source=github.com&utm_medium=referral&utm_content=swimlane/ngx-charts&utm_campaign=Badge_Grade) [![npm version](https://badge.fury.io/js/ngx-jsonapi-material.png)](https://badge.fury.io/js/ngx-jsonapi-material) [![Coverage Status](https://coveralls.io/repos/github/reyesoft/ngx-jsonapi-material/badge.svg?branch=master)](https://coveralls.io/github/reyesoft/ngx-jsonapi-material?branch=master)

</div>
This is a library (Angular 6+) of components based on Angular material, which makes use of jsonapi to work.
## Online demo

You can test library on this online example 👌 [ngx-jsonapi-material](https://reyesoft.github.io/ngx-jsonapi-material/)

<div align="center">

[![demo app](https://user-images.githubusercontent.com/938894/39630783-c6f55ed4-4f86-11e8-9376-9acb587fe4c4.gif)](http://ngx-jsonapi-material.reyesoft.com/)

</div>

Data is obtained from [Json Api Playground](http://jsonapiplayground.reyesoft.com/) server.

## Usage

Just [install](#installation), [configure](#dependecies-and-customization) and learn with [examples](#examples).

First of all, it's advisable to read [Jsonapi specification](http://jsonapi.org/). Understanding JsonApi documents structure is recommended.

### Installation

```bash
yarn add ngx-jsonapi-material --save
# or npm if you wish...
```

## Directives

### JamFloatingFilters

**Selector:** jam-floating-filters

#### Simple floating filters

```
<jam-floating-filter [hasAdvancedFilters]="false">
    <ng-container class="jam-filter-header">
        your code...
    </ng-container>
</jam-floating-filter>
```

[more info](https://github.com/reyesoft/ngx-jsonapi-material/wiki/Floating-filters)

## Local Demo App

You can run [JsonApi Demo App](http://ngx-jsonapi-material.reyesoft.com/) locally following the next steps:

```bash
git clone git@github.com:reyesoft/ngx-jsonapi-material.git
cd ngx-jsonapi-material
yarn
yarn serve
```

We use as backend [Json Api Playground](http://jsonapiplayground.reyesoft.com/).

## Colaborate

Check [Environment development file](DEV_ENVIRONMENT.md) 😉.
