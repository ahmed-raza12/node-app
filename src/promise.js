require('./db/mongoose');

const Profiles = require("./models/profiles");

// Profiles.findByIdAndUpdate('5cdbfb62e0f0ef1b38254405',{
//     graduate: true
// })
// .then(res => {
//     console.log(res)
//     return Profiles.countDocuments({
//         graduate: true
//     })
// })
// .then(c => {
//     console.log(c);

// })
// .catch(er => console.log(er))

// const updatedAndCount = async (id, criteria) => {
//     try {
//      const res = await Profiles.findByIdAndUpdate(id, criteria)
//      if(!res) {
//         throw Error("No Profile found")
//      }
//     const count = await Profiles.countDocuments(criteria)
//     console.log(res, count)
//     } catch (error) {
//         console.log('Error in data');
//     }
// }

// updatedAndCount('5cdbfb62e0f0ef1b38254405', {
//     graduate: true
// })