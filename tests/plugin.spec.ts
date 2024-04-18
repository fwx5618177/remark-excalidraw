import { expect } from 'chai';
import { readFileSync } from 'fs';
import { describe, it } from 'mocha';
import { join } from 'path';
import { remark } from 'remark';

import remarkExcalidraw from '../src';
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
        const ast = remark().use(remarkExcalidraw, {}).parse(markdownContent);
        expect(ast).to.be.an('object');
    });

    it('should render the markdown content', async function () {
        remark()
            .use(remarkExcalidraw, {
                mode: 'line',
            })
            .use(() => {
                return tree => {
                    visit(tree, 'text', (node: any) => {
                        if (node && node?.data) {
                            expect(node.data).to.be.an('object');
                        }
                    });
                };
            })
            .parse(markdownContent);
    });
});
