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
        this.timeout(5000); // 设置较长的超时时间，因为涉及网络请求

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
        const element = React.createElement(ReactMarkdown, {
            children: markdownContent,
            remarkPlugins: [
                // @ts-ignore
                async options => {
                    await remarkExcalidraw(options);
                },
            ],
        });

        const html = ReactDOMServer.renderToStaticMarkup(element);
        expect(html).to.include('Test');
    });
});

describe('Mock Plugin', function () {
    const asyncPlugin = (options?: any) => {
        return async (tree: any) => {
            await new Promise(resolve => {
                visit(tree, 'text', node => {
                    // 异步修改节点
                    setTimeout(() => {
                        node.type = 'html'; // 将节点类型改为HTML
                        node.value = 'Test'; // 修改节点内容
                        resolve(null);
                    }, 1000); // 延迟1秒以模拟异步操作
                });
            });
        };
    };

    let markdownContent: string;

    before(function () {
        try {
            markdownContent = readFileSync(join(__dirname, 'mock.md'), 'utf-8');
        } catch (error) {
            console.error('Error reading local test file:', error);
        }
    });

    it('should process text nodes asynchronously', async function () {
        const processor = remark().use(remarkParse).use(asyncPlugin).use(html);

        const file = await processor.process(markdownContent);
        const output = String(file);

        expect(output).to.include('This'); // 验证输出是否包含插件修改的内容
    });

    it('should render markdown with asynchronous processing in React', async function () {
        const inputMarkdown = markdownContent;
        const processor = unified().use(remarkParse).use(asyncPlugin).use(remarkStringify);

        const file = await processor.process(inputMarkdown);
        const output = String(file);

        expect(output).to.include('Test'); // 根据实际处理效果可能需要调整期望结果
    });
});
