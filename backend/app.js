const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

let user = process.env.USERDB;
let password = process.env.PASSWORD
let dbname = process.env.DBNAME


const { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const app = express();

app.use(bodyParser.json());

app.use(cors());

// graphql
app.use(
    '/graphql',
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true,
    })
)

// app.listen(4000, () => console.log('Server on por 4000'));
console.log("clave " +password)
const URI = `mongodb+srv://juan:yordyaquiles07@cluster0.ppt3d.mongodb.net/principal?retryWrites=true&w=majority`
mongoose.connect(
    URI,{
        useUnifiedTopology: true, 
        useNewUrlParser: true
        // useCreateIndex: true
    }
).then(() => {
    app.listen(4000, console.log("connected to port 4000."))
}).catch((err) => console.log(err))