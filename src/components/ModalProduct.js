import React from 'react';
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import axios from 'axios';

const ModalUpdateProduct = ({ isModalOpen, handleCloseModal, initialName, initialPrice, id }) => {
    const [name, setName] = React.useState(initialName || '');
    const [price, setPrice] = React.useState(initialPrice || 0);
    const [categoriesOptions, setCategoriesOptions] = React.useState([]);
    const [category, setCategory] = React.useState('');

    React.useEffect(() => {
        async function getData() {
            try {
                const user = await axios.get('https://ylovcox4jb.execute-api.us-east-1.amazonaws.com/list-category');
                setCategoriesOptions(user.data.response);
            } catch (e) {
                console.error('Error fetching category data:', e);
            }
        }

        setName(initialName);
        setPrice(initialPrice);
        getData();
    }, [initialName, initialPrice]);

    const updateProduct = async () => {
        if (!name || !price || !category || name === '' || category === '') {
            window.alert('Please fill in all required fields.');
            return;
        }

        if (price < 0) {
            window.alert('price cannot be negative');
            return;
        }

        const confirmUpdate = window.confirm('Are you sure you want to update the name of this product?');
        if (confirmUpdate) {
            try {
                await axios.put(`https://ylovcox4jb.execute-api.us-east-1.amazonaws.com/product/${id}`, { name, price, category });
                window.alert('Product Updated');
                handleCloseModal();
            } catch (error) {
                console.error('Error updating product:', error);
            }
        }
    };

    return (
        <Modal
            open={isModalOpen}
            onClose={handleCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h5" id="modal-title" gutterBottom>
                    Edit Product
                </Typography>
                <TextField
                    required
                    label="New Name"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    required
                    label="New Price"
                    type="number"
                    fullWidth
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" required>Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Categories"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categoriesOptions.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button style={{ marginTop: '4%' }} variant="outlined" onClick={handleCloseModal} sx={{ mr: 2 }}>
                    Cancel
                </Button>
                <Button style={{ marginTop: '4%' }} variant="contained" onClick={updateProduct}>
                    Update
                </Button>
            </Box>
        </Modal>
    );
};

export default ModalUpdateProduct;
