const bcrypt = require("bcryptjs");
module.exports = function (sequelize, DataTypes) {
    const userProfile = sequelize.define("userProfile", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    // userProfile.associate = function (models) {
    //     userProfile.hasMany(models.bookList, {
    //         onDelete: "restrict"
    //     });

    //     userProfile.hasMany(models.userComment, {
    //         onDelete: "restrict"
    //     });
    // };

    // userProfile.associate = function (models) {
    //     userProfile.hasMany(models.bookList, {
    //         onDelete: "cascade"
    //     });
    // }

    userProfile.prototype.validPassword = password => {
        return bcrypt.compareSync(password, this.password);
    };

    userProfile.addHook("beforeCreate", userProfile => {
        userProfile.password = bcrypt.hashSync(
            userProfile.password,
            bcrypt.genSaltSync(10),
            null
        );
    });

    return userProfile;
};
