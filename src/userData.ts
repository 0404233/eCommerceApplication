class UserData {
  private isLogin: boolean = false;
  constructor() { }

  public getUserData(): boolean {
    return this.isLogin;
  }

  public setUserLogin(loginStatus: boolean): void {
    this.isLogin = loginStatus;
  }

  public clearCookie(): void {
    document.cookie = 'customer_token=; Max-Age=0; path=/';
    document.cookie = 'customer_refresh_token=; Max-Age=0; path=/';
  }
}

export const userData = new UserData();
