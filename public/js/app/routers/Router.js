// DesktopRouter.js
// ----------------
define(["jquery", "backbone", "models/Record", "views/View", "collections/Records"],

    function($, Backbone, Record, View, Records) {

        var Router = Backbone.Router.extend({

            initialize: function() {

                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();

            },

            // All of your Backbone Routes (add more)
            routes: {

                // When there is no hash on the url, the home method is called
                "": "index"

            },

            index: function() {
                var records = new Records();
                new View({collection:records});

            }

        });

        // Returns the DesktopRouter class
        return Router;

    }

);