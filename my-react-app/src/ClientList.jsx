import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';

function ClientList() {
  const [clients, setClients] = useState(["Client 1", "Client 2", "Client 3"]);
  const [newClientName, setNewClientName] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editClientName, setEditClientName] = useState('');

  const handleAddClient = () => {
    if (newClientName.trim() !== '') {
      setClients([...clients, newClientName]);
      setNewClientName('');
    }
  };

  const handleDeleteClient = (index) => {
    const updatedClients = [...clients];
    updatedClients.splice(index, 1);
    setClients(updatedClients);
  };

  const handleEditClient = (index) => {
    setEditingIndex(index);
    setEditClientName(clients[index]);
  };

  const handleSaveEdit = (index) => {
    const updatedClients = [...clients];
    updatedClients[index] = editClientName;
    setClients(updatedClients);
    setEditingIndex(null);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditClientName('');
  };

  return (
    <List>
      {clients.map((client, index) => (
        <ListItem key={index} sx={{ backgroundColor: '#becaa1', color: '#4D2114' }}>
          {editingIndex === index ? (
            <>
              <TextField
                value={editClientName}
                onChange={(e) => setEditClientName(e.target.value)}
                fullWidth
              />
              <IconButton onClick={() => handleSaveEdit(index)} aria-label="save">
                <AddIcon />
              </IconButton>
              <IconButton onClick={handleCancelEdit} aria-label="cancel">
                <DeleteIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Checkbox />
              <ListItemText primary={client} />
              <IconButton onClick={() => handleEditClient(index)} aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteClient(index)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </ListItem>
      ))}
      <ListItem sx={{ backgroundColor: '#becaa1' }}>
        <TextField
          value={newClientName}
          onChange={(e) => setNewClientName(e.target.value)}
          fullWidth
          placeholder="Enter client name"
        />
        <IconButton onClick={handleAddClient} aria-label="add">
          <AddIcon />
        </IconButton>
      </ListItem>
    </List>
  );
}

export default ClientList;
