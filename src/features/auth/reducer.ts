import { createReducer } from 'redux-starter-kit';

import { setAuth } from '../common/actions';

export default createReducer(false, {
  [setAuth as any]: (_, action) => action.payload
});
