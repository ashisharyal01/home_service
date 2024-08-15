import { environment } from './../environments/environment';

export const ServerApis = {
    /*
     *
     * Authentication Endpoints
     *
     */
    userLoginURL: `${environment.api}/user/login`,
    userUrl: `${environment.api}/user`,
    privilegesURL: `${environment.api}/privileges`,
    changePasswordUrl: `${environment.api}/change-password`,

    /*
    *
    * Pages Endpoints
    *
    */
    categoryUrl: `${environment.api}/category`,
    fiscalUrl: `${environment.api}/fiscalYear`,
    customerUrl: `${environment.api}/customer`,
    itemsUrl: `${environment.api}/item`,
    customerOrderInvoiceUrl: `${environment.api}/order`,
    customerTransactionUrl: `${environment.api}/transaction`,
    orderUrl: `${environment.api}/order`,
    paginateUrl: `${environment.api}/paginate`,
};
