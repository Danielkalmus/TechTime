import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ClientList from './ClientList';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

function TabbedCustomerLists() {
  const [tabs, setTabs] = useState([{ id: 1, name: 'Tab 1' }]);
  const [activeTab, setActiveTab] = useState(0);
  const [editingTabId, setEditingTabId] = useState(null);
  const [editedTabName, setEditedTabName] = useState('');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAddTab = () => {
    const newTab = { id: Date.now(), name: `Tab ${tabs.length + 1}` };
    setTabs([...tabs, newTab]);
    setActiveTab(tabs.length);
  };

  const handleDeleteTab = (id) => {
    const updatedTabs = tabs.filter(tab => tab.id !== id);
    setTabs(updatedTabs);
    setActiveTab(0);
  };

  const handleEditTab = (id, name) => {
    setEditingTabId(id);
    setEditedTabName(name);
  };

  const handleSaveEdit = (id) => {
    const updatedTabs = tabs.map(tab => {
      if (tab.id === id) {
        return { ...tab, name: editedTabName };
      }
      return tab;
    });
    setTabs(updatedTabs);
    setEditingTabId(null);
  };

  return (
    <Box sx={{ width: '100%', marginTop: '20px' }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        sx={{ backgroundColor: '#013334', color: '#becaa1' }} // Apply background and text color here
      >
        {tabs.map((tab, index) => (
          <Tab
            key={tab.id}
            label={
              editingTabId === tab.id ? (
                <Box display="flex" alignItems="center">
                  <input
                    type="text"
                    value={editedTabName}
                    onChange={(e) => setEditedTabName(e.target.value)}
                  />
                  <IconButton size="small" onClick={() => handleSaveEdit(tab.id)}>
                    <CheckIcon fontSize="small" />
                  </IconButton>
                </Box>
              ) : (
                <Box display="flex" alignItems="center">
                  {tab.name}
                  <IconButton size="small" onClick={() => handleEditTab(tab.id, tab.name)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>
              )
            }
            onClose={() => handleDeleteTab(tab.id)}
          />
        ))}
        <IconButton size="small" onClick={handleAddTab}>
          <AddIcon fontSize="small" />
        </IconButton>
      </Tabs>
      {tabs.map((tab, index) => (
        <Box
          key={tab.id}
          role="tabpanel"
          hidden={activeTab !== index}
          id={`tabpanel-${index}`}
          aria-labelledby={`tab-${index}`}
          sx={{ display: activeTab === index ? 'block' : 'none' }}
        >
          <ClientList />
        </Box>
      ))}
    </Box>
  );
}

export default TabbedCustomerLists;
