// // "use client"
// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// // const Login = () => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError(''); // Reset error state before submission
// //     try {
// //       const res = await axios.post('/api/auth/login', { email, password });
// //       localStorage.setItem('token', res.data.token);
// //       navigate('/user-dashboard');
// //     } catch (error) {
// //       setError('Invalid email or password. Please try again.');
// //       console.error('Error logging in', error);
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="login-form">
// //       {error && <div className="error-message">{error}</div>}
// //       <div>
// //         <label>Email</label>
// //         <input
// //           type="email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           required
// //         />
// //       </div>
// //       <div>
// //         <label>Password</label>
// //         <input
// //           type="password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           required
// //         />
// //       </div>
// //       <button type="submit">Login</button>
// //     </form>
// //   );
// // };

// // export default Login;


// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(''); // Reset error state before submission
//     try {
//       const res = await axios.post('http://localhost:5001/api/auth/login', { email, password });
//       // Handle successful login here (e.g., save token to local storage, redirect user)
//       console.log(res.data); // Log the response from the server
//     } catch (error) {
//       setError('Invalid email or password. Please try again.');
//       console.error('Error logging in', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       {error && <div style={{ color: 'red' }}>{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;
"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', formData);
      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.accessToken);
      navigate('/user-dashboard');
      console.log("navigation successful")
    } catch (error) {
      console.error('Error logging in:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
