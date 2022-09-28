import Link from 'next/link'

export default function mypage() {
  return (
    <>
      <div>mypage</div>
      <div>
        <Link href="/reg">사업자 등록</Link>
      </div>
      <div>내 반려동물</div>
      <div>관심 매장</div>
      <div>공지사항</div>
      <div>이벤트</div>
    </>
  )
}
