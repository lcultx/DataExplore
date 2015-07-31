
import angular2 =require('angular2/angular2');
import ng2Helper = require('../ng2-library/ng2Helper');

import TaskSettings = require('../task-settings/TaskSettings');

@angular2.Component({
  selector: 'settings'
})

@angular2.View({
  templateUrl: ng2Helper.getTemplateUrlByComponentPath('settings/settings'),
  directives: [TaskSettings]
})

class Settings {
    constructor(){

      console.log('settings');

    }
}

export = Settings;
