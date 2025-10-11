
interface IProps {
  children: React.ReactNode
}
function AboutLayout({children} :IProps) {
  return (
    <section>{children}</section>
  )
}
export default AboutLayout