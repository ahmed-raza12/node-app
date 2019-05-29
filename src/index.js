const express = require('express');
require('./db/mongoose');
const profileRoute = require('./routes/profile-routes');
const wishListRoutes = require('./routes/wishlist-routes');
// const newRec = Profiles({
//     name: 'Hamid',
//     age: 10,
//     graduate: "false",
//     email: 'hr@gmail.com',
//     gender: "male"
// })

// newRec.save()
// .then(data => console.log(data))
// .catch(err => console.log(err))

const app = express();
const port = process.env.PORT

// app.use((req, res, next) => {
//     res.status(500).send('Sorry site is under maintainance! ')
//     next()
// })
app.use(express.json());
app.use(profileRoute)
app.use(wishListRoutes)


app.listen(port, () => {
    console.log('server runnig on ' + port);

})