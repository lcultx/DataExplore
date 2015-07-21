/// <reference path="../../../typings/angular2/angular2.d.ts"/>
/// <reference path="../../../typings/jquery/jquery.d.ts"/>
/// <reference path="../shower/interfaces.d.ts"/>

import {Component, Directive, View, Parent} from 'angular2/angular2';
import ng2Helper = require('../../library/ng2Helper');
import TopTitle = require('../top-title/TopTitle');
import Siderbar = require('../siderbar/Siderbar');
import PageContent = require('../page-content/PageContent');

@Component({
  selector: 'application'
})

@View({
  templateUrl: ng2Helper.getTemplateUrlByComponentName('application'),
  directives: [TopTitle,Siderbar,PageContent]
})

class Application {

}

export = Application;
