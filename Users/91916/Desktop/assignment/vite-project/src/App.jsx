
import React, { useState } from 'react';
import BasicDetails from './components/BasicDetails/BasicDetails';
import AdvancedSettings from './components/AdvancedSettings/AdvancedSettings';

const App = () => {
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [basicDetails, setBasicDetails] = useState({
    examName: '',
    examDuration: '',
    questionPicking: '',
    questions: [],
  });
  const [advancedSettings, setAdvancedSettings] = useState({});

  const handleNext = (details) => {
    setBasicDetails(details);
    setShowAdvancedSettings(true);
  };

  const handleSave = (settings) => {
    setAdvancedSettings(settings);
    // Save the exam settings
    console.log('Exam settings saved');
  };

  const handlePublish = (settings) => {
    setAdvancedSettings(settings);
    // Publish the exam and send invite
    console.log('Exam published and invite sent');
  };

  return (
    <div>
      {!showAdvancedSettings ? (
        <BasicDetails formData={basicDetails} setFormData={setBasicDetails} onNext={handleNext} />
      ) : (
        <AdvancedSettings
          basicDetails={basicDetails}
          onSave={handleSave}
          onPublish={handlePublish}
        />
      )}
    </div>
  );
};

export default App;