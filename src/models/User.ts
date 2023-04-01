import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
} from "sequelize-typescript";

@Table({ modelName: "Users" })
export default class UserModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ allowNull: false, type: DataType.STRING })
  username: string;

  @Column({ allowNull: false, type: DataType.STRING })
  email: string;

  @Column({ allowNull: false, type: DataType.STRING })
  password: string;
}