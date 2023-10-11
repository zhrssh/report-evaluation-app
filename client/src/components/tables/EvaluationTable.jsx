import { Button } from "@mui/material";
import React from "react";

export default function EvaluationTable() {
	// PLACEHOLDER ONLY
	const evaluations = [
		{
			program: "Computer Engineering",
			date: Date.now(),
			remarks: "Compliant",
		},
	];

	function foo(name) {
		console.log(`${name} clicked`);
	}

	return (
		<div className="table-container">
			{/* Table for Evaluations */}
			<table className="table">
				<thead>
					<tr>
						<th>Evaluations</th>
						<th>Date of Evaluation</th>
						<th>Remarks</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{evaluations.map((evaluation, index) => (
						<tr key={index}>
							<td>{evaluation.program}</td>
							<td>{evaluation.date}</td>
							<td>{evaluation.remarks}</td>
							<td>
								<Button
									onClick={() => foo("View button")}
									variant="contained"
									className="view-btn">
									View
								</Button>
								<Button
									onClick={() => foo("Edit button")}
									variant="contained"
									className="edit-btn">
									Edit
								</Button>
								<Button
									onClick={() => foo("Delete button")}
									variant="contained"
									className="delete-btn">
									Delete
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
