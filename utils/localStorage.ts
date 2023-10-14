
class LocalStorage {
    static setUserToken = (token: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem("userToken", token);
        } else {
            return null
        }
    };

    static getUSerToken () {
        if (typeof window !== 'undefined') {
            return localStorage.getItem("userToken");
        } else {
            return null
        }
    };

    static setGoogleCalendarToken (token: string) {
        if (typeof window !== 'undefined') {
            localStorage.setItem("googleCalendarToken", token);
        } else {
            return null
        }
    }

    static getGoogleCalendarToken () {
        if (typeof window !== 'undefined') {
            return localStorage.getItem("googleCalendarToken");
        } else {
            return null
        }
    }

    static setGoogleCalendarTokenExpiration (dataExpiracao: string) {
        if (typeof window !== 'undefined') {
            localStorage.setItem("googleCalendarTokenExpiration", dataExpiracao);
        } else {
            return null
        }
    }

    static getGoogleCalendarTokenExpiration () {
        if (typeof window !== 'undefined') {
            return localStorage.getItem("googleCalendarTokenExpiration")
        } else {
            return null
        }
    }

    static clearTokens () {
        if (typeof window !== 'undefined') {
            localStorage.removeItem("userToken");
            localStorage.removeItem("googleCalendarToken");
            localStorage.removeItem("googleCalendarTokenExpiration")
        } else {
            return null
        }
    };

}

export { LocalStorage }


