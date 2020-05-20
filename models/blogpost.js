module.exports = function(sequelize, DataTypes) {
    var posts = sequelize.define("Posts", {
      
      posts: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
     
    });
  
    posts.associate = function(models) {
      models.posts.belongsTo(models.User, { onDelete: 'cascade' });

  };
  
  return posts;
  
  };