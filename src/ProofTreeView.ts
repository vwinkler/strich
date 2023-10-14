import { html, TemplateResult } from 'lit-html'

export interface ProofTree {
    conclusion: string
    premiseProofTrees: ProofTree[]
}

export function ProofTreeView(tree: ProofTree) : TemplateResult {
    const premiseTreeViews = tree.premiseProofTrees.map(ProofTreeView)
    return html`
    <div class="tree_container">
    <div class="premise_trees">${premiseTreeViews}</div>
    <hr class="inference_line">
    <div class="formula">${tree.conclusion}</div>
    </div>
    </div>
    `
}
