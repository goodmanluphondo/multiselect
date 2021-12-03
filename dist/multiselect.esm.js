//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
    data: function data() {
        return {
            displayListbox: false,
            selectedOptions: {},
        }
    },
    mounted: function mounted() {
        this.getStarted();
    },
    props: {
        options: Object,
        optionIndex: String,
        optionLabel: String,
        modelValue: {},
    },
    emits: ['update:modelValue'],
    methods: {
        getStarted: function getStarted() {
            var self = this;
            document.addEventListener('click', function() {
                self.hideListbox();
            });
            this.$refs.multiSelect.addEventListener('click', function(e) {
                e.stopPropagation();
                return false;
            });
        },
        showListbox: function showListbox() {
            this.displayListbox = true;
        },
        hideListbox: function hideListbox() {
            this.displayListbox = false;
        },
        selectOption: function selectOption(selectedOption) {
            if(typeof this.selectedOptions[selectedOption[("" + (this.optionIndex))]] !== 'undefined') {
                this.removeOption(selectedOption[("" + (this.optionIndex))]);
            } else {
                this.selectedOptions[selectedOption[("" + (this.optionIndex))]] = selectedOption[("" + (this.optionLabel))];
            }
            this.$emit('update:modelValue', this.selectedOptions);
            this.hideListbox();
        },
        removeOption: function removeOption(selectedOption) {
            console.log('suppose to remove option');
            delete this.selectedOptions[selectedOption];
        },
    },
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "container" }, [
    _c("div", { ref: "multiSelect", staticClass: "multi-select" }, [
      _c(
        "div",
        { staticClass: "selected-options" },
        _vm._l(_vm.selectedOptions, function (selectedOption, key, index) {
          return _c(
            "div",
            { key: index, staticClass: "selected-options--option" },
            [
              _c(
                "button",
                {
                  staticClass: "selected-options--option--button",
                  attrs: { type: "button" },
                  on: {
                    click: function ($event) {
                      $event.preventDefault();
                      return _vm.removeOption(key)
                    },
                  },
                },
                [
                  _c(
                    "svg",
                    {
                      staticClass: "icon",
                      attrs: {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                      },
                    },
                    [
                      _c("path", {
                        attrs: {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "1",
                          d: "M6 18L18 6M6 6l12 12",
                        },
                      }) ]
                  ) ]
              ),
              _vm._v(" "),
              _c("span", { domProps: { innerHTML: _vm._s(selectedOption) } }) ]
          )
        }),
        0
      ),
      _vm._v(" "),
      _c("input", {
        staticClass: "input-control",
        attrs: { type: "text" },
        on: { focus: _vm.showListbox },
      }),
      _vm._v(" "),
      _c("div", { staticClass: "container" }, [
        _vm.displayListbox
          ? _c(
              "div",
              { staticClass: "listbox" },
              _vm._l(_vm.options, function (currentOption, index) {
                return _c(
                  "div",
                  {
                    key: index,
                    class: _vm.selectedOptions[
                      currentOption["" + _vm.optionIndex]
                    ]
                      ? "listbox--item--selected"
                      : "listbox--item",
                    on: {
                      click: function ($event) {
                        return _vm.selectOption(currentOption)
                      },
                    },
                  },
                  [
                    _c("input", {
                      staticClass: "hidden",
                      attrs: { type: "checkbox" },
                      domProps: {
                        checked:
                          _vm.selectedOptions[
                            currentOption["" + _vm.optionIndex]
                          ],
                      },
                    }),
                    _vm._v(" "),
                    _c("span", [
                      _vm._v(_vm._s(currentOption["" + _vm.optionLabel])) ]) ]
                )
              }),
              0
            )
          : _vm._e() ]) ]) ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-5014f2ba_0", { source: "\n*,\n*::before,\n*::after {\n    border: 0;\n    margin: 0;\n    padding: 0;\n    outline: none;\n    box-sizing: border-box;\n}\nhtml, body {\n    padding: 10px;\n}\n.container {\n    width: 100%;\n    position: relative;\n}\n.multi-select {\n    width: 100%;\n    border: solid rgb(235, 236, 240) 1px;\n    border-radius: 4px;\n    position: relative;\n}\n.multi-select .input-control {\n    width: 100%;\n    padding: 8px 12px;\n    border: 0;\n}\n.selected-options {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n}\n.selected-options--option {\n    margin: 4px;\n    padding: 8px 12px;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    border-radius: 4px;\n    color: rgb(75, 85, 99);\n    background-color: rgb(229, 231, 235);\n}\n.selected-options--option--button {\n    color: rgb(243, 244, 246);\n    background-color: rgb(156, 163, 175);\n}\n.selected-options--option--button .icon {\n    width: 16px;\n    height: 16px;\n}\n.hidden {\n    display: none;\n}\n.listbox {\n    height: 240px;\n    z-index: 9999;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    border: solid rgb(156, 163, 175) 1px;\n    overflow-y: auto;\n    background-color: rgb(255, 255, 255);\n}\n.listbox--item {\n    cursor: pointer;\n    padding: 8px 16px;\n}\n.listbox--item--selected {\n    cursor: pointer;\n    padding: 8px 16px;\n    color: rgb(156, 163, 175);\n    background-color: rgb(235, 236, 240);\n}\n.listbox--item:hover {\n    color: rgb(255, 255, 255);\n    background-color: rgb(156, 163, 175);\n}\n", map: {"version":3,"sources":["/Users/goodman/Packages/multiselect/src/MultiSelect.vue"],"names":[],"mappings":";AA+EA;;;IAGA,SAAA;IACA,SAAA;IACA,UAAA;IACA,aAAA;IACA,sBAAA;AACA;AAEA;IACA,aAAA;AACA;AAEA;IACA,WAAA;IACA,kBAAA;AACA;AAEA;IACA,WAAA;IACA,oCAAA;IACA,kBAAA;IACA,kBAAA;AACA;AAEA;IACA,WAAA;IACA,iBAAA;IACA,SAAA;AACA;AAEA;IACA,aAAA;IACA,eAAA;IACA,mBAAA;AACA;AAEA;IACA,WAAA;IACA,iBAAA;IACA,aAAA;IACA,mBAAA;IACA,8BAAA;IACA,kBAAA;IACA,sBAAA;IACA,oCAAA;AACA;AAEA;IACA,yBAAA;IACA,oCAAA;AACA;AAEA;IACA,WAAA;IACA,YAAA;AACA;AAEA;IACA,aAAA;AACA;AAEA;IACA,aAAA;IACA,aAAA;IACA,kBAAA;IACA,MAAA;IACA,OAAA;IACA,QAAA;IACA,oCAAA;IACA,gBAAA;IACA,oCAAA;AACA;AAEA;IACA,eAAA;IACA,iBAAA;AACA;AAEA;IACA,eAAA;IACA,iBAAA;IACA,yBAAA;IACA,oCAAA;AACA;AACA;IACA,yBAAA;IACA,oCAAA;AACA","file":"MultiSelect.vue","sourcesContent":["<template>\n    <div class=\"container\">\n        <div class=\"multi-select\" ref=\"multiSelect\">\n            <div class=\"selected-options\">\n                <div v-for=\"(selectedOption, key, index) in selectedOptions\" :key=\"index\" class=\"selected-options--option\">\n                    <button type=\"button\" class=\"selected-options--option--button\" @click.prevent=\"removeOption(key)\">\n                        <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n                            <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\" d=\"M6 18L18 6M6 6l12 12\" />\n                        </svg>\n                    </button>\n                    <span v-html=\"selectedOption\"></span>\n                </div>\n            </div>\n            <input type=\"text\" class=\"input-control\" @focus=\"showListbox\">\n            <div class=\"container\">\n                <div v-if=\"displayListbox\" class=\"listbox\">\n                    <div v-for=\"(currentOption, index) in options\" :key=\"index\" :class=\"selectedOptions[currentOption[`${optionIndex}`]] ? 'listbox--item--selected' : 'listbox--item'\" @click=\"selectOption(currentOption)\">\n                        <input type=\"checkbox\" :checked=\"selectedOptions[currentOption[`${optionIndex}`]]\" class=\"hidden\">\n                        <span>{{currentOption[`${optionLabel}`]}}</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</template>\n\n<script scoped>\nexport default {\n    data() {\n        return {\n            displayListbox: false,\n            selectedOptions: {},\n        }\n    },\n    mounted() {\n        this.getStarted();\n    },\n    props: {\n        options: Object,\n        optionIndex: String,\n        optionLabel: String,\n        modelValue: {},\n    },\n    emits: ['update:modelValue'],\n    methods: {\n        getStarted() {\n            var self = this;\n            document.addEventListener('click', function() {\n                self.hideListbox();\n            });\n            this.$refs.multiSelect.addEventListener('click', function(e) {\n                e.stopPropagation();\n                return false;\n            });\n        },\n        showListbox() {\n            this.displayListbox = true;\n        },\n        hideListbox() {\n            this.displayListbox = false;\n        },\n        selectOption(selectedOption) {\n            if(typeof this.selectedOptions[selectedOption[`${this.optionIndex}`]] !== 'undefined') {\n                this.removeOption(selectedOption[`${this.optionIndex}`]);\n            } else {\n                this.selectedOptions[selectedOption[`${this.optionIndex}`]] = selectedOption[`${this.optionLabel}`];\n            }\n            this.$emit('update:modelValue', this.selectedOptions);\n            this.hideListbox();\n        },\n        removeOption(selectedOption) {\n            console.log('suppose to remove option');\n            delete this.selectedOptions[selectedOption];\n        },\n    },\n}\n</script>\n\n<style>\n*,\n*::before,\n*::after {\n    border: 0;\n    margin: 0;\n    padding: 0;\n    outline: none;\n    box-sizing: border-box;\n}\n\nhtml, body {\n    padding: 10px;\n}\n\n.container {\n    width: 100%;\n    position: relative;\n}\n\n.multi-select {\n    width: 100%;\n    border: solid rgb(235, 236, 240) 1px;\n    border-radius: 4px;\n    position: relative;\n}\n\n.multi-select .input-control {\n    width: 100%;\n    padding: 8px 12px;\n    border: 0;\n}\n\n.selected-options {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n}\n\n.selected-options--option {\n    margin: 4px;\n    padding: 8px 12px;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    border-radius: 4px;\n    color: rgb(75, 85, 99);\n    background-color: rgb(229, 231, 235);\n}\n\n.selected-options--option--button {\n    color: rgb(243, 244, 246);\n    background-color: rgb(156, 163, 175);\n}\n\n.selected-options--option--button .icon {\n    width: 16px;\n    height: 16px;\n}\n\n.hidden {\n    display: none;\n}\n\n.listbox {\n    height: 240px;\n    z-index: 9999;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    border: solid rgb(156, 163, 175) 1px;\n    overflow-y: auto;\n    background-color: rgb(255, 255, 255);\n}\n\n.listbox--item {\n    cursor: pointer;\n    padding: 8px 16px;\n}\n\n.listbox--item--selected {\n    cursor: pointer;\n    padding: 8px 16px;\n    color: rgb(156, 163, 175);\n    background-color: rgb(235, 236, 240);\n}\n.listbox--item:hover {\n    color: rgb(255, 255, 255);\n    background-color: rgb(156, 163, 175);\n}\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

function install(Vue) {
    if(install.installed) { return; }
    install.installed = true;
    Vue.component('MultiSelect', __vue_component__);
}

var plugin = {
    install: install,
};

var GlobalVue = null;
if(typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if(typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}

if(GlobalVue) {
    GlobalVue.use(plugin);
}

export default __vue_component__;
export { install };
