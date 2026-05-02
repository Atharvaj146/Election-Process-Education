export interface QuizQuestion {
  id: number;
  question: string;
  question_hi: string;
  options: string[];
  options_hi: string[];
  correct: number;
  explanation: string;
  explanation_hi: string;
}

export const quizData: QuizQuestion[] = [
  { 
    id: 1, 
    question: "What is the minimum voting age in India?", 
    question_hi: "भारत में मतदान की न्यूनतम आयु क्या है?",
    options: ["16 Years", "18 Years", "21 Years", "25 Years"], 
    options_hi: ["16 वर्ष", "18 वर्ष", "21 वर्ष", "25 वर्ष"],
    correct: 1, 
    explanation: "The 61st Amendment Act of 1988 lowered the voting age from 21 to 18 years.",
    explanation_hi: "1988 के 61वें संशोधन अधिनियम ने मतदान की आयु 21 से घटाकर 18 वर्ष कर दी।"
  },
  { 
    id: 2, 
    question: "Which form is used for registering as a new voter?", 
    question_hi: "नए मतदाता के रूप में पंजीकरण के लिए किस फॉर्म का उपयोग किया जाता है?",
    options: ["Form 6", "Form 7", "Form 8", "Form 9"], 
    options_hi: ["फॉर्म 6", "फॉर्म 7", "फॉर्म 8", "फॉर्म 9"],
    correct: 0, 
    explanation: "Form 6 is used by first-time voters or voters shifting to a new assembly constituency.",
    explanation_hi: "फॉर्म 6 का उपयोग पहली बार मतदाता बनने वालों या नए विधानसभा क्षेत्र में स्थानांतरित होने वाले मतदाताओं द्वारा किया जाता है।"
  },
  { 
    id: 3, 
    question: "What does VVPAT stand for?", 
    question_hi: "VVPAT का पूर्ण रूप क्या है?",
    options: ["Voter Verified Paper Audit Trail", "Voting Verification Print And Tracker", "Valid Vote Paper Audit Tool", "Visual Verification Paper Audit Trail"], 
    options_hi: ["वोटर वेरिफाइड पेपर ऑडिट ट्रेल", "वोटिंग वेरिफिकेशन प्रिंट एंड ट्रैकर", "वैलिड वोट पेपर ऑडिट टूल", "विजुअल वेरिफिकेशन पेपर ऑडिट ट्रेल"],
    correct: 0, 
    explanation: "VVPAT allows voters to verify that their vote was cast correctly before the slip drops into the sealed box.",
    explanation_hi: "VVPAT मतदाताओं को यह सत्यापित करने की अनुमति देता है कि उनका वोट सीलबंद बॉक्स में गिरने से पहले सही ढंग से डाला गया था।"
  },
  { 
    id: 4, 
    question: "Can you vote without a Voter ID (EPIC) card?", 
    question_hi: "क्या आप वोटर आईडी (EPIC) कार्ड के बिना वोट दे सकते हैं?",
    options: ["No, it's mandatory", "Yes, if name is on electoral roll & you have alternate ID", "Yes, with just a verbal oath", "Yes, if you bring a witness"], 
    options_hi: ["नहीं, यह अनिवार्य है", "हाँ, यदि नाम मतदाता सूची में है और आपके पास वैकल्पिक आईडी है", "हाँ, केवल मौखिक शपथ के साथ", "हाँ, यदि आप गवाह लाते हैं"],
    correct: 1, 
    explanation: "You can vote if your name is on the electoral roll by showing one of the approved alternate photo ID documents.",
    explanation_hi: "यदि आपका नाम मतदाता सूची में है, तो आप स्वीकृत वैकल्पिक फोटो आईडी दस्तावेजों में से एक दिखाकर वोट दे सकते हैं।"
  },
  { 
    id: 5, 
    question: "What is the purpose of the NOTA option on the EVM?", 
    question_hi: "EVM पर नोटा (NOTA) विकल्प का उद्देश्य क्या है?",
    options: ["To cancel the election", "To vote for the ruling party", "To register a vote for 'None of the Above' candidates", "To request a new EVM machine"], 
    options_hi: ["चुनाव रद्द करने के लिए", "सत्तारूढ़ दल को वोट देने के लिए", "'उपरोक्त में से कोई नहीं' उम्मीदवारों के लिए वोट दर्ज करने के लिए", "नई EVM मशीन का अनुरोध करने के लिए"],
    correct: 2, 
    explanation: "NOTA allows a voter to officially register a rejection of all contesting candidates.",
    explanation_hi: "नोटा (NOTA) एक मतदाता को आधिकारिक तौर पर सभी चुनाव लड़ने वाले उम्मीदवारों की अस्वीकृति दर्ज करने की अनुमति देता है।"
  },
  { 
    id: 6, 
    question: "Who administers elections to the Lok Sabha in India?", 
    question_hi: "भारत में लोकसभा चुनाव कौन संचालित करता है?",
    options: ["State Election Commission", "Election Commission of India", "President of India", "Supreme Court"], 
    options_hi: ["राज्य चुनाव आयोग", "भारत निर्वाचन आयोग", "भारत के राष्ट्रपति", "सुप्रीम कोर्ट"],
    correct: 1, 
    explanation: "The Election Commission of India (ECI) is an autonomous constitutional authority responsible for administering Union and State election processes.",
    explanation_hi: "भारत निर्वाचन आयोग (ECI) एक स्वायत्त संवैधानिक प्राधिकरण है जो संघ और राज्य चुनाव प्रक्रियाओं के संचालन के लिए जिम्मेदार है।"
  },
  { 
    id: 7, 
    question: "Which official is responsible for a single polling station on election day?", 
    question_hi: "चुनाव के दिन एकल मतदान केंद्र के लिए कौन सा अधिकारी जिम्मेदार होता है?",
    options: ["Returning Officer", "Chief Electoral Officer", "Presiding Officer", "District Magistrate"], 
    options_hi: ["रिटर्निंग ऑफिसर", "मुख्य निर्वाचन अधिकारी", "पीठासीन अधिकारी", "जिला मजिस्ट्रेट"],
    correct: 2, 
    explanation: "The Presiding Officer manages the polling station and ensures the poll is conducted smoothly and fairly.",
    explanation_hi: "पीठासीन अधिकारी मतदान केंद्र का प्रबंधन करता है और सुनिश्चित करता है कि मतदान सुचारू रूप से और निष्पक्ष रूप से आयोजित किया जाए।"
  },
  { 
    id: 8, 
    question: "Who appoints the Chief Election Commissioner of India?", 
    question_hi: "भारत के मुख्य चुनाव आयुक्त की नियुक्ति कौन करता है?",
    options: ["Prime Minister", "Chief Justice of India", "President of India", "Parliament"], 
    options_hi: ["प्रधानमंत्री", "भारत के मुख्य न्यायाधीश", "भारत के राष्ट्रपति", "संसद"],
    correct: 2, 
    explanation: "The President of India appoints the Chief Election Commissioner and other Election Commissioners.",
    explanation_hi: "भारत के राष्ट्रपति मुख्य चुनाव आयुक्त और अन्य चुनाव आयुक्तों की नियुक्ति करते हैं।"
  },
  { 
    id: 9, 
    question: "What is the tenure of the Chief Election Commissioner?", 
    question_hi: "मुख्य चुनाव आयुक्त का कार्यकाल कितना होता है?",
    options: ["5 years or up to 60 years of age", "6 years or up to 65 years of age", "4 years", "Lifetime"], 
    options_hi: ["5 वर्ष या 60 वर्ष की आयु तक", "6 वर्ष या 65 वर्ष की आयु तक", "4 वर्ष", "आजीवन"],
    correct: 1, 
    explanation: "The CEC serves for a term of six years or up to the age of 65 years, whichever is earlier.",
    explanation_hi: "CEC छह साल की अवधि के लिए या 65 वर्ष की आयु तक, जो भी पहले हो, सेवा करते हैं।"
  },
  { 
    id: 10, 
    question: "What is the maximum number of candidates an EVM can cater to (including NOTA)?", 
    question_hi: "एक EVM (नोटा सहित) अधिकतम कितने उम्मीदवारों को सेवा दे सकती है?",
    options: ["16", "32", "64", "384"], 
    options_hi: ["16", "32", "64", "384"],
    correct: 3, 
    explanation: "A single Ballot Unit holds 16 candidates. Up to 24 Ballot Units can be connected to a Control Unit, making a total of 384 candidates.",
    explanation_hi: "एक सिंगल बैलेट यूनिट में 16 उम्मीदवार होते हैं। कंट्रोल यूनिट से 24 बैलेट यूनिट तक जोड़ी जा सकती हैं, जिससे कुल 384 उम्मीदवार हो सकते हैं।"
  }
];
