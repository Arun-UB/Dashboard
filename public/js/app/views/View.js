
// define(["jquery", "backbone","underscore","knockout","knockback", "models/Record","collections/Records", "text!templates/dashboard.html"],

//     function($, Backbone, _,ko,kb,Record,Records, dashboard){

//         var View = Backbone.View.extend({


//             // The DOM Element associated with this view
//             el: ".dashboard",

//             // View constructor
//             initialize: function() {
//              var self = this;
//              _.bindAll(this);
//                // this.template = _.template(dashboard, {});
//                this.collection.on('reset', this.render, this);
//                this.collection.fetch().done(function(){
//                   self.render();
//               });

//            },

//             // View Event Handlers
//             events: {

//             },

//             // Renders the view's template to the UI
//             render: function() {
//                 // Setting the view's template property using the Underscore template method
//                 this.template = _.template(dashboard, {});
//                 this.$el.html(this.template);

//                 var records_view_model = {
//                  records : kb.collectionObservable(this.collection, { records_view_model: kb.ViewModel })

//              };

//                var records_filter = {
//                 current_key : ko.observable()
//             };
//             var records_view_model = {
//                 table: records_view_model,
//                 filter:records_filter
//             };
//             ko.applyBindings(records_view_model);
//             records_filter.current_key.subscribe(function(newValue) {
//            });

            
//             return this;


//         }

//     });

//         return View;

//     }

//     );