import { REFS } from './Doc'
import definitions from "./definition.json"

console.log(definitions)

export default function App() {
  const Comp = REFS['QButton0']

  return (
    <div>
      <Comp />
    </div>
  )
}
