import { StatusType } from '@/types/common';

export const CONSTANT = {
  PASSWORD_LENGTH: 8,
  TEMPLATE_DIR: 'templates',
};

export const DEFAULT_API_PAGINATION = {
  page: 1,
  limit: 10,
};

export const STATUS_OPTIONS = [
  { label: 'All', value: StatusType.ALL },
  { label: 'Active', value: StatusType.ACTIVE },
  { label: 'Inactive', value: StatusType.INACTIVE },
];

export const intentErrors = {
  account_closed: `The customer’s bank account has been closed. Please try again after changing default payment method.`,
  insufficient_funds: `The customer’s account has insufficient funds to cover this payment. Please try again after changing default payment method.`,
  incorrect_cvc: `Your card's security code is incorrect. Please try again.`,
  payment_intent_authentication_failure: `Authentication failed for the Payment Method that was provided. To increase your chances of completing this payment again, you can try altering the default Payment Method.`,
};
