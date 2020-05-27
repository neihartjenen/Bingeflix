// globally set userId
let userId = localStorage.getItem("user")

// redirect user to login if user isn't found in localStorage -- for handling refreshes
let authUser = function() {
  if (!window.localStorage.getItem("user")) {
    // send login page if user doesn't exist
    window.location.replace("./home")
  } else {
    let path = window.location.pathname;
    renderContent(path)
  }
}

// checks if an object is empty e.g: let emptyObj = {}
let isObjEmpty = function(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

// render Content based on argument
// in this case, content = window.location.pathname
let renderContent = function(content){
  switch (content) {
    case "/myreviews":
      // get reviews made by user from server
      getReviewsByUserId(userId).then(function(reviews) {
        // then render the components to display on page
        renderMyReviews(reviews);
      })
      break;
    case "/create":
      // render create review components to display on page
      renderCreatePage();
      break;
    case "/following":
      // get reviews that user is following from server
      getReviewsFollowing(userId).then(function(reviews) {
        // then render the components to display on a page
        console.log(reviews)
        renderReviewsFollowing(reviews);
      })
      break;
    case "/profile":
      renderProfilePage();
      break;
    default:
      // get all reviews from server
      getReviewInfo().then(function(reviews) {
        // then render the components to display on a page
        renderReviews(reviews);
      })
  }
}

// function to render display components based on data sent through reviews parameter
let renderReviews = function(reviews) {
  let content = $(".contents")
  content.empty().append($("<h4>").text("Reviews List"), $("<hr>"))
  reviews.forEach(function(review) {
    let cardbody = $("<div>").addClass("card-body")
    let title = $("<h5>").addClass("mb-0").text(review.title)
    let host = $("<div>").addClass("d-flex text-muted").text(`Posted by ${review.host.email}`)
    let description = $("<p>").addClass("card-text").text(review.description)
    let btn = $("<button>").addClass("btn btn-dark attend").data("id", review.id).text("Following")

    // get all member information for specific review from the server
    getMembers(review.id).then(function(members) {
      let guests = $("<div>").addClass("ttip ml-auto").text("Following: " + members.length)
      let tooltip = $("<span>").addClass("ttiptext")
      let guestlist = $("<ul>").addClass("list-group")
      members.forEach(function(member) {
        let li = $("<li>").addClass("list-group-item text-dark").text(member.User.name)
        guestlist.append(li)
      })
      tooltip.append(guestlist)
      guests.append(tooltip)
      host.append(guests);
      cardbody.append(title, host, $("<hr>"), description, btn)
      let card = $("<div>").addClass("card mb-3").append(cardbody)
      content.append(card)
    })
  })
}

// function to render reviews that the user is following based on data sent through reviews parameter
let renderReviewsFollowing = function(reviews) {
  console.log("REVIEWS", reviews)
  let content = $(".contents")
  content.empty().append($("<h4>").text("Reviews I'm Following"), $("<hr>"))
  reviews.forEach(function(review) {
    let cardbody = $("<div>").addClass("card-body")
    let title = $("<h5>").addClass("mb-0").text(review["Review.title"])
    let host = $("<div>").addClass("d-flex text-muted").text(`Posted by ${review["Review.host.email"]}`)
    let description = $("<p>").addClass("card-text").text(review["Review.description"])
    let btn = $("<button>").addClass("btn btn-dark unattend").data("id", review["Review.id"]).text("Unfollow")
    getMembers(review["Review.id"]).then(function(members) {
      let guests = $("<div>").addClass("ttip ml-auto").text("Following: " + members.length)
      let tooltip = $("<span>").addClass("ttiptext")
      let guestlist = $("<ul>").addClass("list-group")
      members.forEach(function(member) {
        let li = $("<li>").addClass("list-group-item text-dark").text(member.User.name)
        guestlist.append(li)
      })
      tooltip.append(guestlist)
      guests.append(tooltip)
      host.append(guests);
      cardbody.append(title, host, $("<hr>"), description, btn)
      let card = $("<div>").addClass("card mb-3").append(cardbody)
      content.append(card)
    })
  })
}

// function to render reviews that the user has created
let renderMyReviews = function(reviews) {
  let content = $(".contents")
  content.empty().append($("<h4>").text("Reviews I've Created"), $("<hr>"))
  reviews.forEach(function(review) {
    let card = $("<div>").addClass("card p-3 mb-3")
    let title = $("<input>").addClass("form-control").attr({
      id: `review${review.id}-title`,
      value: review.title,
      placeholder: "Review Title",
      autocomplete: "title"
    })
    let titleDiv = $("<div>").addClass("form-group").append($("<label>").text("Review Title"), title);
    let description = $("<textarea>").addClass("form-control").attr({
      id: `review${review.id}-description`,
      placeholder: "Review Description",
      rows: 3,
      autocomplete: "description"
    }).val(review.description)
    let descriptionDiv = $("<div>").addClass("form-group").append($("<label>").text("Review Description"), description)

    let btn = $("<button>").addClass("mr-3 btn btn-dark update-event").attr('id', 'update-btn').data("id", review.id).text("Update")
    let btn2 = $("<button>").addClass("btn btn-dark delete").data("id", review.id).text("Delete")
    let form = $("<form>").append(titleDiv, descriptionDiv, btn, btn2)
    card.append(form)
    content.append(card)
  })
}

// function to render components for the create review display
let renderCreatePage = function() {
  let content = $(".contents")
  let title = $("<input>").addClass("form-control").attr({
    id: "review-title",
    placeholder: "Review Title",
    autocomplete: "title"
  })
  let titleDiv = $("<div>").addClass("form-group").append(title);
  let description = $("<textarea>").addClass("form-control").attr({
    id: "review-description",
    placeholder: "Review Description",
    rows: 5,
    autocomplete: "description"
  })
  let descriptionDiv = $("<div>").addClass("form-group").append(description)
  let btn = $("<button>").addClass("form-control btn btn-dark create-event").attr('id', 'create-review-btn').text("Create Review")
  let form = $("<form>").append(titleDiv, descriptionDiv, btn)
  content.empty().append($("<h4>").text("Create a Review"), $("<hr>"), form)
}

// function to render components for the side nav display
let renderSideNav = function() {
  let sideNav = $(".sidenav");
  let btn1 = $("<button>").addClass("nav-link btn events").text("View Reviews")
  let btn2 = $("<button>").addClass("nav-link btn myevents").text("My Reviews")
  let btn3 = $("<button>").addClass("nav-link btn attending").text("Following")
  let btn4 = $("<button>").addClass("nav-link btn create").text("Create Review")
  let li1 = $("<li>").addClass("nav-item").append(btn1)
  let li2 = $("<li>").addClass("nav-item").append(btn2)
  let li3 = $("<li>").addClass("nav-item").append(btn3)
  let li4 = $("<li>").addClass("nav-item").append(btn4)
  let ul = $("<ul>").addClass("nav flex-column").append(li1, li2, li3, li4)
  sideNav.empty().append(ul)
}

// function to render the components for the profile page
let renderProfilePage = function() {
  let contents = $(".contents");
  getUserInfo(userId).then(function(user) {
    let h4 = $("<h4>").text("Edit Profile");
    let inputEmail = $("<input>").addClass("form-control").attr({
      type: "email",
      value: user.email,
      readonly: true,
      autocomplete: "why do i need this when readonly is true?! stupid chrome."
    });
    let div1 = $("<div>").addClass("form-group").append(inputEmail);
    let inputPassword = $("<input>").addClass("form-control").attr({
      type: "password",
      id: "password",
      value: "",
      placeholder: "change password",
      autocomplete: "new-password"
    });
    let div2 = $("<div>").addClass("form-group").append(inputPassword);
    let inputPwConfirm = $("<input>").addClass("form-control").attr({
      type: "password",
      id: "pwconfirm",
      value: "",
      placeholder: "confirm password",
      autocomplete: "new-password"
    });
    let div3 = $("<div>").addClass("form-group").append(inputPwConfirm);
    let inputName = $("<input>").addClass("form-control").attr({
      type: "name",
      id: "name",
      value: user.name,
      placeholder: "enter your name",
      autocomplete: "name"
    });
    let div4 = $("<div>").addClass("form-group").append(inputName);
    let button = $("<button>").addClass("form-control btn btn-dark update-user").text("Update");
    let form = $("<form>").append(div1, div2, div3, div4, button);
    contents.empty();
    contents.append(h4, form);

  })
}

// API CALLS
let getReviewInfo = function() {
  return $.ajax({
    url: "/api/review",
    type: "GET"
  })
}

let getReviewsByUserId = function(id) {
  return $.ajax({
    url: "/api/user/" + id + "/reviews",
    type: "GET"
  })
}

let getReviewsFollowing = function(id) {
  return $.ajax({
    url: "/api/user/" + id + "/following",
    type: "GET"
  })
}

let createReview = function(data) {
  return $.ajax({
    url: "/api/review",
    type: "POST",
    data: data
  })
}

let followReview = function(data) {
  return $.ajax({
    url: "/api/follow/",
    type: "POST",
    data: data
  })
}

let unfollowReview = function(data) {
  return $.ajax({
    url: "/api/follow/",
    type: "DELETE",
    data: data
  })
}

let updateReview = function(id, data){
  return $.ajax({
    url: "/api/review/" + id,
    type: "PUT",
    data: data
  })
}

let deleteReview = function(id) {
  return $.ajax({
    url: "/api/review/" + id,
    type: "DELETE"
  })
}

let getUserInfo = function(userId) {
  return $.ajax({
    url: "/api/user/" + userId,
    type: "GET",
  })
}

let saveUserInfo = function(data) {
  return $.ajax({
    url: "/api/user/" + userId,
    type: "PUT",
    data: data
  })
}

let getMembers = function(reviewId) {
  return $.ajax({
    url: "/api/review/" + reviewId + "/members",
    type: "GET"
  })
}

// ----- Event Listeners

$(document).on("ready", authUser())

// -- Nav Links
// logout link
$(".logout").on("click", function(review) {
  review.preventDefault();
  window.localStorage.removeItem("user");
  window.location.reload();
})

// create review button
$(document).on("click", "#create-review-btn", function(review) {
  console.log('button clicked')
  review.preventDefault()
  let reviewTitle = $("#review-title").val().trim();
  let reviewDescription = $("#review-description").val().trim();
  if (reviewTitle.length < 1) {
    $("#review-title").focus();
  } else if (reviewDescription.length < 1) {
    $("#review-description").focus();
  } else {
    let data = {
      title: reviewTitle,
      description: reviewDescription,
      hostId: userId
    }
    createReview(data).then(function() {
      window.location.replace("./myreviews")
    })
  }
})

// update button in profile component
$(document).on("click", ".update-user", function(review) {
  review.preventDefault();
  let password = $("#password").val().trim();
  let pwconfirm = $("#pwconfirm").val().trim();
  let name = $("#name").val().trim();
  let data = {}
  if (name.length > 1) {
    data = {
      ...data,
      name: name,
    }
  }
  if (password.length > 1) {
    if (password !== pwconfirm) {
      $("#pwconfirm").val("").attr("placeholder", "password doesn't match").focus();
    } else {
      data = { ...data, password: password }
    }
  }
  if (!isObjEmpty(data)) {
    saveUserInfo(data).then(function() {
      window.location.reload();
    })
  }
})

// follow button in view reviews component
$(document).on("click", "button.follow", function(review) {
  review.preventDefault();
  // let btn = this button since this = document
  let btn = review.target;
  let reviewId = $(btn).data("id");
  let data = {
    UserId: userId,
    ReviewId: reviewId
  }
  attendReview(data).then(function(follow){
    if (follow) {
      window.location.replace("./following")
    } else {
      alert("You're already following this review!")
    }
  })
})

// delete button in my reviews component
$(document).on("click", "button.delete", function(review) {
  review.preventDefault();
  let btn = review.target;
  let reviewId = $(btn).data("id");
  deleteReview(reviewId).then(function() {
    window.location.replace("./myreviews")
  })
})

// unfollow button in following component
$(document).on("click", "button.unfollow", function(review) {
  review.preventDefault();
  let btn = review.target;
  let reviewId = $(btn).data("id");
  let data = {
    UserId: userId,
    ReviewId: reviewId,
  }
  unfollowReview(data).then(function() {
    window.location.replace("./following")
  })
})

// update button in my reviews component
// $(document).on("click", "button.update-review", function(review) {
$(document).on("click", "#update-btn", function(review) {
  console.log('OVER HERE!!!!!!')
  review.preventDefault();
  let btn = review.target;
  let reviewId = $(btn).data("id");
  let data = {
    title: $(`#review${reviewId}-title`).val().trim(),
    description: $(`#review${reviewId}-description`).val().trim(),
  }
  updateReview(reviewId, data).then(function() {
    window.location.replace("./myreviews")
  })
})