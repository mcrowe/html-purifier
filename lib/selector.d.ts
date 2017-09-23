import { ISelector } from './types';
export declare function make(selectorString: string): ISelector;
export declare function isMatch(selector: ISelector, name: string, attr: any): boolean;
