import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditPassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const handleSave = () => {
        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match!");
            return;
        }

        if (newPassword === oldPassword) {
            toast.error("New password can't be same as old!");
            return;
        }
        toast.success("Password updated Successfully!")

        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');

        navigate("/");
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow item-center mt-20">
            <h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>

            <div className="mb-4">
                <label className="block text-lg font-medium mb-1">Old Password</label>
                <input
                    type="password"
                    className="w-full border border-gray-300 p-2 rounded"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="block text-lg font-medium mb-1">New Password</label>
                <input
                    type="password"
                    className="w-full border border-gray-300 p-2 rounded"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>

            <div className="mb-6">
                <label className="block text-lg font-medium mb-1">Confirm New Password</label>
                <input
                    type="password"
                    className="w-full border border-gray-300 p-2 rounded"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <button
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded text-lg"
                onClick={handleSave}
            >
                Save Changes
            </button>
        </div>
    );
}

export default EditPassword;
