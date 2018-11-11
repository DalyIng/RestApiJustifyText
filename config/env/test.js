export default {
    env: 'test',
    db: 'mongodb://tictactrip:Tictactrip123@ds159293.mlab.com:59293/tictactrip-test',
    port: 3000,
    jwtSecret: 'my-api-secret',
    jwtDuration: '5000 hours',
    limitWords: 500,
    TIME: 60 * 5 // 5 MINUTES
  };