import React, { useContext, useState } from 'react';

import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';


function Login() {
    //sign in access by context api
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    //login to Shipment
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    // Sign in process
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
    })
    //initialize firebase
    initializeLoginFramework();
    //Google sign in
    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleSignOut(res, true)
                // setUser(res);
                // setLoggedInUser(res);
                // history.replace(from);
            })
    }
    // Fb sign in method
    const fbSignIn = () => {
        handleFbSignIn()
            .then(res => {
                // handleResponse(res, true)
                setUser(res);
                setLoggedInUser(res);
                history.replace(from);
            })
    }
    //sign Out
    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleSignOut(res, false)
                // setUser(res);
                // setLoggedInUser(res);
            });
    }
    // Email and password genaration
    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
            isFieldValid = isEmailValid;
        }
        if (e.target.name === 'password') {
            const isPasswordQuantity = e.target.value.length > 6;
            const isPasswordVariety = /^(?=.*[A-Z])(?=.*\d).*$/.test(e.target.value);//must be en uppercases
            isFieldValid = isPasswordQuantity && isPasswordVariety;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    //handle submit
    //creating new user
    const handleSubmit = (e) => {
        // console.log(user.email, user.password)
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, true)
                    // setUser(res);
                    // setLoggedInUser(res);
                    // history.replace(from);
                })
        }
        //Sign in
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true)
                    // setUser(res);
                    // setLoggedInUser(res);
                    // history.replace(from);
                })
        }
        e.preventDefault();
    }
    // // stopping repeating codes
    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }
    //btn style
    var btnStyle = {
        padding: '5px 15px',
        background: 'tomato',
        color: '#fff',
        cursor: 'pointer',
        borderRadius: '5px',
        fontSize: '15px'
    }
    return (
        <div className="App">
            <header className="App-header">
                {
                    user.isSignedIn ? <button onClick={signOut} style={btnStyle}>Sign Out</button>
                        : <button onClick={googleSignIn} style={btnStyle}>Sign In with Google</button>
                }
                <br />
                {user.isSignedIn ? <button onClick={signOut} style={btnStyle}>Sign Out</button>
                    : <button onClick={fbSignIn} style={btnStyle}>Sign In with Facebook</button>
                }
                {
                    user.isSignedIn &&
                    <div>
                        <p>Welcome, {user.name}</p>
                        <p>Email: {user.email}</p>
                        <img src={user.photo} alt="" />
                    </div>
                }
                <h1>Our Own Authentication</h1>
                <form onSubmit={handleSubmit}>
                    <input type="checkbox" onChange={() => setNewUser(!newUser)} name='newUser' />
                    <label htmlFor="newUer">New user Sign up</label> <br />
                    <label htmlFor="">Name:</label><br />
                    {newUser && <input type="text" name='name' placeholder='Name' onBlur={handleBlur} />}<br />
                    <label htmlFor="">Email:</label><br />
                    <input type="email" name='email' onBlur={handleBlur} placeholder='Enter Your Email' required /><br />
                    <label htmlFor="">Password:</label><br />
                    <input type="password" name='password' onBlur={handleBlur} placeholder='Set Password' required /><br />
                    <input type="submit" value="Submit" />
                </form>
                {
                    user.success ? <p style={{ color: 'green' }}>User {newUser ? 'created' : 'logged in'} successfully</p>
                        :
                        <p style={{ color: 'red' }}>{user.error}</p>
                }
            </header>
        </div>
    );
}

export default Login;
