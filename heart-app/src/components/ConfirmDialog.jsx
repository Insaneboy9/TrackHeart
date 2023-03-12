import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const MyDialog = styled(DialogTitle)`
  display: flex;
  align-items: center;
  justify-content: center;
  .icon {
    margin-right: 20px;
    font-size: 2rem;
  }
`;

export default function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props;

  return (
    <Dialog
      open={confirmDialog.isOpen}
      onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MyDialog id="alert-dialog-title" sx={{ fontSize: 18 }}>
        <ReportProblemIcon className="icon" />
        {confirmDialog.title}
      </MyDialog>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {confirmDialog.subtitle}
        </DialogContentText>
      </DialogContent>
      <MyDialog>
        <Button
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        >
          No
        </Button>
        <Button onClick={confirmDialog.onConfirm}>Yes</Button>
      </MyDialog>
    </Dialog>
  );
}
