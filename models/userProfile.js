module.exports = function (sequelize, DataTypes) {

    const user = sequelize.define("user_profile", {
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

    user.associate = function (models) {
        user.hasMany(models.book_list, {
            onDelete: "restrict"
        });
    };

    user.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    user.addHook("beforeCreate", user => {
        user.password = bcrypt.hashSync(
            user.password,
            bcrypt.genSaltSync(10),
            null
        );
    });
    
    return user;
};
