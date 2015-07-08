
/// <reference path="../../typings/angular2/angular2.d.ts"/>

import angular2 = require('angular2/angular2');
//因为issue1831 parent无法直接注入到子类，但可以通过辅助方法由viewContrainer取出
//https://github.com/angular/angular/issues/1831
export function getParentFromViewContainer(viewContainer:angular2.ViewContainerRef):any{
  return (<any>viewContainer.element.parentView)._view.context;
}

export function getTemplateUrlByComponentName(componentName){
  return 'src/components/' + componentName + '/' + componentName  + '.html';
}
