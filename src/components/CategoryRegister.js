import { Card, Typography, Grid, Snackbar } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

function CategoryRegister(props) {
    const [name, setName] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const postCategory = async () => {
        try {
            await axios.post("https://ylovcox4jb.execute-api.us-east-1.amazonaws.com/register-category", { name });
            setShowSuccessMessage(true);
            setName("");
        } catch (error) {
            console.error('Error posting category:', error);
            // Aqui, você pode decidir como deseja lidar com o erro, exibindo uma mensagem, por exemplo.
        }
    };

    return (
        <Card style={{ width: "70%", margin: "auto", marginTop: "50px", padding: "20px" }}>
            <CardContent>
                <Typography variant="h5" style={{ marginBottom: "20px" }}>
                    {props.text}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            fullWidth
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
                <Button onClick={postCategory} variant="contained" style={{ marginTop: "20px" }}>
                    Save
                </Button>

                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={showSuccessMessage}
                    autoHideDuration={6000}
                    onClose={() => setShowSuccessMessage(false)}
                    message="Category registered successfully!"
                />
            </CardContent>
        </Card>
    );
}

export default CategoryRegister;
