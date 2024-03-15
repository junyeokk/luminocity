import { useState } from "react";
import {
  Box,
  ListItemDecorator,
  Tabs,
  TabList,
  Tab,
  tabClasses,
} from "@mui/joy";
import { Paper, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import useBannerRanking from "../hooks/useBannerRanking";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Search from "@mui/icons-material/Search";

const Leaderboard = () => {
  const [value, setValue] = useState("1");
  const bannerRankings = useBannerRanking();
  const [index, setIndex] = useState(0);
  const colors = ["primary", "danger", "success", "warning"];

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setIndex(newValue);
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
            <Typography variant="subtitle2">{`${item.points}명`}</Typography>
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
            <Typography variant="subtitle2">{`${item.points}명`}</Typography>
          </Paper>
        );
      }
    });

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          size="lg"
          value={index}
          onChange={handleChange}
          sx={(theme) => ({
            p: 1,
            borderRadius: 16,
            maxWidth: 400,
            mx: "auto",
            boxShadow: theme.shadow.sm,
            "--joy-shadowChannel":
              theme.vars.palette[colors[index]].darkChannel,
            [`& .${tabClasses.root}`]: {
              py: 1,
              flex: 1,
              transition: "0.3s",
              fontWeight: "md",
              fontSize: "sm",
              [`&:not(.${tabClasses.selected}):not(:hover)`]: {
                opacity: 0.7,
              },
            },
          })}
        >
          <TabList
            variant="plain"
            size="sm"
            disableUnderline
            sx={{ borderRadius: "lg", p: 0 }}
          >
            <Tab
              label="현수막지정게시대"
              value="1"
              disableIndicator
              orientation="vertical"
              {...(index === 0 && { color: colors[0] })}
            >
              <ListItemDecorator>
                <HomeRoundedIcon />
              </ListItemDecorator>
              현수막
            </Tab>
            <Tab
              label="동사무소게시판"
              value="2"
              disableIndicator
              orientation="vertical"
              {...(index === 1 && { color: colors[1] })}
            >
              <ListItemDecorator>
                <FavoriteBorder />
              </ListItemDecorator>
              동사무소
            </Tab>
            <Tab
              label="분류없음"
              value="3"
              disableIndicator
              orientation="vertical"
              {...(index === 2 && { color: colors[2] })}
            >
              <ListItemDecorator>
                <Search />
              </ListItemDecorator>
              분류없음
            </Tab>
          </TabList>
        </Tabs>
      </Box>
      <TabPanel value="1" sx={{ p: 0 }}>
        {renderListItems(bannerRankings)}
      </TabPanel>
      <TabPanel value="2" sx={{ p: 0 }}>
        {renderListItems(leaderboardData.officeBoard)}
      </TabPanel>
      <TabPanel value="3" sx={{ p: 0 }}>
        {renderListItems(leaderboardData.none)}
      </TabPanel>
    </TabContext>
  );
};

export default Leaderboard;
