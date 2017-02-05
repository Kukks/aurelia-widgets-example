var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('aurelia-widgets/base-widget',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    var BaseWidget = (function (_super) {
        __extends(BaseWidget, _super);
        function BaseWidget() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BaseWidget.prototype.activate = function (configuration) {
            if (configuration) {
                this.configuration = configuration;
            }
        };
        return BaseWidget;
    }(Object));
    BaseWidget = __decorate([
        aurelia_framework_1.autoinject
    ], BaseWidget);
    exports.BaseWidget = BaseWidget;
});

define('aurelia-widgets/widget.models',["require", "exports"], function (require, exports) {
    "use strict";
});

define('app',["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App() {
            this.message = 'Hello World!';
            this.instance = {
                widgetName: "iframe"
            };
            this.instances = [
                {
                    widgetName: "iframe"
                },
                {
                    widgetName: "iframe",
                    configuration: {
                        address: "http://www.timesofmalta.com/"
                    },
                },
                {
                    widgetName: "iframe",
                    configuration: {
                        address: "http://www.maltatoday.com.mt/"
                    }
                },
                {
                    widgetName: "iframe",
                    configuration: {
                        address: "https://gist.run"
                    }
                }
            ];
        }
        return App;
    }());
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", "./environment"], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('aurelia-widgets')
            .feature('test-widgets');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('aurelia-widgets/index',["require", "exports", "./base-widget", "./widget.decorator", "./widget-instance", "./widget-position-sort.value-converter", "./widget-set", "./widget.manager"], function (require, exports, base_widget_1, widget_decorator_1, widget_instance_1, widget_position_sort_value_converter_1, widget_set_1, widget_manager_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(base_widget_1);
    __export(widget_decorator_1);
    __export(widget_instance_1);
    __export(widget_position_sort_value_converter_1);
    __export(widget_set_1);
    __export(widget_manager_1);
    function configure(config) {
        config.globalResources(["./widget-instance", "./widget-position-sort.value-converter", "./widget-set"]);
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-widgets/widget-instance',["require", "exports", "aurelia-framework", "./index"], function (require, exports, aurelia_framework_1, index_1) {
    "use strict";
    var WidgetInstance = (function () {
        function WidgetInstance(widgetManager) {
            this.widgetManager = widgetManager;
        }
        WidgetInstance.prototype.instanceChanged = function (newValue, oldValue) {
            if (!oldValue || (newValue && newValue.widgetName !== oldValue.widgetName)) {
                this.handleViewModel(newValue);
            }
            else if (oldValue && newValue.widgetName === oldValue.widgetName && newValue.configuration != oldValue.configuration) {
                this.getConfiguration(newValue);
            }
        };
        WidgetInstance.prototype.bind = function (bindingContext, overrideContext) {
            if (bindingContext.instance) {
                this.handleViewModel(bindingContext.instance);
            }
        };
        WidgetInstance.prototype.handleViewModel = function (wi) {
            this.getConfiguration(wi);
            this.elementPath = this.widgetManager.getRegisteredWidget(wi.widgetName).element;
        };
        WidgetInstance.prototype.getConfiguration = function (wi) {
            this.configuration = this.widgetManager.getWidgetConfiguration(wi.widgetName, wi.configuration);
        };
        return WidgetInstance;
    }());
    WidgetInstance = __decorate([
        aurelia_framework_1.autoinject,
        aurelia_framework_1.containerless,
        __metadata("design:paramtypes", [index_1.WidgetManager])
    ], WidgetInstance);
    exports.WidgetInstance = WidgetInstance;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('test-widgets/iframe.models',["require", "exports"], function (require, exports) {
    "use strict";
});

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('test-widgets/iframe-widget',["require", "exports", "aurelia-framework", "../aurelia-widgets/base-widget", "../aurelia-widgets/widget.decorator"], function (require, exports, aurelia_framework_1, base_widget_1, widget_decorator_1) {
    "use strict";
    var IframeWidget = (function (_super) {
        __extends(IframeWidget, _super);
        function IframeWidget() {
            return _super.call(this) || this;
        }
        IframeWidget.prototype.activate = function (model) {
            _super.prototype.activate.call(this, model);
        };
        return IframeWidget;
    }(base_widget_1.BaseWidget));
    IframeWidget = __decorate([
        widget_decorator_1.widget("iframe", true, { address: "http://gozo.com" }, "../test-widgets/iframe-widget"),
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.bindable("configuration"),
        aurelia_framework_1.useView("./iframe-widget.html"),
        __metadata("design:paramtypes", [])
    ], IframeWidget);
    exports.IframeWidget = IframeWidget;
});

define('test-widgets/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
        config.globalResources(["./iframe-widget"]);
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-widgets/widget-set',["require", "exports", "aurelia-framework", "./index"], function (require, exports, aurelia_framework_1, index_1) {
    "use strict";
    var WidgetSet = (function () {
        function WidgetSet(widgetManager) {
            this.widgetManager = widgetManager;
        }
        WidgetSet.prototype.bind = function () {
            console.log("bind widget");
        };
        return WidgetSet;
    }());
    WidgetSet = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [index_1.WidgetManager])
    ], WidgetSet);
    exports.WidgetSet = WidgetSet;
});

define('aurelia-widgets/widget-position-sort.value-converter',["require", "exports"], function (require, exports) {
    "use strict";
    var WidgetPositionSortValueConverter = (function () {
        function WidgetPositionSortValueConverter() {
        }
        WidgetPositionSortValueConverter.prototype.toView = function (array) {
            return array.sort(function (a, b) {
                if ((!a && b) || (!a.position && b.position)) {
                    return -1;
                }
                if ((a && !b) || (a.position && !b.position)) {
                    return 1;
                }
                if (a.position.y < b.position.y) {
                    return -1;
                }
                if (a.position.y > b.position.y) {
                    return 1;
                }
                if (a.position.y === b.position.y) {
                    if (a.position.x < b.position.x) {
                        return -1;
                    }
                    if (a.position.x > b.position.x) {
                        return 1;
                    }
                    if (a.position.x === b.position.x) {
                        return 0;
                    }
                }
            });
        };
        return WidgetPositionSortValueConverter;
    }());
    exports.WidgetPositionSortValueConverter = WidgetPositionSortValueConverter;
});

define('aurelia-widgets/widget.decorator',["require", "exports", "./index"], function (require, exports, index_1) {
    "use strict";
    function widget(name, configurable, preConfiguration, element, movable, resizable) {
        if (movable === void 0) { movable = true; }
        if (resizable === void 0) { resizable = true; }
        return function (target) {
            if (target) {
                index_1.WidgetManager.registerWidget({
                    name: name,
                    widget: target,
                    configurable: configurable,
                    preConfiguration: preConfiguration,
                    movable: movable,
                    resizable: resizable,
                    element: element
                });
            }
            return target;
        };
    }
    exports.widget = widget;
});

define('aurelia-widgets/widget.manager',["require", "exports"], function (require, exports) {
    "use strict";
    var WidgetManager = (function () {
        function WidgetManager() {
        }
        WidgetManager.registerWidget = function (widgetConfig) {
            this.registeredWidgets.push(widgetConfig);
        };
        WidgetManager.prototype.getWidgetInitializer = function (widgetName) {
            var registeredModule = this.getRegisteredWidget(widgetName);
            if (registeredModule) {
                if (typeof registeredModule.widget === "string") {
                    return this.getWidgetInitializer(registeredModule.widget);
                }
                else {
                    return registeredModule.widget;
                }
            }
            return null;
        };
        WidgetManager.prototype.getWidgetConfiguration = function (widgetName, configuration) {
            if (configuration === void 0) { configuration = {}; }
            var registeredModule = this.getRegisteredWidget(widgetName);
            if (registeredModule) {
                if (typeof registeredModule.widget === "string") {
                    var childConfiguration = this.getWidgetConfiguration(registeredModule.widget);
                    if (childConfiguration) {
                        return Object.assign({}, childConfiguration, configuration);
                    }
                    else {
                        return configuration;
                    }
                }
                else if (registeredModule.preConfiguration) {
                    return Object.assign({}, registeredModule.preConfiguration, configuration);
                }
                else {
                    return configuration;
                }
            }
            return null;
        };
        WidgetManager.prototype.getRegisteredWidget = function (name) {
            var filterResults = WidgetManager.registeredWidgets.filter(function (registeredWidget) { return registeredWidget.name === name; });
            if (filterResults && filterResults.length > 0) {
                return filterResults[0];
            }
            return null;
        };
        return WidgetManager;
    }());
    WidgetManager.registeredWidgets = [];
    exports.WidgetManager = WidgetManager;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <h1>${message}</h1>\n\n\n  <iframe-widget configuration.bind=\"{address: 'http://test.com'}\"></iframe-widget>\n\n  <widget-instance instance.bind=\"instance\"></widget-instance>\n\n  ${set.length}\n  <widget-set instances.one-way=\"instances\"></widget-set>\n\n\n  <hr/>\n\n  <widget-instance repeat.for=\"instance of instances\" instance.bind=\"instance\"></widget-instance>\n</template>\n"; });
define('text!aurelia-widgets/widget-instance.html', ['module'], function(module) { module.exports = "<template>\n  <compose if.bind=\"elementPath\"\n           view-model=\"${elementPath}\"\n           view=\"${elementPath + '.html'}\"\n           model.bind=\"configuration\"\n            containerless></compose>\n</template>\n"; });
define('text!test-widgets/iframe-widget.html', ['module'], function(module) { module.exports = "<template>\n  iframe widget\n  <iframe if.bind=\"configuration.address\" src.bind=\"configuration.address\"></iframe>\n</template>\n"; });
define('text!aurelia-widgets/widget-set.html', ['module'], function(module) { module.exports = "<template>\n  Widget set ${instances.length}\n<widget-instance repeat.for=\"instance of instances\" instance.bind=\"instance\"></widget-instance>\n\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map