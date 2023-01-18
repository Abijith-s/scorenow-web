import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./index";

export function setUpRecaptha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        { defaultCountry: "IN" },
        auth
    );
    // recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
}