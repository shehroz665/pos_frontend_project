import React,{useState} from "react";
function SignInForm() {
const [email, setemail] = useState('');
const [password, setpassword] = useState('');
const [rememberMe, setrememberMe] = useState(false);

  const handleOnSubmit = e => {
    e.preventDefault();
    console.log(email,password);
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
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
