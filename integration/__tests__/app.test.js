describe('React App', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000');
  });

  it('should be titled "React App"', async () => {
    await expect(page.title()).resolves.toMatch('React App');
  });
});
