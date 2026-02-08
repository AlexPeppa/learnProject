export interface CarInfo {
  code: string;
  name: string;
  description: {
    text: string;
    state: string;
    models: string[];
    founded: string;
  };
}
