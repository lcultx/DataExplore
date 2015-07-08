/// <reference path="../../../typings/jquery/jquery.d.ts"/>

import {ElementRef, Component, Directive, View, Injectable, Renderer,Parent} from 'angular2/angular2';
import ng2Helper = require('../../library/ng2Helper');

@Component({
  selector: 'application'
})

@View({
  templateUrl: ng2Helper.getTemplateUrlByComponentName('application'),
})

class Application {

  public world:any = {};

  constructor(){
    console.log(parent);
    $.get('/api/outlet',(outlet)=>{
      this.world.outlet = outlet;
    });
  }

}

export = Application;
 
