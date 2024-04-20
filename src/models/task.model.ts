import { ImageModel } from "src/models/image.model";

export interface Task {
  id: string;
  title: string;
  images: ImageModel[];
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
