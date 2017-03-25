/** Result of signing into Google **/
export interface GoogleSignInResult {
  googleId:    string;
  email?:      string;
  givenName?:  string;
  familyName?: string;
  picture?:    string;
}

export default GoogleSignInResult; 
