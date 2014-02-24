define(function(require) {
	'use strict';

	var modelStoreObj = {}, // stores our models by cid
		modelCIDIndex = {}, // an index of CIDs by actual ID; used by findByID
		modelStore;

	/**
	 * Stores models and retrieves them from the store
	 * Meant to be used by getModel
	 */
	modelStore = {
		add: function(model) {
			modelStoreObj[model.cid] = model;
			if (model.get('id')) {
				modelCIDIndex[model.get('id')] = model.cid;
			}
		},
		findByID: function(id) {
			return modelStoreObj[modelCIDIndex[id]];
		},
		findByCID: function(cid) {
			return modelStoreObj[cid];
		}
	};

	return modelStore;
});