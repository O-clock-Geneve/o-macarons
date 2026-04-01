import { useState } from "react"
import { MacaronI } from "../@types/macaron"

interface IProps {
  addMacaronToList: (newPastry: Omit<MacaronI, "id">) => void
}

export default function AddMacaron({ addMacaronToList }: IProps) {
  //Je crée un state pour controller l'input utilisateur
  const [sweetness, setSweetness] = useState(3)

  //Je crée une fonction de traitement de formulaire, qui va verfier les données, et les envoyer si correctes
  // Utilité Form non controlé :
  // Je manage la donnée du formulaire SEULEMENT lorsque l'utilisateur aura press le bouton "submit"
  function handleAction(formData: FormData) {
    const flavour = formData.get("flavour") as string
    const color = formData.get("color") as string
    const newSweetness = sweetness
    console.log(`Macaron ${flavour} color : ${color}`)
    addMacaronToList({
      flavour: flavour,
      color: color,
      sweetness: newSweetness,
    })
  }

  //   //Types Primitifs
  //   const myName: string = "Benjamin"
  //   const episodeNumber: number = 3

  //   //Types non primitifs
  //   const genevaCrew: string[] = ["Loïc", "Mehdi", "Cathy", "Adrien", "Jacques"]
  //   // Spread operator [...] permet de créer une copie du tableau, sans écraser la première data lorsqu'on le manipule
  //   const genevaCrew2: string[] = [...genevaCrew]
  //   console.log(genevaCrew === genevaCrew2)

  console.log(sweetness)

  return (
    <form action={handleAction}>
      <div>
        <label htmlFor="flavour">Saveur</label>
        <input type="text" id="flavour" name="flavour" />
      </div>
      <div>
        <label htmlFor="color">Couleur</label>
        <input type="color" id="color" name="color" />
      </div>
      <div>
        <label htmlFor="sweetness">Tasty ? (entre 1 et 5 )</label>
        <input
          onChange={(e) => setSweetness(Number(e.target.value))}
          value={sweetness}
          type="range"
          min="1"
          max="5"
        />
      </div>
      votre sweetness note est de {sweetness}
      <button type="submit">Ajouter un Macaron</button>
    </form>
  )
}
