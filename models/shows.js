    module.exports = function(sequelize, DataTypes) {
        var shows = sequelize.define("Shows", {
          showsName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [2, 40]
                }
            },
            showsImage: {
                type: DataTypes.STRING,
                allowNull: true,
            },
      
            showsPlot: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            showsYear: {
                type: DataTypes.INTEGER, 
                allowNull: false,
            }, 
         
        });
       
     shows.associate = function(models) {
          models.shows.hasMany( models.Votes, { onDelete: 'cascade' });
      };
       
      shows.associate = function(models) {
           models.shows.belongsTo(models.user,  { onDelete: 'cascade' });
       };
      
      return Shows;
      
      };