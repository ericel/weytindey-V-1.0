import { WeytindeyPage } from './app.po';

describe('weytindey App', () => {
  let page: WeytindeyPage;

  beforeEach(() => {
    page = new WeytindeyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
