import { includes } from 'lodash';


const LOCAL_API = 'http://localhost:8000';
const REMOTE_API = '';
const AWS_S3_BUCKET = 'https://scigym.s3.eu-central-1.amazonaws.com';

function isLocal() {
  const hostName = window.location.hostname;
  return includes(hostName, 'localhost');
}

export function getHost() {
  // we assume in test/production environments we are just using
  // the root URL
  return isLocal() ? 'http://localhost:8000' : REMOTE_API;
}

export function getMediaUrl() {
  return isLocal() ? LOCAL_API : '';  // media url is an absolute path in AWS, let image path uploads handle it
}

export function getStaticUrl() {
  return isLocal() ? `${LOCAL_API}/static` : AWS_S3_BUCKET;
}
