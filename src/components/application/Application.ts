/// <reference path="../../../typings/angular2/angular2.d.ts"/>
/// <reference path="../../../typings/jquery/jquery.d.ts"/>
/// <reference path="../shower/interfaces.d.ts"/>

import {Component, Directive, View, Parent} from 'angular2/angular2';
import router = require('angular2/router');


import ng2Helper = require('../../library/ng2Helper');
import TopTitle = require('../top-title/TopTitle');
import Siderbar = require('../siderbar/Siderbar');
import PageContent = require('../page-content/PageContent');
import Start = require('../start/Start');
import Dashboard = require('../dashboard/Dashboard');

@Component({
  selector: 'application'
})

@View({
  templateUrl: ng2Helper.getTemplateUrlByComponentName('application'),
  directives: [TopTitle,Siderbar,PageContent,router.RouterOutlet,router.RouterLink],
//   template: `
//     <nav>
//     <ul>
//         <li><a [router-link]="['/start']">Start</a></li>
//       </ul>
//     </nav>
//     <main>
// <router-outlet></router-outlet>
//     </main>
//   `
})

@router.RouteConfig([
  {path:'', component: Dashboard},
  { path: '#/start', component: Start, as:'start' }
])

class Application {

}

export = Application;
