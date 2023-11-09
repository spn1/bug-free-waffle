import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Dialog } from "@mui/material";
import { useState } from "react";

export const MobileDialogWrapper = ({ breakpoint, children }) => {
  const [open, setOpen] = useState<boolean>(true);
  const matches = useMediaQuery((theme) => theme.breakpoints.down(breakpoint));

  return matches ? (
    <Dialog
      open={open}
      fullWidth
      maxWidth={breakpoint}
      onClose={() => setOpen(!open)}
    >
      <Box sx={{ p: 4, width: "90%" }}>{children}</Box>
    </Dialog>
  ) : (
    children
  );
};
