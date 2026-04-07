import { useState } from "react"
import Macaron from "../../macaron/Macaron"
import MacaronBox from "../../macaronBox/MacaronBox"
import { MacaronI } from "../../@types/macaron"

interface IProps {
  macaronList: MacaronI[]
}

export default function Home({ macaronList }: IProps) {
  //Je prépare mon state afin d'afficher / selectionner le Macaron choisi par l'utilisateur
  const [selectedMacaron, setSelecetMacaron] = useState<MacaronI | undefined>(
    macaronList[0] || undefined,
  )

  return (
    <>
      {macaronList.length > 0 ? (
        <MacaronBox>
          {
            // avec map on fabrique un tableau d'element div JSX
            macaronList.map((macaron) => {
              // on doit return la ligne du tableau généré par map: un element JSX div
              // on est obligé d'ajouter une prop "key" aux elements quand ils sont dan sun tableau pour que React puisse les identifier (attention on ne met pas l'index du tableau en key)
              return (
                <Macaron
                  macaron={macaron}
                  onClick={() => setSelecetMacaron(macaron)}
                />
              )
            })
          }
        </MacaronBox>
      ) : (
        <p>
          Pas de macarons disponibles, revenez plus tard. Ou achetez des cookies
          c'est moins cher
        </p>
      )}

      <div>Please select your favorite Macaron : </div>
      <p>
        Your favorite Macaron is :{" "}
        {selectedMacaron
          ? `macaron ${selectedMacaron.flavour}`
          : "Aucun Macaron selectionné"}
      </p>
    </>
  )
}
