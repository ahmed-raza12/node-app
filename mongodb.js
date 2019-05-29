// const {MongoClient, ObjectId} = require("mongodb");

// // const MongoClient = mongodb.MongoClient;

// const url = 'mongodb://127.0.0.1:27017'
// const databaseName = "myDB"
// MongoClient.connect(url, {
//     useNewUrlParser: true
// }, (error, client) => {
//     if(error) {
//        return console.log("error connecting database");
//     }
    
//     const db = client.db(databaseName);
//     const newID = ObjectId()

//     db.collection('profiles').updateMany({
//         email: 'ar@gmail.com'
//     },{
//         $inc: {
//             age: 22
//         }
//     }).then((re) => {
//         console.log(re);
//     }).catch((e) => {
//         console.log(e)
//     })
//     // db.collection('profiles').find({
//     //     email: 'ar@gmail.com'
//     // }).toArray((error, arra) => {
//     //     if(error) {
//     //         return console.log("error finding array");
//     //      }
//     //      console.log(arra);
         
//     // })
//     console.log("database connected!");
// })

