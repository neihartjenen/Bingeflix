// // globally set userId
// let userId = localStorage.getItem("user")

// // redirect user to login if user isn't found in localStorage -- for handling refreshes
// let authUser = function() {
//   if (!window.localStorage.getItem("user")) {
//     // send login page if user doesn't exist
//     window.location.replace("./home")
//   } else {
//     let path = window.location.pathname;
//     renderContent(path)
//   }
// }

// // checks if an object is empty e.g: let emptyObj = {}
// let isObjEmpty = function(obj) {
//   for (let key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       return false;
//     }
//   }
//   return true;
// }