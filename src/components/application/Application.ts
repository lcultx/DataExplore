import {Component, Directive, View, Parent} from 'angular2/angular2';
import router = require('angular2/router');

import ng2Helper = require('../ng2-library/ng2Helper');
import TopTitle = require('../top-title/TopTitle');
import Siderbar = require('../siderbar/Siderbar');


@Component({
  selector: 'application'
})

@View({
  templateUrl: ng2Helper.getTemplateUrlByComponentName('application'),
  directives: [TopTitle,Siderbar,router.RouterOutlet]
})



class Application {

}

export = Application;
