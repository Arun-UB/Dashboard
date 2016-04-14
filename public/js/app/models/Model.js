// Model.js
// --------
define(["jquery", "backbone"],

    function($, Backbone) {

        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({
            defaults:{
                "timestamp": null,
                "destination_ip": null,
                "destination_vn": null,
                "direction_ingress": null ,
                "destination_port": null,
                "protocol": null,
                "source_ip": null,
                "source_vn": null,
                "source_port": null,
                "sum_bytes_kb": null,
                "sum_packets": null

            }

        });

        // Returns the Model class
        return Model;

    }

    );
