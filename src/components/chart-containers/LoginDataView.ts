import {Component, Directive, View, Parent} from 'angular2/angular2';
import ng2Helper = require('../ng2-library/ng2Helper');

@Component({
  selector: 'login-data-view'
})

@View({
  templateUrl: ng2Helper.getTemplateUrlByComponentPath('chart-containers/login-data-view'),
  directives: []
})

class LoginDataView {

}

export = LoginDataView;
