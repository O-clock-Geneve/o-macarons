import { Link } from "react-router"
import { MacaronI } from "../@types/macaron"
import "./Macaron.scss"

interface IProps {
  macaron: MacaronI
  onClick: () => void
}

export default function Macaron({ macaron, onClick }: IProps) {
  return (
    <li key={macaron.id}>
      <button onClick={onClick} type="button">
        <div
          className="macaron__coque"
          // changement de la couleur avec du CSS-in-JS
          style={{ backgroundColor: macaron.color }}
        />
        <div className="macaron__filling">{macaron.flavour}</div>
        <div
          className="macaron__coque reversed"
          style={{ backgroundColor: macaron.color }}
        />
      </button>
      <Link to={`/macarons/${macaron.flavour}`}>Plus d'infos</Link>
    </li>
  )
}
