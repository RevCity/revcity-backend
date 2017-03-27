/** Result of signing into Facebook **/
export interface FacebookSignInResult {
  facebookId: string;
  name?:      string;
  email?:     string;
  picture?:   string;
}
