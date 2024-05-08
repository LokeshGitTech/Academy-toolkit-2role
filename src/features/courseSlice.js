// features/counterSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [
    
  ],
  isAuthenticated: false,
  error: null, 
};

const courseSlice =  createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse:  (state ,action) => {
      const {id ,title,  description, image} = action.payload;
      const newCourse = {
        id: id,
        title: title,
        description: description,
        image: image,
        subscribe: false
      };
      state.courses.push(newCourse);
    },
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter((course) => course.id !== action.payload.id);
    },
    editCourse: (state, action) => {
      const { id, title, description, image } = action.payload;
      const index = state.courses.findIndex(course => course.id === id);
      if (index !== -1) {
        state.courses[index] = { id, title, description, image };
      }
    },
    subscribeCourse: (state, action)=> {
      const subscribeData = state.courses.find((course) => course.id === action.payload);
      subscribeData.subscribe = true;
    }
},
});

export const { addCourse, deleteCourse, editCourse, subscribeCourse } = courseSlice.actions;

export default courseSlice.reducer;
