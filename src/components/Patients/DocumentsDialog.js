import React, { useState } from 'react'
import { Avatar, Button, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core'
import FolderIcon from "@material-ui/icons/Folder"
import DeleteIcon from '@material-ui/icons/Delete';
import DialogWrapper from '../../common/DialogWrapper'
import { MokeData } from '../../data/Mock'
import { Visibility } from '@material-ui/icons';

const DocumentsDialog = (props) => {



    return (
        <DialogWrapper
            onClose={() => props.onClose()}
            open={props.open}
            title={"Documents"}
            maxWidth="sm"
            content={
                <>
                    <div style={{ height: "400px" }}>
                        {
                            [].length == 0 ? (
                                <h1 style={{width:"100%",textAlign:"center",color:"grey",marginTop:"50px"}}>No Documents Found!</h1>
                            ) : null
                        }
                        {
                            [].map((value, index) => {
                                return (
                                    <ListItem key={index}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FolderIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={value.Document}
                                            secondary={false ? 'Secondary text' : null}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete">
                                                <Visibility />
                                            </IconButton>
                                            <IconButton color="secondary" edge="end" aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>

                                    </ListItem>
                                )
                            })
                        }
                    </div>
                </>
            }
            footerButtons={
                <>
                 <Button
                        onClick={() => props.onClose()}
                        variant="contained"
                        color="primary"
                        style={{ textTransform: "capitalize" }}>
                        Upload
                    </Button>
                    <Button
                        onClick={() => props.onClose()}
                        variant="contained"
                        color="primary"
                        style={{ textTransform: "capitalize" }}>
                        Close
                    </Button>
                </>
            }
        />
    )
}

export default DocumentsDialog
