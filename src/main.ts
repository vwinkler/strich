import { html, render } from 'lit-html'
import { ProofTree, ProofTreeView, CustomViews } from './ProofTreeView'
import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators';
import './style.css'

class HoverableFormula {
    formula : string
    hovered : boolean
    
    constructor(formula : string) {
        this.formula = formula
        this.hovered = false
    }
}

type CustomProofTree = ProofTree<HoverableFormula>

const hoveredFormula$ = new BehaviorSubject<CustomProofTree|undefined>(undefined)

const HoverableFormulaView = (tree : CustomProofTree) => {
    const style = tree.conclusion.hovered ? "color: red" : ""
    return html`<div
    @mouseover="${(_e : Element) => hoveredFormula$.next(tree)}"
    @mouseout="${(_e : Element) => hoveredFormula$.next(undefined)}"
    style="${style}">
    ${tree.conclusion.formula}
    </div>`
}

const hoverableViews : CustomViews<HoverableFormula> = {
    FormulaView: HoverableFormulaView,
    InferenceLineView: (_tree) => html`<hr style="margin: 0">`,
    RuleNameView: (tree) => html`<div style="font-size: .7em">${tree.rule}</div>`
}

function setHovered(innerTreeToHover : CustomProofTree, tree : CustomProofTree) : CustomProofTree {
    return tree === innerTreeToHover ?
        {
          ...tree,
          conclusion: {
              ...tree.conclusion,
              hovered: true
          },
          premiseProofTrees: tree.premiseProofTrees.map(premiseTree => setHovered(innerTreeToHover, premiseTree))
        } : {
          ...tree,
          conclusion: {
              ...tree.conclusion,
              hovered: false
          },
          premiseProofTrees: tree.premiseProofTrees.map(premiseTree => setHovered(innerTreeToHover, premiseTree))
        }
}

const main = () => {
    const contentElement = document.querySelector<HTMLDivElement>('#app')
    if (!contentElement) {
        console.error("Could not find content element")
        return
    }
    const leftTopPremiseTree : CustomProofTree = {
        conclusion: new HoverableFormula("a"),
        premiseProofTrees: [], rule: ""
    }
    const rightTopPremiseTree : CustomProofTree = {
        conclusion: new HoverableFormula("a -> b"),
        premiseProofTrees: [],
        rule: ""
    }
    const topPremiseTrees = [leftTopPremiseTree, rightTopPremiseTree]
    const leftPremiseTree : CustomProofTree = {
        conclusion: new HoverableFormula("b"),
        premiseProofTrees: topPremiseTrees,
        rule: "MP"}
    const rightPremiseTree : CustomProofTree = {
        conclusion: new HoverableFormula("b -> c"),
        premiseProofTrees: [],
        rule: "Ax.1"
    }
    const premiseTrees = [leftPremiseTree, rightPremiseTree]
    const tree : CustomProofTree = {
        conclusion: new HoverableFormula("c"),
        premiseProofTrees: premiseTrees,
        rule: "MP"
    }
    
    hoveredFormula$.pipe(
        map(formula => !!formula ? setHovered(formula, tree) : tree),
        map(tree => html`${ProofTreeView(tree, hoverableViews)}`)
    )
    .subscribe({ next: treeHtml => render(treeHtml, contentElement)})
}

main()
