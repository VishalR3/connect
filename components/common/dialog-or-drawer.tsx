import { Drawer, DrawerContent } from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  useMediaQuery,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogOrDrawer({
  open,
  handleClose,
  title = undefined,
  maxWidth = "md",
  children,
  ...rest
}: any) {
  const isDesktop = useMediaQuery("(min-width:600px)");
  return isDesktop ? (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth
      {...rest}
    >
      <DialogTitle sx={{ display: title ? "block" : "none" }}>
        {title ?? "Dialog Title"}
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>{children}</DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onClose={handleClose}>
      <DrawerContent
        style={{
          //   minHeight: "70dvh",
          maxHeight: "95dvh",
        }}
      >
        {children}
      </DrawerContent>
    </Drawer>
  );
}
