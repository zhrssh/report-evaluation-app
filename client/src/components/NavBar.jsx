import React from "react";
import { Help, Info, Settings } from "@mui/icons-material";

export default function NavBar() {
	return (
		<header className="header">
			{/* Header content */}
			<div className="secondary-logo">
				<img src="./ched.png" alt="Secondary Logo" />
				<div className="secondary-organization-name">
					<span className="higher-edu-text">
						Republic of the Philippines <br />
						The Commission on Higher Education
					</span>
				</div>
			</div>
			<div className="icons">
				<Help />
				<Info />
				<Settings />
			</div>
		</header>
	);
}
