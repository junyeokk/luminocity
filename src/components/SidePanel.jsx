/* eslint-disable react/prop-types */
import Drawer from "@mui/joy/Drawer";
import Sheet from "@mui/joy/Sheet";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import LocationIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import PopulationChart from "../common/charts/PopulationChart";
import ModalClose from "@mui/joy/ModalClose";
import { Divider, Box } from "@mui/material";
import DialogTitle from "@mui/joy/DialogTitle";

const SidePanel = ({ selectedMarker, isOpen, onClose }) => {
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      variant="plain"
      size="lg"
      PaperProps={{
        sx: {
          "--Drawer-transitionDuration": open ? "0.4s" : "0.2s",
          "--Drawer-transitionFunction": open
            ? "cubic-bezier(0.79,0.14,0.15,0.86)"
            : "cubic-bezier(0.77,0,0.18,1)",
        },
      }}
      slotProps={{
        content: {
          sx: {
            bgcolor: "transparent",
            p: { md: 3, sm: 0 },
            boxShadow: "none",
          },
        },
      }}
    >
      <Sheet
        sx={{
          borderRadius: "md",
          p: 6,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          height: "100%",
          overflow: "auto",
          typography: "body2",
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
        }}
      >
        <DialogTitle>장소 정보</DialogTitle>
        <ModalClose />
        <Divider sx={{ mt: "auto" }} />
        <List sx={{ padding: 0 }}>
          {selectedMarker ? (
            <>
              <ListItem sx={{ gap: 2, alignItems: "center", mb: 2 }}>
                <LocationIcon sx={{ color: "#1976d2", fontSize: "2.5rem" }} />
                <ListItemContent>
                  <Typography level="body1" sx={{ fontSize: "1rem" }}>
                    {selectedMarker.markerName}
                  </Typography>
                </ListItemContent>
              </ListItem>
              <Divider sx={{ mb: 3 }} />
              <ListItem sx={{ gap: 2, alignItems: "center", mb: 3 }}>
                <PeopleIcon sx={{ color: "#d32f2f", fontSize: "2.5rem" }} />
                <ListItemContent>
                  <Typography level="body1" sx={{ fontSize: "1rem" }}>
                    3개월(2023.09 ~ 2023.12)간 평균 유동인구
                  </Typography>
                </ListItemContent>
              </ListItem>
              <Box sx={{ width: "100%" }}>
                <PopulationChart />
              </Box>
            </>
          ) : (
            <ListItem>
              <ListItemContent>
                <Typography sx={{ color: "#757575", fontSize: "1rem" }}>
                  선택된 마커 정보가 없습니다.
                </Typography>
              </ListItemContent>
            </ListItem>
          )}
        </List>
      </Sheet>
    </Drawer>
  );
};

export default SidePanel;
