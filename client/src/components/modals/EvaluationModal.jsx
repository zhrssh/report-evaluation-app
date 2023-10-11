import React from "react";

export default function EvaluationModal() {
	const [program, setProgram] = React.useState("");
	const [authority, setAuthority] = React.useState("");
	const [month, setMonth] = React.useState("");
	const [day, setDay] = React.useState("");
	const [year, setYear] = React.useState("");
	const [file, setFile] = React.useState(null);
	const [evaluations, setEvaluations] = React.useState([]);

	function handleSubmit(e) {
		{
			e.preventDefault();

			const newEvaluation = {
				program,
				date: `${year}-${month}-${day}`,
				remarks: "", // Add remarks logic if needed
			};

			setEvaluations([...evaluations, newEvaluation]);

			setProgram("");
			setAuthority("");
			setMonth("");
			setDay("");
			setYear("");
			setFile(null);

			closeModal();

			sendDataToBackend(newEvaluation);
		}
	}

	return (
		<div className="modal-content">
			<h2>Add New Evaluation</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Program:</label>
					<input
						type="text"
						value={program}
						onChange={(e) => setProgram(e.target.value)}
					/>
				</div>
				<div>
					<label>Government Authority:</label>
					<input
						type="text"
						value={authority}
						onChange={(e) => setAuthority(e.target.value)}
					/>
				</div>
				<div>
					<label>Date of Evaluation:</label>
					<div className="date-inputs">
						<input
							type="text"
							value={month}
							onChange={(e) => setMonth(e.target.value)}
							placeholder="Month"
						/>
						<input
							type="text"
							value={day}
							onChange={(e) => setDay(e.target.value)}
							placeholder="Day"
						/>
						<input
							type="text"
							value={year}
							onChange={(e) => setYear(e.target.value)}
							placeholder="Year"
						/>
					</div>
				</div>
				<div>
					<label>Upload File:</label>
					<input type="file" onChange={(e) => setFile(e.target.files[0])} />
				</div>
				<div className="button-container">
					<Button variant="contained" type="submit">
						Save
					</Button>
					<Button variant="contained" onClick={closeModal}>
						Close
					</Button>
				</div>
			</form>
		</div>
	);
}
