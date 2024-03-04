import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const ModalUpdateCategory = ({ isModalOpen, handleCloseModal, initialName, id }) => {
    const [name, setName] = React.useState(initialName || '');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleUpdateCategory = async () => {
        const confirmUpdate = window.confirm("Are you sure you want to update the name of this category?");
        if (confirmUpdate) {
            try {
                await axios.put(`https://ylovcox4jb.execute-api.us-east-1.amazonaws.com/category/${id}`, { name });
                window.alert("Category Updated");
                handleCloseModal(); // Fechar o modal após a atualização bem-sucedida
            } catch (error) {
                console.error('Error updating category:', error);
            }
        }
    };

    React.useEffect(() => {
        setName(initialName);
    }, [initialName]);

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
                    Edit Name
                </Typography>
                <TextField
                    label="New Name"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={handleNameChange}
                    sx={{ mb: 2 }}
                />
                <Button variant="outlined" onClick={handleCloseModal} sx={{ mr: 2 }}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleUpdateCategory}>
                    Update
                </Button>
            </Box>
        </Modal>
    );
};

export default ModalUpdateCategory;
