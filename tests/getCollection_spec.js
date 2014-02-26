define(function(require) {

	var Backbone = require('backbone');
	require('backbonePrivateModels');

	describe("Backbone.privateModels.getCollection", function() {

		var collectionInstance,
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
				Backbone.privateModels.getModel({ name: 'derp1' }, null, Backbone.Model),
				Backbone.privateModels.getModel({ name: 'derp2' }, null, Backbone.Model),
				Backbone.privateModels.getModel({ name: 'derp3' }, null, Backbone.Model)
			];
			collectionInstance = Backbone.privateModels.getCollection(models, null, Backbone.Collection);
			privateModelInstance = Backbone.privateModels.getModel({ name: 'derp1' }, null, Backbone.Model);
		});

		it("defines Backbone.privateModels.getCollection", function() {
			expect(Backbone.privateModels.getCollection).toBeDefined();
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
			expect(collectionInstance.models[1].execute).toBeDefined();
			expect(collectionInstance.models[2].execute).toBeDefined();
			expect(collectionInstance.models.length).toEqual(models.length);
		});

		it("creates a collection of private models from an array of vanilla Backbone models", function() {
			var collectionInstanceFromModels = Backbone.privateModels.getCollection(backboneModels, null, Backbone.Collection);

			expect(collectionInstanceFromModels.models[0].attributes).toEqual(privateModelInstance.attributes);
			expect(collectionInstanceFromModels.models[0].execute).toBeDefined();
			expect(collectionInstanceFromModels.models[1].execute).toBeDefined();
			expect(collectionInstanceFromModels.models[2].execute).toBeDefined();
			expect(collectionInstanceFromModels.models.length).toEqual(backboneModels.length);
		});

		it("creates a collection of private models from an array of private models", function() {
			var collectionInstanceFromPrivateModels = Backbone.privateModels.getCollection(privateModels, null, Backbone.Collection);

			expect(collectionInstanceFromPrivateModels.models[0].attributes).toEqual(privateModelInstance.attributes);
			expect(collectionInstanceFromPrivateModels.models[0].execute).toBeDefined();
			expect(collectionInstanceFromPrivateModels.models[1].execute).toBeDefined();
			expect(collectionInstanceFromPrivateModels.models[2].execute).toBeDefined();
			expect(collectionInstanceFromPrivateModels.models.length).toEqual(privateModels.length);
		});

		it("creates a collection of private models for a polymorphic array", function() {
			var polymorphicModels = [models[0], backboneModels[1], privateModels[2]];
			var collectionInstanceFromPolymorphic = Backbone.privateModels.getCollection(polymorphicModels, null, Backbone.Collection);

			expect(collectionInstanceFromPolymorphic.models[0].execute).toBeDefined();
			expect(collectionInstanceFromPolymorphic.models[1].execute).toBeDefined();
			expect(collectionInstanceFromPolymorphic.models[2].execute).toBeDefined();
			expect(collectionInstanceFromPolymorphic.models[0].attributes).toEqual(collectionInstance.models[0].attributes);
			expect(collectionInstanceFromPolymorphic.models[1].attributes).toEqual(collectionInstance.models[1].attributes);
			expect(collectionInstanceFromPolymorphic.models[2].attributes).toEqual(collectionInstance.models[2].attributes);
		});

		it("creates a collection of private models from an existing collection of Backbone models", function() {
			var existingCollection = new Backbone.Collection(models);
			var collectionInstanceFromCollection = Backbone.privateModels.getCollection(existingCollection);

			expect(collectionInstanceFromCollection.models[0].execute).toBeDefined();
			expect(collectionInstanceFromCollection.models[1].execute).toBeDefined();
			expect(collectionInstanceFromCollection.models[2].execute).toBeDefined();
			expect(collectionInstanceFromCollection.length).toEqual(existingCollection.length);
		});

	});
});