import {BaseWidget} from "./base-widget";

export type AureliaWidgetInitializer = (...args: any[]) => BaseWidget<IWidgetConfiguration>;

export interface IRegisteredWidget {
  name: string;
  widget: AureliaWidgetInitializer | string;
  preConfiguration?: IWidgetConfiguration;
  configurable: boolean;
  movable: boolean;
  resizable: boolean;
  element: string;
}

export interface IWidgetConfiguration {
}

export interface IWidgetPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IWidgetInstance{
  widgetName: string;
  position?: IWidgetPosition;
  configuration?: IWidgetConfiguration;
}
