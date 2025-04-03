import React from 'react';
import { Box, Container, Paper, Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import { FenceCalculatorProvider } from './context/FenceCalculatorContext';

// Import modular components
import BasicInformation from './components/FenceCalculatorModules/BasicInformation';
import PullSection from './components/FenceCalculatorModules/PullSection';
import GatesSection from './components/FenceCalculatorModules/GatesSection';
import PostsSection from './components/FenceCalculatorModules/PostsSection';
import AdditionalInfoSection from './components/FenceCalculatorModules/AdditionalInfoSection';
import ExtraWorkSection from './components/FenceCalculatorModules/ExtraWorkSection';
import CostBreakdownSection from './components/FenceCalculatorModules/CostBreakdownSection';
import Proposal from './components/FenceCalculatorModules/Proposal';
import QuestionnaireSection from './components/FenceCalculatorModules/QuestionnaireSection';

const steps = [
  'Questionnaire',
  'Basic Information',
  'Pull Section',
  'Gates',
  'Posts',
  'Additional Info',
  'Extra Work',
  'Cost Breakdown',
  'Proposal'
];

const FenceCalculatorRefactored = ({ customerData = {} }) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <QuestionnaireSection />;
      case 1:
        return <BasicInformation />;
      case 2:
        return <PullSection />;
      case 3:
        return <GatesSection />;
      case 4:
        return <PostsSection />;
      case 5:
        return <AdditionalInfoSection />;
      case 6:
        return <ExtraWorkSection />;
      case 7:
        return <CostBreakdownSection />;
      case 8:
        return <Proposal />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <FenceCalculatorProvider customerData={customerData}>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 3, mt: 3, mb: 3 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Fence Calculator (Refactored)
          </Typography>
          
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <Box>
            {activeStep === steps.length ? (
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you're finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </Box>
            ) : (
              <Box>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </FenceCalculatorProvider>
  );
};

export default FenceCalculatorRefactored;
