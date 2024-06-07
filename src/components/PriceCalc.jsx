import React, { useMemo, useState } from 'react'

export default function PriceCalc({ price, discountPercentage }) {
    const [finalPrice, setFinalPrice] = useState(0)

    function calcPrice(price) {
        const final = Math.trunc(price - (price * discountPercentage / 100))
        setFinalPrice(final)
    }

    useMemo(() => calcPrice(price), [price])
    return (<>
        <div className='d-flex gap-2 mt-1'>
            <span className=' text-danger oldPrice '>$ {price}</span>
            <h6 >$ {finalPrice}</h6>
            {/* <div className='bg-success-subtle  fw-bold text-success mb-auto rounded w-auto'>{discountPercentage}% </div> */}
        </div>
    </>)
}
