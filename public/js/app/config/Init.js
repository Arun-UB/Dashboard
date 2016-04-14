//
// Init.js
// --------------
require.config({

  // Sets the js folder as the base directory for all future relative paths
  baseUrl: "./js",

  paths: {

      // Core Libraries
      // --------------
      "jquery": "libs/jquery",

      "underscore": "libs/lodash",
      "knockout": "libs/knockout-min",
      "backbone": "libs/backbone",
      "knockback": "libs/knockback-core.min",

      // Plugins
      // -------
      "backbone.validateAll": "libs/plugins/Backbone.validateAll",

      "text": "libs/plugins/text",

      // Application Folders
      // -------------------
      "collections": "app/collections",

      "models": "app/models",

      "routers": "app/routers",

      "templates": "app/templates",

      "views": "app/views",
      "bootstrap":"libs/plugins/bootstrap.min",
      "d3":"libs/d3.min",
      "metricsgraphics":"libs/plugins/metricsgraphics.min",
      "backgrid":"libs/plugins/backgrid",
      "datatables.net":"libs/plugins/datatables.min"

    },

  // Sets the configuration for your third party scripts that are not AMD compatible
  shim: {

      // jQueryUI
      "jqueryui": ["jquery"],
       // Twitter Bootstrap jQuery plugins
       "bootstrap":["jquery"],
       "metricsgraphics":{
        "deps":["jquery","d3"],
        "exports":"MG"},
        "d3":{"exports":"d3"},
        "daterangepicker":{
          "deps":["jquery"],
          "exports": "daterangepicker"
        },

      // Backbone
      "backbone": {

        // Depends on underscore/lodash and jQuery
        "deps": ["underscore", "jquery"],

        // Exports the global window.Backbone object
        "exports": "Backbone"

      },
       // Backbone
      "backgrid": {

        // Depends on underscore/lodash and jQuery
        "deps": ["underscore", "jquery","backbone"],

        // Exports the global window.Backbone object
        "exports": "Backgrid"

      },

      // Backbone.validateAll plugin that depends on Backbone
      "backbone.validateAll": ["backbone"]

    }

  });

require(["jquery", "backbone","knockout", "knockback","routers/Router", "backbone.validateAll","bootstrap","d3","metricsgraphics","datatables.net"],

  function($, Backbone,ko,kb,Router) {
    new Router();

  }

  );