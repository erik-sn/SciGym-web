import { getHost } from './environment';

export default {
  REFRESH_TOKEN: 'refreshToken',
  ACCESS_TOKEN: 'accessToken',

  //url relating to static files
  STATIC_URL: `${getHost()}/static`,
  UPLOAD_URL: '/code/files',
  SCIGYM_LOGO: '/icons/scigym-logo.png',
  GITHUB_LOGO: '/icons/github-circle.png',
  BANNER: '/images/ai_photonics_banner.jpg',
  RL_PARADIGM: '/images/RLParadigm.gif',
};
