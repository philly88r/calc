import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://kdhwrlhzevzekoanusbs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkaHdybGh6ZXZ6ZWtvYW51c2JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1NTczNDUsImV4cCI6MjA1MzEzMzM0NX0.qAA2en6uQPoTDq9oivjfSHajQjY6VKFQ2ymtwgJAyx8';
const supabase = createClient(supabaseUrl, supabaseKey);

class QuestionnaireService {
  /**
   * Fetch questionnaire data from Supabase
   * @returns {Promise<Array>} - Array of questionnaire items
   */
  async getQuestionnaire() {
    try {
      const { data, error } = await supabase
        .from('fence_questionnaire')
        .select('*')
        .order('order', { ascending: true });
      
      if (error) {
        console.error('Error fetching questionnaire:', error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('Exception fetching questionnaire:', error);
      return [];
    }
  }

  /**
   * Fetch questionnaire sections from Supabase
   * @returns {Promise<Array>} - Array of questionnaire sections
   */
  async getQuestionnaireSections() {
    try {
      const { data, error } = await supabase
        .from('fence_questionnaire_sections')
        .select('*')
        .order('order', { ascending: true });
      
      if (error) {
        console.error('Error fetching questionnaire sections:', error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('Exception fetching questionnaire sections:', error);
      return [];
    }
  }

  /**
   * Fetch complete questionnaire with sections and questions
   * @returns {Promise<Object>} - Questionnaire data organized by sections
   */
  async getCompleteQuestionnaire() {
    try {
      // Fetch sections
      const sections = await this.getQuestionnaireSections();
      
      // Fetch all questions
      const questions = await this.getQuestionnaire();
      
      // Organize questions by section
      const questionnaireData = {};
      
      sections.forEach(section => {
        questionnaireData[section.id] = {
          ...section,
          questions: questions.filter(q => q.section_id === section.id)
        };
      });
      
      return {
        sections,
        questionsBySectionId: questionnaireData
      };
    } catch (error) {
      console.error('Exception fetching complete questionnaire:', error);
      return { sections: [], questionsBySectionId: {} };
    }
  }
}

// Export a singleton instance
const questionnaireService = new QuestionnaireService();
export default questionnaireService;
