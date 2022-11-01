import * as React from "react";
import Footer from "src/common/Footer";
import Appbar from "src/common/Appbar";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  createTheme,
  Grid,
  ImageList,
  Paper,
  Stack,
  styled,
  ThemeProvider,
  Typography,
} from "@mui/material";

import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import InfoIcon from "@mui/icons-material/Info";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

const theme = createTheme();

function Customer() {
  const cols = 1;
  const rows = 1;

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* app bar component */}
      <Appbar />
      <Container sx={{ py: 1 }} maxWidth="md">
        {/* End hero unit */}
        <Grid item xs={12} sm={3} md={4}>
          <Grid container spacing={1}>
            <Grid>
              <ImageList sx={{ width: 800, height: 250 }}>
                <ImageListItem cols={cols} rows={rows}>
                  <img
                    width="100%"
                    src="./image/6.jpg"
                    // srcSet="./image/6.jpg?w=400&fit=crop&auto=format&dpr=1 1x"
                    alt="고객센터"
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title="고객센터"
                    actionIcon={
                      <IconButton
                        sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        aria-label={`info about 고객센터`}
                      ></IconButton>
                    }
                  />
                </ImageListItem>
              </ImageList>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ py: 1 }} maxWidth="md">
        {/* End hero unit */}
        <Grid item xs={12} sm={3} md={4}>
          <Grid container spacing={1}>
            <Container sx={{ py: 1 }} maxWidth="md">
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent>
                  <Typography
                    align="center"
                    variant="h6"
                    color="text.secondary"
                  >
                    상담원 연결
                  </Typography>
                  <Box
                    m={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Button
                      variant="outlined"
                      size="large"
                      color="info"
                      sx={{ height: 40 }}
                    >
                      010-0000-0000
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Container>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={3} md={4}>
          <Grid container spacing={1}>
            <Container sx={{ py: 1 }} maxWidth="md">
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  m={1}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    variant="text"
                    size="large"
                    color="info"
                    sx={{ height: 40 }}
                    href="/TransTerms"
                  >
                    운송약관
                  </Button>
                </Box>
              </Card>
            </Container>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={3} md={4}>
          <Grid container spacing={1}>
            <Container sx={{ py: 1 }} maxWidth="md">
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  m={1}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    variant="text"
                    size="large"
                    color="info"
                    sx={{ height: 40 }}
                    href="/UseTerms"
                  >
                    이용약관
                  </Button>
                </Box>
              </Card>
            </Container>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={3} md={4}>
          <Grid container spacing={1}>
            <Container sx={{ py: 1 }} maxWidth="md">
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  m={1}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    variant="text"
                    size="large"
                    color="info"
                    sx={{ height: 40 }}
                    href="/PersonalPolicy"
                  >
                    개인정보보호방침
                  </Button>
                </Box>
              </Card>
            </Container>
          </Grid>
        </Grid>
      </Container>
      <Footer />
      {/* End footer */}
    </ThemeProvider>
  );
}
export default Customer;
