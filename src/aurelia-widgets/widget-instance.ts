import {autoinject, containerless} from "aurelia-framework";
import {IWidgetInstance, IWidgetConfiguration} from "./widget.models";
import {BaseWidget} from "./base-widget";
import {WidgetManager} from "./index";
@autoinject
@containerless
export class WidgetInstance {
  public instance: IWidgetInstance;
  public configuration: IWidgetConfiguration;
  public viewModel: BaseWidget<IWidgetConfiguration>;
  public elementPath: string;

  constructor(private widgetManager: WidgetManager) {
  }

  public instanceChanged(newValue: IWidgetInstance, oldValue: IWidgetInstance) {
    if (!oldValue || (newValue && newValue.widgetName !== oldValue.widgetName)) {
      this.handleViewModel(newValue);
    }else if(oldValue && newValue.widgetName === oldValue.widgetName && newValue.configuration != oldValue.configuration){
      this.getConfiguration(newValue);
    }
  }

  public bind(bindingContext: WidgetInstance, overrideContext?: Object) {
    if(bindingContext.instance) {
      this.handleViewModel(bindingContext.instance);
    }
  }

  private handleViewModel(wi: IWidgetInstance) {
    this.getConfiguration(wi);
    this.elementPath = this.widgetManager.getRegisteredWidget(wi.widgetName).element;
  }

  private getConfiguration(wi: IWidgetInstance){
    this.configuration = this.widgetManager.getWidgetConfiguration(wi.widgetName, wi.configuration);
  }
}
