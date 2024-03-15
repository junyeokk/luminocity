import { useState } from "react";
import { Box, Tab, Tabs, Paper, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

const Leaderboard = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const leaderboardData = {
    none: [
      { name: "포항시 죽도로", points: 230 },
      { name: "포항시 대잠로", points: 225 },
      { name: "포항시 희망대로", points: 220 },
      { name: "포항시 해안로", points: 215 },
      { name: "포항시 상공로", points: 210 },
      { name: "포항시 청림로", points: 205 },
    ],
    banner: [
      { name: "연일읍 사거리", points: 245 },
      { name: "우현동 로터리", points: 240 },
      { name: "해도동 교차로", points: 235 },
      { name: "대도동 사거리", points: 230 },
      { name: "용흥동 길", points: 225 },
      { name: "송라면 길", points: 220 },
    ],
    officeBoard: [
      { name: "남구 동사무소", points: 260 },
      { name: "북구 동사무소", points: 255 },
      { name: "상모사곡동 동사무소", points: 250 },
      { name: "장기동 동사무소", points: 245 },
      { name: "환여동 동사무소", points: 240 },
      { name: "대송면 동사무소", points: 235 },
    ],
  };

  const rankColors = ["#FFD700", "#C0C0C0", "#CD7F32"];

  const renderRankIcon = (index) => {
    const rankStyle = {
      width: "30px",
      height: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      backgroundColor: index < 3 ? rankColors[index] : "transparent",
      color: index < 3 ? "white" : "text.secondary",
      boxShadow: index < 3 ? "0px 2px 4px rgba(0,0,0,0.2)" : "none",
      fontWeight: "bold",
    };

    return (
      <Box sx={rankStyle}>
        {index < 3 ? (
          <MilitaryTechIcon sx={{ fontSize: "1.5rem" }} />
        ) : (
          <Typography sx={{ fontWeight: "bold" }}>{index + 1}</Typography>
        )}
      </Box>
    );
  };

  const renderListItems = (data) =>
    data.map((item, index) => {
      if (index < 3) {
        return (
          <Paper
            key={index}
            elevation={1}
            sx={{
              my: 2,
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: 16,
              boxShadow: "0px 6px 12px rgba(0,0,0,0.1)",
              "&:hover": {
                boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
                transform: "translateY(-2px)",
              },
              transition: "box-shadow 0.3s, transform 0.3s",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {renderRankIcon(index)}{" "}
              <Typography
                variant="subtitle1"
                sx={{ ml: 2, fontWeight: "bold" }}
              >
                {item.name}
              </Typography>
            </Box>
            <Typography variant="subtitle2">{`${item.points} points`}</Typography>
          </Paper>
        );
      } else {
        return (
          <Paper
            key={index}
            elevation={1}
            sx={{
              my: 2,
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "32px",
              boxShadow: "0px 6px 12px rgba(0,0,0,0.1)",
              "&:hover": {
                boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
                transform: "translateY(-2px)",
              },
              transition: "box-shadow 0.3s, transform 0.3s",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {renderRankIcon(index)}
              <Typography variant="subtitle1" sx={{ ml: 2 }}>
                {item.name}
              </Typography>
            </Box>
            <Typography variant="subtitle2">{`${item.points} points`}</Typography>
          </Paper>
        );
      }
    });

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="leaderboard tabs"
          variant="fullWidth"
          indicatorColor="primary"
        >
          <Tab label="분류없음" value="1" />
          <Tab label="현수막지정게시대" value="2" />
          <Tab label="동사무소게시판" value="3" />
        </Tabs>
      </Box>
      <TabPanel value="1" sx={{ p: 0 }}>
        {renderListItems(leaderboardData.none)}
      </TabPanel>
      <TabPanel value="2" sx={{ p: 0 }}>
        {renderListItems(leaderboardData.banner)}
      </TabPanel>
      <TabPanel value="3" sx={{ p: 0 }}>
        {renderListItems(leaderboardData.officeBoard)}
      </TabPanel>
    </TabContext>
  );
};

export default Leaderboard;
