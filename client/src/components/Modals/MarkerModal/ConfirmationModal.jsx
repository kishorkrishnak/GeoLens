import { Button, Stack, Typography } from "@mui/material";
import { Modal } from "react-responsive-modal";

const ConfirmationModal = ({ title, isOpen, onClose, onConfirm }) => {
  return (
    <Modal showCloseIcon={false} open={isOpen} onClose={onClose} center>
      <Stack alignItems={"center"} sx={{ py: 2, textAlign: "center" }}>
        <Typography variant="h5">{title}</Typography>
        <Stack sx={{ mt: 2 }} spacing={1} direction={"row"} alignItems="center">
          <Button onClick={onConfirm} color="warning" variant="contained">
            Yes
          </Button>
          <Button
            sx={{
              color: "white",
            }}
            onClick={onClose}
            color="success"
            variant="contained"
          >
            No
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};
export default ConfirmationModal;
