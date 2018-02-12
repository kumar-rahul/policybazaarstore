import { PolicybazaarStorePage } from './app.po';

describe('policybazaar-store App', () => {
  let page: PolicybazaarStorePage;

  beforeEach(() => {
    page = new PolicybazaarStorePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
