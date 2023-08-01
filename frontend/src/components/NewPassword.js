import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NewPassword() {
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const history = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            // Implement change password logic and API call using axios
            const response = await axios.post(
                'http://localhost:8000/change-password',
                {
                    otp,
                    newPassword,
                }
            );

            console.log(response.data);
            // Show success message or redirect to a different page
            history('/login');
        } catch (error) {
            console.error(error);
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Invalid OTP or new password');
            }
        }
    };

    return (
        <div className="login_container">
            <form className="form_container" onSubmit={handleChangePassword}>
                <h2>New Password</h2>

                <div className="form-control">
                    <label>Enter OTP:</label>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                </div>

                <div className="form-control">
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>

                {errorMessage && (<p className="error-message">{errorMessage}</p>)}

                <button className="green_btn" type="submit">
                    Change Password
                </button>
            </form>
        </div>
    );
}

export default NewPassword;
