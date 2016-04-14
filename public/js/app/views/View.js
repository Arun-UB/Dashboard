
define(["jquery", "backbone","underscore","knockout","knockback", "models/Record","collections/Records", "text!templates/dashboard.html"],

    function($, Backbone, _,ko,kb,Record,Records, dashboard){

        var View = Backbone.View.extend({


            // The DOM Element associated with this view
            el: ".dashboard",

            // View constructor
            initialize: function() {
               var self = this;
               _.bindAll(this);
               // this.template = _.template(dashboard, {});
               this.collection.on('reset', this.render, this);
               this.collection.fetch().done(function(){
                  self.render();
              });

           },

            // View Event Handlers
            events: {

            },

            // Renders the view's template to the UI
            render: function() {
                // Setting the view's template property using the Underscore template method
                this.template = _.template(dashboard, {});
                this.$el.html(this.template);

                var view_model = {
                   records: kb.collectionObservable(this.collection, { view_model: kb.ViewModel })
               };

               function fake_data(length, seconds) {
                var d = new Date();
                var v = 100000;
                var data=[];

                for (var i = 0; i < length; i++) {
                    v += (Math.random() - 0.5) * 10000;
                    data.push({date: MG.clone(d), value: v});
                    d = new Date(d.getTime() + seconds * 1000);
                }
                return data;
            }

            ko.applyBindings(view_model, $('#records-table')[0]);
            var less_than_a_minute = fake_data(25, 1);
            MG.data_graphic({
                title: "Total Bytes(kb)",
                        data: less_than_a_minute,
                        width: 500,
                        height: 200,
                        right: 40,
                        target: '#sum_bytes',
                        legend: ['Bytes(kb)'],
                        legend_target: '.legend'
                    });
            MG.data_graphic({
                title: "Total Packets",
                        data: less_than_a_minute,
                        width: 500,
                        height: 200,
                        right: 40,
                        target: '#sum_packets',
                        legend: ['Packets'],
                        legend_target: '.legend'
                    });


            return this;


        }

    });

        return View;

    }

    );