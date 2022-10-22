import Header from 'components/common/Header/Header'
import NavBar from 'components/common/Navigation/NavBar'
import Reservation from 'components/reservation/Reservation/Reservation'
import Container from 'components/ui/Container/Container'

export default function index() {
  return (
    <Container>
      <Header title="예약 내역" />
      <Reservation />
      <NavBar />
    </Container>
  )
}
