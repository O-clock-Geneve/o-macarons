// useState est une fonction speciale importée de React, c'est un hook c'est à dire qu'elle n'a le droit d'etre utilisée que dans des composants (fonction qui return du JSX) et elle ne doit etre executée que à la racine du composant (pas dans des boucles, des conditions, des sous fonctions)
import { useState } from "react"
import Macaron from "./macaron/Macaron"
import Header from "./header/Header"
import data from "./data/macarons"
import MacaronBox from "./macaronBox/MacaronBox"
import { MacaronI } from "./@types/macaron"
import Footer from "./footer/Footer"

// COMPOSANT : un composant est une fonction qui return du JSX
// on met une majuscule au debut du nom de la fonction composant
function App() {
  //Je prépare un state pour savoir si je suis en darkmode
  const [isDarkMode, setIsDarkMode] = useState(false)

  // ici on peut definir des variables (bidons: qui ne sont pas réactives)
  // on a un tableau de string et on veut fabriquer un tableau de div pour notre JSX on va utiliser MAP
  const macaronList: MacaronI[] = data

  //Je prépare mon state afin d'afficher / selectionner le Macaron choisi par l'utilisateur
  const [selectedMacaron, setSelecetMacaron] = useState<MacaronI>(
    macaronList[0],
  )

  return (
    <div className={isDarkMode ? "app--dark" : "app"}>
      <Header
        handleDarkModeClick={() => setIsDarkMode((prevState) => !prevState)}
        isDarkMode={isDarkMode}
      />
      <main className="main">
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
            Pas de macarons disponibles, revenez plus tard. Ou achetez des
            cookies c'est moins cher
          </p>
        )}

        <div>Please select your favorite Macaron : </div>
        <p>Your favorite Macaron is : macaron {selectedMacaron.flavour}</p>
      </main>
      <Footer />
    </div>
  )
}

// on pense à exporter le composant pour qu'il soit utilisable ailleurs
export default App
