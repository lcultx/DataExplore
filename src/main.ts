/// <reference path="./tsd.d.ts"/>
import {bootstrap} from 'angular2/angular2';
import router = require('angular2/router');

import Application = require('./components/application/Application');

export function main() {
  bootstrap(Application,[router.routerInjectables]);
}

main();
