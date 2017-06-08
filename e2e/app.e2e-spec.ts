import { CampAppPage } from './app.po';

describe('camp-app App', () => {
  let page: CampAppPage;

  beforeEach(() => {
    page = new CampAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
