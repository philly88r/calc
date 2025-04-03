import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  FormGroup,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material';
import { useFenceCalculator } from '../../context/FenceCalculatorContext';

const QuestionnaireSection = () => {
  const {
    questionnaire,
    questionnaireLoading,
    questionnaireError,
    questionnaireAnswers,
    handleQuestionnaireAnswer
  } = useFenceCalculator();

  if (questionnaireLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (questionnaireError) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {questionnaireError}
      </Alert>
    );
  }

  if (!questionnaire.sections || questionnaire.sections.length === 0) {
    return (
      <Alert severity="info" sx={{ mb: 3 }}>
        No questionnaire data available. Please check your database connection.
      </Alert>
    );
  }

  // Render a question based on its type
  const renderQuestion = (question) => {
    const value = questionnaireAnswers[question.id] || '';
    
    switch (question.type) {
      case 'text':
        return (
          <TextField
            fullWidth
            label={question.label}
            value={value}
            onChange={(e) => handleQuestionnaireAnswer(question.id, e.target.value)}
            margin="normal"
            helperText={question.help_text}
          />
        );
        
      case 'number':
        return (
          <TextField
            fullWidth
            label={question.label}
            type="number"
            value={value}
            onChange={(e) => handleQuestionnaireAnswer(question.id, e.target.value)}
            margin="normal"
            helperText={question.help_text}
          />
        );
        
      case 'select':
        const options = question.options ? JSON.parse(question.options) : [];
        return (
          <FormControl fullWidth margin="normal">
            <InputLabel>{question.label}</InputLabel>
            <Select
              value={value}
              onChange={(e) => handleQuestionnaireAnswer(question.id, e.target.value)}
              label={question.label}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
        
      case 'radio':
        const radioOptions = question.options ? JSON.parse(question.options) : [];
        return (
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">{question.label}</FormLabel>
            <RadioGroup
              value={value}
              onChange={(e) => handleQuestionnaireAnswer(question.id, e.target.value)}
            >
              {radioOptions.map((option) => (
                <FormControlLabel 
                  key={option.value} 
                  value={option.value} 
                  control={<Radio />} 
                  label={option.label} 
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
        
      case 'checkbox':
        const checkboxOptions = question.options ? JSON.parse(question.options) : [];
        const checkboxValues = value ? (Array.isArray(value) ? value : [value]) : [];
        
        return (
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">{question.label}</FormLabel>
            <FormGroup>
              {checkboxOptions.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={checkboxValues.includes(option.value)}
                      onChange={(e) => {
                        const newValues = e.target.checked
                          ? [...checkboxValues, option.value]
                          : checkboxValues.filter(v => v !== option.value);
                        handleQuestionnaireAnswer(question.id, newValues);
                      }}
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormGroup>
          </FormControl>
        );
        
      default:
        return (
          <Typography color="error">
            Unknown question type: {question.type}
          </Typography>
        );
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Fence Questionnaire
      </Typography>
      
      {questionnaire.sections.map((section) => {
        const sectionQuestions = questionnaire.questionsBySectionId[section.id]?.questions || [];
        
        if (sectionQuestions.length === 0) {
          return null;
        }
        
        return (
          <Card key={section.id} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {section.title}
              </Typography>
              
              {section.description && (
                <Typography variant="body2" color="text.secondary" paragraph>
                  {section.description}
                </Typography>
              )}
              
              <Divider sx={{ my: 2 }} />
              
              {sectionQuestions.map((question) => (
                <Box key={question.id} sx={{ mb: 3 }}>
                  {renderQuestion(question)}
                </Box>
              ))}
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default QuestionnaireSection;
