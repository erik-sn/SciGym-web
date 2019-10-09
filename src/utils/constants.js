import { getStaticUrl, getMediaUrl } from './environment';

const STATIC_URL = getStaticUrl();
const MEDIA_URL = getMediaUrl();

console.log(STATIC_URL);

export default {
  REFRESH_TOKEN: 'refreshToken',
  ACCESS_TOKEN: 'accessToken',

  //url relating to static files
  STATIC_URL,
  MEDIA_URL,
  SCIGYM_LOGO: `${STATIC_URL}/icons/scigym-logo.png`,
  GITHUB_LOGO: `${STATIC_URL}/icons/github-circle.png`,
  TWITTER_LOGO: `${STATIC_URL}/icons/twitter-logo.png`,
  BANNER: `${STATIC_URL}/images/ai_photonics_banner.jpg`,
  RL_PARADIGM: `${STATIC_URL}/images/RLParadigm.gif`,
  SCIENCE_API: `${STATIC_URL}/images/APIforScience.png`,
  SCIENCE_RL: `${STATIC_URL}/images/RLforScience.png`,
  SCIENCE_CPU: `${STATIC_URL}/images/CPUforScience.png`,
  FWF_LOGO: `${STATIC_URL}/icons/FWF-logo.png`
};
