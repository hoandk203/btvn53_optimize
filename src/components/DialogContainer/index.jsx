import React, {useContext} from "react";
import {
    DialogTitle,
    Dialog,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";
import DialogContext from "../../store";

export default function ({children, onClose, onSave, width, action, type }) {
    const {state} = useContext(DialogContext);

    return (
        <>
            <Dialog
                open={state.showDialog}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" width={width}>
                    {`${action} ${type}`}
                </DialogTitle>
                <DialogContent>{children}</DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Close</Button>
                    <Button onClick={onSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
