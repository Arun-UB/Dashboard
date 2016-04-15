define(["jquery","backbone","underscore","knockout","knockback","models/Record"],

	function($, Backbone,_,ko,kb, Record) {

		var Records = Backbone.Collection.extend({

			model: Record,
			url:'/records/all',
			parse : function(response) {
				return response.data;
			}
		});
		
		return Records;

	}

	);