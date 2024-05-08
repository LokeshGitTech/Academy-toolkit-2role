// features/counterSlice.js

import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  // courses: [{title: "React js", description: "Learn react js within 10 min", image: "heardpng.png"},{title: "Python", description: "Learn react js within 10 min", image: "heardpng.png"}],
  isAuthenticated: false,
  error: null, 
  currantUser: {
    role: null,
    emailId: null
  }
};

 const AuthSlice =  createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser:  (state, action) => {
      const {name,  email, password , role} = action.payload;
      const newUser = {
        id: nanoid(),
        name: name,
        email: email,
        password: password,
        role: role,
      };
      state.user.push(newUser);
    },
  
  login: (state, action) => {
    const { email, password } = action.payload;
    const user = state.user.find(user => user.email === email && user.password === password);
    if (user) {
      state.isAuthenticated = true;
      state.error = null;
      state.currantUser.role = user.role
      state.currantUser.emailId = user.email
    } else {
      state.isAuthenticated = false;
      state.error = "Invalid email or password";
      state.currantUser.role = null
      state.currantUser.emailId = null
    }
  },
  logout: (state, action) => {
    state.isAuthenticated = false;
    state.currantUser.role = null
    state.currantUser.emailId = null
  }
},
});

export const { addUser , login, logout} = AuthSlice.actions;

export default AuthSlice.reducer;
