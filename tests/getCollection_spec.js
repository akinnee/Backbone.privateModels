define(function(require) {

	var Backbone = require('backbone'),
		getCollection = require('getCollection'),
		getModel = require('getModel');

	describe("getCollection", function() {

		var collectionInstance,
			collectionInstanceFromModels,
			collectionInstanceFromPrivateModels,
			models,
			backboneModels,
			privateModels,
			privateModelInstance;

		beforeEach(function() {
			models = [
				{ name: 'derp1' },
				{ name: 'derp2' },
				{ name: 'derp3' }
			];
			backboneModels = [
				new Backbone.Model({ name: 'derp1' }),
				new Backbone.Model({ name: 'derp2' }),
				new Backbone.Model({ name: 'derp3' })
			];
			privateModels = [
				getModel({ name: 'derp1' }, null, Backbone.Model),
				getModel({ name: 'derp2' }, null, Backbone.Model),
				getModel({ name: 'derp3' }, null, Backbone.Model)
			];
			collectionInstance = getCollection(models, null, Backbone.Collection);
			collectionInstanceFromModels = getCollection(backboneModels, null, Backbone.Collection);
			collectionInstanceFromPrivateModels = getCollection(privateModels, null, Backbone.Collection);
			privateModelInstance = getModel({ name: 'derp1' }, null, Backbone.Model);
		});

		it("exports getCollection", function() {
			expect(getCollection).toBeDefined();
		});

		it("creates a collection", function() {
			expect(collectionInstance instanceof Backbone.Collection).toBeTruthy();
		});

		it("creates a collection with the correct length", function() {
			expect(collectionInstance.length).toEqual(models.length);
			expect(collectionInstance.models.length).toEqual(models.length);
		});

		it("creates a collection of private models from an array of objects", function() {
			expect(collectionInstance.models[0].attributes).toEqual(privateModelInstance.attributes);
			expect(collectionInstance.models[0].execute).toBeDefined();
		});

		it("creates a collection of private models from an array of vanilla Backbone models", function() {
			expect(collectionInstanceFromModels.models[0].attributes).toEqual(privateModelInstance.attributes);
		});

		it("creates a collection of private models from an array of private models", function() {
			expect(collectionInstanceFromPrivateModels.models[0].attributes).toEqual(privateModelInstance.attributes);
		});

	});
});