"use strict";
import { Model, Sequelize } from "sequelize";
export default (sequelize: Sequelize, DataTypes: any) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    // define association here
    // }
  }
  Review.init(
    {
      movie_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
