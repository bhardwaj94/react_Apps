import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

export default function AlertDialog(props) {
    let { open, handleClose, item } = props;
    const bull = <span style={{
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)'
    }}>•</span>;
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography gutterBottom variant="h4" component="h2">
                        {item.name}
                    </Typography></DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography variant="h6" color="textSecondary" component="p">
                            {bull}{item.gravity}
                        </Typography>
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        <Typography variant="h6" color="textSecondary" component="p">
                            {bull}{item.terrain}
                        </Typography>
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        <Typography variant="h6" color="textSecondary" component="p">
                            {bull}{item.population}
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Close
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
