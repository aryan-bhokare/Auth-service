const express = require('express');
const  bodyParser = require('body-parser');
const apiRoutes = require('./routes/index');
const { PORT } = require('./config/serverConfig')
const db = require('./models/index');


const app = express();

const prepareAndStartServer = () => {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter: true});
        }
        console.log(`Server started at port ${PORT}`);

    })
}

prepareAndStartServer();