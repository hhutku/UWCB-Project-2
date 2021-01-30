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
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    // userProfile.associate = function (models) {
    //     userProfile.hasMany(models.book_list, {
    //         onDelete: "restrict"
    //     });

    //     userProfile.hasMany(models.user_comment, {
    //         onDelete: "restrict"
    //     });
    // };

    userProfile.associate = function(models) {
        userProfile.hasMany(models.bookList, {
            onDelete: "cascade"
        });
        userProfile.hasMany(models.userComment, {
            onDelete: "cascade"
        });
    }

    userProfile.prototype.validPassword = function (password) {
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
