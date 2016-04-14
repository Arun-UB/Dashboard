define(["jquery","backbone","underscore","knockout","knockback","models/Record"],

	function($, Backbone,_,ko,kb, Record) {

		var Records = Backbone.Collection.extend({

			model: Record,
			url:'/records/all',
			parse : function(response) {
				return response.data;
			},
			graph_data:function (key) {
				var timestamp = this.pluck("timestamp");
				var keys = this.pluck(key);
				var t_key = [];
				for (var i = 0; i < timestamp.length; i++) {
					t_key.push({date:timestamp[i],value:keys[i]});
				}
				return JSON.stringify(t_key);
			}

		});
		
		return Records;

	}

	);