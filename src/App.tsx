// useState est une fonction speciale importée de React, c'est un hook c'est à dire qu'elle n'a le droit d'etre utilisée que dans des composants (fonction qui return du JSX) et elle ne doit etre executée que à la racine du composant (pas dans des boucles, des conditions, des sous fonctions)
import { useEffect, useState } from "react"
import Header from "./header/Header"
import { MacaronI } from "./@types/macaron"
import Footer from "./footer/Footer"
import AddMacaron from "./addMacaron/AddMacaron"
import { Route, Routes } from "react-router"
import Home from "./pages/home/Home"
import MacaronPage from "./pages/macaronPage/MacaronPage"

// COMPOSANT : un composant est une fonction qui return du JSX
// on met une majuscule au debut du nom de la fonction composant
function App() {
  //Je prépare un state pour savoir si je suis en darkmode
  const [isDarkMode, setIsDarkMode] = useState(false)

  //Tant que je n'ai aps mes macarons venant de l'api
  //Je prépare un loader
  const [isLoading, setIsLoading] = useState(false)

  //Je prépare un state pour manager mes erreurs de fetch
  const [fetchError, setFetchError] = useState("")

  // ici on peut definir des variables (bidons: qui ne sont pas réactives)
  // on a un tableau de string et on veut fabriquer un tableau de div pour notre JSX on va utiliser MAP
  //const macaronList: MacaronI[] = data
  // En utilisant mon formulaire je vais influer sur le tableau de macarons, et donc j'ai besoin de les stocker
  // Dans un state
  const [macaronList, setMacaronList] = useState<MacaronI[]>([])

  //Je crée un useEffect pour gérer mon appel api
  useEffect(() => {
    // Je prépare une fonction pour fetch ma data
    async function fetchMacarons() {
      setIsLoading(true)
      const errorMessage =
        "Une erreur s'est produite durant la recuperation de vos Macarons, veuillez reessayer ulterieurement"
      //j'esaie de récupérer une data, sinon j'affiche une erreur pour dev ET pour l'user
      try {
        //Je fetch ma promise
        const httpResponse = await fetch(
          "https://oclock-api.vercel.app/api/macarons",
        )
        //Si la reponse est bonne
        if (httpResponse.ok) {
          // Je transforme cette promesse en json
          const macarons = await httpResponse.json()
          //J'ajoute mes données api de macarons dans mon state (qui hydratera / remplacera le tableau vide initialisé)
          setMacaronList(macarons)
        } else {
          setFetchError(errorMessage)
          throw new Error("An error occured during fetch")
        }
      } catch (e) {
        setFetchError(errorMessage)
        if (e instanceof Error)
          throw new Error("Unable to fetch data : " + e.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMacarons()
    return () => {
      console.log("composant mis à jour")
    }
  }, [])

  //Je crée une fonction qui permet d'ajouter un macaron à la liste
  function addMacaronToList(newMacaron: Omit<MacaronI, "id">) {
    // Je crée une copie de mon tableau de macaron (principe d'immutabilité)
    const newMacaronList: MacaronI[] = [
      ...macaronList,
      { id: macaronList.length + 1, ...newMacaron },
    ]
    setMacaronList(newMacaronList)
  }

  console.log(macaronList)

  return (
    <div className={isDarkMode ? "app--dark" : "app"}>
      <Header
        handleDarkModeClick={() => setIsDarkMode((prevState) => !prevState)}
        isDarkMode={isDarkMode}
      />
      {isLoading ? (
        <p>loading ... Please wait</p>
      ) : fetchError ? (
        <p>{fetchError}</p>
      ) : (
        <main className="main">
          {/* Je crée mes routes */}
          <Routes>
            <Route path="/" element={<Home macaronList={macaronList} />} />
            <Route
              path="/macarons/:flavour"
              element={<MacaronPage macaronList={macaronList} />}
            />
            <Route path="*" element={<h1>404 : Missing Macaron</h1>} />
          </Routes>
        </main>
      )}
      <AddMacaron addMacaronToList={addMacaronToList} />
      <Footer />
    </div>
  )
}

// on pense à exporter le composant pour qu'il soit utilisable ailleurs
export default App
