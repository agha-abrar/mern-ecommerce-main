import {
  Box,
  FormHelperText,
  Stack,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ecommerceOutlookAnimation } from "../../../assets";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import {
  selectLoggedInUser,
  signupAsync,
  selectSignupStatus,
  selectSignupError,
  clearSignupError,
  resetSignupStatus,
} from "../AuthSlice";
import { toast } from "react-toastify";
import { MotionConfig, motion } from "framer-motion";

export const Signup = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectSignupStatus);
  const error = useSelector(selectSignupError);
  const loggedInUser = useSelector(selectLoggedInUser);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const theme = useTheme();
  const is900 = useMediaQuery(theme.breakpoints.down(900));
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  useEffect(() => {
    if (loggedInUser && !loggedInUser?.isVerified) {
      navigate("/verify-otp");
    } else if (loggedInUser) {
      navigate("/");
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (status === "fullfilled") {
      toast.success("Welcome! Verify your email to start shopping on mern-ecommerce.");
      reset();
    }
    return () => {
      dispatch(clearSignupError());
      dispatch(resetSignupStatus());
    };
  }, [status]);

  const handleSignup = (data) => {
    const cred = { ...data };
    delete cred.confirmPassword;
    dispatch(signupAsync(cred));
  };

  return (
    <Stack
      width={"100vw"}
      height={"100vh"}
      flexDirection={"row"}
      sx={{
        overflowY: "hidden",
        background: `linear-gradient(to right, #6A11CB, #2575FC)`,
      }}
    >
      {/* Left Section */}
      {!is900 && (
        <Stack
          flex={1}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            background: `linear-gradient(to bottom, #111, #333)`,
            boxShadow: "inset 0 0 15px rgba(0,0,0,0.6)",
          }}
        >
          <Lottie
            animationData={ecommerceOutlookAnimation}
            style={{
              width: "80%",
              height: "80%",
              filter: "drop-shadow(0px 5px 15px rgba(0,0,0,0.5))",
            }}
          />
        </Stack>
      )}

      {/* Right Section */}
      <Stack
        flex={1}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          padding: is480 ? "2rem" : "4rem",
          background: `linear-gradient(to bottom, #F4F4F9, #E0E7FF)`,
          borderRadius: "1rem",
          boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
        }}
      >
        <Stack flexDirection={"row"} justifyContent={"center"} alignItems={"center"}>
          <Stack rowGap={".4rem"} alignItems="center">
            <Typography
              variant="h2"
              sx={{
                wordBreak: "break-word",
                fontWeight: 700,
                background: `linear-gradient(to right, #6A11CB, #2575FC)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Stylus Shop
            </Typography>
            <Typography alignSelf={"flex-end"} color={"GrayText"} variant="body2">
              - Shop Anything
            </Typography>
          </Stack>
        </Stack>

        {/* Form */}
        <Stack
          mt={4}
          spacing={3}
          width={is480 ? "95vw" : "28rem"}
          component={"form"}
          noValidate
          onSubmit={handleSubmit(handleSignup)}
        >
          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
            <TextField
              fullWidth
              {...register("name", { required: "Username is required" })}
              placeholder="Username"
            />
            {errors.name && (
              <FormHelperText sx={{ mt: 1 }} error>
                {errors.name.message}
              </FormHelperText>
            )}
          </motion.div>

          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
            <TextField
              fullWidth
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                  message: "Enter a valid email",
                },
              })}
              placeholder="Email"
            />
            {errors.email && (
              <FormHelperText sx={{ mt: 1 }} error>
                {errors.email.message}
              </FormHelperText>
            )}
          </motion.div>

          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
            <TextField
              type="password"
              fullWidth
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                  message:
                    "At least 8 characters, 1 uppercase, 1 lowercase, and 1 number.",
                },
              })}
              placeholder="Password"
            />
            {errors.password && (
              <FormHelperText sx={{ mt: 1 }} error>
                {errors.password.message}
              </FormHelperText>
            )}
          </motion.div>

          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
            <TextField
              type="password"
              fullWidth
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value, fromValues) =>
                  value === fromValues.password || "Passwords don't match",
              })}
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <FormHelperText sx={{ mt: 1 }} error>
                {errors.confirmPassword.message}
              </FormHelperText>
            )}
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
            <LoadingButton
              fullWidth
              sx={{
                height: "2.5rem",
                fontWeight: 600,
                textTransform: "uppercase",
                background: `linear-gradient(to right, #FF416C, #FF4B2B)`,
                color: "white",
                "&:hover": {
                  background: `linear-gradient(to right, #FF4B2B, #FF416C)`,
                },
              }}
              loading={status === "pending"}
              type="submit"
              variant="contained"
            >
              Signup
            </LoadingButton>
          </motion.div>

          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            flexWrap={"wrap-reverse"}
          >
            <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 1.05 }}>
              <Typography
                mr={"1.5rem"}
                sx={{
                  textDecoration: "none",
                  color: theme.palette.text.primary,
                  "&:hover": { color: theme.palette.primary.main },
                }}
                to={"/forgot-password"}
                component={Link}
              >
                Forgot password?
              </Typography>
            </motion.div>

            <motion.div>
              <Typography
                sx={{
                  textDecoration: "none",
                  color: theme.palette.text.primary,
                  "& span": { color: theme.palette.primary.dark },
                }}
                to={"/login"}
                component={Link}
              >
                Already a member? <span>Login</span>
              </Typography>
            </motion.div>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
