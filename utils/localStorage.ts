
class LocalStorage {
    static setUserToken = (token: string) => {
        localStorage.setItem("userToken", JSON.stringify(token));
    };

    static getUSerToken () {
        return JSON.parse(localStorage.getItem("userToken")!);
    };

    static setGoogleCalendarToken (token: string) {
        localStorage.setItem("googleCalendarToken", JSON.stringify(token));
    }

    static getGoogleCalendarToken () {
        return JSON.parse(localStorage.getItem("googleCalendarToken")!);
    }

    static setGoogleCalendarTokenExpiration (dataExpiracao: Date) {
        localStorage.setItem("googleCalendarTokenExpiration", JSON.stringify(dataExpiracao));
    }

    static getGoogleCalendarTokenExpiration () {
        return JSON.parse(localStorage.getItem("googleCalendarTokenExpiration")!);
    }

    static clearTokens () {
        localStorage.removeItem("userToken");
        localStorage.removeItem("googleCalendarToken");
        localStorage.removeItem("googleCalendarTokenExpiration")
    };

}

export { LocalStorage }


