import shuffleArray from "./shuffleArray";

// remove (...) blocks, whitespaces and ,.!? symbols
const genMatchString = (str: string) => str.toLowerCase().replace(/[,.!? ]/g, '').replace(/\(.*?\)/g, '');

const removeInfoBlocks = (str: string) => str.replace(/\(.*?\)/g, '');

const filterUnique = <T>(array: T[]): T[] => {
    const onlyUnique = (value: T, index: number, array: T[]) => {
        return array.indexOf(value) === index;
    }
    return array.filter(onlyUnique);
}

export const splitVariant = (str: string) => str.split('|').join('/');

export const isMatchQA = (question: string[] | string, answer: string) => {
    const plainQuestion = genMatchString((question instanceof Array ? question.join(' ') : question)).toLowerCase();
    const plainAnswer = genMatchString(answer).toLowerCase();
    const variants = plainAnswer.split('|')
    return variants.includes(plainQuestion);
}
 

export const generateBlocks = (answer: string, otherAnswers?: string[]) => {
    const sliceStringToBlocks = (str: string) => {
        const strWithoutInfoBlocks = removeInfoBlocks(str);
        const strVariants = strWithoutInfoBlocks.split('|')
        return strVariants.reduce<string[]>((acc, s) => [...acc, ...s.split(' ')], []).filter(b => b !== '')
    }

    return shuffleArray(filterUnique([
        ...sliceStringToBlocks(answer),
        ...(otherAnswers || []).reduce<string[]>((acc, ans) => [...acc, ...sliceStringToBlocks(ans)], [])
    ]))
}