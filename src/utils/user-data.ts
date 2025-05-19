class UserLoginStatus {
  private isLogin: boolean = false;

  public getUserData(): boolean {
    return this.isLogin;
  }

  public setUserLogin(loginStatus: boolean): void {
    this.isLogin = loginStatus;
  }
}

export const userLoginStatus = new UserLoginStatus();
