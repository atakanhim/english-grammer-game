interface SentenceData {
    wordEng: string;
    wordEngAry: string[];
    wordEngAryResult: string[];
    level?: string; // Optional property
    tense?: string; // Optional property
}
interface IVerbs {
    base_form: string;
    past_simple: string;
    past_participle: string;
}