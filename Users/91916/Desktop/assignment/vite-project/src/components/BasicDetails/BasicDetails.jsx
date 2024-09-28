
import React, { useState } from 'react';
import QuestionTable from '../QuestionTable/QuestionTable';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import './BasicDetails.css'

// Validation
const validationSchema = yup.object().shape({
  examName: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, 'Exam Name should contain letters and spaces only')
    .required('Exam Name is required'),
  examDuration: yup
    .number()
    .positive('Duration must be greater than 0')
    .required('Exam Duration is required'),
  questionPicking: yup.string().required('Question Picking is required'),
});

const BasicDetails = ({ formData, setFormData, onNext }) => {
  const [showTable, setShowTable] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, values },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      ...formData,
      questionPicking: 'Auto',                                       // Setting the default value to 'Auto'
    },                                                               // If the selected value is 'Auto', it will display Advanced Settings
  });
  // If the value selected is 'Manual', it will display the table 

  const onSubmit = (data) => {
    setFormData({ ...formData, ...data, questions: [] });
    if (data.questionPicking === 'Manual') {
      setShowTable(true);
    } else {
      onNext(formData);
    }
  };

  return (
    <div className="basic-details">
      <h2>Basic Details</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Exam Name */}
        <label>Exam Name</label>
        <input
          type="text"
          {...register('examName')}
          placeholder="Enter exam name"
        />
        {errors.examName && <p className="error">{errors.examName.message}</p>}

        <label>Exam Duration (minutes)</label>
        <input
          type="number"
          {...register('examDuration')}
          placeholder="Enter duration in minutes"
        />
        {errors.examDuration && <p className="error">{errors.examDuration.message}</p>}

        <label>Question Picking</label>
        <select {...register('questionPicking')}>
          <option value="Auto">Auto</option>                                
          <option value="Manual">Manual</option>
        </select>
        {errors.questionPicking && <p className="error">{errors.questionPicking.message}</p>}

        <button type="submit">Next</button>
      </form>

      {/* Render Question Table after form submission */}
      {showTable && (
        <QuestionTable
          questions={formData.questions}
          setQuestions={(questions) => setFormData({ ...formData, questions })}
        />
      )}
    </div>
  );
};

export default BasicDetails;