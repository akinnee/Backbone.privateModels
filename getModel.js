define(function(require) {
	'use strict';

	var modelStore = require('modelStore');

	/**
	 * Returns a limited version of the model instance with the ID provided in attrs.
	 * If the model is not already in our store, it will be added.
	 * @param  {[type]} attrs    [the same attrs object you would pass when creating a model,
									OR an existing model which you want to make a private version of]
	 * @param  {[type]} options    [the same options object you would pass when creating a model]
	 * @param  {[type]} modelToUse [the model to use for creating if an instance with the ID in attrs does not exist,
	 *                              can be a function which returns the model]
	 * @return {[object]}          [a limited version of the model with the ID provided in attrs]
	 */
	var getModel = function(attrs, options, ModelToUse) {

		var model, id, modelFound;
		attrs = attrs ? attrs : {};

		/**
		 * If the model is already in our model store, or a model was passed in, we'll use it
		 */
		if (attrs instanceof Backbone.Model) {
			model = attrs;
			id = model.get('id');
		} else {
			id = attrs[ModelToUse.prototype.idAttribute];
			model = modelFound = modelStore.findByID(id);
		}

		/**
		 * If we couldn't find this model in our store, we'll add create an instance an add it
		 */
		if (!model) {
			model = new ModelToUse(attrs, options);
		}
		if (!modelFound) {
			modelStore.add(model);
		}

		/**
		 * Set up our vent object, which is returned by getModel
		 */
		if (!model.vent) {
			/**
			 * an object which contains whatever we want to expose to Backbone views
			 */
			model.vent = _.extend({
				/**
				 * a read-only clone of the attribues this model has
				 */
				attributes: _.clone(model.attributes),
				/**
				 * a list of actions that can be executed on this model
				 */
				availableActions: _.clone(model.availableActions),
				/**
				 * Similar to Marionette.commands
				 * An model level command execution system.
				 * This allows components in an application to state that some work needs to be done,
				 * but without having to be explicitly coupled to the component that is performing the work.
				 * No response is allowed from the execution of a command. It's a "fire-and-forget" scenario.
				 * @param  {[string]} action  [the name of the action to execute]
				 * @param  {[object]} options [options to pass for the action requested]
				 */
				execute: function(action, options) {
					model.trigger('action:'+action, options);
				},
				/**
				 * Any additional model properties that need to be exposed for Backbone to work
				 */
				validationError: model.validationError,
				collection: model.collection

			}, Backbone.Events);

			/**
			 * Retrigger any events that are triggered on this model on the vent object which we return
			 * This also prevents .trigger from being used on the model
			 */
			model.listenTo(model, 'all', function() {
				model.vent.trigger.apply(model.vent, arguments);
			});

			/**
			 * Update our cloned objects when they change
			 */
			model.listenTo(model, 'change', function() {
				model.vent.attributes = _.clone(model.attributes);
			});
			model.listenTo(model, 'change:availableActions', function() {
				model.vent.availableActions = _.clone(model.availableActions);
			});
		}

		return model.vent;
	};

	return getModel;
});