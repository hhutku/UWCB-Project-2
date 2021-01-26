module.exports = function (sequelize, DataTypes) {
    const bookList = sequelize.define("bookList", {
        bookId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        completed: {
            type: DataTypes.BOOLEAN,
            default: false
        },
        ranking: {
            type: DataTypes.INTEGER,
            default: null
        }
    });

    bookList.associate = function (models) {
        bookList.belongsTo(models.userProfile, {
            onDelete: "restrict",
            foreignKey: 'userId'
        });
    };

    return bookList;
};
