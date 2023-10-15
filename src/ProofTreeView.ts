import { html, TemplateResult } from 'lit-html'

export interface ProofTree {
    conclusion: string
    premiseProofTrees: ProofTree[]
    rule?: string
}

export function ProofTreeView(tree: ProofTree) : TemplateResult {
    const premiseTreeViews = tree.premiseProofTrees.map(ProofTreeView)
    return html`
    <div class="tree_container">
    <div class="premise_trees">${premiseTreeViews}</div>
    <hr class="inference_line">
    <div class="below_inference_line_container">
    ${tree.rule ? html`<div class="rule_name">${tree.rule}</div>` : html``}
    <div class="formula">${tree.conclusion}</div>
    </div>
    </div>
    `
}
