import {IRegisteredWidget, AureliaWidgetInitializer, IWidgetConfiguration} from "./widget.models";
export class WidgetManager {

  private static registeredWidgets: IRegisteredWidget[] = [];

  public static registerWidget(widgetConfig: IRegisteredWidget): void {
    this.registeredWidgets.push(widgetConfig);
  }

  public getWidgetInitializer(widgetName: string): AureliaWidgetInitializer {
    const registeredModule = this.getRegisteredWidget(widgetName);
    if (registeredModule) {
      if (typeof registeredModule.widget === "string") {
        return this.getWidgetInitializer(registeredModule.widget);
      } else {
        return registeredModule.widget;
      }
    }
    return null;
  }

  public getWidgetConfiguration(widgetName: string, configuration: IWidgetConfiguration = {}): IWidgetConfiguration {
    const registeredModule = this.getRegisteredWidget(widgetName);
    if (registeredModule) {

      if (typeof registeredModule.widget === "string") {
        const childConfiguration = this.getWidgetConfiguration(registeredModule.widget);
        if (childConfiguration) {
          return Object.assign({}, childConfiguration, configuration);
        } else {
          return configuration;
        }
      } else if (registeredModule.preConfiguration) {
        return Object.assign({}, registeredModule.preConfiguration, configuration);
      } else {
        return configuration;
      }
    }
    return null;
  }


  public getRegisteredWidget(name: string): IRegisteredWidget {
    const filterResults = WidgetManager.registeredWidgets.filter((registeredWidget: IRegisteredWidget) => registeredWidget.name === name);
    if (filterResults && filterResults.length > 0) {
      return filterResults[0];
    }
    return null;
  }
}
