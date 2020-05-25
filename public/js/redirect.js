// check if localStorage contains data for "user"
if (window.localStorage.getItem("user")) {
  // then send authed page if user exists
  window.location.replace("./members")
} else {
  // or send signup page if user doesn't exist
  window.location.replace("./signup")
}