import {FrameworkConfiguration} from "aurelia-framework";

export * from "./base-widget";
export * from "./widget.decorator";
export * from "./widget-instance";
export * from "./widget-position-sort.value-converter";
export * from "./widget-set";
export * from "./widget.manager";
export * from "./widget.models";

export function configure(config: FrameworkConfiguration) {
  config.globalResources(["./widget-instance","./widget-position-sort.value-converter", "./widget-set"]);
}



