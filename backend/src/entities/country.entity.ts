import { IsNotEmpty } from 'class-validator';
import { 
  BaseEntity, Entity, 
  Column, Unique, CreateDateColumn, UpdateDateColumn, ObjectIdColumn, Index, ObjectID 
} from 'typeorm';
import { Country } from '@/interfaces/country.interface';

@Entity()
export class CountryEntity extends BaseEntity implements Country {

  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  @IsNotEmpty()
  @Unique(['country'])

  country: string;

  @Column()
  @IsNotEmpty()
  year: string;

  @Column()
  @IsNotEmpty()
  area: number;

  @Column()
  @IsNotEmpty()
  total_population: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
