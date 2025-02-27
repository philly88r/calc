import React from 'react';
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Typography 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AccordionSection = ({ title, defaultExpanded = false, children }) => {
  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary 
        expandIcon={<ExpandMoreIcon />}
        sx={{ 
          backgroundColor: '#f8f8f8',
          '&.Mui-expanded': {
            backgroundColor: '#f0f0f0',
          }
        }}
      >
        <Typography variant="h6" sx={{ color: '#6d2f2c' }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionSection;
