import { FormHelperText, Paper, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { 
  clearForgotPasswordError, 
  clearForgotPasswordSuccessMessage, 
  forgotPasswordAsync,
  resetForgotPasswordStatus,
  selectForgotPasswordError, 
  selectForgotPasswordStatus, 
  selectForgotPasswordSuccessMessage 
} from '../AuthSlice';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const ForgotPassword = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const status = useSelector(selectForgotPasswordStatus);
  const error = useSelector(selectForgotPasswordError);
  const successMessage = useSelector(selectForgotPasswordSuccessMessage);
  const theme = useTheme();
  const is500 = useMediaQuery(theme.breakpoints.down(500));

  useEffect(() => {
    if (error) {
      toast.error(error?.message);
    }
    return () => {
      dispatch(clearForgotPasswordError());
    };
  }, [error]);

  useEffect(() => {
    if (status === 'fullfilled') {
      toast.success(successMessage?.message);
    }
    return () => {
      dispatch(clearForgotPasswordSuccessMessage());
    };
  }, [status]);

  useEffect(() => {
    return () => {
      dispatch(resetForgotPasswordStatus());
    };
  }, []);

  const handleForgotPassword = async (data) => {
    dispatch(forgotPasswordAsync(data));
    reset();
  };

  return (
    <Stack 
      width={'100vw'} 
      height={'100vh'} 
      justifyContent={'center'} 
      alignItems={'center'}
      sx={{
        background: `linear-gradient(to right, #64b3f4, #c2e9fb)`, // Light blue gradient background
        padding: is500 ? '1rem' : '2rem',
      }}
    >
      <Stack rowGap={'1rem'}>
        <Stack 
          component={Paper} 
          elevation={2}
          sx={{
            padding: is500 ? '1rem' : '1.5rem',
            backgroundColor: 'white',
            borderRadius: '1rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',  // Subtle shadow for depth
          }}
        >
          <Stack 
            component={'form'} 
            width={is500 ? "95vw" : '30rem'} 
            rowGap={'1rem'} 
            noValidate 
            onSubmit={handleSubmit(handleForgotPassword)}
          >
            <Stack rowGap={'.4rem'}>
              <Typography 
                variant='h5' 
                fontWeight={600}
                sx={{
                  wordBreak: 'break-word',
                  background: `linear-gradient(to right, #FF416C, #FF4B2B)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {status === 'fullfilled' ? "Email Sent!" : "Forgot Your Password?"}
              </Typography>
              <Typography 
                color={'text.secondary'} 
                variant='body2'
              >
                {status === 'fullfilled' 
                  ? "Please check your inbox and click on the received link to reset your password." 
                  : "Enter your registered email below to receive a password reset link."}
              </Typography>
            </Stack>

            {status !== 'fullfilled' && (
              <>
                <motion.div whileHover={{ y: -2 }}>
                  <TextField 
                    fullWidth 
                    sx={{ mt: 1 }} 
                    {...register("email", {
                      required: "Please enter an email",
                      pattern: {
                        value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                        message: "Enter a valid email"
                      },
                    })} 
                    placeholder='Enter email'
                  />
                  {errors.email && (
                    <FormHelperText sx={{ fontSize: ".9rem", mt: 1 }} error>
                      {errors.email.message}
                    </FormHelperText>
                  )}
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 1 }}>
                  <LoadingButton
                    sx={{
                      height: '2.5rem',
                      background: `linear-gradient(to right, #FF416C, #FF4B2B)`,
                      color: 'white',
                      '&:hover': {
                        background: `linear-gradient(to right, #FF4B2B, #FF416C)`,
                      },
                    }} 
                    fullWidth 
                    loading={status === 'pending'} 
                    type='submit' 
                    variant='contained'
                  >
                    Send Password Reset Link
                  </LoadingButton>
                </motion.div>
              </>
            )}
          </Stack>
        </Stack>

        {/* Back to Login Navigation */}
        <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 1.05 }}>
          <Typography 
            sx={{
              textDecoration: "none",
              color: theme.palette.text.primary,
              width: "fit-content",
              "& span": {
                color: theme.palette.primary.dark,
              },
            }} 
            mt={2} 
            to={'/login'} 
            variant='body2' 
            component={Link}
          >
            Go back to <span>login</span>
          </Typography>
        </motion.div>
      </Stack>
    </Stack>
  );
};
