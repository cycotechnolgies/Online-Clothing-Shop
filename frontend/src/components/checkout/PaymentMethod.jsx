import { useState } from "react";
import redirectIcon from "../../assets/redirect.png"; // Update this path to where you saved the redirection image
import visaIcon from "../../assets/visa.png";
import mastercardIcon from "../../assets/mastercard.png";
import QRIcon from "../../assets/scan.png";
import codIcon from "../../assets/cash-on-delivery.png";
import bankIcon from "../../assets/ComBank.png";
import mobilepay from "../../assets/mobilepayment.png";

const paymentOptions = [
    {
        id: 1,
        label: "Pay by visa,Master Debit or Credit Cards",
        detail: 'After clicking “Pay now”, you will be redirected to Pay by visa,Master Debit or Credit Cards to complete your purchase securely.',
        icons: [visaIcon, mastercardIcon],
    },
    {
        id: 2,
        label: "QR Payment",
        detail: 'After clicking "Pay now", you will be redirected to QR Payment to complete your purchase securely.',
        icons: [QRIcon],

    },
            {
        id: 3,
        label: "Mobile Payments",
        detail: 'After clicking "Pay now", you will be redirected to Mobile Payment to complete your purchase securely.',
        icons: [mobilepay],
    },
    {
        id: 4,
        label: "Cash on Delivery (COD)",
        detail: 'The Cash on Delivery payment method requires an additional fee of Rs. 40.00 that you will have to pay at delivery. This fee will be added to your order total automatically and is required by our courier. If you have questions, feel free to contact us.',
        icons: [codIcon],
    },
    {
        id: 5,
        label: "Bank Deposit",
        detail: (
            <>
                A/C Name: OLLY MARKETPLACE (PVT) LTD   <br />
                 A/C No: 1060692212<br />
                Bank & Branch: Commercial Bank - Duplication Rd<br />
                --------------------------<br />
                Let us know once the deposit is done today <br />
                and please share the an image of the deposit/transfer slip

            </>
        ),
        icons: [bankIcon],
    },
];

const PaymentMethod = () => {
    const [selectedId, setSelectedId] = useState(1);

    return (
        <section>
            <h2 className="text-base font-bold uppercase tracking-wide mb-3">Payment</h2>
            <p className="text-sm text-gray-600 mb-3">All transactions are secure and encrypted.</p>

            <div className="border border-gray-300 divide-y divide-gray-300">
                {paymentOptions.map((option) => {
                    const isSelected = option.id === selectedId;

                    return (
                        <div
                            key={option.id}
                            className={`transition-colors duration-300 ease-in-out ${isSelected ? "bg-blue-100 border-blue-300" : "bg-gray-100"
                                }`}
                            onClick={() => setSelectedId(option.id)}
                        >

                            <label className="flex items-start justify-between px-4 py-3 cursor-pointer text-sm w-full">
                                <div className="flex items-start gap-2">
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={isSelected}
                                        onChange={() => setSelectedId(option.id)}
                                        className="peer hidden"
                                    />
                                    <div
                                        className={`w-4 h-4 rounded-full transition-all duration-300 ease-in-out transform ${isSelected ? "bg-black" : "bg-white border border-gray-400"
                                            }`}
                                    />
                                    <span className="font-medium">
                                        {option.label}
                                        {option.description && (
                                            <div className="text-sm font-normal">{` – ${option.description}`}</div>
                                        )}
                                    </span>
                                </div>

                                {/* Wrap icons in flex container */}
                                <div className="flex gap-1 items-center">
                                    {option.icons?.map((icon, i) => (
                                        <img
                                            key={i}
                                            src={icon}
                                            alt={`Icon ${i}`}
                                            className="w-6 h-6 opacity-80 object-contain"
                                        />
                                    ))}
                                </div>
                            </label>


                            {/* Smooth expanding detail */}
                            <div
                                className={`overflow-hidden transition-all duration-00 ease-in-out ${isSelected
                                    ? "max-h-[180px] opacity-100 py-4 px-4 border-t border-gray-300 bg-gray-50"
                                    : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    {/* <img src={redirectIcon} alt="Redirect Icon" className="w-12 h-12" /> */}
                                    <p className="text-sm text-gray-700 leading-relaxed text-center">
                                        {option.detail}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default PaymentMethod;

