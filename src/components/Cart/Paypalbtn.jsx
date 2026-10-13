import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { data } from 'react-router-dom';

const Paypalbtn = ({ amount, onSucess, onError }) => {
    return (
        <div>
            <PayPalScriptProvider option={{
                "client-id": import.meta.env.PAYPAL_CLIENT_ID
            }}>

                <PayPalButtons style={{ layout: "vertical" }}

                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [{ amount: { value: amount } }]
                        })
                    }}

                    onApprove={(data, actions) => {
                        return actions.order.capture().then(onSucess)
                    }}
                    onError={onError}
                />

            </PayPalScriptProvider>
        </div>

    )
}

export default Paypalbtn