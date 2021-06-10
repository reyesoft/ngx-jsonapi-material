import { AppPage } from './app.po';

describe('workspace-project App', (): void => {
  let page: AppPage;

  beforeEach((): void => {
    page = new AppPage();
  });

  it('should display welcome message', (): void => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to ngx-jsonapi-material-app!');
  });
});
