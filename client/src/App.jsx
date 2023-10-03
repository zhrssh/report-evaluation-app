import "./App.css";
import React, { useState } from 'react';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Help, Info, Settings } from '@mui/icons-material';
import Modal from '@mui/material/Modal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [program, setProgram] = useState('');
  const [authority, setAuthority] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [file, setFile] = useState(null);
  const [evaluations, setEvaluations] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const sendDataToBackend = async (data) => {
    try {
      const response = await fetch('https://example.com/api/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      console.log('Response from Backend:', responseData);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvaluation = {
      program,
      date: `${year}-${month}-${day}`,
      remarks: '', // Add remarks logic if needed
    };

    setEvaluations([...evaluations, newEvaluation]);

    setProgram('');
    setAuthority('');
    setMonth('');
    setDay('');
    setYear('');
    setFile(null);

    closeModal();

    sendDataToBackend(newEvaluation);
  };

  const handleView = (index) => {
    console.log("View evaluation:", evaluations[index]);
  };

  const handleEdit = (index) => {
    console.log("Edit evaluation:", evaluations[index]);
  };

  const handleDelete = (index) => {
    const updatedEvaluations = evaluations.filter((_, i) => i !== index);
    setEvaluations(updatedEvaluations);
  };

  const modalBody = (
    <div className="modal-content">
      <h2>Add New Evaluation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Program:</label>
          <input type="text" value={program} onChange={(e) => setProgram(e.target.value)} />
        </div>
        <div>
          <label>Government Authority:</label>
          <input type="text" value={authority} onChange={(e) => setAuthority(e.target.value)} />
        </div>
        <div>
          <label>Date of Evaluation:</label>
          <div className="date-inputs">
            <input type="text" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="Month" />
            <input type="text" value={day} onChange={(e) => setDay(e.target.value)} placeholder="Day" />
            <input type="text" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" />
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
  

  return (
    <div className="app-container">
      <header className="header">
        {/* Header content */}
        <div className="secondary-logo">
          <img src="./ched.png" alt="Secondary Logo" />
          <div className="secondary-organization-name">
            <span className="higher-edu-text">Republic of the Philippines <br />The Commission on Higher Education</span>
          </div>
        </div>
        <div className="icons">
          <Help />
          <Info />
          <Settings />
        </div>
      </header>
      <div className="app-container2">
        {/* Main logo content */}
        <div className="main-logo">
          <img src="./tip1.png" alt="Main Logo"/>
          <div className="organization-name">
            Technological Institute of the <br /> Philippines 
          </div>
          <div className="address-info">
      938 Aurora Boulevard, Cubao, Quezon City<br />
      Tel. No: (+632) 8911-0964<br />
      E-MAIL:info@tip.edu.ph
    </div>
  </div>
</div>
      <div className="search-bar">
        {/* Search bar content */}
        <input type="text" placeholder="Search..." />
        <Stack direction="row" spacing={2}>
          <Button variant="contained">Search</Button>
          <Button variant="outlined" disableElevation>Sort By</Button>
          <Button variant="outlined">Filters</Button>
          <Button variant="contained" onClick={openModal}>Create</Button>
        </Stack>
      </div>
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
                  <Button onClick={() => handleView(index)} variant="contained" className='view-btn'>
                    View
                  </Button>
                  <Button onClick={() => handleEdit(index)} variant="contained" className='edit-btn'>
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(index)} variant="contained" className='delete-btn'>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={isModalOpen} onClose={closeModal}>
        {modalBody}
      </Modal>
    </div>
  );
}

export default App;
