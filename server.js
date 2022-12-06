import app from './src/app.js';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server ONLINE http://192.168.1.100:${port}`);
});
