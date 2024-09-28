
import React, { useState } from 'react';
import './AdvancedSettings.css';

const AdvancedSettings = ({ basicDetails, onSave, onPublish }) => {
  const [negativeMarking, setNegativeMarking] = useState(0);
  const [assignMarks, setAssignMarks] = useState({
    easy: '',
    medium: '',
    hard: '',
  });
  const [minPassingScore, setMinPassingScore] = useState(0);
  const [registrationForm, setRegistrationForm] = useState(false);
  const [captureImage, setCaptureImage] = useState(false);
  const [captureImageInterval, setCaptureImageInterval] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'negativeMarking' || name === 'minPassingScore') {
      if (value < 0 || value > 100) {
        alert('Please enter a value between 0 and 100');
      } else {
        if (name === 'negativeMarking') {
          setNegativeMarking(value);
        } else {
          setMinPassingScore(value);
        }
      }
    } else if (name === 'easy' || name === 'medium' || name === 'hard') {
      if (value < 0) {
        setAssignMarks({ ...assignMarks, [name]: 0 });
      } else {
        setAssignMarks({ ...assignMarks, [name]: value });
      }
    } else if (name === 'captureImageInterval') {
      if (value < 0) {
        setCaptureImageInterval(0);
      } else {
        setCaptureImageInterval(value);
      }
    } else if (name === 'instructions') {
      setInstructions(value);
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (name === 'registrationForm') {
      setRegistrationForm(checked);
    } else if (name === 'captureImage') {
      setCaptureImage(checked);
    }
  };

  const handleSave = () => {
    const advancedSettings = {
      negativeMarking,
      assignMarks,
      minPassingScore,
      registrationForm,
      captureImage,
      captureImageInterval,
      instructions,
    };
    onSave(advancedSettings);

    // Closing the window after saving
    window.close();
  };

  const handlePublish = () => {
    const advancedSettings = {
      negativeMarking,
      assignMarks,
      minPassingScore,
      registrationForm,
      captureImage,
      captureImageInterval,
      instructions,
    };
    onPublish(advancedSettings);
  };

  return (
    <div className="advanced-settings">
      <h2>Advanced Settings</h2>

      <div>
        <label>Negative marking (in %)</label>
        <input
          type="number"
          name="negativeMarking"
          value={negativeMarking}
          onChange={handleInputChange}
          min="0"
          max="100"
        />
      </div>

      <div>
        <label>Assign Marks (for each difficulty level)</label>
        <div>
          <input
            type="number"
            name="easy"
            value={assignMarks.easy}
            onChange={handleInputChange}
            placeholder="Easy"
            min="0"
          />
          <input
            type="number"
            name="medium"
            value={assignMarks.medium}
            onChange={handleInputChange}
            placeholder="Medium"
            min="0"
          />
          <input
            type="number"
            name="hard"
            value={assignMarks.hard}
            onChange={handleInputChange}
            placeholder="Hard"
            min="0"
          />
        </div>
      </div>

      <div>
        <label>Minimum passing score (in %)</label>
        <input
          type="number"
          name="minPassingScore"
          value={minPassingScore}
          onChange={handleInputChange}
          min="0"
          max="100"
        />
      </div>

      <div>
        <label>Registration Form</label>
        <input
          type="checkbox"
          name="registrationForm"
          checked={registrationForm}
          onChange={handleCheckboxChange}
        />
        {registrationForm && (
          <div>
            <label>Configure registration form (optional)</label>
            <input type="text" placeholder="Form details" />
          </div>
        )}
      </div>

      <div>
        <label>Capture image during exam</label>
        <input
          type="checkbox"
          name="captureImage"
          checked={captureImage}
          onChange={handleCheckboxChange}
        />
        {captureImage && (
          <div>
            <label>Update time interval (in seconds)</label>
            <input
              type="number"
              name="captureImageInterval"
              value={captureImageInterval}
              onChange={handleInputChange}
              min="1"
              placeholder="Interval (in seconds)"
            />
          </div>
        )}
      </div>

      <div>
        <label>Instructions</label>
        <textarea
          name="instructions"
          value={instructions}
          onChange={handleInputChange}
          rows="5"
          placeholder="Enter instructions"
        />
      </div>

      <div className="actions">
        <button type="button" onClick={handleSave}>
          Save & Close
        </button>
        <button type="button" onClick={handlePublish}>
          Publish & Send Invite
        </button>
      </div>
    </div>
  );
};

export default AdvancedSettings;
