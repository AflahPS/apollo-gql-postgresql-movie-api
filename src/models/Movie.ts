import { Column, Model, Table, PrimaryKey, DataType } from "sequelize-typescript";

export type Movie = {
  id: number;
  movieName: string;
  description: string;
  directorName: string;
  releaseDate: Date;
};

@Table({ modelName: "Movies"})
export class MovieModel extends Model<MovieModel> {
  @PrimaryKey
  @Column({ allowNull: false, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ allowNull: false, type: DataType.STRING })
  movieName: string;

  @Column({ allowNull: false, type: DataType.STRING })
  description: string;

  @Column({ allowNull: false, type: DataType.STRING })
  directorName: string;

  @Column({ allowNull: false, type: DataType.DATE })
  releaseDate: Date;
}