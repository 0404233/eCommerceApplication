class UserLoginStatus {
  private isLogin: boolean = false;
  constructor() {}

  public getUserData(): boolean {
    return this.isLogin;
  }

  public setUserLogin(loginStatus: boolean): void {
    this.isLogin = loginStatus;
  }
}

export const userLoginStatus = new UserLoginStatus();
