export interface IContent {
  id: string;
  date: string;
  heading: string;
  github_link: string;
  frontend_link?: string;
  backend_link?: string; 
  live_link: string;
  short_description: string;
  images?: string; 
  description: string[];
}
