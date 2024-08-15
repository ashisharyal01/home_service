export class TokenData {
    public accessToken: string;
    public loggedInUserName: string;
    public loggedInEmail: string;
    public loggedInMobileNumber: string;
    public loggedInAddress: string;
    public tokenExpirationDate: Date;
    public dateOfBirth: Date;
    public gender: string;

    constructor(accessToken: string, loggedInUserName: string, loggedInEmail: string, loggedInMobileNumber: string, loggedInAddress: string, tokenExpirationDate: Date, dateOfBirth: Date, gender: string) {
        this.accessToken = accessToken;
        this.loggedInUserName = loggedInUserName;
        this.loggedInEmail = loggedInEmail;
        this.loggedInMobileNumber = loggedInMobileNumber;
        this.loggedInAddress = loggedInAddress;
        this.tokenExpirationDate = tokenExpirationDate;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender

    }

}
