import "./Header.scss"

export default function Header({
  handleDarkModeClick,
  isDarkMode = false,
}: {
  handleDarkModeClick: () => void
  isDarkMode: boolean
}) {
  return (
    <header className="header">
      <h1 className="header-title">O'Macarons</h1>
      <button onClick={handleDarkModeClick} type="button">
        {isDarkMode ? "lightMode" : "DarkMode"}
      </button>
    </header>
  )
}
