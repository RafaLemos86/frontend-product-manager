import * as React from 'react';
import {
    Button,
    Paper,
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Table
} from '@mui/material';
import axios from "axios";
import ModalUpdateProduct from './ModalProduct';

function ProductList(props) {
    const [rows, setRows] = React.useState([]);
    const [isModalOpen, setModalOpen] = React.useState(false);
    const [initialName, setInitialName] = React.useState('');
    const [initialPrice, setInitialPrice] = React.useState(0);
    const [id, setId] = React.useState(0);

    const handleOpenModal = (name, price, id) => {
        setInitialName(name);
        setInitialPrice(price);
        setId(id);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    React.useEffect(() => {
        async function getData() {
            try {
                const user = await axios.get("https://ylovcox4jb.execute-api.us-east-1.amazonaws.com/list-product")
                setRows(user.data.response)
            } catch (e) {
                console.error('Error fetching product data:', e);
            }
        };
        getData();
    }, []); // Removido setRows da dependência, já que não está sendo modificado no useEffect

    const deleteProduct = async (deleteId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            try {
                await axios.delete(`https://ylovcox4jb.execute-api.us-east-1.amazonaws.com/product/${deleteId}`);
                setRows((prevRows) => prevRows.filter(row => row.id !== deleteId));
                window.alert("Product removed");
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    return (
        <TableContainer component={Paper}>
            <div variant="h5" style={{ marginBottom: "2%" }}>
                {props.text}
            </div>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>Price</TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>Category</TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>R$ {row.price.toFixed(2)}</TableCell>
                            <TableCell>{row.category}</TableCell>
                            <TableCell>
                                <Button style={{ marginRight: '5%' }} variant="outlined" color="error" onClick={() => deleteProduct(row.id)}> Delete </Button>
                                <Button variant="outlined" color="warning" onClick={() => handleOpenModal(row.name, row.price, row.id)}> Update </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <ModalUpdateProduct isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} initialName={initialName} initialPrice={initialPrice} id={id} />
        </TableContainer>
    );
}

export default ProductList;
