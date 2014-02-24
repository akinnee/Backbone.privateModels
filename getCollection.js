define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var getModel = require('getModel');

	var getCollection = function(models, options, CollectionToUse) {

		var Collection = CollectionToUse.extend({
			_prepareModel: function(attrs, options) {
				if (typeof attrs.execute === 'function') {
					if (!attrs.collection) attrs.collection = this;
					return attrs;
				}
				options = options ? _.clone(options) : {};
				options.collection = this;
				var model = new this.model(attrs, options);
				model = getModel(model);
				if (!model.validationError) return model;
				this.trigger('invalid', this, model.validationError, options);
				return false;
			}
		});

		var collection = new Collection(models, options);
		return collection;

	};

	return getCollection;
});