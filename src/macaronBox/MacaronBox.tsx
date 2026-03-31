import "./MacaronBox.scss"

interface Iprops {
  children: React.ReactNode
}

export default function MacaronBox({ children }: Iprops) {
  return <ul className="macaronBox">{children}</ul>
}
