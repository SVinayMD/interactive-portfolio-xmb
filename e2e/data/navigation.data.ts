import en from '../../locales/en.json';

// This data is now isolated and can be imported by any test file.
export const navigationTestData = [
    { horizontal: en.menu_about, vertical: en.about_bio, expectedTitle: en.about_title, expectedBody: 'dedicated and detail-oriented' },
    { horizontal: en.menu_skills, vertical: en.skills_manual_label, expectedTitle: en.skills_manual_title, expectedBody: 'Test Case Design' },
    { horizontal: en.menu_skills, vertical: en.skills_api_label, expectedTitle: en.skills_api_title, expectedBody: 'Postman' },
    { horizontal: en.menu_skills, vertical: en.skills_tools_label, expectedTitle: en.skills_tools_title, expectedBody: 'Jira' },
    { horizontal: en.menu_experience, vertical: en.experience_neoris_label, expectedTitle: en.experience_neoris_title, expectedBody: 'functional, regression, and usability' },
    { horizontal: en.menu_projects, vertical: en.projects_portfolio_label, expectedTitle: en.projects_portfolio_title, expectedBody: 'Fully keyboard-navigable' },
];