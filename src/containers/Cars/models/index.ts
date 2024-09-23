export interface CarInfo {
  code: number;
  name: string;
  description: {
    text: string;
    state: string;
    models: string[];
    founded: number;
  };
}
