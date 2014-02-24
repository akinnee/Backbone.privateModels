define(function(require) {

	var Backbone = require('backbone'),
		getCollection = require('getCollection');

	describe("getCollection", function() {

		var collectionInstance;

		beforeEach(function() {
			collectionInstance = getCollection([
				{ name: 'derp1' },
				{ name: 'derp2' },
				{ name: 'derp3' }
			], null, Backbone.Collection);
		});

		it("exports getCollection", function() {
			expect(getCollection).toBeDefined();
		});

		it("creates a collection", function() {
			expect(collectionInstance instanceof Backbone.Collection).toBeTruthy();
		});

	});
});