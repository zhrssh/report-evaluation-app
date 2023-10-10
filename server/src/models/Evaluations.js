import mongoose from "mongoose";

/**
 * This is where the properties of the Evaluation Schema are defined.
 */
const evaluationSchema = new mongoose.Schema(
	{
		program: {
			type: String,
			required: true,
		},
		governmentAuthority: {
			type: String,
			required: true,
		},
		dateOfEvaluation: {
			type: String,
			required: true,
		},
		attachedFiles: [
			{
				type: String,
			},
		],
	},
	{ timestamps: true }
);

/**
 * Creates a model for the schema.
 */
const Evaluation = mongoose.model("evaluation", evaluationSchema);
export default Evaluation;
