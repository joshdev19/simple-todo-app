export class Error_Helper {

    static validate ( err ) {

        const code = err.code

        if ( code === "ERR_BAD_NETWORK") {

            return "No internet connection";

        }
        else {

            return err.response.data?.message;

        }

    }

}