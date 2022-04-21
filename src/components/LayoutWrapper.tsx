import SectionContainer from './SectionContainer'
import Footer from './Footer'
import Header from './Header'

const LayoutWrapper: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <SectionContainer>
        <div className="flex min-h-screen flex-col justify-between pt-24">
          <main className="mb-auto">{children}</main>
          <Footer />
        </div>
      </SectionContainer>
    </>
  )
}

export default LayoutWrapper
