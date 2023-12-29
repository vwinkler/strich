import { html, TemplateResult } from 'lit-html'

export interface ProofTree<Formula> {
    conclusion: Formula
    premiseProofTrees: ProofTree<Formula>[]
    rule: string
}

export interface CustomViews<Formula> {
    FormulaView: (tree : ProofTree<Formula>) => TemplateResult,
    InferenceLineView: (tree : ProofTree<Formula>) => TemplateResult,
    RuleNameView: (tree : ProofTree<Formula>) => TemplateResult
}

export const defaultCustomViews : CustomViews<string> = {
    FormulaView: (tree) => html`${tree.conclusion}`,
    InferenceLineView: (_tree) => html`<hr style="margin: 0">`,
    RuleNameView: (tree) => html`<div style="font-size: .7em">${tree.rule}</div>`
}

export function ProofTreeView<Formula>(tree: ProofTree<Formula>,
                                       customViews : CustomViews<Formula>)
                                           : TemplateResult {
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
