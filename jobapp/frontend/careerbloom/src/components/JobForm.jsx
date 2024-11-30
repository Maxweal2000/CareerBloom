import React, { useState } from 'react';
import axios from 'axios';

const JobForm = () => {
  const [formData, setFormData] = useState({ title: '', description: '', company: '', location: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/jobs', formData);
      alert('Job added successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to add job.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Job Title" onChange={handleChange} required />
      <input type="text" name="company" placeholder="Company" onChange={handleChange} required />
      <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required></textarea>
      <button type="submit">Add Job</button>
    </form>
  );
};

export default JobForm;
