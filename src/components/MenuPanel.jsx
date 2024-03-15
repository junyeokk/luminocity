/* eslint-disable react/prop-types */
import Drawer from "@mui/joy/Drawer";
import Sheet from "@mui/joy/Sheet";
import ModalClose from "@mui/joy/ModalClose";
import DialogTitle from "@mui/joy/DialogTitle";
import Leaderboard from "./LeaderBoard";
const MenuPanel = ({ isOpen, toggleMenuPanel }) => {
  return (
    <Drawer
      open={isOpen}
      onClose={toggleMenuPanel}
      anchor="left"
      variant="plain"
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
        <DialogTitle>전체 랭킹</DialogTitle>
        <ModalClose />
        <Leaderboard />
      </Sheet>
    </Drawer>
  );
};

export default MenuPanel;
