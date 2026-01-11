
export interface SongData {
  title: string;
  lyrics: string;
}

export interface AnalysisResult {
  visualPrompt: string;
  mood: string;
  colors: string[];
}

export interface GeneratedCover {
  imageUrl: string;
  title: string;
  description: string;
}
