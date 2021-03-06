// DesktopRouter.js
// ----------------
define(["jquery", "backbone", "underscore", "knockout", "knockback", "models/Record", "views/View", "collections/Records"],

    function($, Backbone, _, ko, kb, Record, View, Records) {

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
                // Initializing select2
                var self = this;
                var $record_keys = $('.record-keys').select2({
                    placeholder: "Select a column",
                });
                var $record_values = $(".record-values").select2({
                    maximumSelectionLength: 2
                });
                //Creating Records collection and fetching the data for the first time  
                var records = new Records();
                records.fetch({success: function (collection, response, options) {
                             self.renderGraph(collection);  
                            }});
               
          
                //View models for the grid and the search interface

                var records_table = {
                    records: kb.collectionObservable(records, {
                        records_table: kb.ViewModel
                    })

                };

                var records_filter = {
                    current_key: ko.observable(),
                    values: ko.observableArray([]),
                    current_va: ko.observableArray(),
                    search_records: function() {
                        var data = {};
                        data[records_filter.current_key()] = records_filter.current_va();
                        records.url = "/records/search";
                        records.fetch({
                            data: data,
                            processData: true,
                            success:function(collection,response){
                                self.renderGraph(collection);
                            }
                        });
                    },
                    reset_records: function() {
                        records_filter.current_key(null);
                        records_filter.values([]);                        
                        records.fetch({success:function(collection,response){
                                                        self.renderGraph(collection);
                                                    }});
                    }
                }
                var records_view_model = {
                    table: records_table,
                    filter: records_filter
                };
                ko.applyBindings(records_view_model);
                records_filter.current_key.subscribe(function(key) {
                    $.ajax({
                        url: "records/keys/" + key
                    }).then(function(result) {
                        records_filter.values.removeAll();
                        _.each(result.data, function(v) {
                            records_filter.values.push({
                                'name': v,
                                'value': v
                            });
                        });
                    });
                });
                records_filter.current_va.subscribe(function(values) {});

            },
            renderGraph:function(data){
                var preparedata = function(key){
                                var timestamp = data.pluck("timestamp");
                                var keys = data.pluck(key);
                                var t_key = [];
                                for (var i = 0; i < timestamp.length; i++) {
                                    t_key.push({date:new Date(timestamp[i]*1000),value:keys[i]});
                                }
                                return t_key;
                            }

                 MG.data_graphic({
                                    title: "Total Bytes(kb)",
                                    data: preparedata('sum_bytes_kb'),
                                    width: 500,
                                    height: 200,
                                    right: 40,
                                    target: '#sum_bytes',
                                    legend: ['Bytes(kb)'],
                                    legend_target: '.legend'
                                });

                                MG.data_graphic({
                                    title: "Total Packets",
                                    data: preparedata('sum_packets'),
                                    width: 500,
                                    height: 200,
                                    right: 40,
                                    target: '#sum_packets',
                                    legend: ['Packets'],
                                    legend_target: '.legend'
                                });
            }

        });

return Router;

}

);