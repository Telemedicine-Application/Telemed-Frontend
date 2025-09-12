import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // First phone number then OTP then new password
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [resetToken, setResetToken] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    const navigate = useNavigate();

    // Step 1: Send OTP to phone
    const handleSendOTP = async (e) => {
        e.preventDefault();
        
        if (!phone || phone.length < 10) {
            toast.error('Please enter a valid phone number', {
                duration: 4000,
                position: "top-center",
            });
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:5000/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone })
            });
            
            const data = await response.json();
            
            if (data.success) {
                toast.success(data.message || 'OTP sent successfully!', {
                    duration: 4000,
                    position: "top-center",
                });
                // OTP
                if (data.otp) {
                    console.log('OTP for testing:', data.otp);
                    toast.success(`OTP for testing: ${data.otp}`, {
                        duration: 8000,
                        position: "top-center",
                    });
                }
                setStep(2);
            } else {
                toast.error(data.message || 'Failed to send OTP', {
                    duration: 4000,
                    position: "top-center",
                });
            }
        } catch (error) {
            console.error('Network error:', error);
            toast.error('Network error! Please check if the server is running.', {
                duration: 4000,
                position: "top-center",
            });
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Verify OTP
    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        
        if (!otp || otp.length !== 6) {
            toast.error('Please enter a valid 6-digit OTP', {
                duration: 4000,
                position: "top-center",
            });
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:5000/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, otp })
            });
            
            const data = await response.json();
            
            if (data.success) {
                toast.success(data.message || 'OTP verified successfully!', {
                    duration: 4000,
                    position: "top-center",
                });
                setResetToken(data.resetToken);
                setStep(3);
            } else {
                toast.error(data.message || 'Invalid OTP', {
                    duration: 4000,
                    position: "top-center",
                });
            }
        } catch (error) {
            console.error('Network error:', error);
            toast.error('Network error! Please try again.', {
                duration: 4000,
                position: "top-center",
            });
        } finally {
            setLoading(false);
        }
    };

    // Step 3: Reset Password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        
        // Clear previous error
        setPasswordError('');

        if (!newPassword || !confirmPassword) {
            setPasswordError('Both fields are required');
            return;
        }

        if (newPassword.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:5000/api/auth/reset-password', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    // Only add Authorization header if resetToken exists
                    ...(resetToken && { 'Authorization': `Bearer ${resetToken}` })
                },
                body: JSON.stringify({ 
                    phone, // Include phone for simple approach
                    newPassword, 
                    confirmPassword 
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                toast.success('Password changed successfully! 🎉', {
                    duration: 4000,
                    position: "top-center",
                });
                setTimeout(() => navigate('/login', { replace: true }), 1500);
            } else {
                toast.error(data.message || 'Failed to reset password', {
                    duration: 4000,
                    position: "top-center",
                });
            }
        } catch (error) {
            console.error('Network error:', error);
            toast.error('Network error! Please try again.', {
                duration: 4000,
                position: "top-center",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleBackToLogin = () => {
        navigate('/login');
    };

    const getStepTitle = () => {
        switch(step) {
            case 1: return 'Reset Password 🔒';
            case 2: return 'Verify OTP 📱';
            case 3: return 'New Password 🔑';
            default: return 'Reset Password';
        }
    };

    const getStepDescription = () => {
        switch(step) {
            case 1: return 'Enter your phone number to receive OTP';
            case 2: return `Enter the OTP sent to ${phone}`;
            case 3: return 'Create your new password';
            default: return '';
        }
    };

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.container}>
                <h2 style={styles.heading}>{getStepTitle()}</h2>
                <p style={styles.description}>{getStepDescription()}</p>

                <div style={styles.form}>
                    {/* Step Indicator */}
                    <div style={styles.stepIndicator}>
                        <div style={{...styles.step, ...(step >= 1 ? styles.stepActive : {})}}>1</div>
                        <div style={{...styles.stepLine, ...(step >= 2 ? styles.stepLineActive : {})}}></div>
                        <div style={{...styles.step, ...(step >= 2 ? styles.stepActive : {})}}>2</div>
                        <div style={{...styles.stepLine, ...(step >= 3 ? styles.stepLineActive : {})}}></div>
                        <div style={{...styles.step, ...(step >= 3 ? styles.stepActive : {})}}>3</div>
                    </div>

                    {/* Step 1: Phone Number */}
                    {step === 1 && (
                        <form onSubmit={handleSendOTP}>
                            <label style={styles.label}>Phone Number</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                style={styles.input}
                                placeholder="Enter your phone number"
                                required
                            />
                            
                            <div style={styles.buttonGroup}>
                                <button
                                    type="button"
                                    onClick={handleBackToLogin}
                                    style={styles.secondaryButton}
                                >
                                    Back to Login
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    style={styles.primaryButton}
                                >
                                    {loading ? 'Sending...' : 'Send OTP 📤'}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Step 2: OTP Verification */}
                    {step === 2 && (
                        <form onSubmit={handleVerifyOTP}>
                            <label style={styles.label}>Enter OTP</label>
                            <input
                                type="text"
                                maxLength="6"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                style={{...styles.input, ...styles.otpInput}}
                                placeholder="000000"
                                required
                            />
                            
                            <div style={styles.buttonGroup}>
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    style={styles.secondaryButton}
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    style={styles.primaryButton}
                                >
                                    {loading ? 'Verifying...' : 'Verify OTP ✓'}
                                </button>
                            </div>
                            
                            <div style={styles.resendWrapper}>
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    style={styles.resendButton}
                                >
                                    Resend OTP
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Step 3: New Password */}
                    {step === 3 && (
                        <form onSubmit={handleResetPassword}>
                            <label style={styles.label}>New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                style={styles.input}
                                placeholder="Enter new password"
                                required
                            />
                            
                            <label style={styles.label}>Confirm New Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                style={styles.input}
                                placeholder="Confirm new password"
                                required
                            />
                            
                            {passwordError && (
                                <div style={styles.errorMessage}>
                                    <span style={styles.errorIcon}>⚠️</span>
                                    {passwordError}
                                </div>
                            )}
                            
                            <button
                                type="submit"
                                disabled={loading}
                                style={styles.primaryButton}
                            >
                                {loading ? 'Updating...' : 'Confirm Password 🎯'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    pageWrapper: {
        minHeight: "100vh",
        backgroundColor: "#0e1525",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
    },
    container: {
        width: "100%",
        maxWidth: "450px",
        color: "#fff",
        textAlign: "center",
    },
    heading: {
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "10px",
        color: "#f97316",
    },
    description: {
        fontSize: "16px",
        color: "#94a3b8",
        marginBottom: "30px",
    },
    form: {
        backgroundColor: "#1e293b",
        padding: "40px",
        borderRadius: "15px",
        width: "100%",
        textAlign: "left",
        boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
    },
    stepIndicator: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "30px",
    },
    step: {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "#334155",
        color: "#94a3b8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: "16px",
    },
    stepActive: {
        backgroundColor: "#f97316",
        color: "#fff",
    },
    stepLine: {
        width: "60px",
        height: "2px",
        backgroundColor: "#334155",
        margin: "0 10px",
    },
    stepLineActive: {
        backgroundColor: "#f97316",
    },
    label: {
        fontSize: "14px",
        marginBottom: "8px",
        display: "block",
        color: "#e2e8f0",
        fontWeight: "500",
    },
    input: {
        width: "100%",
        padding: "15px",
        marginBottom: "20px",
        border: "1px solid #334155",
        borderRadius: "10px",
        outline: "none",
        backgroundColor: "#0f172a",
        color: "#fff",
        boxSizing: "border-box",
        fontSize: "16px",
        transition: "border-color 0.3s ease",
    },
    otpInput: {
        textAlign: "center",
        fontSize: "20px",
        letterSpacing: "8px",
        fontWeight: "bold",
    },
    buttonGroup: {
        display: "flex",
        gap: "15px",
        marginTop: "20px",
    },
    primaryButton: {
        flex: 1,
        padding: "15px",
        backgroundColor: "#f97316",
        border: "none",
        borderRadius: "10px",
        fontWeight: "bold",
        color: "#fff",
        cursor: "pointer",
        fontSize: "16px",
        transition: "all 0.3s ease",
        boxSizing: "border-box",
    },
    secondaryButton: {
        flex: 1,
        padding: "15px",
        backgroundColor: "transparent",
        border: "2px solid #334155",
        borderRadius: "10px",
        fontWeight: "bold",
        color: "#e2e8f0",
        cursor: "pointer",
        fontSize: "16px",
        transition: "all 0.3s ease",
        boxSizing: "border-box",
    },
    resendWrapper: {
        textAlign: "center",
        marginTop: "20px",
    },
    resendButton: {
        background: "none",
        border: "none",
        color: "#f97316",
        cursor: "pointer",
        fontSize: "14px",
        textDecoration: "underline",
    },
    errorMessage: {
        color: "#ef4444",
        backgroundColor: "#1f1f1f",
        border: "1px solid #ef4444",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
        fontSize: "14px",
    },
    errorIcon: {
        marginRight: "8px",
    },
};

export default ForgotPassword;