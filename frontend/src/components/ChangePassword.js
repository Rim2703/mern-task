import React, { useState } from 'react';
import axios from 'axios';

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            // Implement change password logic and API call using axios
            const response = await axios.post('http://localhost:8000/change-password', {
                oldPassword,
                newPassword,
            });

            console.log(response.data);
            // Show success message or redirect to a different page
        } catch (error) {
            console.error(error);
            // Show error message to the user
        }
    };

    return (
        <div className="form">
            <h2>Change Password</h2>
            <form onSubmit={handleChangePassword}>
                <div className="form-control">
                    <label>Old Password:</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
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
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
}

export default ChangePassword;
