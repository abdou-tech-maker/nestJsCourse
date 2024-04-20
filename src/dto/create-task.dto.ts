import { Image } from "src/models/image.model";

export class CreateTaskDto {
  title: string;
  description: string;
  images: Image[];
}
