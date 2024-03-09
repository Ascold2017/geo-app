import { generateBlocks, isMatchQA, splitVariant } from "./stringUtils"



describe('isMatchQA', () => {
    test('simple equal strings', () => {
        const question = 'test test test';
        const answer = 'test test test'
        const isMatch = isMatchQA(question, answer);
        expect(isMatch).toBe(true);
    })

    test('many extra spaces in question', () => {
        const question = ' test test  test ';
        const answer = 'test test test'
        const isMatch = isMatchQA(question, answer);
        expect(isMatch).toBe(true);
    })

    test('many extra spaces in answer', () => {
        const question = 'test test test';
        const answer = ' test test  test '
        const isMatch = isMatchQA(question, answer);
        expect(isMatch).toBe(true);
    })

    test('symbols in question, simple answer', () => {
        const question = 'test test, test. ?!';
        const answer = 'test test test'
        const isMatch = isMatchQA(question, answer);
        expect(isMatch).toBe(true);
    })

    test('symbols in question and answer', () => {
        const question = 'test test, test. ?!';
        const answer = 'test. test, ! test ?'
        const isMatch = isMatchQA(question, answer);
        expect(isMatch).toBe(true);
    })

    test('mixed case', () => {
        const question = 'Test tEst test';
        const answer = 'Test teSt tesT'
        const isMatch = isMatchQA(question, answer);
        expect(isMatch).toBe(true);
    })

    test('string blocks in question', () => {
        const question = [' ', 'teSt!', 'test', 'test?']
        const answer = 'test test test';
        const isMatch = isMatchQA(question, answer);
        expect(isMatch).toBe(true);
    })

    test('incorrect question', () => {
        const question = 'testt test test';
        const answer = 'test test test';
        const isMatch = isMatchQA(question, answer);
        expect(isMatch).toBe(false);
    })

    test('incorrect question blocs', () => {
        const question = ['testt', 'test', 'test'];
        const answer = 'test test test';
        const isMatch = isMatchQA(question, answer);
        expect(isMatch).toBe(false);
    })
})


describe('generateBlocks', () => {
    test('simple, without other answers', () => {
        const answer = 'Test answer with 5 blocks';
        const blocks = generateBlocks(answer);
        const expected = ['Test', 'answer', 'with', '5', 'blocks'];
        expect(blocks).toEqual(expect.arrayContaining(expected));
        expect(blocks.length).toBe(expected.length)
    });

    test('simple, with other answers', () => {
        const answer = 'Test answer with 5 blocks';
        const otherAnswers = [
            'Test other one',
            'Test other two'
        ]
        const blocks = generateBlocks(answer, otherAnswers);
        const expected = ['Test', 'answer', 'with', '5', 'blocks', 'other', 'one', 'two'];
        expect(blocks).toEqual(expect.arrayContaining(expected));
        expect(blocks.length).toBe(expected.length)
    })

    test('with info blocks, without other answers', () => {
        const answer = ' Test  answer with 5 blocks, example (info block, should be removed)';
        const blocks = generateBlocks(answer);
        const expected = ['Test', 'answer', 'with', '5', 'blocks,', 'example'];
        expect(blocks).toEqual(expect.arrayContaining(expected));
        expect(blocks.length).toBe(expected.length)
    });

    test('with few variants, without other answers', () => {
        const answer = ' Test  answer with 5 blocks | other variant!';
        const blocks = generateBlocks(answer);
        const expected = ['Test', 'answer', 'with', '5', 'blocks', 'other', 'variant!'];
        expect(blocks).toEqual(expect.arrayContaining(expected));
        expect(blocks.length).toBe(expected.length)
    });

    test('complex, without other answers', () => {
        const answer = ' Test  answer with 5 blocks, with many many extra symbols and spaces and cases test !';
        const blocks = generateBlocks(answer);
        const expected = ['Test', 'answer', 'with', '5', 'blocks,', 'many', 'extra', 'symbols', 'and', 'spaces', 'cases', 'test', '!'];
        expect(blocks).toEqual(expect.arrayContaining(expected));
        expect(blocks.length).toBe(expected.length)
    });


    test('complex, with other answers', () => {
        const answer = ' Test  answer with 5 blocks, with many many extra symbols and spaces and cases test !';
        const otherAnswers = [
            'Test other one!',
            'Test other two?'
        ]
        const blocks = generateBlocks(answer, otherAnswers);
        const expected = ['Test', 'answer', 'with', '5', 'blocks,', 'many', 'extra', 'symbols', 'and', 'spaces', 'cases', 'test', '!', 'one!', 'two?', 'other'];
        expect(blocks).toEqual(expect.arrayContaining(expected));
        expect(blocks.length).toBe(expected.length)
    });

})


describe('splitVariants', () => {
    test('single variant', () => {
        const result = splitVariant('Test test test');
        expect(result).toEqual('Test test test')
    })

    test('few variants', () => {
        const result = splitVariant('Test test test|test2 test2 test2');
        expect(result).toEqual('Test test test/test2 test2 test2')
    })
})