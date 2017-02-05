import {autoinject, bindable, useView} from "aurelia-framework";
import {BaseWidget} from "../aurelia-widgets/base-widget";
import {IFrameWidgetConfiguration} from "./iframe.models";
import {widget} from "../aurelia-widgets/widget.decorator";

@widget<IFrameWidgetConfiguration,IframeWidget>("iframe", true, {address: "http://gozo.com"}, "../test-widgets/iframe-widget")
@autoinject()
@bindable("configuration")
@useView("./iframe-widget.html")
export class IframeWidget extends BaseWidget<IFrameWidgetConfiguration> {
  constructor() {
    super();
  }

  public activate(model: IFrameWidgetConfiguration){
    super.activate(model);
  }
}
