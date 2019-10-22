const app = require('express')();
const crudRouter = require('./routers/crudRouter');
const loginRouter = require('./routers/loginRouter');

app.use(crudRouter, loginRouter);

app.listen(80);