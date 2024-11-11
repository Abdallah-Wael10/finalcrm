"use client";
import styles from "./form3.module.css";
import { useState } from "react";
export default function Form3() {
const [formData , setFormData] = useState({
  name : "",
  car_name : "",
  phone : "",
  services : "",
  status : "",
  data : "",
  account : "",
  comment : "",
  
})
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

const handleSubmit = async (e) => {
e.preventDefault();
setIsSubmitting(true);
setSubmitMessage('');

try {
  const response = await fetch("/api/form", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const result = await response.json();

  if (!response.ok) {
    if (response.status === 400 && result.errors) {
      setSubmitMessage(result.errors.join(', '));
    } else {
      throw new Error('Failed to submit form');
    }
  } else {
    setSubmitMessage('Form submitted successfully!');
    // Reset form data here
  }
} catch (error) {
  console.error('Error submitting form:', error);
  setSubmitMessage('Failed to submit form. Please try again.');
} finally {
  setIsSubmitting(false);
}
};
  return (
    <form onSubmit={handleSubmit} className={styles.page}>
      <input type="text" name="name" placeholder="Client Name" onChange={handleInputChange} />
      <input type="text" name="car_name" placeholder="Car Name" onChange={handleInputChange} />
      <input type="number" name="phone" placeholder="Phone number" onChange={handleInputChange} />
      <input type="text" name="services" placeholder="servics" onChange={handleInputChange} />
      <input type="text" name="status" placeholder="Status" onChange={handleInputChange} />
      <input type="date" name="date" placeholder="Date Name" onChange={handleInputChange} />
      <input type="text" name="account" placeholder="account Name" onChange={handleInputChange}/>
      <input type="text" name="comment" placeholder="comments "onChange={handleInputChange} />
    </form>
  );
}
