export type ChatAction = {
  label: string
  icon: 'map' | 'download' | 'link'
  url: string
}

/**
 * Derives quick actions based on the content of the AI's response.
 * This logic ensures that users are provided with relevant official links 
 * exactly when they need them.
 */
export const deriveActions = (text: string, language: string): ChatAction[] => {
  const actions: ChatAction[] = []
  const lowerText = text.toLowerCase()

  if (lowerText.includes('form 6') || lowerText.includes('register') || lowerText.includes('new voter') || lowerText.includes('पंजीकरण') || lowerText.includes('फॉर्म 6')) {
    actions.push({ 
      label: language === 'en' ? 'Apply Form 6' : 'फॉर्म 6 भरें', 
      icon: 'link', 
      url: 'https://voters.eci.gov.in/registration-details/1' 
    })
  }
  if (lowerText.includes('voter portal') || lowerText.includes('nvsp') || lowerText.includes('official website') || lowerText.includes('आधिकारिक वेबसाइट')) {
    actions.push({ 
      label: language === 'en' ? 'Voters Portal' : 'मतदाता पोर्टल', 
      icon: 'link', 
      url: 'https://voters.eci.gov.in/' 
    })
  }
  if (lowerText.includes('polling station') || lowerText.includes('booth') || lowerText.includes('constituency') || lowerText.includes('मतदान केंद्र')) {
    actions.push({ 
      label: language === 'en' ? 'Find Polling Station' : 'मतदान केंद्र खोजें', 
      icon: 'map', 
      url: 'https://electoralsearch.eci.gov.in/' 
    })
  }
  if (lowerText.includes('epic') || lowerText.includes('e-epic') || lowerText.includes('voter id card') || lowerText.includes('वोटर आईडी')) {
    actions.push({ 
      label: language === 'en' ? 'Download e-EPIC' : 'ई-एपिक डाउनलोड करें', 
      icon: 'download', 
      url: 'https://voters.eci.gov.in/login' 
    })
  }

  return actions
}
