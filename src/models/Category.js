module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'categories',
    timestamps: false,
  });

  Category.associate = (models) => {
    Category.belongsToMany(models.BlogPost, {
      foreignKey: 'categoryId',
      as: 'posts',
      through: 'posts_categories',
    });
  };

  return Category;
};
