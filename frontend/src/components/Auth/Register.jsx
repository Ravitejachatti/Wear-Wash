// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');
//   const history = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5001/api/auth/register', { username, email, password,role });
      
//       history('/login');
//     } catch (error) {
//       console.error('Error registering', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="register-form">
//       <div>
//         <label>Username</label>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Email</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>

//       <div>
//         <label>Password</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <div>
//         <label>Role</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setRole(e.target.value)}
//           required
//         />
//       </div>
//       </div>
//       <button type="submit">Register</button>
//     </form>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/auth/register', formData);
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Error registering user:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      <div>
        <label>Role:</label>
        <input type="text" name="role" value={formData.role} onChange={handleChange} required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;

