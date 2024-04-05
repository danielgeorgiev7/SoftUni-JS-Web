import * as PostAction from './post.action';
import { Post } from './post.type';

export type Action = PostAction.All;

const defaultState: Post = {
  text: 'I am the default text',
  likes: 0,
};

function newState(state: Post, newState: Post) {
  return { ...state, ...newState };
}

export function postReducer(state: Post = defaultState, action: Action) {
  switch (action.type) {
    case PostAction.DOWNVOTE:
      return newState(state, {
        likes: state?.likes !== undefined ? state.likes - 1 : 0,
      });

    case PostAction.UPVOTE:
      return {
        ...state,
        likes: state?.likes !== undefined ? state.likes + 1 : 0,
      };

    case PostAction.EDIT:
      return newState(state, { text: action.payload });

    case PostAction.RESET:
      return defaultState;

    default:
      return state;
  }
}
