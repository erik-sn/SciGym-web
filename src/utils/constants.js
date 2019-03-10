import { getHost } from './environment';

export default {
  REFRESH_TOKEN: 'refreshToken',
  ACCESS_TOKEN: 'accessToken',
  STATIC_URL: `${getHost()}/static`,
  UPLOAD_URL: '/code/files',
};
