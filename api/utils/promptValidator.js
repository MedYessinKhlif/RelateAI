
export const verifyPromptRelevance = (prompt) => {
  const keywords = [
    'problem', 'difficulty', 'challenge', 'issue', 'struggle', 'hardship', 
    'suffering', 'bullying', 'abuse', 'pain', 'tough', 'misery', 'adversity',
    'obstacle', 'trauma', 'setback', 'failure', 'loss', 'stress', 'hurt', 
    'oppression', 'grief', 'torment', 'persecution', 'conflict', 'worry', 
    'sorrow', 'discomfort', 'distress', 'unfair', 'frustration', 'disappointment', 
    'misfortune', 'anguish', 'sadness', 'hopelessness', 'despair', 'exploitation'
  ];
    const promptLower = prompt.toLowerCase();
  
  return keywords.some((keyword) => promptLower.includes(keyword));
};