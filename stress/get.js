const { check, sleep } = require('k6');
const http = require('k6/http');

// const baseURL = process.env.BASE_URL || 'http://localhost:3002/';
const baseURL = 'http://localhost:3000/';

export const options = {
  vus: 1000,
  duration: '60s',
  thresholds: {
    // http_req_duration: ['p(95)<2000'],
  },
};

const idList = [];

for (let i = 0, j = 9599999; i < 1000; i += 1) {
  idList.push(j);

  j += 1;
}

const randomID = () => (
  idList[Math.floor(Math.random() * idList.length)]
);

export default () => {
  const result = http.get(`${baseURL}/${randomID()}`, {
    tags: {
      name: 'proxy-endpoint',
    },
  });

  check(result, {
    '200 status code': (res) => res.status === 200,
  });

  sleep(1);
};
