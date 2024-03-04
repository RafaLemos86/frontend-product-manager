import * as React from 'react';
import axios from 'axios';
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
import ModalUpdateCategory from './ModalCategory';


function CategoryList(props) {
    const [rows, setRows] = React.useState([])
    const [isModalOpen, setModalOpen] = React.useState(false);
    const [initialName, setInitialName] = React.useState('');
    const [idCategory, setIdCategory] = React.useState(-1);


    React.useEffect(() => {
        async function getData() {
            try {
                const user = await axios.get("https://ylovcox4jb.execute-api.us-east-1.amazonaws.com/list-category")
                setRows(user.data.response)
            } catch (e) {
                return e
            }
        };

        getData()
    }, [setRows])

    const handleOpenModal = (name, id) => {
        setInitialName(name);
        setIdCategory(id)
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };


    async function deleteCategory(deleteId) {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (confirmDelete) {
            try {
                await axios.delete(`https://ylovcox4jb.execute-api.us-east-1.amazonaws.com/category/${deleteId}`)
                window.alert("Category removed");
                window.location.reload();
            } catch (e) {
                return e
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
                        <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row"> {row.id} </TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>
                                <Button style={{ marginRight: '5%' }} variant="outlined" color="error" onClick={() => deleteCategory(row.id)}> Delete </Button>
                                <Button variant="outlined" color="warning" onClick={() => handleOpenModal(row.name, row.id)}> Update </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

                <ModalUpdateCategory isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} initialName={initialName} id={idCategory} />
            </Table>
        </TableContainer>
    );
}

export default CategoryList
