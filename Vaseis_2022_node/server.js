const app = require('./index');

const PORT = Number(5000);

app.listen(PORT,()=>console.log(`Server starting at port ${PORT}!`))