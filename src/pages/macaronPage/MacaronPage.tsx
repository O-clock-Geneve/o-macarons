import { useParams } from "react-router"
import { MacaronI } from "../../@types/macaron"

interface IProps {
  macaronList: MacaronI[]
}
export default function MacaronPage({ macaronList }: IProps) {
  const { flavour } = useParams()

  const macaron: undefined | MacaronI = macaronList.find(
    (macaron) => macaron.flavour === flavour,
  )

  return (
    <section>
      <h1>Macaron infos : </h1>
      {macaron ? (
        <div style={{ backgroundColor: macaron.color }}>
          <h2>Le Macaron gout : {macaron.flavour}</h2>
          <h3>color: {macaron.color}</h3>
        </div>
      ) : (
        <p>Aucun macaron du goût : {flavour} dans notre boutique</p>
      )}
    </section>
  )
}
