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
import AdUnitsTwoToneIcon from "@mui/icons-material/AdUnitsTwoTone";
import HomeWorkTwoToneIcon from "@mui/icons-material/HomeWorkTwoTone";
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
    none: [{ name: "준비중입니다.", points: 0 }],
    officeBoard: [{ name: "준비중입니다.", points: 0 }],
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
              my: 3,
              p: 3,
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
                sx={{ ml: 2, fontWeight: "bold", fontSize: 18 }}
              >
                {item.name}
              </Typography>
            </Box>
            <Typography
              variant="subtitle2"
              sx={{ mr: 2, fontWeight: "bold", fontSize: 18 }}
            >{`${item.points}명`}</Typography>
          </Paper>
        );
      } else {
        return (
          <Paper
            key={index}
            elevation={1}
            sx={{
              my: 2.5,
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
            <Typography
              variant="subtitle2"
              sx={{ mr: 2, fontWeight: 600 }}
            >{`${item.points}명`}</Typography>
          </Paper>
        );
      }
    });

  return (
    <TabContext value={value}>
      <Box>
        <Tabs
          size="lg"
          value={index}
          onChange={handleChange}
          sx={(theme) => ({
            p: 2,
            borderRadius: 16,
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
                <AdUnitsTwoToneIcon />
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
                <HomeWorkTwoToneIcon />
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
