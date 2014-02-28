define(function(require) {

	var Backbone = require('backbone');
	require('backbonePrivateModels');

	describe("Backbone.privateModels.getModel", function() {

		var modelInstance;

		beforeEach(function() {
			modelInstance = new Backbone.Model({ name: 'Money' });
			modelInstance.children = new Backbone.Collection([{ name: 'Problems' }]);
		});

		it("returns an object which abstracts the underlying model", function() {
			var privateModel = Backbone.privateModels.getModel(modelInstance);
			expect(privateModel.attributes).toEqual(modelInstance.attributes);
			modelInstance.set('name', 'Root of all evil');
			expect(privateModel.attributes.name).toEqual('Root of all evil');
		});

		it("exposes properties of the model based on the configuration", function() {
			modelInstance.exposeProperties = ['children'];
			var privateModel = Backbone.privateModels.getModel(modelInstance);
			expect(privateModel.children).toEqual(modelInstance.children);
			modelInstance.children.add({ id: 123, name: 'Power' });
			expect(privateModel.children.get({ id: 123 }).get('name')).toEqual('Power');
		});

	});
});