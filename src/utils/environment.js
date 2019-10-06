import { includes } from 'lodash';

function isLocal() {
  const hostName = window.location.hostname;
  return includes(hostName, 'localhost');
}

export function getHost() {
  // we assume in test/production environments we are just using
  // the root URL
  if (isLocal()) {
    return 'http://localhost:8000';
  }
  return 'https://scigym.s3.eu-central-1.amazonaws.com';
}


export function getStaticUrl() {
  const host = getHost();
  if (isLocal()) {
    return `${host}/static`;
  }
  return host;
}
