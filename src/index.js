const app = require('express')();
const crudRouter = require('./routers/crudRouter');

app.use(crudRouter);

app.listen(80);