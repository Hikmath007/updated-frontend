import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Stack, Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Logo from "../../assets/icons/logo.svg";
import PoweredByLogo from "../../assets/icons/powered_by.svg";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import DrawerMenu from "./DrawerMenu";

const drawerWidth = 220;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  marginLeft: open ? drawerWidth : 0,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const drawerTheme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "white",
          boxShadow: "5px 0px 5px 0px rgba(0, 0, 0, 0.06)",
        },
      },
    },
  },
});

const Layout = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [initials, setInitials] = React.useState<string>("");

  function extractInitials(fullName: string) {
    const nameParts = fullName.split(" ");
    if (nameParts.length > 1) {
      const firstNameInitial = nameParts[0].charAt(0).toUpperCase();
      const lastNameInitial = nameParts[1].charAt(0).toUpperCase();
      return `${firstNameInitial}${lastNameInitial}`;
    } else {
      return nameParts[0].charAt(0).toUpperCase();
    }
  }

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  return (
    <>
      <Box className="effigo-navbar">
        <ThemeProvider theme={drawerTheme}>
          <Drawer
            variant="permanent"
            open={open}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <DrawerHeader />
            <DrawerMenu open={open} />
            <Stack position="absolute" bottom={30} marginLeft={1}>
              <PoweredByLogo />
            </Stack>
          </Drawer>
        </ThemeProvider>
        <AppBar position="fixed" open={open} color="inherit">
          <Toolbar>
            <Stack>
              <Logo />
            </Stack>
            <Stack
              direction="row"
              justifyContent="flex-end"
              width={"100%"}
              alignItems="center"
              gap={1}
            >
              <IconButton color="primary">
                <NotificationsOutlinedIcon />
              </IconButton>
              <Avatar
                sx={{
                  fontSize: "16px",
                  height: "34px",
                  width: "34px",
                  color: "black",
                  backgroundColor: "rgba(28, 61, 114, 0.10)",
                }}
                alt=""
              >
                U
              </Avatar>
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Layout;
