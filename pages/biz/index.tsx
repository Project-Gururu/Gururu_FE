import style from '../../styles/components/Register.module.scss'
import ArrowLeft from '../../public/images/arrow-left.svg'
import Router from "next/router"

export default function Index() {
    return(
        <>
            <ArrowLeft onClick={() => Router.push("/mypage")}/>
            <div>사업자</div>
            <div className={style.Wrap}>
                <div className={style.Mybutton} onClick={() => Router.push("/biz/reservation")}>예약 리스트</div>
                <div className={style.Mybutton} onClick={() => Router.push("/biz/income")}>매출</div>
                <div className={style.Mybutton} onClick={() => Router.push("/biz/edit")}>내가게 수정</div>
            </div>
        </>
    )
}