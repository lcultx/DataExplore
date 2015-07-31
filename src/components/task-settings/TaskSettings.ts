

import angular2 =require('angular2/angular2');
import ng2Helper = require('../ng2-library/ng2Helper');


@angular2.Component({
  selector: 'task-settings'
})

@angular2.View({
  templateUrl: ng2Helper.getTemplateUrlByComponentName('task-settings'),
  directives: []
})

class TaskSettings {
    constructor(){

      console.log('settings');

    }
}

export = TaskSettings;
