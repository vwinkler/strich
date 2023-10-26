import { html, TemplateResult } from 'lit-html'

export interface ProofTree {
    conclusion: string
    premiseProofTrees: ProofTree[]
    rule: string
}

export interface CustomViews {
    FormulaView: (tree : ProofTree) => TemplateResult,
    InferenceLineView: (tree : ProofTree) => TemplateResult,
    RuleNameView: (tree : ProofTree) => TemplateResult
}

export const defaultCustomViews : CustomViews = {
    FormulaView: (tree) => html`${tree.conclusion}`,
    InferenceLineView: (_tree) => html`<hr style="margin: 0">`,
    RuleNameView: (tree) => html`<div style="font-size: .7em">${tree.rule}</div>`
}

export function ProofTreeView(tree: ProofTree,
                              customViews : CustomViews = defaultCustomViews) : TemplateResult {
    const premiseTreeViews = tree.premiseProofTrees.map((tree) => ProofTreeView(tree, customViews))
    return html`
    <div class="tree_container">
    <div class="premise_trees">${premiseTreeViews}</div>
    ${customViews.InferenceLineView(tree)}
    <div class="below_inference_line_container">
    ${tree.rule ? html`<div class="rule_name">${customViews.RuleNameView(tree)}</div>` : html``}
    <div class="formula">${customViews.FormulaView(tree)}</div>
    </div>
    </div>
    `
}
