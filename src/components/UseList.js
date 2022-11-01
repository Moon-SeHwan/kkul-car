import * as React from "react";
import { useState, useCallback, useEffect } from "react";
import Footer from "../common/Footer";
import Appbar from "../common/Appbar";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Container,
  createTheme,
  Paper,
  ThemeProvider,
  CardContent,
  Typography,
  CardActions,
  Box,
  Divider,
  Chip,
  //CardHeader,
  Collapse,
} from "@mui/material";
//import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
//import { render } from "react-dom";
import ImageViewer from "react-simple-image-viewer";
import {
  getRequestList
} from "src/api/cargo/index";
import store from 'src/store';

import {
  formatTimeStamp
} from "src/utils/commonUtils";

const theme = createTheme();

const ExpandMore = styled(props => {
  const { expand, ...other } = props

  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const cols = 1;
const rows = 1;

function UseList() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#ECEFF1",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }))

  const [reqList, setReqList] = useState([])

  //ownerUid 받아오기
  const ownerUid = store.getState().user.ownerUid

  const handleExpandClick = (reqId) => {
    setReqList(reqList.map(req => req.reqId === reqId ? { ...req, expanded: !req.expanded } : req))
  }

  //  이미지 처리
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index)
    setIsViewerOpen(true)
  }, [])

  const closeImageViewer = () => {
    setCurrentImage(0)
    setIsViewerOpen(false)
  }

  useEffect(() => {
    getRequestList(ownerUid)
    .then(res => {
      setReqList(res.data)
    })
  }, [])
  
  const renderCardContent = reqList?.map(data => {

    return(
      <Container sx={{ py: 1 }} maxWidth="md"  key={data.reqId}>
      {/* End hero unit */}
      <Grid container spacing={1} item xs={12} sm={3} md={4}>
        {/* 이용내역보기 */}
        <Card
          sx={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Grid container spacing={1} item xs={12} sm={3} md={4}>
              <Grid item xs={6}>
                <Stack sx={{ py: 1 }} direction="row" spacing={1}>
                  <Chip label="최적차량검색중" color="success" />
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Box
                  m={1}
                  display="flex"
                  justifyContent="right"
                  alignItems="center"
                >
                  <Button
                    variant="outlined"
                    size="small"
                    color="info"
                    sx={{ height: 40 }}
                    href="/"
                  >
                    취소하기
                  </Button>
                </Box>
              </Grid>
            </Grid>

            <Divider />
            <Typography gutterBottom variant="body2" component="div">
              <ArrowRightIcon color="primary" />
              상차지 : {data.departAddrSt}
            </Typography>
            <Divider />
            <Typography gutterBottom variant="body2" component="div">
              <ArrowRightIcon color="primary" />
              시간 : {formatTimeStamp(data.departDatetimes)}
            </Typography>
            <Divider />
            <Typography gutterBottom variant="body2" component="div">
              <ArrowRightIcon color="primary" />
              하차지 : {data.arrivalAddrSt}
            </Typography>
            <Divider />
            <Typography gutterBottom variant="body2" component="div">
              <ArrowRightIcon color="primary" />
              시간 : {formatTimeStamp(data.arrivalDatetimes)}
            </Typography>
          </CardContent>

          <CardActions disableSpacing>
            <ExpandMore
              expand={data.expanded}
              onClick={() => handleExpandClick(data.reqId)}
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>

          {/* 상세보기 */}
          <Collapse in={data.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={3} md={4}>
                  <ThemeProvider theme={theme}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "background.default",
                        display: "grid",
                        gridTemplateColumns: { md: "1fr 1fr" },
                        gap: 2,
                      }}
                    >
                      <Item>화물정보</Item>
                      <Typography>크기 : {data.cwidth} m {data.cverticalreal} m {data.cheight} m</Typography>
                      <Typography>중량 : {data.cweight} ㎏</Typography>
                      <Typography>체적 : {(data.cwidth * data.cverticalreal * data.cheight).toFixed(1)} ㎥</Typography>
                    </Box>
                  </ThemeProvider>

                  {/* 화주 이미지  */}
                  <ImageList sx={{ width: 400, height: 200 }}>
                    {data.images.map(image => (
                      <img
                        src={image.contents}
                        onClick={() => openImageViewer(image.imageSeq)}
                        width="200"
                        key={image.imageId}
                        style={{ margin: "1px" }}
                        alt=""
                      />
                    ))}

                    {isViewerOpen && (
                      <ImageViewer
                        src={data.images}
                        currentIndex={currentImage}
                        onClose={closeImageViewer}
                        disableScroll={false}
                        backgroundStyle={{
                          backgroundColor: "rgba(0,0,0,0.9)",
                        }}
                        closeOnClickOutside={true}
                      />
                    )}
                  </ImageList>
                </Grid>
              </Grid>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    </Container>
    )
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* app bar component */}
      <Appbar />

      {/* 상단 이미지 */}
      <Container sx={{ py: 1 }} maxWidth="md">
        {/* 모달 이미지  */}

        {/* End hero unit */}
        <Grid item xs={12} sm={3} md={4}>
          <Grid container spacing={1}>
            <Grid>
              <ImageList sx={{ width: 800, height: 250 }}>
                <ImageListItem cols={cols} rows={rows}>
                  <img
                    width="100%"
                    src="./image/5.jpg"
                    // srcSet="./image/6.jpg?w=400&fit=crop&auto=format&dpr=1 1x"
                    alt="이용내역"
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title="이용내역"
                    actionIcon={
                      <IconButton
                        sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        aria-label={`info about 이용내역`}
                      ></IconButton>
                    }
                  />
                </ImageListItem>
              </ImageList>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      {/* 상단 이미지 끝*/}

      <Container sx={{ py: 2 }} maxWidth="md">
        <Stack spacing={1}>
          <Item>1. 현재 진행중인 운송내역</Item>
        </Stack>
      </Container>

      {renderCardContent}

      <Container sx={{ py: 2 }} maxWidth="md">
        <Stack spacing={1}>
          <Item>2. 이전 운송내역</Item>
        </Stack>
      </Container>

      <Container sx={{ py: 1 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={1}>
          {/* 이용내역보기 */}
          <Card
            sx={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Stack sx={{ py: 1 }} direction="row" spacing={1}>
                <Chip label="운송완료" color="success" />
              </Stack>
              <Divider />
              <Typography gutterBottom variant="body2" component="div">
                <ArrowRightIcon color="primary" />
                상차지 : 서울특별시 강남구 테헤란로 1
              </Typography>
              <Divider />
              <Typography gutterBottom variant="body2" component="div">
                <ArrowRightIcon color="primary" />
                시간 : 2022년 5월 11일 11시 00분
              </Typography>
              <Divider />
              <Typography gutterBottom variant="body2" component="div">
                <ArrowRightIcon color="primary" />
                하차지 : 서울특별시 강남구 테헤란로 1
              </Typography>
              <Divider />
              <Typography gutterBottom variant="body2" component="div">
                <ArrowRightIcon color="primary" />
                시간 : 2022년 5월 11일 11시 00분
              </Typography>
            </CardContent>

            {/* <CardMedia
              component="img"
              sx={{ width: 100 }}
              image="/static/images/cards/live-from-space.jpg"
              alt="매칭완료"
            /> */}
          </Card>
        </Grid>
      </Container>
      <Container sx={{ py: 1 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={1}>
          {/* 이용내역보기 */}
          <Card
            sx={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Stack sx={{ py: 1 }} direction="row" spacing={1}>
                <Chip label="운송취소" color="error" />
              </Stack>
              <Divider />
              <Typography gutterBottom variant="body2" component="div">
                <ArrowRightIcon color="primary" />
                상차지 : 서울특별시 강남구 테헤란로 1
              </Typography>
              <Divider />
              <Typography gutterBottom variant="body2" component="div">
                <ArrowRightIcon color="primary" />
                시간 : 2022년 5월 11일 11시 00분
              </Typography>
              <Divider />
              <Typography gutterBottom variant="body2" component="div">
                <ArrowRightIcon color="primary" />
                하차지 : 서울특별시 강남구 테헤란로 1
              </Typography>
              <Divider />
              <Typography gutterBottom variant="body2" component="div">
                <ArrowRightIcon color="primary" />
                시간 : 2022년 5월 11일 11시 00분
              </Typography>
            </CardContent>

            {/* <CardMedia
              component="img"
              sx={{ width: 100 }}
              image="/static/images/cards/live-from-space.jpg"
              alt="매칭완료"
            /> */}
          </Card>
        </Grid>
      </Container>
      <Footer />
      {/* End footer */}
    </ThemeProvider>
  );
}
export default UseList;
