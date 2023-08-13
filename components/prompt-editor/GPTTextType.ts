/** 最基本的输入类型，所有的子类型均衍生自此 */
export interface IInputCommonType<T> {
    /** 输入类型 */
    type: string
    /** 默认值 */
    default?: T
    /** 具体的值 */
    value: T
    /** 标题提示 */
    label: string
    /** 文本提示 */
    hint: string
}

export interface IInputText extends IInputCommonType<string> {
    type: 'string'
    default?: string
    value: string
}
export interface IInputNumber extends IInputCommonType<number> {
    type: 'number'
    default?: number
    value: number
}
type IInputType = IInputText | IInputNumber

/** 文本转数据类型时，需要抽取的类型 */
export type GPTPromptElementType = {
    id: string
    type: 'gpt-prompt';
    content: string;
    position: { start: number; end: number };
    attributes: IInputType | Record<string, string>;
};
