export type Language = 'en' | 'hi' | 'kn';

export interface Translations {
  // Navigation & Header
  nav_home: string;
  nav_services: string;
  nav_shop: string;
  nav_experience: string;
  nav_membership: string;
  nav_contact: string;
  nav_book_now: string;
  nav_cart: string;
  nav_search: string;

  // Hero Section
  hero_eyebrow: string;
  hero_title_line1: string;
  hero_title_line2: string;
  hero_subtitle: string;
  hero_book_now: string;
  hero_stats_clients: string;
  hero_stats_rating: string;

  // Experience Section
  exp_eyebrow: string;
  exp_title: string;
  exp_salon_services: string;
  exp_salon_desc: string;
  exp_rizheena_shop: string;
  exp_shop_desc: string;
  exp_at_home: string;
  exp_home_desc: string;

  // Space Section
  space_eyebrow: string;
  space_title_line1: string;
  space_title_line2: string;
  space_desc: string;
  space_stat_clients: string;
  space_stat_years: string;
  space_stat_rating: string;
  space_stat_hygiene: string;
  space_step_inside: string;
  space_crafted: string;
  space_quote: string;

  // Common & Footer
  footer_tagline: string;
  footer_quick_links: string;
  footer_hours: string;
  footer_rights: string;
  book_appointment: string;
  view_details: string;
  close: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation & Header
    nav_home: 'Home',
    nav_services: 'Services',
    nav_shop: 'Shop',
    nav_experience: 'Experience',
    nav_membership: 'Membership',
    nav_contact: 'Contact',
    nav_book_now: 'BOOK NOW',
    nav_cart: 'Cart',
    nav_search: 'Search',

    // Hero Section
    hero_eyebrow: 'CONFIDENCE LOOKS GOOD ON YOU',
    hero_title_line1: 'More',
    hero_title_line2: 'Than A Salon.',
    hero_subtitle: 'Precision. Style. Self-Care.',
    hero_book_now: 'Book Now',
    hero_stats_clients: '10K+ Happy Clients',
    hero_stats_rating: '4.9 Star Rating',

    // Experience Section
    exp_eyebrow: 'HOW WOULD YOU LIKE TO EXPERIENCE LOYAL?',
    exp_title: 'Choose Your Experience',
    exp_salon_services: 'SALON SERVICES',
    exp_salon_desc: 'Precision. Style. Elevated.',
    exp_rizheena_shop: 'RIZHEENA SHOP',
    exp_shop_desc: 'Professional care. Everyday confidence.',
    exp_at_home: 'RIZHEENA AT HOME',
    exp_home_desc: 'Premium grooming. At your doorstep.',

    // Space Section
    space_eyebrow: 'THE LOYAL EXPERIENCE',
    space_title_line1: 'A Space',
    space_title_line2: 'Designed Around You',
    space_desc: 'More than a salon, it\'s an experience — where expertise, comfort and modern style come together to bring out the best in you.',
    space_stat_clients: 'Happy Clients',
    space_stat_years: 'Years of Excellence',
    space_stat_rating: 'Client Rating',
    space_stat_hygiene: 'Hygiene Standards',
    space_step_inside: 'STEP INSIDE OUR WORLD',
    space_crafted: 'CRAFTED FOR A BETTER YOU',
    space_quote: 'It\'s not just a haircut, it\'s how you feel tomorrow.',

    // Common & Footer
    footer_tagline: 'Precision grooming for the modern gentleman.',
    footer_quick_links: 'Quick Links',
    footer_hours: 'Working Hours',
    footer_rights: 'All rights reserved.',
    book_appointment: 'Book Appointment',
    view_details: 'View Details',
    close: 'Close',
  },
  hi: {
    // Navigation & Header
    nav_home: 'होम',
    nav_services: 'सेवाएं',
    nav_shop: 'शॉप',
    nav_experience: 'अनुभव',
    nav_membership: 'मेंबरशिप',
    nav_contact: 'संपर्क',
    nav_book_now: 'बुक करें',
    nav_cart: 'कार्ट',
    nav_search: 'खोजें',

    // Hero Section
    hero_eyebrow: 'आत्मविश्वास आप पर खूब जंचता है',
    hero_title_line1: 'सैलून से भी',
    hero_title_line2: 'कहीं बढ़कर।',
    hero_subtitle: 'सटीकता. शैली. स्व-देखभाल.',
    hero_book_now: 'अभी बुक करें',
    hero_stats_clients: '१०,०००+ संतुष्ट ग्राहक',
    hero_stats_rating: '४.९ स्टार रेटिंग',

    // Experience Section
    exp_eyebrow: 'आप LOYAL का अनुभव कैसे करना चाहेंगे?',
    exp_title: 'अपना अनुभव चुनें',
    exp_salon_services: 'सैलून सेवाएं',
    exp_salon_desc: 'सटीकता. शैली. विशिष्टता.',
    exp_rizheena_shop: 'RIZHEENA शॉप',
    exp_shop_desc: 'पेशेवर देखभाल. दैनिक आत्मविश्वास.',
    exp_at_home: 'RIZHEENA घर पर',
    exp_home_desc: 'प्रीमियम ग्रूमिंग. आपके द्वार पर.',

    // Space Section
    space_eyebrow: 'LOYAL अनुभव',
    space_title_line1: 'एक स्थान जो',
    space_title_line2: 'आपके लिए बना है',
    space_desc: 'सैलून से बढ़कर, यह एक अनुभव है — जहाँ विशेषज्ञता, आराम और आधुनिक शैली मिलकर आपको बेहतरीन बनाती हैं।',
    space_stat_clients: 'संतुष्ट ग्राहक',
    space_stat_years: 'वर्षों की उत्कृष्टता',
    space_stat_rating: 'क्लाइंट रेटिंग',
    space_stat_hygiene: 'स्वच्छता मानक',
    space_step_inside: 'हमारी दुनिया में कदम रखें',
    space_crafted: 'आपके बेहतर रूप के लिए',
    space_quote: 'यह केवल बाल काटना नहीं, बल्कि यह है कि आप कल कैसा महसूस करते हैं।',

    // Common & Footer
    footer_tagline: 'आधुनिक पुरुषों के लिए सटीक ग्रूमिंग।',
    footer_quick_links: 'त्वरित लिंक',
    footer_hours: 'काम के घंटे',
    footer_rights: 'सर्वाधिकार सुरक्षित।',
    book_appointment: 'अपॉइंटमेंट बुक करें',
    view_details: 'विवरण देखें',
    close: 'बंद करें',
  },
  kn: {
    // Navigation & Header
    nav_home: 'ಮುಖಪುಟ',
    nav_services: 'ಸೇವೆಗಳು',
    nav_shop: 'ಶಾಪ್',
    nav_experience: 'ಅನುಭವ',
    nav_membership: 'ಮೆಂಬರ್‌ಶಿಪ್',
    nav_contact: 'ಸಂಪರ್ಕಿಸಿ',
    nav_book_now: 'ಬುಕ್ ಮಾಡಿ',
    nav_cart: 'ಕಾರ್ಟ್',
    nav_search: 'ಹುಡುಕಿ',

    // Hero Section
    hero_eyebrow: 'ಆತ್ಮವಿಶ್ವಾಸ ನಿಮಗೆ ಸುಂದರವಾಗಿ ಕಾಣುತ್ತದೆ',
    hero_title_line1: 'ಕೇವಲ ಸಲೂನ್ ಅಲ್ಲ',
    hero_title_line2: 'ಅದಕ್ಕೂ ಮೀರಿದ್ದು.',
    hero_subtitle: 'ನಿಖರತೆ. ಶೈಲಿ. ಸ್ವಯಂ ಆರೈಕೆ.',
    hero_book_now: 'ಈಗಲೇ ಬುಕ್ ಮಾಡಿ',
    hero_stats_clients: '೧೦,೦೦೦+ ಸಂತೃಪ್ತ ಗ್ರಾಹಕರು',
    hero_stats_rating: '೪.೯ ಸ್ಟಾರ್ ರೇಟಿಂಗ್',

    // Experience Section
    exp_eyebrow: 'ನೀವು LOYAL ಅನ್ನು ಹೇಗೆ ಅನುಭವಿಸಲು ಬಯಸುತ್ತೀರಿ?',
    exp_title: 'ನಿಮ್ಮ ಅನುಭವವನ್ನು ಆರಿಸಿ',
    exp_salon_services: 'ಸಲೂನ್ ಸೇವೆಗಳು',
    exp_salon_desc: 'ನಿಖರತೆ. ಶೈಲಿ. ಉನ್ನತ ಗುಣಮಟ್ಟ.',
    exp_rizheena_shop: 'RIZHEENA ಶಾಪ್',
    exp_shop_desc: 'ವೃತ್ತಿಪರ ಕಾಳಜಿ. ದೈನಂದಿನ ಆತ್ಮವಿಶ್ವಾಸ.',
    exp_at_home: 'RIZHEENA ಮನೆ ಬಾಗಿಲಿಗೆ',
    exp_home_desc: 'ಪ್ರೀಮಿಯಂ ಗ್ರೂಮಿಂಗ್. ನಿಮ್ಮ ಮನೆ ಬಾಗಿಲಲ್ಲೇ.',

    // Space Section
    space_eyebrow: 'ದಿ LOYAL ಅನುಭವ',
    space_title_line1: 'ನಿಮಗಾಗಿ',
    space_title_line2: 'ರೂಪಿಸಿದ ಒಂದು ಸ್ಥಳ',
    space_desc: 'ಕೇವಲ ಸಲೂನ್ ಅಲ್ಲ, ಇದು ಒಂದು ಅನುಭವ — ಪರಿಣತಿ, ಸೌಕರ್ಯ ಮತ್ತು ಆಧುನಿಕ ಶೈಲಿ ಒಟ್ಟಿಗೆ ಬಂದು ನಿಮ್ಮನ್ನು ಅತ್ಯುತ್ತಮವಾಗಿ ಪ್ರಸ್ತುತಪಡಿಸುತ್ತದೆ.',
    space_stat_clients: 'ಸಂತೃಪ್ತ ಗ್ರಾಹಕರು',
    space_stat_years: 'ವರ್ಷಗಳ ಶ್ರೇಷ್ಠತೆ',
    space_stat_rating: 'ಗ್ರಾಹಕರ ರೇಟಿಂಗ್',
    space_stat_hygiene: 'ನೈರ್ಮಲ್ಯ ಮಾನದಂಡಗಳು',
    space_step_inside: 'ನಮ್ಮ ಜಗತ್ತಿಗೆ ಕಾಲಿಡಿ',
    space_crafted: 'ನಿಮ್ಮ ಉತ್ತಮ ರೂಪಕ್ಕಾಗಿ',
    space_quote: 'ಇದು ಕೇವಲ ಕೇಶವಿನ್ಯಾಸವಲ್ಲ, ನಾಳೆ ನೀವು ಹೇಗೆ ಅನುಭವಿಸುತ್ತೀರಿ ಎಂಬುದು.',

    // Common & Footer
    footer_tagline: 'ಆಧುನಿಕ ಪುರುಷರಿಗಾಗಿ ನಿಖರವಾದ ಗ್ರೂಮಿಂಗ್.',
    footer_quick_links: 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು',
    footer_hours: 'ಕಾರ್ಯ ನಿರ್ವಹಣಾ ಸಮಯ',
    footer_rights: 'ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.',
    book_appointment: 'ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ',
    view_details: 'ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    close: 'ಮುಚ್ಚಿ',
  },
};
