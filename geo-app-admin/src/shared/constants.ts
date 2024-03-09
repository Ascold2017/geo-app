export const ROOT_PATH = '/admin';
export const SECTION_LIST = '/sections'
export const TOPIC_LIST = '/topics'
export const NEW_TOPIC = '/topics/new'
export const EDIT_TOPIC = '/topics/:id'
export const USERS_LIST = '/users'

export const TOPIC_GEN = (id: number) => `${TOPIC_LIST}/${id}`;

export const AUTH_PATH = '/auth'
