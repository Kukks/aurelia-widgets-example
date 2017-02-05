import {IWidgetInstance} from "./aurelia-widgets/widget.models";
import {IFrameWidgetConfiguration} from "./test-widgets/iframe.models";
export class App {
  message = 'Hello World!';

  public instance: IWidgetInstance = {
    widgetName: "iframe"
  };

  public instances: IWidgetInstance[] = [
    {
      widgetName: "iframe"
    },
    {
      widgetName:"iframe",
      configuration: <IFrameWidgetConfiguration>{
        address: "http://www.timesofmalta.com/"
      },

    },
    {
      widgetName:"iframe",
      configuration: <IFrameWidgetConfiguration>{
        address: "http://www.maltatoday.com.mt/"
      }
    },
    {
      widgetName:"iframe",
      configuration: <IFrameWidgetConfiguration>{
        address: "https://gist.run"
      }
    }];
}
