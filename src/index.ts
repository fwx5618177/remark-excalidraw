import { CodeNode, Options } from 'remark-excalidraw';
import { visit } from 'unist-util-visit';


const remarkSandpack = (options: Options) => {
    return (tree: CodeNode) => {
        visit(tree, 'code', (node: CodeNode) => {
            // const meta = Utils.parseCodeBlock(node.meta);
            // const sandboxMeta = meta?.codesandbox;
            // if (!sandboxMeta) return;

            // 执行策略实现代码的处理
            // Utils.processNodeForDisplay(node, sandboxMeta, options);
        });
    };
};

export default remarkSandpack;
