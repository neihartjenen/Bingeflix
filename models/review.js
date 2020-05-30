module.exports = function (sequelize, DataTypes) {
    var Review = sequelize.define("Review", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  
    // associating Review table to Users and UserReviews
    Review.associate = function(models){
      // Each Review belongs to a User
      // models.Review.belongsTo(models.User, { as: "host" })
      models.Review.belongsTo(models.User, { as: "post" })
      // Each Review can have many UserReviews
      models.Review.hasMany(models.UserReview, {
        // this deletes all associated UserReviews when an Review is deleted
        onDelete: "cascade"
      })
    }
    return Review;
  }