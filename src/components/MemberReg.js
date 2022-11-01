import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "../common/Footer";
import Appbar from "../common/Appbar";

import axios from "axios";

function MemberReg() {
  const theme = createTheme();
  const [checked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data)

    axios.post("http://localhost:8080/jpa/test"
    , data)
    .then(res => {
      console.log(res)
    })
  }

  // 동의 체크
  const handleAgree = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Appbar />
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
          >
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="이메일 주소"
                    {...register("email")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                    {...register("password")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    label="비밀번호 재입력"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    name="name"
                    label="이름"
                    {...register("name")}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    id="Phone"
                    name="Phone"
                    label="휴대폰번호(-없이 입력)"
                    {...register("phone")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button variant="outlined" sx={{ mt: 1, mr: 1 }}>
                    인증번호
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="verify"
                    name="verify"
                    label="인증번호"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button variant="outlined" sx={{ mt: 1, mr: 1 }}>
                    확인
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox onChange={handleAgree} color="primary" />
                    }
                    label="회원가입 약관에 동의합니다."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
                onClick={handleSubmit(onSubmit)}
              >
                회원가입
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
export default MemberReg;
