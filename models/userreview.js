module.exports = function (sequelize, DataTypes) {
    var UserReview = sequelize.define("UserReview", {
    });
  
    // associate UserReview with Users and Reviews
    UserReview.associate = function(models){
      // Each UserReview belongs to one User
      models.UserReview.belongsTo(models.User, { onDelete: "cascade" });
      // and One Review
      models.UserReview.belongsTo(models.Review, { onDelete: "cascade" });
    }
  
    return UserReview;
  }