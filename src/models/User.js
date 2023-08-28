module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    displayName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    image: {
      defaultValue: '',
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'users',
    underscored: true,
    timestamps: false,
  });

  return User;
};
