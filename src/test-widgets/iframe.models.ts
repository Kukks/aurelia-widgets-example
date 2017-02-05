import {IWidgetConfiguration} from "../aurelia-widgets/widget.models";

export interface IFrameWidgetConfiguration extends IWidgetConfiguration {
  address: string;
  sandbox?: string[];
}
