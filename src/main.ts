import { html, render } from 'lit-html'
import { ProofTreeView } from './ProofTreeView'
import './style.css'

const main = () => {
    const contentElement = document.querySelector<HTMLDivElement>('#app')
    if (!contentElement) {
        console.error("Could not find content element")
        return
    }
    const premiseTree : ProofTree = { conclusion: "-p-q--", premiseProofTrees: [] }
    const tree : ProofTree = { conclusion: "-p--q---", premiseProofTrees: [premiseTree]}

    render(html`
           ${ProofTreeView(tree)}
           `, contentElement)
}

main()
