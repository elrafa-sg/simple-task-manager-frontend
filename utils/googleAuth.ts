const ScriptGoogleSource: string = "https://accounts.google.com/gsi/client";

class GoogleAuth {
    tokenClient: any = null;

    constructor() {
        this.loadClient();
    }

    loadClient () {
        const scriptGoogle: HTMLScriptElement = document.createElement("script");
        scriptGoogle.src = ScriptGoogleSource;
        scriptGoogle.async = true;
        scriptGoogle.defer = true;
        document.body.appendChild(scriptGoogle);
        scriptGoogle.onload = async () => {
            this.tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
                client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                scope: "https://www.googleapis.com/auth/calendar",
                prompt: "",
                callback: () => { },
            });
        };
    }

    async askPermission (): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.tokenClient.callback = (resp: any) => {
                    resolve(resp);
                };

                this.tokenClient.error_callback = (resp: any) => {
                    reject(resp);
                };

                this.tokenClient.requestAccessToken({
                    prompt: "consent",
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}

export { GoogleAuth };
