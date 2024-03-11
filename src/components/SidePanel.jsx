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

const SidePanel = ({ selectedMarker, isOpen, onClose }) => {
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      sx={{ width: 300, bgcolor: "background.default" }}
    >
      <Sheet
        sx={{
          width: "100%",
          height: "100%",
          overflow: "auto",
          p: 2,
          typography: "body2",
        }}
      >
        <Typography
          level="h6"
          component="h2"
          sx={{ mb: 2, color: "primary.dark" }}
        >
          마커 정보
        </Typography>
        <List>
          {selectedMarker ? (
            <>
              <ListItem sx={{ gap: 2, alignItems: "flex-start", mb: 1 }}>
                <LocationIcon
                  sx={{ color: "primary.main", fontSize: "1.5rem" }}
                />
                <ListItemContent>
                  <Typography level="body1" sx={{ fontWeight: "bold" }}>
                    {selectedMarker.markerName}
                  </Typography>
                </ListItemContent>
              </ListItem>
              <ListItem sx={{ gap: 2, alignItems: "flex-start" }}>
                <PeopleIcon
                  sx={{ color: "primary.main", fontSize: "1.5rem" }}
                />
                <ListItemContent>
                  <Typography level="body1" sx={{ fontWeight: "bold" }}>
                    최근 3개월간 평균 유동인구
                  </Typography>
                </ListItemContent>
              </ListItem>
              <ListItem sx={{ gap: 2, alignItems: "flex-start" }}>
                <PopulationChart />
              </ListItem>
            </>
          ) : (
            <ListItem>
              <ListItemContent>
                <Typography sx={{ color: "text.primary" }}>
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
