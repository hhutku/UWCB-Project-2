const bookList = require('./bookList')

module.exports = function (sequelize, DataTypes) {
    const comment = sequelize.define("comment", {
        bookId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        text: {
            type: DataTypes.BLOB
        },
        displayed: {
            type: DataTypes.BOOLEAN,
            default: true
        },
        liked: {
            type: DataTypes.INTEGER,
            default: 0
        },
        disliked: {
            type: DataTypes.INTEGER,
            default: 0
        }
    });

    comment.associate = function (models) {
        comment.belongsTo(models.userProfile, {
            onDelete: "restrict",
            foreignKey: 'userId'
        });

        comment.belongsTo(models.comment, {
            onDelete: "restrict",
            foreignKey: 'parentId'
        });
    };

    return comment;
};
