import { includes } from 'lodash';

export function getHost() {
  const hostName = window.location.hostname;
  if (includes(hostName, 'localhost')) {
    return 'http://localhost:8000';
  }
  // we assume in test/production environments we are just using
  // the root URL
  return '';
}
