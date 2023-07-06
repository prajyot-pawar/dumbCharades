import React, { useState } from "react";
import ReactDOM from "react-dom";
import GoogleSignInPage from "./GoogleSignInPage";

// import "../styles/LoginPage.css"; 

function LoginPage() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [user, setUser] = useState(null);

  const handleUserChange = (user) => {
    setUser(user);
  };

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="text-[red] text-xs">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 m-2.5">
          <label className="font-bold text-gray-900">Username </label>
          <input type="text" name="uname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="flex flex-col gap-2 m-2.5">
          <label className="font-bold text-gray-900">Password </label>
          <input type="password" name="pass"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  border border-blue-700 rounded">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (<>
  <div className="w-full">
    <div className="flex items-center justify-center flex-col gap-1 h-full">
      <div className="bg-[white]  p-8">
        <div className="text-xl mb-6 font-bold text-blue-500">Sign In</div>
        {isSubmitted ? <div>User is Already Present</div> : renderForm}      
        <label className="flex items-center justify-center gap-2 m-2.5" >or</label>
        <GoogleSignInPage/>
      </div>
    </div>
    </div>
  </>
  );
}

export default LoginPage;