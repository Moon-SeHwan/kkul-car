import * as React from "react";
import Footer from "../common/Footer";
import Appbar from "../common/Appbar";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  Card,
  CardContent,
  Container,
  createTheme,
  Paper,
  Stack,
  styled,
  ThemeProvider,
  Typography,
} from "@mui/material";

import {
  searchTerms
} from "src/api/terms/index";

const theme = createTheme();

const PersonalPolicy = () => {
  const [ personPolicy, setPersonPolicy ] = React.useState("")

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#ECEFF1",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  React.useEffect(() => {
    const param = {
      termsType: "T03",
      expDiv: "ALLE"
    }

    searchTerms(param)
    .then(res => {
      setPersonPolicy(res.data[0].contents)
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* app bar component */}
      <Appbar />

      <Container sx={{ py: 3 }} maxWidth="md">
        <Stack spacing={1}>
          <Item>개인정보보호방침</Item>
        </Stack>
      </Container>

      <Container sx={{ py: 3 }} maxWidth="md">
        <Card>
          <CardContent>
            <Typography
              align="center"
              gutterBottom
              variant="subtitle2"
              component="div"
            >
              <div style={{ whiteSpace: "pre-wrap" }}>{personPolicy}</div>
            </Typography>
          </CardContent>
        </Card>

        <Box m={1} display="flex" justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            size="large"
            color="info"
            sx={{ height: 40 }}
            href="/Customer"
          >
            닫기
          </Button>
        </Box>
      </Container>

      <Footer />
      {/* End footer */}
    </ThemeProvider>
  );
}
export default PersonalPolicy;
