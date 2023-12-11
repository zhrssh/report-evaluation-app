import mongoose from "mongoose";
import { Model, Schema } from "mongoose";

/**
 * Adds new field to the model and dyanmicaly updates it.
 * @param {String} fieldName
 * @param {mongoose.Schema.Types} fieldType
 * @param {Model} Model
 * @param {String} schemaName
 * @returns {Model} Updated Model
 */
export function addNewFieldToSchema(fields) {
	try {
		for (let i in fields) {
			const { schemaName, newField, fieldType } = fields[i];

			// Fetch the schema dynamically by name
			const schema = mongoose.connection.model(schemaName).schema;

			// Check if the field already exists in the schema
			if (schema.path(newField)) {
				throw new Error(`Field '${newField}' already exists in the schema.`);
			}

			// Get the Mongoose type based on the fieldType string
			const selectedType = mongoose.Schema.Types[fieldType];

			if (!selectedType) {
				throw new Error(`Invalid field type: ${fieldType}`);
			}

			// Add the new field with the selected type to the schema
			schema.add({ [newField]: selectedType });

			// Recompile the model
			mongoose.connection.models[schemaName] = mongoose.model(
				schemaName,
				schema
			);
		}
	} catch (err) {
		throw err;
	}
}

// Get fields from model
export function getFieldsFromSchema(schemaName) {
	try {
		const schema = mongoose.connection.model(schemaName).schema;
		return schema;
	} catch (err) {
		throw err;
	}
}
// Remove field from model
// Update field from model

/**
 * Updates model to check if there are new fields added
 * @param {String} schemaName
 * @param {Schema} Schema
 * @returns
 */
export function updateModel(schemaName, Schema) {
	try {
		return mongoose.model(schemaName, Schema);
	} catch (err) {
		throw err;
	}
}
