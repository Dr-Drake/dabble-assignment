import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class CountryTypeDef {
  @Field()
  Country: string;

  @Field()
  Year: string;

  @Field()
  Area: number;

  @Field()
  Total_population: number;
}
