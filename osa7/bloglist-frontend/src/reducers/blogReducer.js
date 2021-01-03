import blogService from '../services/blogs';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOG':
      return action.data.sort((a, b) => {
        return b.likes - a.likes;
      });

    case 'ADD_BLOG':
      return [...state, action.data];

    case 'LIKE_BLOG':
      console.log(action.data);
      const newBlogs = state.slice();
      const likedBlog = newBlogs.find((b) => b.id === action.data.id);
      newBlogs[newBlogs.indexOf(likedBlog)].likes = action.data.likes;
      return newBlogs.sort((a, b) => {
        return b.likes - a.likes;
      });

    case 'REMOVE_BLOG':
      const updatedBlogs = state.filter((blog) => blog.id !== action.data.id);
      return [...updatedBlogs];

    default:
      return [...state];
  }
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const res = await blogService.like(blog);
    dispatch({ type: 'LIKE_BLOG', data: res });
  };
};

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({ type: 'INIT_BLOG', data: blogs });
  };
};

export const addBlog = (blog) => {
  return async (dispatch) => {
    const res = await blogService.create(blog);
    dispatch({ type: 'ADD_BLOG', data: res });
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch({ type: 'REMOVE_BLOG', data: id });
  };
};

export default reducer;
