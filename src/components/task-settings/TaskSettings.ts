

import angular2 =require('angular2/angular2');
import ng2Helper = require('../ng2-library/ng2Helper');

@angular2.Component({
  selector: 'task-settings',
  properties: ['ngModel']
})

@angular2.View({
  templateUrl: ng2Helper.getTemplateUrlByComponentName('task-settings'),
  directives: [angular2.formDirectives]
})

class TaskSettings {

    taskName = 'abc';

    taskList:Array<any> = [];

    task:any = {name:1} ;
    username:any;
    model = {
      email:'1771919544@qq.com'
    }

    constructor(){

      console.log('settings');


    }

    addTask(){
      console.log('add Task');
      console.log(this.task);
      console.log("Submitting:");
      console.log(this.model);
      this.closeModal();
    }

    closeModal(){
      var modalManager = $("body").data("modalmanager");
      var openModals = modalManager.getOpenModals();
      var m = openModals[0];
      m.destroy();
    }


}

export = TaskSettings;
