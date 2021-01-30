module.exports = function(sequelize, DataTypes) {
  const userComment = sequelize.define("userComment", {
    bookId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT
    },
    displayed: {
      type: DataTypes.BOOLEAN,
      default: true
    }
  });

  userComment.associate = function(models) {
    userComment.belongsTo(models.userComment, {
      onDelete: "restrict",
      foreignKey: "parentId"
    });
    userComment.belongsTo(models.userProfile, {
      onDelete: "restrict",
      foreignKey: "userId"
    });
  };

  return userComment;
};
