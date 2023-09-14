import React,{useState} from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { showSuccessAlert,showErrorAlert } from "../Alerts/Alert";
function SignInForm() {
const [email, setemail] = useState('');
const [password, setpassword] = useState('');
const [rememberMe, setrememberMe] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = 'http://127.0.0.1:8000/api/login';
    const data = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(apiUrl, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('responseData', response.data);
      if (response.status === 200) {
          showSuccessAlert('Login successful');
      } else if(response.status === 401) {
        showErrorAlert('Login failed. Please check your credentials');
      }
    } catch (error) {
        showErrorAlert('Login failed. Please check your credentials');
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e)=>setemail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setpassword(e.target.value)}
        />
        <div className="rememberMe">
        <div>
        <label>
        Remember me  
        </label>
        </div>
        <div>
        <input
        type="checkbox"
        checked={rememberMe}
        onChange={(e)=>setrememberMe(e.target.checked)}
        />         
        </div>
        </div>
        {/* <a href="#">Forgot your password?</a> */}
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
