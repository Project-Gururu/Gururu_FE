import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";

const Reservation: React.FC = () => {
const dispatch = useDispatch();

    return(
        <>
            <div>예약 페이지</div>
        </>
    )
}

export default Reservation;