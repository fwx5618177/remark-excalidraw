import { expect } from 'chai';
import { readFileSync } from 'fs';
import { describe, it } from 'mocha';
import { join } from 'path';
import { remark } from 'remark';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import html from 'remark-html';
import remarkStringify from 'remark-stringify';

import remarkExcalidraw from '../src';
import { visit } from 'unist-util-visit';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactMarkdown from 'react-markdown';

describe('Plugin', function () {
    let markdownContent: string;

    before(function () {
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

    it('should process text nodes asynchronously', async function () {
        const processor = unified().use(remarkParse).use(remarkExcalidraw).use(html);

        const inputMarkdown = markdownContent;

        try {
            const file = await processor.process(inputMarkdown);
            const output = String(file);
            expect(output).to.include('Test'); // 根据你的插件实际处理效果修改预期结果
        } catch (err: any) {
            throw new Error(err);
        }
    });

    it('should render markdown with asynchronous processing', function () {
        this.timeout(10000);
        const ast = remark().use(remarkExcalidraw).parse(markdownContent);

        visit(ast, 'text', (node: any) => {
            console.log(node);
        });
    });

    it('should render markdown with asynchronous processing', function () {
        const element = React.createElement(ReactMarkdown, {
            children: markdownContent,
            remarkPlugins: [remarkExcalidraw],
        });

        const html = ReactDOMServer.renderToStaticMarkup(element);
        expect(html).to.include('Test');
    });
});
