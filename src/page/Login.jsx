import React, { useState } from 'react';
import './Login.css'; 
import logo from "../assets/LOGO-PROX-GLOBAL.png";
import { loginUser } from '../service/UserService';
import { toast } from 'react-toastify';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await loginUser(email, password);
    //         console.log('Login successful:', response.data);
    //         toast.success('Logged in successfully!');
    //         // Here you might want to save the token to localStorage and redirect the user
    //         // localStorage.setItem('token', response.data.token);
    //         // Redirect user to another page or dashboard
    //     } catch (error) {
    //         console.error('Login failed:', error);
    //         toast.error('Failed to log in!');
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(email, password);
            console.log('Login successful:', response.data);
    
            // Lấy token từ header Authorization
            const token = response.headers['authorization'];
            console.log('Token:', token);
    
            // Lưu token vào localStorage
            sessionStorage.setItem('token', token);
    
            // Hiển thị thông báo đăng nhập thành công
            toast.success('Logged in successfully!');
    
            // Redirect user to another page or dashboard
            // Ví dụ: chuyển hướng đến trang chủ
            window.location.href = '/home'; 
    
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Failed to log in!');
        }
    };
    return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100">
             <img src={logo} alt="Logo" className="login-logo" /> 
            <div className="row justify-content-center w-100">
                <div className="col-md-6 col-lg-4"> 
                    <div className="card">
                        <div className="card-header text-center">
                            <h3>Login</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-3"> 
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;