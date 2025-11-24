export const VALIDATION_MESSAGES = {
  TITLE_REQUIRED: 'Title is required',
  TITLE_MAX_LENGTH: 'Title must be max 40 characters',
  DESCRIPTION_REQUIRED: 'Description is required',
  TYPE_REQUIRED: 'Bounty Type is required',
  CORE_REQUIRED: 'Impact Core is required',
  LOCATION_REQUIRED: 'Location is required for physical bounties',
  AMOUNT_REQUIRED: 'Amount must be greater than 0',
  WINNERS_REQUIRED: 'Number of winners must be greater than 0',
  EXPIRATION_REQUIRED: 'Expiration date is required',
  IMPACT_BRIEF_REQUIRED: 'Impact Brief is required',
  BACKER_NAME_REQUIRED: 'Backer name is required',
  BACKER_LOGO_REQUIRED: 'Backer logo is required',
  TERMS_REQUIRED: 'You must accept the terms and conditions',
};

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
