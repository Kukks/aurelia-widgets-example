import {autoinject} from "aurelia-dependency-injection";
import {IWidgetConfiguration} from "./widget.models";

@autoinject
export abstract class BaseWidget<T extends IWidgetConfiguration> extends Object {
  public configuration: T;

  public activate(configuration: T) {
    if (configuration) {
      this.configuration = configuration;
    }
  }
}
