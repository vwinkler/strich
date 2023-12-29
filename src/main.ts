import { html, render } from 'lit-html'
import { ProofTree, ProofTreeView, defaultCustomViews } from './ProofTreeView'
import './style.css'

type CustomProofTree = ProofTree<string>

const main = () => {
    const contentElement = document.querySelector<HTMLDivElement>('#app')
    if (!contentElement) {
        console.error("Could not find content element")
        return
    }
    const leftTopPremiseTree : CustomProofTree = { conclusion: "a", premiseProofTrees: [], rule: "" }
    const rightTopPremiseTree : CustomProofTree = { conclusion: "a -> b", premiseProofTrees: [],
        rule: "" }
    const topPremiseTrees = [leftTopPremiseTree, rightTopPremiseTree]
    const leftPremiseTree : CustomProofTree = { conclusion: "b", premiseProofTrees: topPremiseTrees,
        rule: "MP"}
    const rightPremiseTree : CustomProofTree = { conclusion: "b -> c", premiseProofTrees: [],
        rule: "Ax.1" }
    const premiseTrees = [leftPremiseTree, rightPremiseTree]
    const tree : CustomProofTree = { conclusion: "c", premiseProofTrees: premiseTrees, rule: "MP"}

    render(html`
           ${ProofTreeView(tree, defaultCustomViews)}
           `, contentElement)
}

main()
