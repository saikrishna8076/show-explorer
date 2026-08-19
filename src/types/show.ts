export type Show = {
  id: number;
  name: string;
  language?: string;
  status?: string;
  genres?: string[];
  summary?: string;
  image?: {
    original?: string;
    medium?: string;
  };
  rating?: {
    average?: number;
  };
  premiered?: string;
  runtime?: number;
};

export type ShowSearchResult = {
  show: Show;
};

export type ScheduleItem = {
  show: Show;
};
