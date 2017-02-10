import {WidgetManager} from "./index";
import {BaseWidget} from "./base-widget";
import {IWidgetConfiguration} from "./widget.models";

export function widget<Y extends IWidgetConfiguration, T extends BaseWidget<Y>>
(name: string,
 configurable: boolean,
 preConfiguration: Y,
 element: string,
 movable: boolean = true,
 resizable: boolean = true): ClassDecorator {
  return <AureliaWidgetInitializer>(target: AureliaWidgetInitializer) => {
    if (target) {
      WidgetManager.registerWidget({
        name,
        widget: <any>target,
        configurable,
        preConfiguration,
        movable,
        resizable,
        element
      });
    }

    return target;
  };
}
