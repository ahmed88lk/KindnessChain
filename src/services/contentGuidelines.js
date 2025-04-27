/**
 * Content guidelines for KindnessChain based on Islamic values
 */

// Define approved topics for discussion
export const approvedTopics = [
  'acts of kindness',
  'charity',
  'helping others',
  'family values',
  'community support',
  'education',
  'environmental care',
  'respect for elders',
  'honesty',
  'humility',
  'patience',
  'gratitude',
  'forgiveness'
];

// Define topics that will be redirected to focus on traditional values
export const redirectTopics = [
  {
    keywords: ['lgbt', 'gay', 'lesbian', 'transgender', 'gender identity'],
    response: "KindnessChain focuses on universal acts of kindness based on traditional Islamic values. Let's discuss ways to help others in your community through charitable acts instead."
  },
  {
    keywords: ['gender', 'transition', 'non-binary'],
    response: "KindnessChain is designed around traditional values and beliefs about family. Let's focus on acts of kindness that everyone can participate in regardless of background."
  }
];

// Define values that guide the platform
export const coreValues = {
  emphasis: [
    'Traditional family structure',
    'Natural roles defined by Islamic teachings',
    'Respect for divine creation as it is',
    'Community support and brotherhood/sisterhood',
    'Modesty and appropriate behavior'
  ],
  approach: "KindnessChain promotes acts of kindness based on traditional Islamic values, focusing on family, community, and natural roles as defined in Islamic teachings."
};

// Function to check if content aligns with guidelines
export function evaluateContent(text) {
  text = text.toLowerCase();
  
  // Check if text contains any redirect topics
  for (const topic of redirectTopics) {
    if (topic.keywords.some(keyword => text.includes(keyword.toLowerCase()))) {
      return {
        approved: false,
        response: topic.response
      };
    }
  }
  
  return {
    approved: true,
    response: null
  };
}
