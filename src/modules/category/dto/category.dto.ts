import { IsString, IsNumber, IsBoolean } from "class-validator";
//
export default class CategoryDTO {
  @IsString()
  category_level: string;

  @IsString()
  category_name: string;

  @IsString()
  category_description: string;

  @IsNumber()
  sorting: number;

  @IsString()
  category_image_url: string;

  @IsString()
  comment: string;

  @IsBoolean()
  status: string;

  @IsNumber()
  id: number;
}
