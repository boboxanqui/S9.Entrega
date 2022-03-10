export interface Question {
    question: string;
    img?: string;
    answers: [ Answer, Answer, Answer, Answer ]
}

export interface Answer {
    correct: boolean;
    option: string;
}