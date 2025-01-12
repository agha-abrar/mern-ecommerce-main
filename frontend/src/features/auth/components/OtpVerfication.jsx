import { Button, FormHelperText, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  clearOtpVerificationError, 
  clearResendOtpError, 
  clearResendOtpSuccessMessage, 
  resendOtpAsync, 
  resetOtpVerificationStatus, 
  resetResendOtpStatus, 
  selectLoggedInUser, 
  selectOtpVerificationError, 
  selectOtpVerificationStatus, 
  selectResendOtpError, 
  selectResendOtpStatus, 
  selectResendOtpSuccessMessage, 
  verifyOtpAsync 
} from '../AuthSlice';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

export const OtpVerfication = () => {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const loggedInUser = useSelector(selectLoggedInUser);
    const navigate = useNavigate();
    const resendOtpStatus = useSelector(selectResendOtpStatus);
    const resendOtpError = useSelector(selectResendOtpError);
    const resendOtpSuccessMessage = useSelector(selectResendOtpSuccessMessage);
    const otpVerificationStatus = useSelector(selectOtpVerificationStatus);
    const otpVerificationError = useSelector(selectOtpVerificationError);

    // Handles the redirection
    useEffect(() => {
        if (!loggedInUser) {
            navigate('/login');
        } else if (loggedInUser && loggedInUser?.isVerified) {
            navigate("/");
        }
    }, [loggedInUser]);

    const handleSendOtp = () => {
        const data = { user: loggedInUser?._id };
        dispatch(resendOtpAsync(data));
    };

    const handleVerifyOtp = (data) => {
        const cred = { ...data, userId: loggedInUser?._id };
        dispatch(verifyOtpAsync(cred));
    };

    // Handles resend OTP error
    useEffect(() => {
        if (resendOtpError) {
            toast.error(resendOtpError.message);
        }
        return () => {
            dispatch(clearResendOtpError());
        };
    }, [resendOtpError]);

    // Handles resend OTP success message
    useEffect(() => {
        if (resendOtpSuccessMessage) {
            toast.success(resendOtpSuccessMessage.message);
        }
        return () => {
            dispatch(clearResendOtpSuccessMessage());
        };
    }, [resendOtpSuccessMessage]);

    // Handles error while verifying OTP
    useEffect(() => {
        if (otpVerificationError) {
            toast.error(otpVerificationError.message);
        }
        return () => {
            dispatch(clearOtpVerificationError());
        };
    }, [otpVerificationError]);

    useEffect(() => {
        if (otpVerificationStatus === 'fullfilled') {
            toast.success("Email verified! We are happy to have you here");
            dispatch(resetResendOtpStatus());
        }
        return () => {
            dispatch(resetOtpVerificationStatus());
        };
    }, [otpVerificationStatus]);

    return (
        <Stack
            width={'100vw'}
            height={'100vh'}
            noValidate
            flexDirection={'column'}
            rowGap={3}
            justifyContent="center"
            alignItems="center"
            sx={{
                background: `linear-gradient(to right, #64b3f4, #c2e9fb)`, // Light blue gradient background
                padding: '2rem',
            }}
        >
            <Stack
                component={Paper}
                elevation={3}
                position={'relative'}
                justifyContent={'center'}
                alignItems={'center'}
                p={'2rem'}
                rowGap={'2rem'}
                sx={{
                    borderRadius: '1rem',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)', // Subtle shadow for depth
                    backgroundColor: 'white',
                    width: '100%',
                    maxWidth: '400px',
                }}
            >
                <Typography mt={4} variant="h5" fontWeight={500}>
                    Verify Your Email Address
                </Typography>

                {
                    resendOtpStatus === 'fullfilled' ? (
                        <Stack width={'100%'} rowGap={'1rem'} component={'form'} noValidate onSubmit={handleSubmit(handleVerifyOtp)}>
                            <Stack rowGap={'1rem'}>
                                <Stack>
                                    <Typography color={'GrayText'}>Enter the 4 digit OTP sent on</Typography>
                                    <Typography fontWeight={'600'} color={'GrayText'}>
                                        {loggedInUser?.email}
                                    </Typography>
                                </Stack>
                                <Stack>
                                    <TextField
                                        {...register("otp", {
                                            required: "OTP is required",
                                            minLength: { value: 4, message: "Please enter a 4 digit OTP" },
                                        })}
                                        fullWidth
                                        type="number"
                                    />
                                    {errors?.otp && <FormHelperText sx={{ color: "red" }}>{errors.otp.message}</FormHelperText>}
                                </Stack>
                            </Stack>
                            <LoadingButton
                                loading={otpVerificationStatus === 'pending'}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    background: `linear-gradient(to right, #FF416C, #FF4B2B)`,
                                    color: 'white',
                                    '&:hover': {
                                        background: `linear-gradient(to right, #FF4B2B, #FF416C)`,
                                    },
                                }}
                            >
                                Verify
                            </LoadingButton>
                        </Stack>
                    ) :
                    <>
                        <Stack>
                            <Typography color={'GrayText'}>We will send you a OTP on</Typography>
                            <Typography fontWeight={'600'} color={'GrayText'}>
                                {loggedInUser?.email}
                            </Typography>
                        </Stack>
                        <LoadingButton
                            onClick={handleSendOtp}
                            loading={resendOtpStatus === 'pending'}
                            fullWidth
                            variant="contained"
                            sx={{
                                background: `linear-gradient(to right, #FF416C, #FF4B2B)`,
                                color: 'white',
                                '&:hover': {
                                    background: `linear-gradient(to right, #FF4B2B, #FF416C)`,
                                },
                            }}
                        >
                            Get OTP
                        </LoadingButton>
                    </>
                }
            </Stack>
        </Stack>
    );
};
