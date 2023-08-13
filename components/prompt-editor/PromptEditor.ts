import { GPTPromptElementType } from "./GPTTextType";
import { parseTagAttributes } from "./parseTagAttributes";
const hyperTextToData = (hyperText:string): GPTPromptElementType[]=>{
    const regex = /<gpt-prompt[^>]*?>.*?<\/gpt-prompt>/g;
    const collection:GPTPromptElementType[]=[]
    let last = null
    do{
        last = regex.exec(hyperText)
        if(last){
            const end = last.index+last[0].length
            collection.push({
                type:"gpt-prompt",
                position:{start:last.index,end},
                attributes: parseTagAttributes(last[0],'gpt-prompt'),
                content:last[0]
            })
        }
    }while(last)
    return collection
}
export class GPTPromptController {
    private originText = "";
    inputs: GPTPromptElementType[] = [];
    set text(text: string) {
        this.originText = text;
        this.inputs = hyperTextToData(text);
    }
    get text() {
        return this.originText;
    }
    constructor(hyperText: string) {
        this.text = hyperText;
    }
}
