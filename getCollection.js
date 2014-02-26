define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var getModel = require('getModel');

	var getCollection = function(models, options, CollectionToUse) {
		if (options === null) options = {};

		var Collection = CollectionToUse.extend({
			_prepareModel: function(attrs, options) {
				var model;
				if (typeof attrs.execute === 'function') {
					if (!attrs.collection) attrs.collection = this;
					return attrs;
				} else if (attrs instanceof Backbone.Model) {
					if (!attrs.collection) attrs.collection = this;
					model = getModel(attrs);
					return model;
				}
				options = options ? _.clone(options) : {};
				options.collection = this;
				model = getModel(attrs, options, this.model);
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