import { Angular2qappPage } from './app.po';

describe('angular2qapp App', function() {
  let page: Angular2qappPage;

  beforeEach(() => {
    page = new Angular2qappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
