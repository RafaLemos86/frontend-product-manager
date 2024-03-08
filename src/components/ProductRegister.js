import { Card, Typography, Snackbar, Select, FormControl, MenuItem, InputLabel } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios";

function ProductRegister(props) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [categoriesOptions, setCategoriesOptions] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const user = await axios.get("https://ylovcox4jb.execute-api.us-east-1.amazonaws.com/list-category")
                setCategoriesOptions(user.data.response)
            } catch (error) {
                console.error('Error fetching category data:', error);
            }
        };

        getData();
    }, []);

    const postProduct = async () => {
        if (!name || !price || !category || name === '' || category === '') {
            window.alert('Please fill in all fields.');
            return;
        };

        if (price < 0) {
            window.alert('price cannot be negative');
            return;
        };

        try {
            await axios.post("https://ylovcox4jb.execute-api.us-east-1.amazonaws.com/register-product", { name, price, category })
            setShowSuccessMessage(true);
            setName("");
            setPrice("");
            setCategory("");
        } catch (error) {
            console.error('Error posting product:', error);
        }
    };

    return (
        <Card style={{ width: "70%", margin: "auto", marginTop: "50px", padding: "20px" }}>
            <CardContent>
                <Typography variant="h5" style={{ marginBottom: "20px" }}>
                    {props.text}
                </Typography>
                <form>
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <TextField
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            fullWidth
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                        />

                        <TextField
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                            fullWidth
                            type='number'
                            id="outlined-basic"
                            label="Price"
                            variant="outlined"
                        />

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                label="Categories"
                                onChange={(event) => setCategory(event.target.value)}
                            >
                                {categoriesOptions.map(option => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    <Button variant="contained" onClick={postProduct} style={{ marginTop: "20px" }}>
                        Register
                    </Button>
                </form>

                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={showSuccessMessage}
                    autoHideDuration={6000}
                    onClose={() => setShowSuccessMessage(false)}
                    message="Product registered successfully!"
                />
            </CardContent>
        </Card>
    );
}

export default ProductRegister;
