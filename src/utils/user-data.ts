class UserData {
  private isLogin: boolean = false;

  public getUserLogin(): boolean {
    return this.isLogin;
  }

  public setUserLogin(loginStatus: boolean): void {
    this.isLogin = loginStatus;
  }
}

export const userData = new UserData();
