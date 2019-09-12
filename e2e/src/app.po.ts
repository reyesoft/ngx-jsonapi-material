import { browser, by, element } from 'protractor';

export class AppPage {
  public async navigateTo() {
    return browser.get('/');
  }

  public async getParagraphText() {
    return element(by.css('demo-root h1')).getText();
  }
}
