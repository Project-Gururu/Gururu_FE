import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArrowLeft from '../../public/images/arrow-left.svg'
import { RootState } from 'redux/store'
import Router from 'next/router'

const Edit: React.FC = () => {
  return (
    <>
      <ArrowLeft onClick={() => Router.push('/biz')} />
      <div> 수정페이지 </div>
      <div>사업자 정보 관리</div>
      <div>시술정보 관리</div>
      <div>스타일리스트 관리</div>
    </>
  )
}

export default Edit
