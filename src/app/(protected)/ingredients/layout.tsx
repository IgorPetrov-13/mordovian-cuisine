
interface IProps {
  children: React.ReactNode
}
function IngredientsLayout({children} :IProps) {
  return (
    <section>{children}</section>
  )
}
export default IngredientsLayout