// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function ChangePassword() {
//     const [email, setEmail] = useState('');
//     const [oldPassword, setOldPassword] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const history = useNavigate();

//     const handleChangePassword = async (e) => {
//         e.preventDefault();
//         try {
//             // Retrieve the JWT token from localStorage
//             const token = localStorage.getItem('token');

//             // Implement change password logic and API call using axios
//             const response = await axios.post(
//                 'http://localhost:8000/change-password',
//                 {
//                     email,
//                     oldPassword,
//                     newPassword,
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             console.log(response.data);
//             // Show success message or redirect to a different page
//             history('/login');
//         } catch (error) {
//             console.error(error);
//             if (
//                 error.response &&
//                 error.response.data &&
//                 error.response.data.message
//             ) {
//                 setErrorMessage(error.response.data.message);
//             } else {
//                 setErrorMessage('Invalid old password');
//             }
//         }
//     };

//     return (
//         <div className="login_container">
//             <form className="form_container" onSubmit={handleChangePassword}>
//                 <h2>Change Password</h2>
//                 <div className="form-control">
//                     <label>Email:</label>
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-control">
//                     <label>Old Password:</label>
//                     <input
//                         type="password"
//                         value={oldPassword}
//                         onChange={(e) => setOldPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-control">
//                     <label>New Password:</label>
//                     <input
//                         type="password"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 {errorMessage && (<p className="error-message">{errorMessage}</p>)}

//                 <button className="green_btn" type="submit">
//                     Change Password
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default ChangePassword;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const history = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            // Check if the email exists in the database
            const response = await axios.post(
                'http://localhost:8000/check-email-exists',
                {
                    email,
                }
            );

            if (response.data) {
                // If email exists, proceed to the "NewPassword" form
                history('/new-pass');
            } else {
                setErrorMessage('Email not found');
            }
            console.log(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login_container">
            <form className="form_container" onSubmit={handleChangePassword}>
                <h2>Change Password</h2>

                <div className="form-control">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <button className="green_btn" type="submit">
                    Send OTP
                </button>

            </form>
        </div>
    );
}

export default ChangePassword;

