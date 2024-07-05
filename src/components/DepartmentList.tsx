import React, { useState } from 'react';
import { Checkbox, List, ListItem, ListItemText, IconButton, Collapse } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

const departments = [
  {
    name: 'Agriculture & Fishing (5)',
    subDepartments: ['Agriculture', 'Crops', 'Farming Animals & Livestock', 'Fishery & Aquaculture', 'Ranching'],
  },
  {
    name: 'Business Services (8)',
    subDepartments: ['Accounting & Accounting', 'Services', 'Auctions', 'Business Services - General','Call Centers & Business Centers', 'Career Planning','Commercial Printing','Debt Collection'],
  },
];

const DepartmentList = () => {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const handleToggle = (department: string) => {
    setOpen(prev => ({ ...prev, [department]: !prev[department] }));
  };

  const handleSelect = (department: string, subDepartment: string | null = null) => {
    if (subDepartment) {
      setSelected(prev => ({
        ...prev,
        [`${department}-${subDepartment}`]: !prev[`${department}-${subDepartment}`],
      }));
    } else {
      const allSelected = departments
        .find(dept => dept.name === department)
        ?.subDepartments.every(subDept => selected[`${department}-${subDept}`]);
      if (allSelected) {
        setSelected(prev => {
          const updated = { ...prev };
          departments.find(dept => dept.name === department)?.subDepartments.forEach(subDept => {
            updated[`${department}-${subDept}`] = false;
          });
          return updated;
        });
      } else {
        setSelected(prev => {
          const updated = { ...prev };
          departments.find(dept => dept.name === department)?.subDepartments.forEach(subDept => {
            updated[`${department}-${subDept}`] = true;
          });
          return updated;
        });
      }
    }
  };

  return (
    <List>
      {departments.map(dept => (
        <div key={dept.name}>
          <ListItem button onClick={() => handleToggle(dept.name)}>
            <Checkbox
              checked={dept.subDepartments.every(subDept => selected[`${dept.name}-${subDept}`])}
              indeterminate={dept.subDepartments.some(subDept => selected[`${dept.name}-${subDept}`])}
              onChange={() => handleSelect(dept.name)}
            />
            <ListItemText primary={dept.name} />
            {open[dept.name] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open[dept.name]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {dept.subDepartments.map(subDept => (
                <ListItem key={subDept} style={{ paddingLeft: 32 }}>
                  <Checkbox
                    checked={selected[`${dept.name}-${subDept}`] || false}
                    onChange={() => handleSelect(dept.name, subDept)}
                  />
                  <ListItemText primary={subDept} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentList;
