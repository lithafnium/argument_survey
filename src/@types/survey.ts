export interface GPT3Argument {
  clarity: number;
  coherence: number;
  novelty: number;
  relevance: number;
}

export interface Response {
  classification: string;
  novelty: number;
  explanation: string;
  showGenerated: boolean;
  evaluation: GPT3Argument[];
  postClassification: string;
  postNovelty: number;
  postExplanation: string;
  argumentFinished: boolean;
}

export interface NliQuestion {
  context: string;
  hypothesis: string;
  label: string;
  jsonIndex: number;
  isSnli: boolean;
  counterarguments: string[];
}

export interface RedditQuestion {
  title: string;
  context: string;
  response: string;
  jsonIndex: number;
}
