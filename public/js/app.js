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

// // render Content based on argument
// // in this case, content = window.location.pathname
// let renderContent = function(content){
//   switch (content) {
//     case "/myevents":
//       // get events made by user from server
//       getEventsByUserId(userId).then(function(events) {
//         // then render the components to display on page
//         renderMyEvents(events);
//       })
//       break;
//     case "/create":
//       // render create event components to display on page
//       renderCreatePage();
//       break;
//     case "/attending":
//       // get events that user is attending from server
//       getEventsAttending(userId).then(function(events) {
//         // then render the components to display on a page
//         renderEventsAttending(events);
//       })
//       break;
//     case "/profile":
//       renderProfilePage();
//       break;
//     default:
//       // get all events from server
//       getEventInfo().then(function(events) {
//         // then render the components to display on a page
//         renderEvents(events);
//       })
//   }
// }

// // function to render display components based on data sent through events parameter
// let renderEvents = function(events) {
//   let content = $(".contents")
//   content.empty().append($("<h4>").text("Events List"), $("<hr>"))
//   events.forEach(function(event) {
//     let cardbody = $("<div>").addClass("card-body")
//     let title = $("<h5>").addClass("mb-0").text(event.title)
//     let host = $("<div>").addClass("d-flex text-muted").text(`Hosted by ${event.host.name}`)
//     let description = $("<p>").addClass("card-text").text(event.description)
//     let btn = $("<button>").addClass("btn btn-dark attend").data("id", event.id).text("Attend")
//     // get all attendee information for specific event from the server
//     getAttendees(event.id).then(function(attendees) {
//       let guests = $("<div>").addClass("ttip ml-auto").text("Guests: " + attendees.length)
//       let tooltip = $("<span>").addClass("ttiptext")
//       let guestlist = $("<ul>").addClass("list-group")
//       attendees.forEach(function(attendee) {
//         let li = $("<li>").addClass("list-group-item text-dark").text(attendee.User.name)
//         guestlist.append(li)
//       })
//       tooltip.append(guestlist)
//       guests.append(tooltip)
//       host.append(guests);
//       cardbody.append(title, host, $("<hr>"), description, btn)
//       let card = $("<div>").addClass("card mb-3").append(cardbody)
//       content.append(card)
//     })
//   })
// }

// // function to render events that the user is attending based on data sent through events parameter
// let renderEventsAttending = function(events) {
//   let content = $(".contents")
//   content.empty().append($("<h4>").text("Events I'm Attending"), $("<hr>"))
//   events.forEach(function(event) {
//     let cardbody = $("<div>").addClass("card-body")
//     let title = $("<h5>").addClass("mb-0").text(event.title)
//     let host = $("<div>").addClass("d-flex text-muted").text(`Hosted by ${event.host.name}`)
//     let description = $("<p>").addClass("card-text").text(event.description)
//     let btn = $("<button>").addClass("btn btn-dark unattend").data("id", event.id).text("Unattend")
//     getAttendees(event.id).then(function(attendees) {
//       let guests = $("<div>").addClass("ttip ml-auto").text("Guests: " + attendees.length)
//       let tooltip = $("<span>").addClass("ttiptext")
//       let guestlist = $("<ul>").addClass("list-group")
//       attendees.forEach(function(attendee) {
//         let li = $("<li>").addClass("list-group-item text-dark").text(attendee.User.name)
//         guestlist.append(li)
//       })
//       tooltip.append(guestlist)
//       guests.append(tooltip)
//       host.append(guests);
//       cardbody.append(title, host, $("<hr>"), description, btn)
//       let card = $("<div>").addClass("card mb-3").append(cardbody)
//       content.append(card)
//     })
//   })
// }

// // function to render events that the user has created
// let renderMyEvents = function(events) {
//   let content = $(".contents")
//   content.empty().append($("<h4>").text("Events I'm Hosting"), $("<hr>"))
//   events.forEach(function(event) {
//     let card = $("<div>").addClass("card p-3 mb-3")
//     let title = $("<input>").addClass("form-control").attr({
//       id: `event${event.id}-title`,
//       value: event.title,
//       placeholder: "Event Title",
//       autocomplete: "title"
//     })
//     let titleDiv = $("<div>").addClass("form-group").append($("<label>").text("Event Title"), title);
//     let description = $("<textarea>").addClass("form-control").attr({
//       id: `event${event.id}-description`,
//       placeholder: "Event Description",
//       rows: 3,
//       autocomplete: "description"
//     }).val(event.description)
//     let descriptionDiv = $("<div>").addClass("form-group").append($("<label>").text("Event Description"), description)

//     let btn = $("<button>").addClass("mr-3 btn btn-dark update-event").data("id", event.id).text("Update")
//     let btn2 = $("<button>").addClass("btn btn-dark delete").data("id", event.id).text("Delete")
//     let form = $("<form>").append(titleDiv, descriptionDiv, btn, btn2)
//     card.append(form)
//     content.append(card)
//   })
// }

// // function to render components for the create event display
// let renderCreatePage = function() {
//   let content = $(".contents")
//   let title = $("<input>").addClass("form-control").attr({
//     id: "event-title",
//     placeholder: "Event Title",
//     autocomplete: "title"
//   })
//   let titleDiv = $("<div>").addClass("form-group").append(title);
//   let description = $("<textarea>").addClass("form-control").attr({
//     id: "event-description",
//     placeholder: "Event Description",
//     rows: 5,
//     autocomplete: "description"
//   })
//   let descriptionDiv = $("<div>").addClass("form-group").append(description)
//   let btn = $("<button>").addClass("form-control btn btn-dark create-event").text("Create Event")
//   let form = $("<form>").append(titleDiv, descriptionDiv, btn)
//   content.empty().append($("<h4>").text("Create an Event"), $("<hr>"), form)
// }

// // function to render components for the side nav display
// let renderSideNav = function() {
//   let sideNav = $(".sidenav");
//   let btn1 = $("<button>").addClass("nav-link btn events").text("View Events")
//   let btn2 = $("<button>").addClass("nav-link btn myevents").text("My Events")
//   let btn3 = $("<button>").addClass("nav-link btn attending").text("Attending")
//   let btn4 = $("<button>").addClass("nav-link btn create").text("Create Event")
//   let li1 = $("<li>").addClass("nav-item").append(btn1)
//   let li2 = $("<li>").addClass("nav-item").append(btn2)
//   let li3 = $("<li>").addClass("nav-item").append(btn3)
//   let li4 = $("<li>").addClass("nav-item").append(btn4)
//   let ul = $("<ul>").addClass("nav flex-column").append(li1, li2, li3, li4)
//   sideNav.empty().append(ul)
// }

// // function to render the components for the profile page
// let renderProfilePage = function() {
//   let contents = $(".contents");
//   getUserInfo(userId).then(function(user) {
//     let h4 = $("<h4>").text("Edit Profile");
//     let inputEmail = $("<input>").addClass("form-control").attr({
//       type: "email",
//       value: user.email,
//       readonly: true,
//       autocomplete: "why do i need this when readonly is true?! stupid chrome."
//     });
//     let div1 = $("<div>").addClass("form-group").append(inputEmail);
//     let inputPassword = $("<input>").addClass("form-control").attr({
//       type: "password",
//       id: "password",
//       value: "",
//       placeholder: "change password",
//       autocomplete: "new-password"
//     });
//     let div2 = $("<div>").addClass("form-group").append(inputPassword);
//     let inputPwConfirm = $("<input>").addClass("form-control").attr({
//       type: "password",
//       id: "pwconfirm",
//       value: "",
//       placeholder: "confirm password",
//       autocomplete: "new-password"
//     });
//     let div3 = $("<div>").addClass("form-group").append(inputPwConfirm);
//     let inputName = $("<input>").addClass("form-control").attr({
//       type: "name",
//       id: "name",
//       value: user.name,
//       placeholder: "enter your name",
//       autocomplete: "name"
//     });
//     let div4 = $("<div>").addClass("form-group").append(inputName);
//     let button = $("<button>").addClass("form-control btn btn-dark update-user").text("Update");
//     let form = $("<form>").append(div1, div2, div3, div4, button);
//     contents.empty();
//     contents.append(h4, form);

//   })
// }

// // API CALLS
// let getEventInfo = function() {
//   return $.ajax({
//     url: "/api/event",
//     type: "GET"
//   })
// }

// let getEventsByUserId = function(id) {
//   return $.ajax({
//     url: "/api/user/" + id + "/events",
//     type: "GET"
//   })
// }

// let getEventsAttending = function(id) {
//   return $.ajax({
//     url: "/api/user/" + id + "/attending",
//     type: "GET"
//   })
// }

// let createEvent = function(data) {
//   return $.ajax({
//     url: "/api/event",
//     type: "POST",
//     data: data
//   })
// }

// let attendEvent = function(data) {
//   return $.ajax({
//     url: "/api/attend/",
//     type: "POST",
//     data: data
//   })
// }

// let unattendEvent = function(data) {
//   return $.ajax({
//     url: "/api/attend/",
//     type: "DELETE",
//     data: data
//   })
// }

// let updateEvent = function(id, data){
//   return $.ajax({
//     url: "/api/event/" + id,
//     type: "PUT",
//     data: data
//   })
// }

// let deleteEvent = function(id) {
//   return $.ajax({
//     url: "/api/event/" + id,
//     type: "DELETE"
//   })
// }

// let getUserInfo = function(userId) {
//   return $.ajax({
//     url: "/api/user/" + userId,
//     type: "GET",
//   })
// }

// let saveUserInfo = function(data) {
//   return $.ajax({
//     url: "/api/user/" + userId,
//     type: "PUT",
//     data: data
//   })
// }

// let getAttendees = function(eventId) {
//   return $.ajax({
//     url: "/api/event/" + eventId + "/attendees",
//     type: "GET"
//   })
// }

// // ----- Event Listeners

// $(document).on("ready", authUser())

// // -- Nav Links
// // logout link
// $(".logout").on("click", function(event) {
//   event.preventDefault();
//   window.localStorage.removeItem("user");
//   window.location.reload();
// })

// // create event button
// $(document).on("click", ".create-event", function(event) {
//   event.preventDefault()
//   let eventTitle = $("#event-title").val().trim();
//   let eventDescription = $("#event-description").val().trim();
//   if (eventTitle.length < 1) {
//     $("#event-title").focus();
//   } else if (eventDescription.length < 1) {
//     $("#event-description").focus();
//   } else {
//     let data = {
//       title: eventTitle,
//       description: eventDescription,
//       hostId: userId
//     }
//     createEvent(data).then(function() {
//       window.location.replace("./myevents")
//     })
//   }
// })

// // update button in profile component
// $(document).on("click", ".update-user", function(event) {
//   event.preventDefault();
//   let password = $("#password").val().trim();
//   let pwconfirm = $("#pwconfirm").val().trim();
//   let name = $("#name").val().trim();
//   let data = {}
//   if (name.length > 1) {
//     data = {
//       ...data,
//       name: name,
//     }
//   }
//   if (password.length > 1) {
//     if (password !== pwconfirm) {
//       $("#pwconfirm").val("").attr("placeholder", "password doesn't match").focus();
//     } else {
//       data = { ...data, password: password }
//     }
//   }
//   if (!isObjEmpty(data)) {
//     saveUserInfo(data).then(function() {
//       window.location.reload();
//     })
//   }
// })

// // attend button in view events component
// $(document).on("click", "button.attend", function(event) {
//   event.preventDefault();
//   // let btn = this button since this = document
//   let btn = event.target;
//   let eventId = $(btn).data("id");
//   let data = {
//     UserId: userId,
//     EventId: eventId
//   }
//   attendEvent(data).then(function(attend){
//     if (attend) {
//       window.location.replace("./attending")
//     } else {
//       alert("You're already attending this event!")
//     }
//   })
// })

// // delete button in my events component
// $(document).on("click", "button.delete", function(event) {
//   event.preventDefault();
//   let btn = event.target;
//   let eventId = $(btn).data("id");
//   deleteEvent(eventId).then(function() {
//     window.location.replace("./myevents")
//   })
// })

// // unattend button in attending component
// $(document).on("click", "button.unattend", function(event) {
//   event.preventDefault();
//   let btn = event.target;
//   let eventId = $(btn).data("id");
//   let data = {
//     UserId: userId,
//     EventId: eventId,
//   }
//   unattendEvent(data).then(function() {
//     window.location.replace("./attending")
//   })
// })

// // update button in my events component
// $(document).on("click", "button.update-event", function(event) {
//   event.preventDefault();
//   let btn = event.target;
//   let eventId = $(btn).data("id");
//   let data = {
//     title: $(`#event${eventId}-title`).val().trim(),
//     description: $(`#event${eventId}-description`).val().trim(),
//   }
//   updateEvent(eventId, data).then(function() {
//     window.location.replace("./main")
//   })
// })