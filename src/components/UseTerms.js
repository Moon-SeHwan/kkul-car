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

const UseTerms = () => {
  const [ useTerms, setUseTerms ] = React.useState("")
  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#ECEFF1",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  React.useEffect(() => {
    const param = {
      termsType: "T02",
      expDiv: "ALLE"
    }

    searchTerms(param)
    .then(res => {
      setUseTerms(res.data[0].contents)
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* app bar component */}
      <Appbar />

      <Container sx={{ py: 3 }} maxWidth="md">
        <Stack spacing={1}>
          <Item>이용약관</Item>
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
              <div style={{ whiteSpace: "pre-wrap" }}>{useTerms}</div>
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
export default UseTerms;
