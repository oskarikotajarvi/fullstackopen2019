const listHelper = require('../utils/list_helper');

const listWithOneBlog = [
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
];

// Dummy test
test('dummy returns one', () => {
  expect(listHelper.dummy([])).toBe(1);
});

// Testing like counting
describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test('when list has only one blog equals to that', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(2);
  });

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(listHelper.blogs)).toBe(36);
  });
});

// Testing to see which blog has most likes
describe('favorite blog', () => {
  test('of empty list is {}', () => {
    expect(listHelper.favoriteBlog([])).toEqual({});
  });

  test('when list has only one blog equals to that', () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual({
      title: 'Type wars',
      author: 'Robert C. Martin',
      likes: 2
    });
  });

  test('of a bigger list is returned right', () => {
    expect(listHelper.favoriteBlog(listHelper.blogs)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    });
  });
});

// Test to get the author with most created blogs
describe('author with most blogs', () => {
  test('of empty list is {}', () => {
    expect(listHelper.mostBlogs([])).toEqual({});
  });
});
