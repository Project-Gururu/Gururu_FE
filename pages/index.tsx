import type { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'

import NotiIcon from '../public/images/notification.svg'
import MyPageIcon from '../public/images/mypage.svg'
import Link from 'next/link'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Head>
        <title>Home | GURURU</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header.Container>
        내위치
        <Header.IconContainer>
          <NotiIcon alt="알림페이지로 가기" width="30" heigth="30" />
          <MyPageIcon alt="마이페이지로 가기" width="17" heigth="17" />
        </Header.IconContainer>
      </Header.Container>
      <Search.Container>
        <Search.Input type="text" />
      </Search.Container>
      <Nav.Container>
        <Link href="">
          <a className="item">내주변</a>
        </Link>
        <Link href="">
          <a className="item">LIVE</a>
        </Link>
        <Link href="">
          <a className="item">예약관리</a>
        </Link>
        <Link href="">
          <a className="item">마이펫</a>
        </Link>
        <Link href="">
          <a className="item">마이페이지</a>
        </Link>
      </Nav.Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
  background-color: #f3f3f3;
`

const Header = {
  Container: styled.header`
    width: 100%;
    padding: 5px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #d7c0ae;
    font-weight: 700;
    color: white;
    position: sticky;
    top: 0;
  `,
  IconContainer: styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
  `,
}

const Search = {
  Container: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 16px 15px;
    border-radius: 0 0 12px 12px;
    background-color: #d7c0ae;
  `,
  Input: styled.input`
    width: 100%;
    height: 40px;
    border: none;
    padding: 0 10px;
  `,
}

const Nav = {
  Container: styled.nav`
    display: grid;
    height: 70%;
    margin-top: 15px;
    padding: 0 16px;
    grid-template-rows: 1fr 0.5fr 1fr;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    /* flex-grow: 1; */
    font-family: 'Black Han Sans', sans-serif;
    font-size: 25px;

    .item {
      width: 100%;
      padding: 10px;
      background-color: white;
      border-radius: 12px;
      box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }
    .item:nth-child(3) {
      grid-column: 1/3;
    }
  `,
}

export default Home
