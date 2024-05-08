// modal.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCourse, editCourse } from '../features/courseSlice';
import { nanoid } from '@reduxjs/toolkit';

const Modal = ({ closeModal, editCourseData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (editCourseData) {
      setTitle(editCourseData.title);
      setDescription(editCourseData.description);
      setImage(editCourseData.image);
    }
  }, [editCourseData]);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'title') setTitle(value);
    else if (name === 'description') setDescription(value);
    else if (name === 'image' && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); // Set the image as base64 string
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    const formData = {
      id: editCourseData ? editCourseData.id : nanoid(), // Use existing ID if editing, else generate new ID
      title: title,
      description: description,
      image: image,
    };
    if (editCourseData) {
      dispatch(editCourse(formData)); // Dispatch editCourse action if editing
    } else {
      dispatch(addCourse(formData)); // Dispatch addCourse action if adding new course
    }
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="sm:mx-5 bg-white p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{editCourseData ? 'Edit Course' : 'Add New Course'}</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
        <div className="w-full bg-white rounded-lg shadow md:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="space-y-4 md:space-y-6" onSubmit={handleModalSubmit}>
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter title"
                  value={title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea
                  name="description"
                  id="description"
                  rows="3"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter description"
                  value={description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  accept="image/*"
                  onChange={handleChange}
                  
                />
              </div>
              <button type="submit" className="bg-gray-50 px-2 rounded-lg font-bold border border-black-600">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
