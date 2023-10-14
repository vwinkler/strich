import { html, render } from 'lit-html'
import { ProofTreeView } from './ProofTreeView'
import './style.css'

const main = () => {
    const contentElement = document.querySelector<HTMLDivElement>('#app')
    if (!contentElement) {
        console.error("Could not find content element")
        return
    }

    render(html`
           ${ProofTreeView({ conclusion: "-p-q--", premiseProofTrees: []})}
           `, contentElement)
}

main()
