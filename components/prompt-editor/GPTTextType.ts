export type GPTPromptElementType = {
    type: "gpt-prompt";
    content: string;
    position: { start: number; end: number };
    attributes: { [key: string]: string };
};
