/* eslint-disable react/prop-types */
import { useMemo } from "react";
import Drawer from "@mui/joy/Drawer";
import Sheet from "@mui/joy/Sheet";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import PopulationChart from "../common/charts/PopulationChart";
import ModalClose from "@mui/joy/ModalClose";
import { Divider, Box } from "@mui/material";
import DialogTitle from "@mui/joy/DialogTitle";
import csvData from "../assets/jsonData/markers.json";
import BarChartIcon from "@mui/icons-material/BarChart";
import calculateRanking from "./calculateRanking";
import MoneyIcon from "@mui/icons-material/Paid";

const SidePanel = ({ selectedMarker, isOpen, onClose }) => {
  const ranking = useMemo(() => {
    return selectedMarker ? calculateRanking(selectedMarker.markerId) : null;
  }, [selectedMarker]);
  const pricePerWeek = useMemo(() => {
    return selectedMarker ? selectedMarker.pricePerWeek : null;
  }, [selectedMarker]);
  const totalPlaces = csvData.length;

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      variant="plain"
      size="lg"
      paperprops={{
        sx: {
          "--Drawer-transitionDuration": isOpen ? "0.4s" : "0.2s",
          "--Drawer-transitionFunction": isOpen
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
              {/** 장소 이름 */}
              <ListItem sx={{ gap: 2, alignItems: "center", mb: 2 }}>
                <LocationOnIcon sx={{ color: "#1976d2", fontSize: "2.5rem" }} />
                <ListItemContent>
                  <Typography
                    level="body1"
                    sx={{ fontSize: "1rem", fontWeight: "bold" }}
                  >
                    {selectedMarker.markerName}
                  </Typography>
                </ListItemContent>
              </ListItem>
              <Divider sx={{ mb: 3 }} />

              {/** 유동인구 */}
              <ListItem sx={{ gap: 2, alignItems: "center", mb: 3 }}>
                <PeopleIcon sx={{ color: "#d32f2f", fontSize: "2.5rem" }} />
                <ListItemContent>
                  <Typography
                    level="body1"
                    sx={{ fontSize: "1rem", fontWeight: "bold" }}
                  >
                    3개월(2023.09 ~ 2023.12)간 유동인구
                  </Typography>
                </ListItemContent>
              </ListItem>
              <Box sx={{ width: "100%" }}>
                <PopulationChart selectedMarkerId={selectedMarker?.markerId} />
              </Box>

              {/** 랭킹 */}
              <Divider sx={{ mt: 3, mb: 3 }} />
              <ListItem sx={{ gap: 2, alignItems: "center", mb: 3 }}>
                <BarChartIcon sx={{ color: "#008080", fontSize: "2.5rem" }} />
                <ListItemContent sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      level="body1"
                      sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                      유동인구 랭킹
                    </Typography>
                    <Typography
                      level="body1"
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontSize: "2.3rem" }}>{ranking} </span>
                      <span style={{ color: "#989898" }}>/ {totalPlaces}</span>
                    </Typography>
                  </Box>
                </ListItemContent>
              </ListItem>

              {/** 가격 정보 */}
              <Divider sx={{ mb: 3 }} />
              <ListItem sx={{ gap: 2, alignItems: "center", mb: 3 }}>
                <MoneyIcon sx={{ color: "#FFD700", fontSize: "2.5rem" }} />
                <ListItemContent sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      level="body1"
                      sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                      게시 비용
                    </Typography>
                    <Typography
                      level="body1"
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontSize: "2.3rem" }}>{pricePerWeek}</span>
                      <span style={{ color: "#989898" }}> / 7일</span>
                    </Typography>
                  </Box>
                </ListItemContent>
              </ListItem>
            </>
          ) : (
            <ListItem>
              <ListItemContent>
                <Typography
                  sx={{
                    color: "#757575",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
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
