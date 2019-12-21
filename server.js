const express=require('express')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')
PORT = 4000 || process.env.PORT




app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

mongoose.connect(procces.env.DB,{useNewUrlParser:true,useUnifiedTopology:true})
.then(res=>console.log('mongoDB is connected'))
.catch(err=>console.log(err))

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))




// uploading file
const { ApolloServer, gql } = require("apollo-server-express");
const { createWriteStream, existsSync, mkdirSync } = require("fs");
const path = require("path");

const {Storage} = require('@google-cloud/storage')
const files = [];

const typeDefs = gql`
  type Query {
    files: [String]
  }

  type Mutation {
    uploadFile(file: Upload!): Boolean
  }
`;

const gc = new Storage({
  keyFilename: path.join(__dirname, './My First Project-13b4f35e5ae3.json'),
  projectId: 'soy-oarlock-261913'
})

const stuff = gc.bucket('hakuna-matada')

const resolvers = {
  Query: {
    files: () => files
  },
  Mutation: {
    uploadFile: async (_, { file }) => {
      const { createReadStream, filename } = await file;

      await new Promise(res =>
        createReadStream()
          .pipe(
            stuff.file(filename).createWriteStream({
              resumable : false,
              gzip: true
            })
          )
          .on("finish", res)
      );

      files.push(filename);

      return true;
    }
  }
};

existsSync(path.join(__dirname, "../images")) || mkdirSync(path.join(__dirname, "../images"));

const server = new ApolloServer({ typeDefs, resolvers });
app.use("/images", express.static(path.join(__dirname, "../images")));
server.applyMiddleware({ app });
// end Uploading




app.use('/user',require('./routes/user'))

app.listen(PORT,()=>console.log('server is running in '+ PORT))
