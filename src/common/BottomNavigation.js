import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { CssBaseline } from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ArchiveIcon from "@mui/icons-material/Archive";

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("recents");
  const ref = React.useRef(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    (ref.current).ownerDocument.body.scrollTop = 0;
  }, []);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={4}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            href="/"
            label="메인"
            icon={<LocationOnIcon />}
          />
          <BottomNavigationAction
            href="/ShipperRequire"
            label="화물의뢰하기"
            icon={<RestoreIcon />}
          />
          <BottomNavigationAction
            href="/UseList"
            label="이용내역"
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            href="/UseList"
            label="고객센타"
            icon={<ArchiveIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
