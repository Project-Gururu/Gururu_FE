import style from '../styles/components/Register.module.scss'
import Router from "next/router"


export default function mypage() {
  return (
    <>
    <div>mypage</div>
    <div className={style.Wrap}>
      <div className={style.Mybutton} onClick={() => Router.push("/reg")}>사업자 등록</div>
      <div className={style.Mybutton} onClick={() => Router.push("/reg/mypet")}>내 반려동물</div>
      <div className={style.Mybutton}>관심 매장</div>
      <div className={style.Mybutton}>공지사항</div>
      <div className={style.Mybutton}>이벤트</div>
    </div>
    </>
  )
}
