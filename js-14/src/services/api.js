import axios from 'axios';
export const fetchLink = (link) => {
    return axios
    .get('https://api.linkpreview.net/?key=5cf192f15d69c372680a47ac1b06023127cc5830f0441&q=' + link)
    .then(res => res.data)
  }