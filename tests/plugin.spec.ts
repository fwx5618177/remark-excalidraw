import { expect } from 'chai';
import { readFileSync } from 'fs';
import { describe, it } from 'mocha';
import { join } from 'path';
import { remark } from 'remark';

import excalidraw from '../src/index';
import { visit } from 'unist-util-visit';

describe('Plugin', function () {
    let markdownContent: string;

    this.beforeAll(function () {
        try {
            markdownContent = readFileSync(join(__dirname, 'mock.md'), 'utf-8');
        } catch (error) {
            console.error('Error reading local test file:', error);
        }
    });

    it('should parse the markdown content', function () {
        const ast = remark().use(excalidraw, {}).parse(markdownContent);
        // console.log('AST:', JSON.stringify(ast, null, 4));
    });

    it('should render the markdown content', function () {
        const ast = remark().parse(markdownContent);

        remark()
            .use(excalidraw, {})
            .run(ast, function (error, processedAst) {
                if (error) throw error;

                visit(processedAst as any, 'text', node => {
                    // console.log('Node:', node);
                });
            });
    });
});
