import {autoinject} from "aurelia-framework";
import {WidgetManager} from "./index";
import {WidgetInstance} from "./widget-instance";

@autoinject
export class WidgetSet {
  public instances:WidgetInstance[];

  constructor(private widgetManager: WidgetManager) {
  }

  public bind(){
    console.log("bind widget");
  }
}
